<script>
    /** @type {import('./$types').LayoutData} */
    export let data
</script>


{#if data.userData }
    <a href="/dash">dash</a>
    <a href="/auth/out">out</a>
{:else}
    <a href="/auth">auth</a>
{/if}
