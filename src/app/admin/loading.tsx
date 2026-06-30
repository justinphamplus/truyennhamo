const metricSkeletons = Array.from({ length: 5 }, (_, index) => index);
const chartSkeletons = Array.from({ length: 3 }, (_, index) => index);

export default function AdminLoading() {
  return (
    <section
      aria-busy="true"
      aria-label="Đang tải dashboard quản trị"
      className="admin-dashboard"
      data-admin-loading
      data-page="admin"
    >
      <div className="admin-content-header">
        <div>
          <span>Đang tải</span>
          <h2>Đang chuẩn bị dữ liệu dashboard</h2>
        </div>
        <p>Hệ thống đang lấy số liệu mới nhất từ Supabase.</p>
      </div>

      <div className="admin-metric-grid" aria-hidden="true">
        {metricSkeletons.map((item) => (
          <div className="admin-metric-card admin-skeleton-card" key={item}>
            <span className="admin-skeleton admin-skeleton-icon" />
            <span className="admin-skeleton admin-skeleton-line is-short" />
            <span className="admin-skeleton admin-skeleton-value" />
            <span className="admin-skeleton admin-skeleton-line" />
          </div>
        ))}
      </div>

      <div className="admin-chart-grid" aria-hidden="true">
        {chartSkeletons.map((item) => (
          <div className="admin-chart-card admin-skeleton-panel" key={item}>
            <span className="admin-skeleton admin-skeleton-line is-short" />
            <span className="admin-skeleton admin-skeleton-block" />
          </div>
        ))}
      </div>

      <div className="admin-list-grid" aria-hidden="true">
        <div className="admin-data-panel admin-skeleton-panel">
          <span className="admin-skeleton admin-skeleton-line is-short" />
          <span className="admin-skeleton admin-skeleton-block" />
        </div>
        <div className="admin-data-panel admin-skeleton-panel">
          <span className="admin-skeleton admin-skeleton-line is-short" />
          <span className="admin-skeleton admin-skeleton-block" />
        </div>
      </div>
    </section>
  );
}
