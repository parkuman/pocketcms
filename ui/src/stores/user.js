import { writable } from "svelte/store";

// user that is logged in
export const user = writable({});

export function setUser(model) {
    user.set(model || {});
}
