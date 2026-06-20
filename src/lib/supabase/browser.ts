"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/types/database";

import { getPublicSupabaseEnv } from "./public-env";

let browserClient: SupabaseClient<Database> | undefined;

export function createBrowserSupabaseClient() {
  if (!browserClient) {
    const { url, publishableKey } = getPublicSupabaseEnv();
    browserClient = createBrowserClient<Database>(url, publishableKey);
  }

  return browserClient;
}
