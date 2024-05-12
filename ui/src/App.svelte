<script>
    import "./scss/main.scss";

    import Router, { replace, link } from "svelte-spa-router";
    import active from "svelte-spa-router/active";
    import Confirmation from "@/components/base/Confirmation.svelte";
    import CommonHelper from "@/utils/CommonHelper";
    import { resetConfirmation } from "@/stores/confirmation";
    import Pocketbase from "@/utils/Pocketbase";
    import Toasts from "@/components/base/Toasts.svelte";
    import Toggler from "@/components/base/Toggler.svelte";
    import tooltip from "@/actions/tooltip";
    import { user } from "@/stores/user";
    import { pageTitle, appName } from "@/stores/app";
    import { setErrors } from "@/stores/errors";
    import routes from "./routes";

    let showAppSidebar = false;
    let oldLocation = undefined;

    function handleRouteLoading(e) {
        if (e?.detail?.location === oldLocation) {
            return; // not an actual change
        }

        showAppSidebar = !!e?.detail?.userData?.showAppSidebar;

        oldLocation = e?.detail?.location;

        $pageTitle = "";
        setErrors({});
        resetConfirmation();
    }

    function handleRouteFailure() {
        replace("/");
    }

    function logout() {
        Pocketbase.logout();
    }
</script>

<svelte:head>
    <title>{CommonHelper.joinNonEmpty([$pageTitle, $appName, "PocketCMS"], " - ")}</title>
</svelte:head>

<div class="app-layout">
    {#if $user?.id && showAppSidebar}
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
                    use:tooltip={{ text: "Collections", position: "right" }}
                >
                    <i class="ri-database-2-line" />
                </a>
                <a
                    href="/settings"
                    class="menu-item"
                    aria-label="Settings"
                    use:link
                    use:active={{ path: "/settings/?.*", className: "current-route" }}
                    use:tooltip={{ text: "Settings", position: "right" }}
                >
                    <i class="ri-tools-line" />
                </a>
            </nav>

            <div
                tabindex="0"
                role="button"
                aria-label="Logged admin menu"
                class="thumb thumb-circle link-hint closable"
            >
                <img
                    src="{import.meta.env.BASE_URL}images/avatars/avatar{$user?.avatar || 0}.svg"
                    alt="Avatar"
                    aria-hidden="true"
                />
                <Toggler class="dropdown dropdown-nowrap dropdown-upside dropdown-left">
                    <button type="button" class="dropdown-item closable" role="menuitem" on:click={logout}>
                        <i class="ri-logout-circle-line" aria-hidden="true" />
                        <span class="txt">Logout</span>
                    </button>
                </Toggler>
            </div>
        </aside>
    {/if}

    <div class="app-body">
        <Router {routes} on:routeLoading={handleRouteLoading} on:conditionsFailed={handleRouteFailure} />

        <Toasts />
    </div>
</div>

<Confirmation />
