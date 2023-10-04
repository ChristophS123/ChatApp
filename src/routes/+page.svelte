<script lang=ts>
	import { goto } from "$app/navigation";
	import type { Chat } from "$lib/server/database";

	type Data = {
		chats: Chat[]
	}

	export let data: Data = {chats: []};

	function onAddButtonClick() {
		goto(`/add-chat`) ;
	}

</script>

<body>
	<header>
		<div class="p-4 text-center">
			<h1 class="text-2xl font-bold">Chat App</h1>
		</div>
	</header>
	
	<ul>
		{#each data.chats as chat}
			<div class="bg-white p-6 bg-gray-900 bg-opacity-75 rounded-lg shadow-md mt-4 mr-8 ml-8 pt-8 pb-8">
				{chat.name}
			</div>
		{/each}
	</ul>

	<div class="add-area">
		<button class="bg-indigo-900  hover:bg-gray-800 text-white rounded-full p-4 shadow-md" on:click={onAddButtonClick}>
			<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
			</svg>
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

	.add-area {
		text-align: right;
		margin-top: 32px;
		margin-right: 16px;
	}

</style>


