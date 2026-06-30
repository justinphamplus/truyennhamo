import { AdminStoryList } from "@/components/admin/stories/admin-story-list";
import {
  getAdminStoryList,
  type AdminStoryListFilters,
} from "@/lib/admin/stories";

type AdminStoriesPageProps = {
  searchParams: Promise<{
    productionType?: string | string[];
    q?: string | string[];
    status?: string | string[];
    uploader?: string | string[];
  }>;
};

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function parseFilters(
  params: Awaited<AdminStoriesPageProps["searchParams"]>,
): AdminStoryListFilters {
  const status = firstValue(params.status);
  const productionType = firstValue(params.productionType);

  return {
    q: firstValue(params.q)?.trim() ?? "",
    status:
      status === "draft" || status === "published" || status === "archived"
        ? status
        : "all",
    productionType:
      productionType === "self_produced" ||
      productionType === "licensed_translation"
        ? productionType
        : "all",
    uploader: firstValue(params.uploader)?.trim() ?? "",
  };
}

export default async function AdminStoriesPage({
  searchParams,
}: AdminStoriesPageProps) {
  const filters = parseFilters(await searchParams);
  const payload = await getAdminStoryList(filters);

  return <AdminStoryList {...payload} />;
}
