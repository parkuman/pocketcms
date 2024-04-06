<script>
    export let center = false;

    let classes = "";
    export { classes as class }; // export reserved keyword
</script>

<div class="page-wrapper {classes}" class:center-content={center}>
    <main class="page-content">
        <slot />
    </main>

    <footer class="page-footer">
        <slot name="footer" />

        <!-- TODO:  -->
        <a href="/" target="_blank" rel="noopener noreferrer">
            <i class="ri-book-open-line txt-sm" />
            <span class="txt">TODO</span>
        </a>
        <span class="delimiter">|</span>
        <a href="/" target="_blank" rel="noopener noreferrer" title="Releases">
            <span class="txt">TODO</span>
        </a>
    </footer>
</div>
