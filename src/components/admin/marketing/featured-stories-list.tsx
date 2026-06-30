const featuredStorySlots = [
  {
    title: "Hero chiến dịch",
    story: "Giữ chỗ truyện chính",
    campaign: "Chiến dịch nổi bật",
    policy: "Chính sách boost: chờ story ranking/boost policy",
  },
  {
    title: "Trang chủ",
    story: "Giữ chỗ truyện đề xuất",
    campaign: "Biên tập trang chủ",
    policy: "Chính sách boost: chờ campaign schema",
  },
  {
    title: "Chi tiết truyện",
    story: "Giữ chỗ truyện liên quan",
    campaign: "Gợi ý theo ngữ cảnh",
    policy: "Chính sách boost: không ghi đè ranking tự nhiên",
  },
  {
    title: "Reader",
    story: "Giữ chỗ truyện đọc tiếp",
    campaign: "Giữ chân người đọc",
    policy: "Chính sách boost: chờ quy tắc attribution",
  },
];

export function FeaturedStoriesList() {
  return (
    <section className="admin-dashboard" data-admin-featured-stories-shell>
      <div className="admin-content-header">
        <div>
          <span>Marketing</span>
          <h2>Truyện đề xuất</h2>
        </div>
        <p>
          Shell chuẩn bị danh sách editorial picks cho campaign. Chưa có boost mutation,
          scheduling hay lưu cấu hình thật.
        </p>
      </div>

      <section className="admin-data-panel">
        <div className="admin-panel-heading">
          <div>
            <h3>Đang chuẩn bị</h3>
            <span>Shell chỉ đọc</span>
          </div>
        </div>
        <p>
          Phần giữ chỗ này phụ thuộc campaign schema và story ranking/boost policy trước khi
          cho phép chọn truyện, tăng hạng, hoặc gắn thời gian hiển thị.
        </p>
      </section>

      <div className="admin-list-grid">
        {featuredStorySlots.map((slot) => (
          <section className="admin-data-panel" data-admin-featured-story-row key={slot.title}>
            <div className="admin-panel-heading">
              <div>
                <h3>{slot.title}</h3>
                <span>Giữ chỗ</span>
              </div>
            </div>
            <ul className="admin-deferred-list">
              <li>Truyện: {slot.story}</li>
              <li>Chiến dịch: {slot.campaign}</li>
              <li>{slot.policy}</li>
            </ul>
          </section>
        ))}
      </div>
    </section>
  );
}
