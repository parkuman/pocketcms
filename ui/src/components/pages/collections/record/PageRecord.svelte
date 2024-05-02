<script>
    import { querystring } from "svelte-spa-router";
    import { addErrorToast } from "@/stores/toasts";
    import {
        loadCollections,
        activeCollection,
        isCollectionsLoading,
        collections,
    } from "@/stores/collections";
    import Pocketbase from "@/utils/Pocketbase";
    import OverlayPanel from "@/components/base/OverlayPanel.svelte";
    import CopyIcon from "@/components/base/CopyIcon.svelte";
    import FormattedDate from "@/components/base/FormattedDate.svelte";
    import RecordFieldValue from "@/components/records/RecordFieldValue.svelte";
    import PageWrapper from "@/components/base/PageWrapper.svelte";
    import CollectionsSidebar from "@/components/collections/CollectionsSidebar.svelte";
    import RefreshButton from "@/components/base/RefreshButton.svelte";

    export let params;

    let collectionName = params.collection || null;
    const initialQueryParams = new URLSearchParams($querystring);

    loadCollections(collectionName);

    let record = {};
    let isLoading = false;

    $: if ($activeCollection?.id) {
        loadRecord(initialQueryParams.get("recordId"));
    }

    $: hasEditorField = !!$activeCollection?.schema?.find((f) => f.type === "editor");

    async function loadRecord(model) {
        record = {}; // reset

        isLoading = true;

        record = (await resolveModel(model)) || {};

        isLoading = false;
    }

    async function resolveModel(model) {
        if (model && typeof model === "string") {
            // load from id
            try {
                return await Pocketbase.collection($activeCollection.id).getOne(model);
            } catch (err) {
                if (!err.isAbort) {
                    console.warn("resolveModel:", err);
                    addErrorToast(`Unable to load record with id "${model}"`);
                }
            }

            return null;
        }

        return model;
    }
</script>

{#if !$activeCollection && $isCollectionsLoading && !$collections.length}
    <PageWrapper center>
        <div class="placeholder-section m-b-base">
            <span class="loader loader-lg" />
            <h1>Loading collections...</h1>
        </div>
    </PageWrapper>
{:else if !$collections.length}
    <PageWrapper center>
        <p>no collections</p>
    </PageWrapper>
{:else}
    <CollectionsSidebar />

    <PageWrapper class="flex-content">
        <header class="page-header">
            <nav class="breadcrumbs">
                <div class="breadcrumb-item">Collections</div>
                <div class="breadcrumb-item">
                    <a href="#/collections?collectionId={$activeCollection.id}">
                        {$activeCollection.name.replace("pcms_", "")}
                    </a>
                </div>
                <div class="breadcrumb-item">{record.slug}</div>
            </nav>
        </header>
        <svelte:fragment slot="header">
            <h4><strong>{$activeCollection?.name}</strong> record preview</h4>
        </svelte:fragment>

        <table class="table-border preview-table" class:table-loading={isLoading}>
            <tbody>
                <tr>
                    <td class="min-width txt-hint txt-bold">id</td>
                    <td class="col-field">
                        <div class="label">
                            <CopyIcon value={record.id} />
                            <span class="txt">{record.id || "..."}</span>
                        </div>
                    </td>
                </tr>

                {#each $activeCollection?.schema as field}
                    <tr>
                        <td class="min-width txt-hint txt-bold">{field.name}</td>
                        <td class="col-field">
                            <RecordFieldValue {field} {record} />
                        </td>
                    </tr>
                {/each}

                {#if record.created}
                    <tr>
                        <td class="min-width txt-hint txt-bold">created</td>
                        <td class="col-field"><FormattedDate date={record.created} /></td>
                    </tr>
                {/if}

                {#if record.updated}
                    <tr>
                        <td class="min-width txt-hint txt-bold">updated</td>
                        <td class="col-field"><FormattedDate date={record.updated} /></td>
                    </tr>
                {/if}
            </tbody>
        </table>
    </PageWrapper>
{/if}

<style>
    .col-field {
        max-width: 1px;
    }
</style>
