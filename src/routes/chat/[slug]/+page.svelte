<script lang=ts>
	import { goto } from "$app/navigation";


    import type { Chat } from "$lib/server/database";
    import type { Message } from "$lib/server/database";

    type Data = {
		chat: Chat;
        messages: Message[];
	}

    export let data:Data;

    let message = "";

    function loadAdminPanel() {
        goto('../settings/' + data.chat.id);
    }

</script>

<body>
    <header>
        <div class="p-4 text-center flex">
			<h1 class="text-2xl flex-grow font-bold">{data.chat.name}</h1>
            <button on:click={loadAdminPanel} class="flex-grow">☰</button>
		</div>
    </header>
    <div class="messages">
        {#each data.messages as message}
            <div class="chat chat-start mt-3">
                <div class="chat-bubble p-5 bg-gray-400 text-white shadow-md ml-3">
                    <p class="font-semibold mb-1">{message.sender}</p>
                    <p>{message.message}</p>
                </div>
            </div>
        {/each}
    </div>
    <form method="POST" action="?/send" class="flex items-center p-4 mt-16">
        <input
          type="text"
          id="message"
          name="message"
          class="flex-grow px-4 py-2 border rounded-l-lg focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Nachricht eingeben..."
          required/>
        <button 
          name="submit"
          id="submit"
          type="submit"
          class="px-4 py-2 bg-gray-500 text-white rounded-r-lg hover:bg-gray-600 transition duration-300">
          Senden
        </button>
    </form>
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
    .messages {
        text-align: center;
    }
</style>