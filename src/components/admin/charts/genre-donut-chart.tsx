import type { AdminDashboardPayload } from "@/lib/admin/dashboard";

type GenreDonutChartProps = {
  data: AdminDashboardPayload["genreDistribution"];
};

export function GenreDonutChart({ data }: GenreDonutChartProps) {
  if (data.length === 0) {
    return (
      <article className="admin-chart-card" data-admin-chart="genres">
        <h3>Phân bổ thể loại</h3>
        <p role="status">Chưa có dữ liệu thể loại.</p>
      </article>
    );
  }

  const slices = data.reduce<Array<(typeof data)[number] & { offset: number }>>((items, item) => {
    const offset = items.reduce((total, slice) => total + slice.percent, 0);
    return [...items, { ...item, offset }];
  }, []);

  return (
    <article className="admin-chart-card" data-admin-chart="genres">
      <div className="admin-chart-heading">
        <h3>Phân bổ thể loại</h3>
        <span>{data.length} nhóm</span>
      </div>
      <div className="admin-donut-layout">
        <svg viewBox="0 0 120 120" role="img" aria-label="Biểu đồ donut phân bổ thể loại">
          <circle className="admin-donut-track" cx="60" cy="60" r="42" pathLength="100" />
          {slices.map((item) => {
            return (
              <circle
                className={`admin-donut-slice is-${item.tone}`}
                cx="60"
                cy="60"
                key={item.genre}
                pathLength="100"
                r="42"
                strokeDasharray={`${item.percent} ${100 - item.percent}`}
                strokeDashoffset={-item.offset}
              />
            );
          })}
        </svg>
        <ul className="admin-chart-list">
          {data.map((item) => (
            <li key={item.genre}>
              <span>{item.genre}</span>
              <strong>{item.percent}%</strong>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
