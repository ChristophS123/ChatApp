<script lang=ts>
	import { goto } from "$app/navigation";


    import type { Invitation } from "$lib/server/database";
	import { supabase } from "$lib/supabaseClient";

    type Data = {
        invitations: Invitation[];
    }

    export let data:Data;

    function goBack() {
        goto('/');
    }
</script>

<body>
    <header>
		<div class="p-4 text-center">
            <button on:click={goBack}>🡸</button>
			<h1 class="text-2xl font-bold">Einladungen</h1>
		</div>
	</header>
    <div class="bg-gray-400 m-5 rounded-lg shadow-md text-white">
        {#each data.invitations as invitation}
            <div class="mt-5 m-5 rounded-lg p-4 shadow-md">
                {invitation.chatName} <br />
                <div class="flex text-center">
                    <form class="flex-row" method="POST" action="?/accept">
                        <button class="ml-3" type="submit">Akzeptieren</button>
                        <input name="invID" value={invitation.id} class="hidden"/>
                    </form>
                    <form class="flex-row" method="POST" action="?/deny">
                        <button class="ml-3" type="submit">Ablehnen</button>
                        <input name="invID" value={invitation.id} class="hidden"/>
                    </form>
                </div>
            </div>
        {/each}
    </div>
</body>

<style>
    header {
		background-color: #100b1f;
		padding-top: 24px;
		color:white;
		padding-bottom: 24px;
	}

	body {
		text-align: center;
		max-width: 800px;
	}
</style>