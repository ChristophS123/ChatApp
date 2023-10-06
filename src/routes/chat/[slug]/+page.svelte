<script lang=ts>
	import { enhance } from "$app/forms";
	import { goto } from "$app/navigation";


    import type { Chat } from "$lib/server/database";
    import type { Message } from "$lib/server/database";
	import { supabase } from "$lib/supabaseClient";
	import { afterUpdate } from "svelte";

    type Data = {
		chat: Chat;
        messages: Message[];
        username: string;
	}

    export let data:Data;

    let messages:Message[] = data.messages;

    let chatContainer:HTMLDivElement;

    let message = "";

    afterUpdate(() => {
        if(messages) scrollToBottom(chatContainer);
    });

    const scrollToBottom = async (node:HTMLDivElement) => {
        node.scroll({top: node.scrollHeight, behavior: 'smooth'});
    }

    function loadAdminPanel() {
        goto('../settings/' + data.chat.id);
    }

    const channel = supabase
    .channel('schema-db-changes')
    .on(
        'postgres_changes',
        {
        event: 'INSERT',
        schema: 'public',
        },
        (payload:any) => {
            if(payload.new.chatID == data.chat.id) {
                messages = [...messages, payload.new];
            }
                
        }
    )
    .subscribe()

    function goBack() {
        goto('/');
    }

</script>

<body class="mx-auto">
    <header>
        <div class="p-4 text-center flex">
            <button on:click={goBack}>←</button>
			<h1 class="text-2xl flex-grow font-bold">{data.chat.name}</h1>
            <button on:click={loadAdminPanel} class="flex-grow">☰</button>
		</div>
    </header>
    <div class="messages" id="messages" bind:this={chatContainer}>
        {#each messages as message}
            {#if data.username == message.sender}
                <div class="chat chat-end mt-3">
                    <div class="chat-bubble p-5 bg-blue-200 text-white shadow-md ml-3">
                        <p class="font-semibold mb-1">{message.sender}</p>
                        <p>{message.message}</p>
                    </div>
                </div>
            {/if}
            {#if data.username != message.sender}
                <div class="chat chat-start mt-3">
                    <div class="chat-bubble p-5 bg-gray-400 text-white shadow-md ml-3">
                        <p class="font-semibold mb-1">{message.sender}</p>
                        <p>{message.message}</p>
                    </div>
                </div>
            {/if}
        {/each}
    </div>
    <form method="POST" action="?/send" class="bg-gray-200 flex items-center p-4 mt-1" use:enhance>
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
		max-width: 800px;
	}
    header {
        background-color: #100b1f;
		padding-top: 24px;
		color:white;
		padding-bottom: 24px;
        scroll-behavior: smooth;
    }
    .messages {
        text-align: center;
        overflow: scroll;
        padding-bottom: 8px;
        height: 450px;
        text-align:justify;
    }
</style>