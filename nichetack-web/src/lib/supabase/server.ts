import "server-only";

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import type { Database } from "./database.types";

/* Supabase client for Server Components, Server Actions, and Route Handlers.
   Bound to the request's cookies (Next 16: `cookies()` is async). */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            for (const { name, value, options } of cookiesToSet) {
              cookieStore.set(name, value, options);
            }
          } catch {
            // Called while rendering a Server Component, where cookies are
            // read-only. Safe to ignore — proxy.ts refreshes the session.
          }
        },
      },
    },
  );
}
