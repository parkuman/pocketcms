import { wrap } from "svelte-spa-router/wrap";
import Pocketbase from "@/utils/Pocketbase";
import PageIndex from "@/components/pages/PageIndex.svelte";
import PageCollections from "@/components/pages/collections/PageCollections.svelte";
import PageUserLogin from "@/components/pages/PageUserLogin.svelte";

const routes = {
    "/login": wrap({
        component: PageUserLogin,
        conditions: [(_) => !Pocketbase.authStore.isValid],
        userData: { showAppSidebar: false },
    }),

    "/collections": wrap({
        component: PageCollections,
        conditions: [(_) => Pocketbase.authStore.isValid],
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
