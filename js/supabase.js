const SUPABASE_URL = "https://orcrkvxivvpyvkxfysst.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_F0OAR17FarSR0H0GTfD02A_lWDgeGaS";

const { createClient } = supabase;

const cfaSupabase = createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);
