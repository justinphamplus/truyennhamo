import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { RemoveBookmarkButton } from "@/components/library/remove-bookmark-button";
import { ReadingHistoryList } from "@/components/library/reading-history-list";
import { getCurrentProfile } from "@/lib/auth/current-user";
import { getBookmarkedStories } from "@/lib/queries/library";
import { getReadingHistory } from "@/lib/queries/reading-progress";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tủ truyện | Ruby Noir",
  description: "Những câu chuyện bạn đang theo dõi trên Ruby Noir.",
};

type LibraryPageProps = {
  searchParams: Promise<{ tab?: string | string[] }>;
};

function formatSavedDate(value: string) {
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(value));
}

export default async function LibraryPage({ searchParams }: LibraryPageProps) {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/dang-nhap?next=/tu-truyen");

  const params = await searchParams;
  const requestedTab = Array.isArray(params.tab) ? params.tab[0] : params.tab;
  const activeTab = requestedTab === "saved" ? "saved" : "reading";
  const [stories, readingHistory] = await Promise.all([
    getBookmarkedStories(profile.id),
    getReadingHistory(profile.id),
  ]);
  const activeCount =
    activeTab === "reading" ? readingHistory.length : stories.length;

  return (
    <div className="library-page">
      <header className="account-header library-header">
        <Link className="brand" href="/" aria-label="Ruby Noir trang chủ">
          <span className="brand-mark" aria-hidden="true">
            <span />
            <span />
          </span>
          <span className="brand-copy">
            <strong>Ruby Noir</strong>
            <small>Romance</small>
          </span>
        </Link>
        <nav className="library-account-nav" aria-label="Tài khoản">
          <Link href="/tai-khoan">Hồ sơ</Link>
          <Link className="account-back-link" href="/">
            ← Về trang chủ
          </Link>
        </nav>
      </header>

      <main className="library-main">
        <section className="library-intro" aria-labelledby="library-page-title">
          <div>
            <span className="section-kicker">Không gian đọc của bạn</span>
            <h1 id="library-page-title">Tủ truyện</h1>
            <p>Tiếp tục hành trình đang đọc hoặc trở lại những truyện đã theo dõi.</p>
          </div>
          <span className="library-count" aria-label={`${activeCount} truyện`}>
            <strong>{activeCount}</strong>
            <span>{activeTab === "reading" ? "đang đọc" : "đã theo dõi"}</span>
          </span>
        </section>

        <nav className="library-tabs" aria-label="Nội dung tủ truyện">
          <Link
            className={activeTab === "reading" ? "is-active" : ""}
            href="/tu-truyen"
            aria-current={activeTab === "reading" ? "page" : undefined}
          >
            Đang đọc
            <span>{readingHistory.length}</span>
          </Link>
          <Link
            className={activeTab === "saved" ? "is-active" : ""}
            href="/tu-truyen?tab=saved"
            aria-current={activeTab === "saved" ? "page" : undefined}
          >
            Đã theo dõi
            <span>{stories.length}</span>
          </Link>
        </nav>

        {activeTab === "reading" ? (
          <ReadingHistoryList stories={readingHistory} />
        ) : stories.length ? (
          <section className="library-grid" aria-label="Truyện đang theo dõi">
            {stories.map((story) => (
              <article className="library-story-card" key={story.id}>
                <Link
                  className="library-story-cover"
                  href={`/truyen/${story.slug}`}
                  aria-label={`Xem ${story.title}`}
                >
                  {story.coverImage ? (
                    <Image
                      src={story.coverImage}
                      alt=""
                      width={180}
                      height={320}
                      sizes="(max-width: 560px) 96px, 132px"
                    />
                  ) : (
                    <span aria-hidden="true">
                      {story.title.trim().charAt(0).toLocaleUpperCase("vi")}
                    </span>
                  )}
                </Link>

                <div className="library-story-copy">
                  <div className="library-story-meta">
                    <span className="status ongoing">{story.status}</span>
                    <span>{story.latestChapter}</span>
                  </div>
                  <h2>
                    <Link href={`/truyen/${story.slug}`}>{story.title}</Link>
                  </h2>
                  <p className="library-story-author">{story.author}</p>
                  <p className="library-story-synopsis">{story.synopsis}</p>
                  <small>Đã lưu ngày {formatSavedDate(story.savedAt)}</small>
                  <div className="library-story-actions">
                    <Link className="button primary" href={`/truyen/${story.slug}`}>
                      Xem truyện
                    </Link>
                    <RemoveBookmarkButton
                      storyId={story.id}
                      storySlug={story.slug}
                      storyTitle={story.title}
                    />
                  </div>
                </div>
              </article>
            ))}
          </section>
        ) : (
          <section className="library-empty" role="status">
            <span className="material-symbols-rounded" aria-hidden="true">
              auto_stories
            </span>
            <h2>Tủ truyện đang chờ câu chuyện đầu tiên</h2>
            <p>
              Mở một trang truyện và chọn “Theo dõi” để lưu lại tại đây.
            </p>
            <Link className="button primary" href="/#new">
              Khám phá truyện
            </Link>
          </section>
        )}
      </main>
    </div>
  );
}
