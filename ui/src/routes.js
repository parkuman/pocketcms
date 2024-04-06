import { replace } from "svelte-spa-router";
import { wrap } from "svelte-spa-router/wrap";
import PageIndex from "@/components/PageIndex.svelte";
import PageCollections from "@/components/collections/PageCollections.svelte";

const routes = {
    // "/login": wrap({
    //     component: PageAdminLogin,
    //     // conditions: [(_) => !ApiClient.authStore.isValid],
    //     userData: { showAppSidebar: false },
    // }),

    "/collections": wrap({
        component: PageCollections,
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
        // TODO: make false
        userData: { showAppSidebar: true },
    }),
};

export default routes;
