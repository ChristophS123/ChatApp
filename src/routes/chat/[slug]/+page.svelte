<script lang=ts>

    import type { Chat } from "$lib/server/database";

    type Data = {
		chat: Chat;
	}

    export let data:Data;

</script>

<body>
    <header>
        <div class="p-4 text-center">
			<h1 class="text-2xl font-bold">{data.chat.name}</h1>
		</div>
    </header>
    {#each data.chat as chat}
        
    {/each}
</body>

<style>
    body {
        text-align: center;
    }

    header {
        background-color: #100b1f;
		padding-top: 24px;
		color:white;
		padding-bottom: 24px;
    }
</style>