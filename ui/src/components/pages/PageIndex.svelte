<script>
    import { tick } from "svelte";
    import { replace } from "svelte-spa-router";
    import Pocketbase from "@/utils/Pocketbase";
    import FullPage from "@/components/base/FullPage.svelte";
    import Installer from "@/components/base/Installer.svelte";

    let showInstaller = false;

    handler();

    function handler() {
        showInstaller = false;

        const realQueryParams = new URLSearchParams(window.location.search);

        if (realQueryParams.has(import.meta.env.PCMS_INSTALLER_PARAM)) {
            Pocketbase.logout(false);
            showInstaller = true;
            return;
        }

        if (Pocketbase.authStore.isValid) {
            replace("/collections");
        } else {
            Pocketbase.logout();
        }
    }
</script>

{#if showInstaller}
    <FullPage>
        <Installer
            on:submit={async () => {
                showInstaller = false;

                await tick();

                // clear the installer param
                window.location.search = "";
            }}
        />
    </FullPage>
{/if}
