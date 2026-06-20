import { getPrototypeMarkup, type PrototypePage } from "@/lib/prototype-markup";
import type { HomepageCatalog } from "@/lib/queries/homepage";
import type { ReaderPayload } from "@/lib/queries/reader";
import type { SearchPayload } from "@/lib/queries/search";
import type { StoryDetailPayload } from "@/lib/queries/story-detail";

type PrototypeShellProps = {
  page: PrototypePage;
  homepageCatalog?: HomepageCatalog;
  storyDetail?: StoryDetailPayload;
  reader?: ReaderPayload;
  search?: SearchPayload;
};

export function PrototypeShell({
  page,
  homepageCatalog,
  storyDetail,
  reader,
  search,
}: PrototypeShellProps) {
  return (
    <>
      <div
        data-homepage-source={homepageCatalog?.source}
        data-story-source={storyDetail?.source}
        data-reader-source={reader?.source}
        data-search-source={search?.source}
        dangerouslySetInnerHTML={{ __html: getPrototypeMarkup(page) }}
      />
      {homepageCatalog ? (
        <script
          id="homepage-catalog-data"
          type="application/json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(homepageCatalog).replaceAll("<", "\\u003c"),
          }}
        />
      ) : null}
      {storyDetail ? (
        <script
          id="story-detail-data"
          type="application/json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(storyDetail).replaceAll("<", "\\u003c"),
          }}
        />
      ) : null}
      {reader ? (
        <script
          id="reader-data"
          type="application/json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(reader).replaceAll("<", "\\u003c"),
          }}
        />
      ) : null}
      {search ? (
        <script
          id="search-data"
          type="application/json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(search).replaceAll("<", "\\u003c"),
          }}
        />
      ) : null}
    </>
  );
}
