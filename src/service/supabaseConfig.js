import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fwjlbykfncalmgwppwdh.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3amxieWtmbmNhbG1nd3Bwd2RoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5Mzg1MjksImV4cCI6MjA1ODUxNDUyOX0.UwYE0p2fw0wMb_1o-tfR8mBrIw-21bvS5QiHafmXil8";

export const supabase = createClient(supabaseUrl, supabaseKey);
