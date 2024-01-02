<script>
    import { enhance } from "$app/forms"

    /** @type {import('./$types').ActionData} */
    export let form
    /** @type {import('./$types').PageData} */
    export let data
</script>

<style>
    form {
        position: absolute;
        top: 50vh;
        left: 50vw;
        transform: translate(-50%, -50%);
        width: 100%;
        max-width: 300px;
        padding: 25px;
        box-sizing: border-box;
        border: 1px solid #888;
        border-radius: 15px;
    }

    label {
        display: grid;
        margin: 0 0 10px;
    }

    div.buttons {
        display: flex;
        justify-content: space-between;
    }

    button {
        width: calc(50% - 2.5px);
    }

    div.adminBlock {
        display: flex;
        align-items: center;
        margin: 5px 0 0;
    }

    input {
        border: 1px solid #888;
        border-radius: 5px;
        height: 20px;
        margin: 2.5px 0 0px;
    }

    div.adminBlock {
        margin: 0 0 10px;
    }

    input.adminCheck {
        margin: 0;
    }

    label.adminBlock {
        margin: 0 0 0 10px;
    }

    /* from out */

    button {
        border: none;
        border-radius: 5px;
        padding: 5px 15px;
        width: calc(50% - 5px);
    }
</style>

<form method="POST" use:enhance>
    {#if !form?.success && form}
        <div class="info">{form?.comment}</div>
    {:else if form?.success}
        <div class="info">success</div>
    {/if}
    <label>
        Email
        <input name="email" type="text">
    </label>
    <label>
        Пароль
        <input name="password" type="password">
    </label>
    {#if data.ra }
        <div class="adminBlock">
            <input type="checkbox" class="adminCheck" id="adminCheck" name="adminCheck" value="admin" />
            <label class="adminBlock" for="adminCheck">админ</label>
        </div>
    {/if}
    <div class="buttons">
        <button formaction="?/log">Вход</button>
        <button formaction="?/reg">Регистрация</button>
    </div>
</form>
