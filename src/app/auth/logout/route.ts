import { NextResponse } from "next/server";

import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  const url = new URL("/dang-nhap", request.url);
  url.searchParams.set("message", "Đã đăng xuất.");
  return NextResponse.redirect(url, 303);
}
