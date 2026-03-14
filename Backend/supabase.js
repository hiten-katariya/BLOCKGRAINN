const { createClient } = require("@supabase/supabase-js");
require('dotenv').config();

// Initialize Supabase client
// Note: We use the service role key for backend operations that require elevated permissions.
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Missing Supabase credentials! Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);
console.log("✅ Supabase client initialized");

module.exports = { supabase };
