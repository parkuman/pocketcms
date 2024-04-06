package main

import (
	"github.com/pocketbase/pocketbase"
  "github.com/pocketbase/pocketbase/core"
  "github.com/parkuman/pocketcms/ui"
	"github.com/labstack/echo/v5"
	"github.com/labstack/echo/v5/middleware"
	"log"
  "strings"
  "net/http"
)

const cmsAdminPath = "/admin/"

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

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
