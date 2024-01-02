<script>
    import { enhance } from "$app/forms"

    /** @type {import('./$types').LayoutData} */
    export let data

    console.log(data.userData)
</script>

<a href="/">root</a>
<a href="/dash">dash</a>
<a href="/dash/my/settings">settings</a>
<br>

<div>/dash/my</div>

email: {data.userData?.email}
{#if data.userData?.admin }
    admin: true
{/if}
