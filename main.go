package main

import (
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
)

const cmsAdminPath = "/cms/"

func bindStaticAdminUI(e *core.ServeEvent) error {
	// redirect to trailing slash to ensure that relative urls will still work properly
	e.Router.GET(
		strings.TrimRight(cmsAdminPath, "/"),
		func(c echo.Context) error {
			return c.Redirect(http.StatusTemporaryRedirect, strings.TrimLeft(cmsAdminPath, "/"))
		},
	)

	// serves static files from the /ui/dist directory
	// (similar to echo.StaticFS but with gzip middleware enabled)
	e.Router.GET(
		cmsAdminPath+"*",
		echo.StaticDirectoryHandler(ui.DistDirFS, false),
		middleware.Gzip(),
	)

	return nil
}

func addPcmsUsersCollection(app core.App, overwrite bool) {
	collection, err := app.Dao().FindCollectionByNameOrId("users")
	_, pcms_err := app.Dao().FindCollectionByNameOrId("pcms__users")

	// if "users" collection doesn't exist
	if err != nil {
		log.Fatal(err)
	}

	// if pcms__users doesn't exist
	if err == nil && pcms_err != nil{

		var pcms_users_collection *models.Collection = nil

		if !overwrite {
			// Clone the "users" collection to new collection "pcms__users"
			pcms_users_collection = &models.Collection{
				Name:       "pcms__users",
				Type:       models.CollectionTypeAuth,
				Schema:     collection.Schema,
				ListRule:   collection.ListRule,
				ViewRule:   collection.ViewRule,
				CreateRule: collection.CreateRule,
				UpdateRule: collection.UpdateRule,
				DeleteRule: collection.DeleteRule,
				Options:    collection.Options,
			}
		} else {
			pcms_users_collection = collection
			pcms_users_collection.Name = "pcms__users"
		}

		// Save the new collection "pcms__users"
		if err := app.Dao().SaveCollection(pcms_users_collection); err != nil {
			log.Fatal(err)
		}
	}

}

func main() {
	app := pocketbase.New()

	app.OnBeforeServe().Add(func(e *core.ServeEvent) error {
		bindStaticAdminUI(e)
		addPcmsUsersCollection(app, false)
		return nil
	})

	// TODO:
	regular := color.New()
	regular.Printf("└─ CMS Admin UI: %s\n", color.CyanString("%s://%s%s", "https", "TODO:", cmsAdminPath))

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}

}
