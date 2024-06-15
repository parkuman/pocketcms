import { wrap } from "svelte-spa-router/wrap";
import Pocketbase from "@/utils/Pocketbase";
import PageIndex from "@/components/pages/PageIndex.svelte";
import PageCollections from "@/components/pages/collections/PageCollections.svelte";
import PageRecord from "@/components/pages/collections/record/PageRecord.svelte";
import PageUserLogin from "@/components/pages/PageUserLogin.svelte";

const baseConditions = [
    async (details) => {
        const realQueryParams = new URLSearchParams(window.location.search);

        if (details.location !== "/" && realQueryParams.has(import.meta.env.PCMS_INSTALLER_PARAM)) {
            return replace("/");
        }

        return true;
    },
];

const routes = {
    "/login": wrap({
        component: PageUserLogin,
        conditions: baseConditions.concat([(_) => !Pocketbase.authStore.isValid]),
        userData: { showAppSidebar: false },
    }),

    "/collections": wrap({
        component: PageCollections,
        conditions: baseConditions.concat([(_) => Pocketbase.authStore.isValid]),
        userData: { showAppSidebar: true },
    }),

    "/collections/:collectionId/": wrap({
        component: PageRecord,
        conditions: baseConditions.concat([(_) => Pocketbase.authStore.isValid]),
        userData: { showAppSidebar: true },
    }),

    // "/request-password-reset": wrap({
    //     asyncComponent:  () => import("@/components/admins/PageAdminRequestPasswordReset.svelte"),
    //     conditions: baseConditions.concat([(_) => !ApiClient.authStore.isValid]),
    //     userData: { showAppSidebar: false },
    // }),
    //
    // "/confirm-password-reset/:token": wrap({
    //     asyncComponent:  () => import("@/components/admins/PageAdminConfirmPasswordReset.svelte"),
    //     conditions: baseConditions.concat([(_) => !ApiClient.authStore.isValid]),
    //     userData: { showAppSidebar: false },
    // }),
    //
    //
    // "/logs": wrap({
    //     component: PageLogs,
    //     conditions: baseConditions.concat([(_) => ApiClient.authStore.isValid]),
    //     userData: { showAppSidebar: true },
    // }),
    //
    // "/settings": wrap({
    //     component:  PageApplication,
    //     conditions: baseConditions.concat([(_) => ApiClient.authStore.isValid]),
    //     userData: { showAppSidebar: true },
    // }),
    //
    // "/settings/admins": wrap({
    //     component:  PageAdmins,
    //     conditions: baseConditions.concat([(_) => ApiClient.authStore.isValid]),
    //     userData: { showAppSidebar: true },
    // }),

    // catch-all fallback
    "*": wrap({
        component: PageIndex,
        userData: { showAppSidebar: false },
    }),
};

export default routes;
