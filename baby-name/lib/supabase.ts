import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export interface Suggestion {
  id: string;
  suggested_by: string;
  name: string;
  note: string;
  created_at: string;
}

export interface Prediction {
  id: string;
  predicted_by: string;
  question: string;
  answer: string;
  created_at: string;
}
