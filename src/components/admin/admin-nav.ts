export type AdminNavKey =
  | "overview"
  | "stories"
  | "genres"
  | "authors"
  | "tags"
  | "comments"
  | "reports"
  | "users"
  | "roles"
  | "transactions"
  | "topup-plans"
  | "vip-plans"
  | "withdrawals"
  | "revenue-stats"
  | "marketing-overview"
  | "events"
  | "banners"
  | "promoted-stories"
  | "promo-codes"
  | "campaign-notifications"
  | "marketing-stats"
  | "settings"
  | "notifications"
  | "activity-log";

export type AdminNavItem = {
  key: AdminNavKey;
  label: string;
  icon: string;
  href: string;
};

export type AdminNavGroup = {
  label: string;
  items: AdminNavItem[];
};

export const adminNavGroups: AdminNavGroup[] = [
  {
    label: "QUẢN LÝ NỘI DUNG",
    items: [
      { key: "overview", label: "Tổng quan", icon: "dashboard", href: "/admin" },
      { key: "stories", label: "Truyện", icon: "auto_stories", href: "/admin/truyen" },
      { key: "genres", label: "Thể loại", icon: "category", href: "/admin?module=the-loai" },
      { key: "authors", label: "Tác giả", icon: "edit_note", href: "/admin?module=tac-gia" },
      { key: "tags", label: "Tags", icon: "sell", href: "/admin?module=tags" },
      { key: "comments", label: "Bình luận", icon: "forum", href: "/admin/binh-luan" },
      { key: "reports", label: "Báo cáo", icon: "flag", href: "/admin?module=bao-cao" },
    ],
  },
  {
    label: "QUẢN LÝ NGƯỜI DÙNG",
    items: [
      { key: "users", label: "Người dùng", icon: "group", href: "/admin?module=nguoi-dung" },
      {
        key: "roles",
        label: "Vai trò & phân quyền",
        icon: "admin_panel_settings",
        href: "/admin/vai-tro",
      },
    ],
  },
  {
    label: "QUẢN LÝ DOANH THU",
    items: [
      {
        key: "transactions",
        label: "Giao dịch",
        icon: "receipt_long",
        href: "/admin/giao-dich",
      },
      { key: "topup-plans", label: "Gói nạp", icon: "payments", href: "/admin/goi-nap" },
      { key: "vip-plans", label: "Gói VIP", icon: "workspace_premium", href: "/admin/goi-vip" },
      { key: "withdrawals", label: "Rút tiền", icon: "account_balance_wallet", href: "/admin/rut-tien" },
      {
        key: "revenue-stats",
        label: "Thống kê doanh thu",
        icon: "monitoring",
        href: "/admin/thong-ke-doanh-thu",
      },
    ],
  },
  {
    label: "MARKETING",
    items: [
      {
        key: "marketing-overview",
        label: "Tổng quan Marketing",
        icon: "campaign",
        href: "/admin/marketing",
      },
      { key: "events", label: "Sự kiện", icon: "event", href: "/admin/marketing/su-kien" },
      {
        key: "banners",
        label: "Banner & vị trí hiển thị",
        icon: "view_carousel",
        href: "/admin/marketing/banner",
      },
      {
        key: "promoted-stories",
        label: "Truyện đề xuất",
        icon: "stars",
        href: "/admin/marketing/truyen-de-xuat",
      },
      {
        key: "promo-codes",
        label: "Mã khuyến mãi",
        icon: "redeem",
        href: "/admin/marketing/ma-khuyen-mai",
      },
      {
        key: "campaign-notifications",
        label: "Thông báo chiến dịch",
        icon: "notifications_active",
        href: "/admin/marketing/thong-bao-chien-dich",
      },
      {
        key: "marketing-stats",
        label: "Thống kê Marketing",
        icon: "query_stats",
        href: "/admin/marketing/thong-ke",
      },
    ],
  },
  {
    label: "CẤU HÌNH HỆ THỐNG",
    items: [
      { key: "settings", label: "Cài đặt", icon: "settings", href: "/admin?module=cai-dat" },
      {
        key: "notifications",
        label: "Thông báo",
        icon: "notifications",
        href: "/admin/thong-bao",
      },
      {
        key: "activity-log",
        label: "Nhật ký hoạt động",
        icon: "history",
        href: "/admin?module=nhat-ky-hoat-dong",
      },
    ],
  },
];
