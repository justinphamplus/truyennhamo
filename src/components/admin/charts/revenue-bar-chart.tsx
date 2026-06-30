import type { AdminDashboardPayload } from "@/lib/admin/dashboard";

type RevenueBarChartProps = {
  data: AdminDashboardPayload["revenueByDay"];
};

export function RevenueBarChart({ data }: RevenueBarChartProps) {
  if (data.length === 0) {
    return (
      <article className="admin-chart-card" data-admin-chart="revenue">
        <h3>Doanh thu 7 ngày</h3>
        <p role="status">Chưa có dữ liệu doanh thu.</p>
      </article>
    );
  }

  const max = Math.max(...data.map((item) => item.revenueVnd), 1);
  const isDeferred = data.every((item) => item.revenueVnd === 0);

  return (
    <article className="admin-chart-card" data-admin-chart="revenue">
      <div className="admin-chart-heading">
        <h3>Doanh thu 7 ngày</h3>
        <span>{isDeferred ? "Deferred" : "VND"}</span>
      </div>
      <svg viewBox="0 0 320 160" role="img" aria-label="Biểu đồ cột doanh thu 7 ngày">
        {data.map((item, index) => {
          const height = Math.max((item.revenueVnd / max) * 110, 4);
          return (
            <rect
              className="admin-chart-bar"
              height={height}
              key={item.date}
              width="24"
              x={22 + index * 42}
              y={130 - height}
            />
          );
        })}
      </svg>
      <p>{isDeferred ? "Deferred tới payment ledger." : "Doanh thu đã được ghi nhận theo ngày."}</p>
    </article>
  );
}
