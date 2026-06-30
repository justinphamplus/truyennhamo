type MarketingSection = {
  key: string;
  title: string;
  description: string;
  items: string[];
};

type MarketingDeferredPageProps = {
  title: string;
  description: string;
  sections: MarketingSection[];
};

export function MarketingDeferredPage({
  title,
  description,
  sections,
}: MarketingDeferredPageProps) {
  return (
    <section className="admin-dashboard" data-admin-marketing-shell>
      <div className="admin-content-header">
        <div>
          <span>Marketing</span>
          <h2>{title}</h2>
        </div>
        <p>{description}</p>
      </div>

      <section className="admin-data-panel">
        <div className="admin-panel-heading">
          <div>
            <h3>Đang chuẩn bị</h3>
            <span>Shell chỉ đọc</span>
          </div>
        </div>
        <p>
          Module này chỉ giữ chỗ điều hướng và hợp đồng dữ liệu marketing. Không có form,
          nút lưu, hay mutation giả khi chưa có campaign schema.
        </p>
      </section>

      <div className="admin-list-grid">
        {sections.map((section) => (
          <section
            className="admin-data-panel"
            data-admin-marketing-section={section.key}
            key={section.key}
          >
            <div className="admin-panel-heading">
              <div>
                <h3>{section.title}</h3>
                <span>Giữ chỗ</span>
              </div>
            </div>
            <p>{section.description}</p>
            <ul className="admin-deferred-list">
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </section>
  );
}
