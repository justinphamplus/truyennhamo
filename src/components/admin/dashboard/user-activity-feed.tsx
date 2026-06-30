import type { AdminDashboardPayload } from "@/lib/admin/dashboard";

type UserActivityFeedProps = {
  activities: AdminDashboardPayload["userActivity"];
};

const kindLabels: Record<AdminDashboardPayload["userActivity"][number]["kind"], string> = {
  comment: "Bình luận",
  follow: "Theo dõi",
  rating: "Đánh giá",
  transaction: "Giao dịch",
  story_created: "Tạo truyện",
};

export function UserActivityFeed({ activities }: UserActivityFeedProps) {
  return (
    <section className="admin-data-panel" data-admin-activity-feed>
      <div className="admin-panel-heading">
        <h3>Hoạt động người dùng</h3>
        <span>{activities.length} mục</span>
      </div>
      {activities.length === 0 ? (
        <p role="status">Chưa có hoạt động gần đây.</p>
      ) : (
        <ul className="admin-activity-list">
          {activities.map((activity) => (
            <li key={activity.id}>
              <span className="admin-activity-kind">{kindLabels[activity.kind]}</span>
              <span className="admin-activity-copy">
                <strong>{activity.actorLabel}</strong> {activity.actionLabel}{" "}
                <em>{activity.targetLabel}</em>
              </span>
              <small>{activity.createdAtLabel}</small>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
