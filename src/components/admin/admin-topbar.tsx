type AdminTopbarProps = {
  adminEmail: string;
  title: string;
};

export function AdminTopbar({ adminEmail, title }: AdminTopbarProps) {
  return (
    <header className="admin-topbar">
      <div className="admin-title-block">
        <span>Trung tâm vận hành</span>
        <h1>{title}</h1>
      </div>

      <div className="admin-topbar-actions">
        <label className="admin-search">
          <span className="sr-only">Tìm kiếm quản trị</span>
          <span className="material-symbols-rounded" aria-hidden="true">
            search
          </span>
          <input
            aria-label="Tìm kiếm quản trị"
            type="search"
            placeholder="Tìm kiếm truyện, tác giả, người dùng..."
          />
          <kbd>Ctrl K</kbd>
        </label>

        <button className="admin-icon-button" type="button" aria-label="Thông báo quản trị">
          <span className="material-symbols-rounded" aria-hidden="true">
            notifications
          </span>
        </button>

        <div className="admin-profile" aria-label="Hồ sơ quản trị">
          <span className="admin-profile-avatar" aria-hidden="true">
            QM
          </span>
          <span>
            <strong>Quản trị viên</strong>
            <small>{adminEmail}</small>
          </span>
        </div>
      </div>
    </header>
  );
}
