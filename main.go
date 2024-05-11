package main

import (
	"github.com/fatih/color"
	"github.com/labstack/echo/v5"
	"github.com/labstack/echo/v5/middleware"
	"github.com/parkuman/pocketcms/ui"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
	"log"
	"net/http"
	"strings"
)

const cmsAdminPath = "/cms/"

func bindStaticAdminUI(app core.App, e *core.ServeEvent) error {
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

func main() {
	app := pocketbase.New()

	app.OnBeforeServe().Add(func(e *core.ServeEvent) error {
		bindStaticAdminUI(app, e)

		return nil
	})

	// TODO:
	regular := color.New()
	regular.Printf("└─ CMS Admin UI: %s\n", color.CyanString("%s://%s%s", "https", "TODO:", cmsAdminPath))

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}

}
