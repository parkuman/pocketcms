<script>
    import { querystring, push } from "svelte-spa-router";
    import {
        collections,
        activeCollection,
        isCollectionsLoading,
        loadCollections,
        changeActiveCollectionById,
    } from "@/stores/collections";
    import CommonHelper from "@/utils/CommonHelper";
    import { pageTitle } from "@/stores/app";
    import PageWrapper from "@/components/base/PageWrapper.svelte";
    import CollectionsSidebar from "@/components/collections/CollectionsSidebar.svelte";
    import RecordsList from "@/components/records/RecordsList.svelte";
    import RecordsCount from "@/components/records/RecordsCount.svelte";
    import RefreshButton from "@/components/base/RefreshButton.svelte";
    import Searchbar from "@/components/base/Searchbar.svelte";

    const initialQueryParams = new URLSearchParams($querystring);

    let recordUpsertPanel;
    let recordPreviewPanel;
    let recordsList;
    let recordsCount;
    let filter = initialQueryParams.get("filter") || "";
    let sort = initialQueryParams.get("sort") || "-created";
    let selectedCollectionId = initialQueryParams.get("collectionId") || $activeCollection?.id;
    let totalCount = 0; // used to manully change the count without the need of reloading the recordsCount component

    loadCollections(selectedCollectionId);

    $: reactiveParams = new URLSearchParams($querystring);

    $: if (
        !$isCollectionsLoading &&
        reactiveParams.get("collectionId") &&
        reactiveParams.get("collectionId") != selectedCollectionId
    ) {
        changeActiveCollectionById(reactiveParams.get("collectionId"));
    }

    // reset filter and sort on collection change
    $: if ($activeCollection?.id && selectedCollectionId != $activeCollection.id) {
        reset();
    }

    $: if ($activeCollection?.id) {
        normalizeSort();
    }

    // keep the url params in sync
    $: if (!$isCollectionsLoading && (sort || filter || $activeCollection?.id)) {
        updateQueryParams();
    }

    $: $pageTitle = $activeCollection?.name || "Collections";

    function reset() {
        selectedCollectionId = $activeCollection?.id;
        filter = "";
        sort = "-created";

        updateQueryParams({ recordId: null });

        normalizeSort();
    }

    // ensures that the sort fields exist in the collection
    async function normalizeSort() {
        if (!sort) {
            return; // nothing to normalize
        }

        const collectionFields = CommonHelper.getAllCollectionIdentifiers($activeCollection);

        const sortFields = sort.split(",").map((f) => {
            if (f.startsWith("+") || f.startsWith("-")) {
                return f.substring(1);
            }
            return f;
        });

        // invalid sort expression or missing sort field
        if (sortFields.filter((f) => collectionFields.includes(f)).length != sortFields.length) {
            if (collectionFields.includes("created")) {
                sort = "-created";
            } else {
                sort = "";
            }
        }
    }

    function updateQueryParams(extra = {}) {
        const queryParams = Object.assign(
            {
                collectionId: $activeCollection?.id || "",
                filter: filter,
                sort: sort,
            },
            extra,
        );

        CommonHelper.replaceHashQueryParams(queryParams);
    }
</script>

{#if $isCollectionsLoading && !$collections.length}
    <PageWrapper center>
        <div class="placeholder-section m-b-base">
            <span class="loader loader-lg" />
            <h1>Loading collections...</h1>
        </div>
    </PageWrapper>
{:else if !$collections.length}
    <PageWrapper center class="center-content">
        <div class="content txt-hint">
            <i class="ri-folder-open-line txt-disabled" />
            <p>No Collections</p>
        </div>
    </PageWrapper>
{:else}
    <CollectionsSidebar />

    <PageWrapper class="flex-content">
        <header class="page-header">
            <nav class="breadcrumbs">
                <div class="breadcrumb-item">Collections</div>
                <div class="breadcrumb-item">{CommonHelper.replacePcmsPrefix($activeCollection.name)}</div>
            </nav>

            <div class="inline-flex gap-5">
                <RefreshButton
                    on:refresh={() => {
                        recordsList?.load();
                        recordsCount?.reload();
                    }}
                />
            </div>

            <div class="btns-group">
                {#if $activeCollection.type !== "view" && $activeCollection.createRule !== null}
                    <button
                        type="button"
                        class="btn btn-expanded"
                        on:click={() => push(`#/collections/${$activeCollection.id}`)}
                    >
                        <i class="ri-add-line" />
                        <span class="txt">New record</span>
                    </button>
                {/if}
            </div>
        </header>

        <Searchbar
            value={filter}
            autocompleteCollection={$activeCollection}
            on:submit={(e) => (filter = e.detail)}
        />

        <div class="clearfix m-b-sm" />

        <RecordsList
            bind:this={recordsList}
            collection={$activeCollection}
            bind:filter
            bind:sort
            on:select={(e) => {
                updateQueryParams({
                    recordId: e.detail.id,
                });

                let showModel = e.detail._partial ? e.detail.id : e.detail;

                $activeCollection.type === "view"
                    ? recordPreviewPanel?.show(showModel)
                    : recordUpsertPanel?.show(showModel);
            }}
            on:delete={() => {
                recordsCount?.reload();
            }}
            on:new={() => recordUpsertPanel?.show()}
        />

        <svelte:fragment slot="footer">
            <RecordsCount
                bind:this={recordsCount}
                class="m-r-auto txt-sm txt-hint"
                collection={$activeCollection}
                {filter}
                bind:totalCount
            />
        </svelte:fragment>
    </PageWrapper>
{/if}
