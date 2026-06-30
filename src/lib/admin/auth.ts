import "server-only";

import type { User } from "@supabase/supabase-js";
import { notFound, redirect } from "next/navigation";

import { createServerSupabaseClient } from "@/lib/supabase/server";

const ADMIN_LOGIN_PATH = "/dang-nhap?next=/admin";

export type AdminUser = Pick<User, "id" | "email"> & {
  email: string;
};

export function parseAdminEmailAllowlist(allowlist = process.env.ADMIN_EMAILS) {
  return new Set(
    (allowlist ?? "")
      .split(",")
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean),
  );
}

export function isAdminEmailAllowed(
  email: string | null | undefined,
  allowlist = process.env.ADMIN_EMAILS,
) {
  if (!email) return false;

  return parseAdminEmailAllowlist(allowlist).has(email.trim().toLowerCase());
}

export async function requireAdminUser(): Promise<AdminUser> {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user?.email) {
    redirect(ADMIN_LOGIN_PATH);
  }

  if (!isAdminEmailAllowed(user.email)) {
    notFound();
  }

  return {
    id: user.id,
    email: user.email,
  };
}
