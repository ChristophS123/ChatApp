import { supabase } from "$lib/supabaseClient";
import { redirect } from "@sveltejs/kit";

export async function load() { 
    await supabase.auth.signOut();
    throw redirect(307, "/signin")
}