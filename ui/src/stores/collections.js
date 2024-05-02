import { writable, get } from "svelte/store";
import { pbAdmin } from "@/utils/Pocketbase";
import CommonHelper from "@/utils/CommonHelper";

export const collections = writable([]);
export const activeCollection = writable({});
export const isCollectionsLoading = writable(false);
export const protectedFilesCollectionsCache = writable({});

let notifyChannel;

if (typeof BroadcastChannel != "undefined") {
    notifyChannel = new BroadcastChannel("collections");

    notifyChannel.onmessage = () => {
        loadCollections(get(activeCollection)?.id);
    };
}

export function changeActiveCollectionById(collectionId) {
    collections.update((list) => {
        const found = CommonHelper.findByKey(list, "id", collectionId);

        if (found) {
            activeCollection.set(found);
        } else if (list.length) {
            activeCollection.set(list[0]);
        }

        return list;
    });
}

// load all collections (excluding the user profile)
export async function loadCollections(activeId = null) {
    isCollectionsLoading.set(true);

    try {
        await pbAdmin.admins.authWithPassword("parker@prowe.ca", "1111111111");
        let items = await pbAdmin.collections.getFullList(200, {
            filter: "name ~ 'pcms_' && name !~ 'pcms__'",
        });

        items = CommonHelper.sortCollections(items);

        collections.set(items);

        const item = activeId && CommonHelper.findByKey(items, "id", activeId);
        if (item) {
            activeCollection.set(item);
        } else if (items.length) {
            activeCollection.set(items[0]);
        }
    } catch (err) {
        Pocketbase.error(err);
    }

    isCollectionsLoading.set(false);
}
