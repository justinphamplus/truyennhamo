type RevenueBreakdown = {
  key: "stories" | "uploaders";
  title: string;
  description: string;
  columns: string[];
};

type DeferredRevenuePageProps = {
  title: string;
  description: string;
  contracts: string[];
  dependency: string;
  breakdowns?: RevenueBreakdown[];
};

export function DeferredRevenuePage({
  title,
  description,
  contracts,
  dependency,
  breakdowns = [],
}: DeferredRevenuePageProps) {
  return (
    <section className="admin-dashboard admin-revenue-shell" data-admin-revenue-shell>
      <div className="admin-content-header">
        <div>
          <span>Quản lý doanh thu</span>
          <h2>{title}</h2>
        </div>
        <p>{description}</p>
      </div>

      <div className="admin-list-grid">
        <section className="admin-data-panel">
          <div className="admin-panel-heading">
            <div>
              <h3>Đang chuẩn bị</h3>
              <span>Shell chỉ đọc</span>
            </div>
          </div>
          <p>
            Module này chưa có payment ledger thật, nên chỉ giữ chỗ điều hướng và
            hợp đồng dữ liệu. Không có form, nút lưu, hay mutation giả.
          </p>
          <ul className="admin-deferred-list">
            {contracts.map((contract) => (
              <li key={contract}>{contract}</li>
            ))}
          </ul>
        </section>

        <section className="admin-data-panel">
          <div className="admin-panel-heading">
            <div>
              <h3>Phụ thuộc backend</h3>
              <span>Chưa nối dữ liệu thật</span>
            </div>
          </div>
          <p>{dependency}</p>
        </section>
      </div>

      {breakdowns.length ? (
        <div className="admin-list-grid">
          {breakdowns.map((breakdown) => (
            <section
              className="admin-data-panel"
              data-admin-revenue-breakdown={breakdown.key}
              key={breakdown.key}
            >
              <div className="admin-panel-heading">
                <div>
                  <h3>{breakdown.title}</h3>
                  <span>Giữ chỗ</span>
                </div>
              </div>
              <p>{breakdown.description}</p>
              <ul className="admin-deferred-list">
                {breakdown.columns.map((column) => (
                  <li key={column}>{column}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      ) : null}
    </section>
  );
}
