"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import {
  firstValidationError,
  profileSchema,
  signInSchema,
  signUpSchema,
} from "@/lib/auth/validation";
import { createServerSupabaseClient } from "@/lib/supabase/server";

function fieldValue(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value : "";
}

function safeNextPath(value: string) {
  return value.startsWith("/") && !value.startsWith("//") ? value : "/tai-khoan";
}

function redirectWithMessage(
  path: string,
  key: "error" | "message",
  value: string,
): never {
  const params = new URLSearchParams({ [key]: value });
  return redirect(`${path}?${params}`);
}

async function getRequestOrigin() {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "http";
  return host ? `${protocol}://${host}` : "http://127.0.0.1:3000";
}

export async function signUpAction(formData: FormData) {
  const result = signUpSchema.safeParse({
    displayName: fieldValue(formData, "displayName"),
    email: fieldValue(formData, "email"),
    password: fieldValue(formData, "password"),
    confirmPassword: fieldValue(formData, "confirmPassword"),
  });

  if (!result.success) {
    redirectWithMessage("/dang-ky", "error", firstValidationError(result.error));
  }

  const supabase = await createServerSupabaseClient();
  const origin = await getRequestOrigin();
  const { data, error } = await supabase.auth.signUp({
    email: result.data.email,
    password: result.data.password,
    options: {
      data: { display_name: result.data.displayName },
      emailRedirectTo: `${origin}/auth/confirm`,
    },
  });

  if (error) {
    redirectWithMessage(
      "/dang-ky",
      "error",
      error.message.toLowerCase().includes("already")
        ? "Email này đã được đăng ký."
        : "Chưa thể tạo tài khoản. Vui lòng thử lại.",
    );
  }

  if (!data.session) {
    redirectWithMessage(
      "/dang-nhap",
      "message",
      "Hãy kiểm tra email để xác nhận tài khoản trước khi đăng nhập.",
    );
  }

  redirect("/tai-khoan?created=1");
}

export async function signInAction(formData: FormData) {
  const next = safeNextPath(fieldValue(formData, "next"));
  const result = signInSchema.safeParse({
    email: fieldValue(formData, "email"),
    password: fieldValue(formData, "password"),
  });

  if (!result.success) {
    redirectWithMessage("/dang-nhap", "error", firstValidationError(result.error));
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.auth.signInWithPassword(result.data);

  if (error) {
    redirectWithMessage("/dang-nhap", "error", "Email hoặc mật khẩu không đúng.");
  }

  redirect(next);
}

export async function signOutAction() {
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  redirectWithMessage("/dang-nhap", "message", "Đã đăng xuất.");
}

export async function updateProfileAction(formData: FormData) {
  const result = profileSchema.safeParse({
    displayName: fieldValue(formData, "displayName"),
    username: fieldValue(formData, "username"),
    bio: fieldValue(formData, "bio"),
  });

  if (!result.success) {
    redirectWithMessage("/tai-khoan", "error", firstValidationError(result.error));
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/dang-nhap?next=/tai-khoan");

  const { error } = await supabase
    .from("profiles")
    .update({
      display_name: result.data.displayName,
      username: result.data.username || null,
      bio: result.data.bio || null,
    })
    .eq("id", user.id);

  if (error) {
    redirectWithMessage(
      "/tai-khoan",
      "error",
      error.code === "23505"
        ? "Tên người dùng này đã được sử dụng."
        : "Chưa thể lưu hồ sơ. Vui lòng thử lại.",
    );
  }

  redirect("/tai-khoan?saved=1");
}
