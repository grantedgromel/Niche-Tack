"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "./database.types";

/* Supabase client for the browser — used by the auth form. */
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
