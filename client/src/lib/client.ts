import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!; //Wont be null
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY!; //Wont be null

export const supabase = createClient(supabaseUrl, supabaseKey);
