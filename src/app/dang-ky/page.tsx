import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { signUpAction } from "@/app/auth/actions";
import { AuthShell } from "@/components/auth/auth-shell";
import { FormMessage } from "@/components/auth/form-message";
import { SubmitButton } from "@/components/auth/submit-button";
import { getCurrentProfile } from "@/lib/auth/current-user";

type SignUpPageProps = {
  searchParams: Promise<{ error?: string | string[] }>;
};

export const metadata: Metadata = {
  title: "Đăng ký | Ruby Noir",
  description: "Tạo tài khoản đọc truyện Ruby Noir.",
};

export default async function SignUpPage({ searchParams }: SignUpPageProps) {
  const [profile, params] = await Promise.all([getCurrentProfile(), searchParams]);
  if (profile) redirect("/tai-khoan");

  const error = Array.isArray(params.error) ? params.error[0] : params.error;

  return (
    <AuthShell
      eyebrow="Tham gia thư viện"
      title="Tạo tài khoản"
      description="Lưu lại những câu chuyện bạn yêu thích và tiếp tục đọc bất cứ lúc nào."
    >
      <FormMessage error={error} />
      <form className="auth-form" action={signUpAction}>
        <label>
          <span>Tên hiển thị</span>
          <input
            name="displayName"
            type="text"
            autoComplete="name"
            minLength={2}
            maxLength={50}
            required
          />
        </label>
        <label>
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label>
          <span>Mật khẩu</span>
          <input
            name="password"
            type="password"
            autoComplete="new-password"
            minLength={8}
            maxLength={72}
            required
          />
          <small>Ít nhất 8 ký tự.</small>
        </label>
        <label>
          <span>Xác nhận mật khẩu</span>
          <input
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            minLength={8}
            maxLength={72}
            required
          />
        </label>
        <SubmitButton pendingText="Đang tạo tài khoản…">Đăng ký</SubmitButton>
      </form>
      <p className="auth-switch">
        Đã có tài khoản? <Link href="/dang-nhap">Đăng nhập</Link>
      </p>
    </AuthShell>
  );
}
