<script>
    import { createEventDispatcher } from "svelte";
    import Pocketbase from "@/utils/Pocketbase";
    import Field from "@/components/base/Field.svelte";

    const dispatch = createEventDispatcher();

    let email = "";
    let name = "";
    let password = "";
    let passwordConfirm = "";
    let isLoading = false;
    let installerStage = "";

    getInstallerStage();

    function getInstallerStage() {
        const realQueryParams = new URLSearchParams(window.location.search);
        installerStage = realQueryParams.get("installer");
    }

    async function submit() {
        if (isLoading) {
            return;
        }

        isLoading = true;

        try {
            await Pocketbase.collection("pcms__users").create({
                email,
                name,
                password,
                passwordConfirm,
                emailVisibility: true,
            });

            await Pocketbase.collection("pcms__users").authWithPassword(email, password);

            dispatch("submit");
        } catch (err) {
            Pocketbase.error(err);
        }

        isLoading = false;
    }
</script>

{#if installerStage === "pb"}
    <div class="content txt-center m-b-base">
        <h4>Looks like you haven't signed into PocketBase yet.</h4>
        <p>Please visit PocketBase first, then return here to set up PocketCMS!</p>
    </div>
    <div class="content txt-center m-b-base">
        <a href="/_/">
            <button class="btn">
                <span class="txt">Setup PocketBase</span>
            </button>
        </a>
    </div>
{:else}
    <form class="block" autocomplete="off" on:submit|preventDefault={submit}>
        <div class="content txt-center m-b-base">
            <h4>Create your first CMS user account in order to continue</h4>
        </div>

        <Field class="form-field required" name="email" let:uniqueId>
            <label for={uniqueId}>Email</label>
            <!-- svelte-ignore a11y-autofocus -->
            <input type="email" autocomplete="off" id={uniqueId} bind:value={email} required autofocus />
        </Field>

        <Field class="form-field required" name="name" let:uniqueId>
            <label for={uniqueId}>Name</label>
            <input type="text" autocomplete="off" id={uniqueId} bind:value={name} required />
        </Field>

        <Field class="form-field required" name="password" let:uniqueId>
            <label for={uniqueId}>Password</label>
            <input
                type="password"
                autocomplete="new-password"
                minlength="8"
                id={uniqueId}
                bind:value={password}
                required
            />
            <div class="help-block">Minimum 8 characters.</div>
        </Field>

        <Field class="form-field required" name="passwordConfirm" let:uniqueId>
            <label for={uniqueId}>Password confirm</label>
            <input type="password" minlength="10" id={uniqueId} bind:value={passwordConfirm} required />
        </Field>

        <button
            type="submit"
            class="btn btn-lg btn-block btn-next"
            class:btn-disabled={isLoading}
            class:btn-loading={isLoading}
        >
            <span class="txt">Create and login</span>
            <i class="ri-arrow-right-line" />
        </button>
    </form>
{/if}
