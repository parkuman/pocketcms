package main

import (
	"fmt"
	"log"
	"net/http"
	"strings"

	"github.com/fatih/color"
	"github.com/labstack/echo/v5"
	"github.com/labstack/echo/v5/middleware"
	"github.com/parkuman/pocketcms/ui"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/models"
	"github.com/pocketbase/pocketbase/models/schema"
	"github.com/pocketbase/pocketbase/tools/types"
)

const pcmsAdminPath = "/cms/"
const pcmsUsersCollection = "pcms__users"
const pcmsCollectionsCollection = "pcms__collections"

func createPCMSCollectionsCollection(app core.App) error {
	collection := &models.Collection{}
	collection.MarkAsNew()
	collection.Id = pcmsCollectionsCollection
	collection.Name = pcmsCollectionsCollection
	collection.Type = models.CollectionTypeView
	collection.ListRule = types.Pointer("")
	collection.ViewRule = types.Pointer("")

	collection.SetOptions(models.CollectionViewOptions{
		Query: `
     SELECT id, name, schema, listRule, viewRule, createRule, updateRule, deleteRule
     FROM _collections
     WHERE name LIKE 'pcms|_%' ESCAPE '|'
     AND name NOT LIKE 'pcms|_|_%' ESCAPE '|';
   `,
	})

	return app.Dao().SaveCollection(collection)
}

func createPCMSUsersCollections(app core.App) error {
	usersCollection := &models.Collection{}
	usersCollection.MarkAsNew()
	usersCollection.Id = pcmsUsersCollection
	usersCollection.Name = pcmsUsersCollection
	usersCollection.Type = models.CollectionTypeAuth
	usersCollection.ListRule = types.Pointer("id = @request.auth.id")
	usersCollection.ViewRule = types.Pointer("id = @request.auth.id")
	usersCollection.CreateRule = types.Pointer("")
	usersCollection.UpdateRule = types.Pointer("id = @request.auth.id")
	usersCollection.DeleteRule = types.Pointer("id = @request.auth.id")

	// set auth options
	usersCollection.SetOptions(models.CollectionAuthOptions{
		ManageRule:        nil,
		AllowOAuth2Auth:   true,
		AllowUsernameAuth: true,
		AllowEmailAuth:    true,
		MinPasswordLength: 8,
		RequireEmail:      false,
	})

	// set optional default fields
	usersCollection.Schema = schema.NewSchema(
		&schema.SchemaField{
			Id:       fmt.Sprintf("%s_name", pcmsUsersCollection),
			Type:     schema.FieldTypeText,
			Name:     "name",
			Required: true,
			Options:  &schema.TextOptions{},
		}, &schema.SchemaField{
			Id:   fmt.Sprintf("%s_avatar", pcmsUsersCollection),
			Type: schema.FieldTypeFile,
			Name: "avatar",
			Options: &schema.FileOptions{
				MaxSelect: 1,
				MaxSize:   5242880,
				MimeTypes: []string{
					"image/jpeg",
					"image/png",
					"image/svg+xml",
					"image/gif",
					"image/webp",
				},
			},
		},
	)

	return app.Dao().SaveCollection(usersCollection)
}

func setupPCMSCollections(app core.App) error {
	_, err := app.Dao().FindCollectionByNameOrId(pcmsUsersCollection)
	if err != nil {
		if usersErr := createPCMSUsersCollections(app); usersErr != nil {
			return usersErr
		}
	}

	_, err = app.Dao().FindCollectionByNameOrId(pcmsCollectionsCollection)
	if err != nil {
		if collectionsErr := createPCMSCollectionsCollection(app); collectionsErr != nil {
			return collectionsErr
		}
	}

	return nil
}

// ripped straight from pocketbases base.go file
// installerRedirect redirects the user to the installer CMS admin UI page
// when the application needs some preliminary configurations to be done.
func installerRedirect(app core.App) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			// skip redirect checks for non-root level index.html requests
			path := c.Request().URL.Path
			if path != pcmsAdminPath && path != pcmsAdminPath+"index.html" {
				return next(c)
			}

			_, hasInstallerParam := c.Request().URL.Query()["installer"]
			installerStage := c.Request().URL.Query().Get("installer")

			totalPBAdmins, err := app.Dao().TotalAdmins()
			if err != nil {
				return err
			}

			hasPBAdmin := totalPBAdmins > 0

			const stagePB = "pb"
			if !hasPBAdmin && installerStage != stagePB {
				// if pocketbase admin is not even set up yet, tell the user to do that first
				return c.Redirect(http.StatusTemporaryRedirect, fmt.Sprintf("?installer=%s#", stagePB))
			}

			// if somehow these collections were deleted during runtime
			setupPCMSCollections(app)

			// attempt to find a user in the pcmsUsersCollection
			var pcmsUserId string = ""
			var hasPCMSUser bool
			err = app.Dao().DB().NewQuery(fmt.Sprintf("SELECT id FROM {{%s}}", pcmsUsersCollection)).Row(&pcmsUserId)
			if err != nil {
				hasPCMSUser = false
			}

			if pcmsUserId != "" {
				hasPCMSUser = true
			}

			const stagePCMS = "pcms"

			if hasPBAdmin && !hasPCMSUser && installerStage != stagePCMS {
				// if pocketbase has an admin and no cms user, tell the user to now create their first pcms user
				return c.Redirect(http.StatusTemporaryRedirect, fmt.Sprintf("?installer=%s#", stagePCMS))
			}

			if hasPBAdmin && hasPCMSUser && hasInstallerParam {
				// clear the installer param
				return c.Redirect(http.StatusTemporaryRedirect, "?")
			}

			return next(c)
		}
	}
}

func bindStaticCMSAdminUI(app core.App, e *core.ServeEvent) error {
	// redirect to trailing slash to ensure that relative urls will still work properly
	e.Router.GET(
		strings.TrimRight(pcmsAdminPath, "/"),
		func(c echo.Context) error {
			return c.Redirect(http.StatusTemporaryRedirect, strings.TrimLeft(pcmsAdminPath, "/"))
		},
	)

	// serves static files from the /ui/dist directory
	e.Router.GET(
		pcmsAdminPath+"*",
		echo.StaticDirectoryHandler(ui.DistDirFS, false),
		installerRedirect(app),
		middleware.Gzip(),
	)

	regular := color.New()
	regular.Printf("├─ CMS Admin UI: %s\n", color.CyanString("%s://%s%s", "https", e.Server.Addr, pcmsAdminPath))

	return nil
}

func main() {
	app := pocketbase.New()

	app.OnBeforeServe().Add(func(e *core.ServeEvent) error {
		setupPCMSCollections(app)
		bindStaticCMSAdminUI(app, e)

		return nil
	})

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}

}
