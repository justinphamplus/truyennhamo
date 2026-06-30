import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { signOutAction, updateProfileAction } from "@/app/auth/actions";
import { AuthShell } from "@/components/auth/auth-shell";
import { FormMessage } from "@/components/auth/form-message";
import { SubmitButton } from "@/components/auth/submit-button";
import { getCurrentProfile } from "@/lib/auth/current-user";

type AccountPageProps = {
  searchParams: Promise<{
    error?: string | string[];
    created?: string | string[];
    saved?: string | string[];
  }>;
};

export const metadata: Metadata = {
  title: "Tài khoản | Ruby Noir",
  description: "Quản lý hồ sơ đọc truyện Ruby Noir.",
};

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function AccountPage({ searchParams }: AccountPageProps) {
  const [profile, params] = await Promise.all([getCurrentProfile(), searchParams]);
  if (!profile) redirect("/dang-nhap?next=/tai-khoan");

  const message = firstValue(params.created)
    ? "Tài khoản đã được tạo. Chào mừng bạn đến Ruby Noir!"
    : firstValue(params.saved)
      ? "Hồ sơ đã được cập nhật."
      : undefined;

  return (
    <AuthShell
      eyebrow="Hồ sơ độc giả"
      title={profile.displayName}
      description={profile.email}
      asideTitle="Không gian của riêng bạn"
      asideText="Thông tin hồ sơ này sẽ được dùng cho thư viện, bình luận và các hoạt động cộng đồng."
    >
      <FormMessage error={firstValue(params.error)} message={message} />
      <form className="auth-form" action={updateProfileAction}>
        <label>
          <span>Tên hiển thị</span>
          <input
            name="displayName"
            type="text"
            autoComplete="name"
            minLength={2}
            maxLength={50}
            defaultValue={profile.displayName}
            required
          />
        </label>
        <label>
          <span>Tên người dùng</span>
          <input
            name="username"
            type="text"
            autoComplete="username"
            minLength={3}
            maxLength={32}
            pattern="[a-z0-9_]+"
            defaultValue={profile.username ?? ""}
            placeholder="doc_gia_ruby"
          />
          <small>Chữ thường, số và dấu gạch dưới; có thể để trống.</small>
        </label>
        <label>
          <span>Giới thiệu</span>
          <textarea
            name="bio"
            rows={4}
            maxLength={500}
            defaultValue={profile.bio ?? ""}
            placeholder="Một chút về gu truyện của bạn…"
          />
        </label>
        <SubmitButton pendingText="Đang lưu…">Lưu hồ sơ</SubmitButton>
      </form>
      <form className="account-signout" action={signOutAction}>
        <button className="button ghost" type="submit">
          Đăng xuất
        </button>
      </form>
    </AuthShell>
  );
}
