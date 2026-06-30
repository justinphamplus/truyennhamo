import type { AdminMetric } from "@/lib/admin/dashboard";

type MetricCardProps = {
  icon: string;
  metric: AdminMetric;
};

export function MetricCard({ icon, metric }: MetricCardProps) {
  const description = [metric.value, metric.deltaLabel, metric.note]
    .filter(Boolean)
    .join(". ");

  return (
    <article
      className={`admin-metric-card is-${metric.tone}`}
      aria-label={`${metric.label}: ${description}`}
      data-admin-metric-card
    >
      <span className="admin-metric-icon material-symbols-rounded" aria-hidden="true">
        {icon}
      </span>
      <span className="admin-metric-label">{metric.label}</span>
      <strong>{metric.value}</strong>
      <span className="admin-metric-delta">{metric.deltaLabel}</span>
      {metric.note ? <small>{metric.note}</small> : null}
    </article>
  );
}
