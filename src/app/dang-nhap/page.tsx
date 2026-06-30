import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { signInAction } from "@/app/auth/actions";
import { AuthShell } from "@/components/auth/auth-shell";
import { FormMessage } from "@/components/auth/form-message";
import { SubmitButton } from "@/components/auth/submit-button";
import { getCurrentProfile } from "@/lib/auth/current-user";

type SignInPageProps = {
  searchParams: Promise<{
    error?: string | string[];
    message?: string | string[];
    next?: string | string[];
  }>;
};

export const metadata: Metadata = {
  title: "Đăng nhập | Ruby Noir",
  description: "Đăng nhập tài khoản đọc truyện Ruby Noir.",
};

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const [profile, params] = await Promise.all([getCurrentProfile(), searchParams]);
  if (profile) redirect("/tai-khoan");

  return (
    <AuthShell
      eyebrow="Chào mừng trở lại"
      title="Đăng nhập"
      description="Tiếp tục hành trình đọc truyện và quản lý thư viện cá nhân."
    >
      <FormMessage error={firstValue(params.error)} message={firstValue(params.message)} />
      <form className="auth-form" action={signInAction}>
        <input name="next" type="hidden" value={firstValue(params.next) ?? "/tai-khoan"} />
        <label>
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label>
          <span>Mật khẩu</span>
          <input name="password" type="password" autoComplete="current-password" required />
        </label>
        <SubmitButton pendingText="Đang đăng nhập…">Đăng nhập</SubmitButton>
      </form>
      <p className="auth-switch">
        Chưa có tài khoản? <Link href="/dang-ky">Đăng ký ngay</Link>
      </p>
    </AuthShell>
  );
}
