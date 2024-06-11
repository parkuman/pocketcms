# PocketCMS

<p align="center">
    <a href="https://github.com/parkuman/pocketcms/actions/workflows/release.yaml" target="_blank" rel="noopener"><img src="https://github.com/parkuman/pocketcms/actions/workflows/release.yaml/badge.svg" alt="build" /></a>
</p>

PocketCMS is an open source content management system leveraging [PocketBase](https://pocketbase.io)
as its foundation. PocketCMS offers:

- a client-facing CMS portal _alongside_ PocketBase's admin UI
- using PocketBase's [client-side SDKs](https://pocketbase.io/docs/client-side-sdks/) within your application for fetching data from PocketCMS

# Instructions

By installing PocketCMS, you are essentially also installing [PocketBase](https://pocketbase.io) with some additional features adn an additional embedded single-page-application acting as the CMS admin portal. The instructions for deploying are therefore very similar to PocketBase's.

To run as a standalone application, download the prebuilt executable from the Releases page. Once downloaded, extract the archive and run `./pocketcms serve` in the extracted directory.

From there, PocketBase will run in its usual path of `localhost:8090/_/` and PocketCMS will run at `localhost:8090/cms/`. Before using PocketCMS, some initial collection and user setup is required.

## Initial Setup

1. log in to pocketbase
2. create an auth collection called `pcms__users`
3. create a user
4. visit pocketcms at `localhost:8090/cms` and sign in as the user you created
5. run through initial setup for pocketcms
6. voila!

Now that you are set up, any collections you create inside PocketBase prefixed with
`pcms_` and with api rules **not** set to admin only, those collections will be
available in PocketCMS.

# Development

Feel free to raise issues and PRs! Any suggestions are welcome.

## To run pocketbase and pocketcms

1. Clone the repo
2. run

```bash
go mod tidy
go run main.go serve
```

## UI Development

1. Run pocketcms like above
2. in another terminal, open the `ui/` dir and run:

```bash
npm run dev
```

which should spin up vite at `localhost:3000`. This will give you all the HMR goodness.
