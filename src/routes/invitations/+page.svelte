<script lang=ts>

    import type { Invitation } from "$lib/server/database";

    type Data = {
        invitations: Invitation[];
    }

    export let data:Data;

    function acceptInvitation(invID:string) {

    }

    function denyInvitation(invID:string) {

    }

</script>

<body>
    <header>
		<div class="p-4 text-center">
			<h1 class="text-2xl font-bold">Einladungen</h1>
		</div>
	</header>
    <div class="bg-gray-400 m-5 rounded-lg shadow-md text-white">
        {#each data.invitations as invitation}
            <div class="mt-5 m-5 rounded-lg p-4 shadow-md">
                {invitation.chat} <br />
                <button class="mr-3" on:click={acceptInvitation(invitation.id)}>Akzeptieren</button>
                <button class="ml-3" on:click={denyInvitation(invitation.id)}>Ablehnen</button>
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
	}
</style>