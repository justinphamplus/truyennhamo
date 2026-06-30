import { GenreDonutChart } from "@/components/admin/charts/genre-donut-chart";
import { ReadsLineChart } from "@/components/admin/charts/reads-line-chart";
import { RevenueBarChart } from "@/components/admin/charts/revenue-bar-chart";
import { MetricCard } from "@/components/admin/metric-card";
import { RecentStoriesTable } from "@/components/admin/dashboard/recent-stories-table";
import { TopStoriesList } from "@/components/admin/dashboard/top-stories-list";
import { UserActivityFeed } from "@/components/admin/dashboard/user-activity-feed";
import type { AdminDashboardPayload } from "@/lib/admin/dashboard";

type AdminDashboardProps = {
  payload: AdminDashboardPayload;
};

const metricCards: Array<{
  icon: string;
  key: keyof AdminDashboardPayload["metrics"];
}> = [
  { key: "totalStories", icon: "auto_stories" },
  { key: "totalUsers", icon: "group" },
  { key: "totalReads", icon: "visibility" },
  { key: "revenueVnd", icon: "payments" },
  { key: "transactions", icon: "receipt_long" },
];

export function AdminDashboard({ payload }: AdminDashboardProps) {
  return (
    <section className="admin-dashboard" data-page="admin">
      <div className="admin-content-header">
        <div>
          <span>Tổng quan</span>
          <h2>Thống kê tổng quan hệ thống</h2>
        </div>
        <p>Dữ liệu dashboard đang đọc từ Supabase; doanh thu và giao dịch sẽ nối ở phase payment.</p>
      </div>

      <div className="admin-metric-grid" aria-label={`Chỉ số ${payload.dateRange.label}`}>
        {metricCards.map(({ key, icon }) => (
          <MetricCard icon={icon} key={key} metric={payload.metrics[key]} />
        ))}
      </div>

      <div className="admin-chart-grid">
        <ReadsLineChart data={payload.readsByDay} />
        <GenreDonutChart data={payload.genreDistribution} />
        <RevenueBarChart data={payload.revenueByDay} />
      </div>

      <div className="admin-list-grid">
        <TopStoriesList stories={payload.topStories} />
        <UserActivityFeed activities={payload.userActivity} />
      </div>

      <RecentStoriesTable stories={payload.recentStories} />
    </section>
  );
}
