import Link from "next/link";

type AuthShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
  asideTitle?: string;
  asideText?: string;
};

export function AuthShell({
  eyebrow,
  title,
  description,
  children,
  asideTitle = "Một tài khoản, trọn hành trình đọc",
  asideText = "Theo dõi truyện yêu thích, lưu tiến độ đọc và quản lý hồ sơ của bạn.",
}: AuthShellProps) {
  return (
    <div className="account-page">
      <header className="account-header">
        <Link className="brand" href="/" aria-label="Ruby Noir trang chủ" prefetch={false}>
          <span className="brand-mark" aria-hidden="true">
            <span />
            <span />
          </span>
          <span className="brand-copy">
            <strong>Ruby Noir</strong>
            <small>Romance</small>
          </span>
        </Link>
        <Link className="account-back-link" href="/" prefetch={false}>
          ← Về trang chủ
        </Link>
      </header>

      <main className="account-main">
        <aside className="account-aside" aria-label="Giới thiệu tài khoản">
          <span className="section-kicker">Ruby Noir Member</span>
          <h2>{asideTitle}</h2>
          <p>{asideText}</p>
          <ul>
            <li>Lưu truyện và tiếp tục đọc trên nhiều thiết bị</li>
            <li>Quản lý tên hiển thị và hồ sơ cá nhân</li>
            <li>Sẵn sàng cho tính năng bình luận và mở khóa VIP</li>
          </ul>
        </aside>

        <section className="account-card" aria-labelledby="account-title">
          <span className="section-kicker">{eyebrow}</span>
          <h1 id="account-title">{title}</h1>
          <p className="account-description">{description}</p>
          {children}
        </section>
      </main>
    </div>
  );
}
