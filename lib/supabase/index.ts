import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

const supabaseUrl = "https://cfjlbxxettubimizshhi.supabase.co";
const supabaeAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmamxieHhldHR1YmltaXpzaGhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYxNjY5NTksImV4cCI6MjA1MTc0Mjk1OX0.Gt3L5Z3HPb1P3eKhePFCSV5ubZfe3_BbusDTbRUceQM";
export const supabase = createClient<Database>(supabaseUrl, supabaeAnonKey);
