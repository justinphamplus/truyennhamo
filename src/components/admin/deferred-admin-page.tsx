type DeferredAdminPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  dependency: string;
  contracts: string[];
};

export function DeferredAdminPage({
  eyebrow,
  title,
  description,
  dependency,
  contracts,
}: DeferredAdminPageProps) {
  return (
    <section className="admin-dashboard" data-admin-deferred-shell>
      <div className="admin-content-header">
        <div>
          <span>{eyebrow}</span>
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
            Module này chỉ giữ chỗ điều hướng và hợp đồng dữ liệu. Không có
            form, nút lưu, hay mutation giả.
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
    </section>
  );
}
