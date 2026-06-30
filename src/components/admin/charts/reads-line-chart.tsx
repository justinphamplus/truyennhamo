import type { AdminDashboardPayload } from "@/lib/admin/dashboard";

type ReadsLineChartProps = {
  data: AdminDashboardPayload["readsByDay"];
};

function formatNumber(value: number) {
  return value.toLocaleString("vi-VN");
}

export function ReadsLineChart({ data }: ReadsLineChartProps) {
  if (data.length === 0) {
    return (
      <article className="admin-chart-card" data-admin-chart="reads">
        <h3>Lượt đọc 7 ngày</h3>
        <p role="status">Chưa có dữ liệu lượt đọc.</p>
      </article>
    );
  }

  const reads = data.map((item) => item.reads);
  const max = Math.max(...reads);
  const min = Math.min(...reads);
  const spread = Math.max(max - min, 1);
  const points = data
    .map((item, index) => {
      const x = 20 + (index * 280) / Math.max(data.length - 1, 1);
      const y = 130 - ((item.reads - min) / spread) * 100;
      return `${x},${y}`;
    })
    .join(" ");
  const peak = data.reduce((best, item) => (item.reads > best.reads ? item : best), data[0]);

  return (
    <article className="admin-chart-card" data-admin-chart="reads">
      <div className="admin-chart-heading">
        <h3>Lượt đọc 7 ngày</h3>
        <span>{formatNumber(max)} cao nhất</span>
      </div>
      <svg viewBox="0 0 320 160" role="img" aria-label={`Đỉnh ${formatNumber(peak.reads)} lượt đọc vào ${peak.label}`}>
        <polyline className="admin-chart-line" points={points} fill="none" />
        {data.map((item, index) => {
          const x = 20 + (index * 280) / Math.max(data.length - 1, 1);
          const y = 130 - ((item.reads - min) / spread) * 100;
          return <circle className="admin-chart-point" cx={x} cy={y} key={item.date} r="3.5" />;
        })}
      </svg>
      <p>Đỉnh {formatNumber(peak.reads)} lượt đọc vào {peak.label}.</p>
    </article>
  );
}
