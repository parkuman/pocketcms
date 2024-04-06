<script>
    import "./scss/main.scss";

    import Router, { replace, link } from "svelte-spa-router";
    import active from "svelte-spa-router/active";
    import routes from "./routes";

    let showAppSidebar = false;
    let oldLocation = undefined;

    function handleRouteLoading(e) {
        if (e?.detail?.location === oldLocation) {
            return; // not an actual change
        }

        showAppSidebar = !!e?.detail?.userData?.showAppSidebar;

        oldLocation = e?.detail?.location;

        // TODO:
        // resets
        // $pageTitle = "";
        // setErrors({});
        // resetConfirmation();
    }

    function handleRouteFailure() {
        replace("/");
    }
</script>

<svelte:head>
    <!-- TODO: -->
    <title>PocketCMS</title>
</svelte:head>

<div class="app-layout">
    <!-- {#if $admin?.id && showAppSidebar} -->
    {#if showAppSidebar}
        <aside class="app-sidebar">
            <a href="/" class="logo logo-sm" use:link>
                <img
                    src="{import.meta.env.BASE_URL}images/logo.svg"
                    alt="PocketBase logo"
                    width="40"
                    height="40"
                />
            </a>

            <nav class="main-menu">
                <a
                    href="/collections"
                    class="menu-item"
                    aria-label="Collections"
                    use:link
                    use:active={{ path: "/collections/?.*", className: "current-route" }}
                >
                    <i class="ri-database-2-line" />
                </a>
                <!-- TODO: tooltip -->
                <a
                    href="/settings"
                    class="menu-item"
                    aria-label="Settings"
                    use:link
                    use:active={{ path: "/settings/?.*", className: "current-route" }}
                >
                    <i class="ri-tools-line" />
                </a>
            </nav>
        </aside>
    {/if}

    <div class="app-body">
        <Router {routes} on:routeLoading={handleRouteLoading} on:conditionsFailed={handleRouteFailure} />

        <!-- TODO: -->
        <!-- <Toasts /> -->
    </div>
</div>
