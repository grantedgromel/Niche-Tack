/* Supabase schema types.

   Interim hand-written version that mirrors supabase/migrations/0001_init_items.sql.
   Once the Supabase project exists, regenerate the real file with:

     npm run db:types

   (that needs network access to the project; it is not reachable from the
   build sandbox, so this stand-in keeps the build typechecking until then.) */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

type ItemKind = "product" | "article" | "video" | "screenshot" | "recipe";
type ItemState = "wishlist" | "active" | "purchased" | "archived";

export type Database = {
  public: {
    Tables: {
      items: {
        Row: {
          id: string;
          user_id: string;
          kind: ItemKind;
          title: string;
          source: string;
          price: number | null;
          state: ItemState;
          ar: string;
          seed: string;
          tags: string[];
          price_history: number[];
          read_time: number | null;
          note: string;
          created_at: string;
          updated_at: string;
        };
        // Columns with a default or that are nullable are optional on insert.
        Insert: {
          id?: string;
          user_id: string;
          kind: ItemKind;
          title: string;
          source?: string;
          price?: number | null;
          state?: ItemState;
          ar?: string;
          seed: string;
          tags?: string[];
          price_history?: number[];
          read_time?: number | null;
          note?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          kind?: ItemKind;
          title?: string;
          source?: string;
          price?: number | null;
          state?: ItemState;
          ar?: string;
          seed?: string;
          tags?: string[];
          price_history?: number[];
          read_time?: number | null;
          note?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      item_kind: ItemKind;
      item_state: ItemState;
    };
    CompositeTypes: Record<string, never>;
  };
};
