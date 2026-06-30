"use client";

type AdminErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function AdminError({ reset }: AdminErrorProps) {
  return (
    <section className="admin-dashboard" data-admin-error data-page="admin">
      <div className="admin-error-panel" role="alert">
        <span className="material-symbols-rounded" aria-hidden="true">
          report
        </span>
        <div>
          <h2>Không tải được dashboard</h2>
          <p>Vui lòng thử lại. Chi tiết lỗi đã được giữ ở phía server.</p>
        </div>
        <button className="admin-error-action" onClick={reset} type="button">
          Thử lại
        </button>
      </div>
    </section>
  );
}
