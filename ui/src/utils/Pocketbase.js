import PocketBase, { LocalAuthStore } from "pocketbase";
import { replace } from "svelte-spa-router";
import { setUser } from "@/stores/user";
import { addErrorToast } from "@/stores/toasts";
import CommonHelper from "@/utils/CommonHelper";

/**
 * Clears the authorized state and redirects to the login page.
 *
 * @param {Boolean} [redirect] Whether to redirect to the login page.
 */
PocketBase.prototype.logout = function (redirect = true) {
    this.authStore.clear();

    if (redirect) {
        replace("/login");
    }
};

/**
 * Generic API error response handler.
 *
 * @param  {Error}   err        The API error itself.
 * @param  {Boolean} notify     Whether to add a toast notification.
 * @param  {String}  defaultMsg Default toast notification message if the error doesn't have one.
 */
PocketBase.prototype.error = function (err, notify = true, defaultMsg = "") {
    if (!err || !(err instanceof Error) || err.isAbort) {
        return;
    }

    const statusCode = err?.status << 0 || 400;
    const responseData = err?.data || {};
    const msg = responseData.message || err.message || defaultMsg;

    // add toast error notification
    if (notify && msg) {
        addErrorToast(msg);
    }

    // populate form field errors
    if (!CommonHelper.isEmpty(responseData.data)) {
        setErrors(responseData.data);
    }

    // unauthorized
    if (statusCode === 401) {
        this.cancelAllRequests();
        return this.logout();
    }

    // forbidden
    if (statusCode === 403) {
        this.cancelAllRequests();
        return replace("/");
    }
};

// Custom auth store to sync the svelte admin store state with the authorized admin instance.
class AppAuthStore extends LocalAuthStore {
    /**
     * @inheritdoc
     */
    save(token, model) {
        super.save(token, model);

        if (model) {
            setUser(model);
        }
    }

    /**
     * @inheritdoc
     */
    clear() {
        super.clear();

        setUser(null);
    }
}

const pb = new PocketBase(import.meta.env.PB_BACKEND_URL, new AppAuthStore("pcms_user_auth"));

if (pb.authStore.model) {
    setUser(pb.authStore.model);
}

export default pb;
