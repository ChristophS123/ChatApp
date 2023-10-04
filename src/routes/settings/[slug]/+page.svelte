<script lang=ts>

    type Data = {
		chatID: string
	}

    export let data:Data;

    let invMember = "";

    function inviteMember() {
        // inviteMember(invMember, data.chatID)
    }

</script>

<body>
    <header>
		<div class="p-4 text-center">
			<h1 class="text-2xl font-bold">Einladen</h1>
		</div>
	</header>
    <div class="flex items-center p-4 mt-16">
        <input
          type="text"
          class="flex-grow px-4 py-2 border rounded-l-lg focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Email eingeben..."
          bind:value={invMember}/>
        <button
          class="px-4 py-2 bg-gray-500 text-white rounded-r-lg hover:bg-gray-600 transition duration-300"
          on:click={inviteMember}>
          Einladen
        </button>
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