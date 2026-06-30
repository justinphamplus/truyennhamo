const bannerPlacements = [
  {
    title: "Trang chủ",
    position: "Hero dưới thanh điều hướng",
    size: "Kích thước 1440x360",
  },
  {
    title: "Thể loại",
    position: "Đầu danh sách truyện theo thể loại",
    size: "Kích thước 1200x280",
  },
  {
    title: "Chi tiết truyện",
    position: "Sau khối thông tin truyện",
    size: "Kích thước 970x250",
  },
  {
    title: "Reader",
    position: "Giữa các cụm đoạn đọc",
    size: "Kích thước 728x120",
  },
];

export function BannerPlacementList() {
  return (
    <section className="admin-dashboard" data-admin-banner-placement-shell>
      <div className="admin-content-header">
        <div>
          <span>Marketing</span>
          <h2>Banner & vị trí hiển thị</h2>
        </div>
        <p>
          Shell chuẩn bị quản lý banner theo placement. Chưa có upload, lịch chạy,
          campaign binding hay mutation thật.
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
          Các vị trí dưới đây chỉ giữ hợp đồng hiển thị để sau này gắn storage,
          campaign schema và rule phân phối banner.
        </p>
      </section>

      <div className="admin-list-grid">
        {bannerPlacements.map((placement) => (
          <section
            className="admin-data-panel"
            data-admin-banner-placement-row
            key={placement.title}
          >
            <div className="admin-panel-heading">
              <div>
                <h3>{placement.title}</h3>
                <span>Giữ chỗ</span>
              </div>
            </div>
            <ul className="admin-deferred-list">
              <li>Vị trí: {placement.position}</li>
              <li>{placement.size}</li>
              <li>Trạng thái: Giữ chỗ</li>
            </ul>
          </section>
        ))}
      </div>
    </section>
  );
}
