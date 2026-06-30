import { AdminCommentQueue } from "@/components/admin/comments/admin-comment-queue";
import {
  getAdminCommentQueue,
  type AdminCommentListFilters,
} from "@/lib/admin/comments";

type AdminCommentsPageProps = {
  searchParams: Promise<{
    q?: string | string[];
    status?: string | string[];
  }>;
};

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function parseFilters(
  params: Awaited<AdminCommentsPageProps["searchParams"]>,
): AdminCommentListFilters {
  const status = firstValue(params.status);

  return {
    q: firstValue(params.q)?.trim() ?? "",
    status:
      status === "visible" || status === "hidden" || status === "deleted"
        ? status
        : "all",
  };
}

export default async function AdminCommentsPage({
  searchParams,
}: AdminCommentsPageProps) {
  const filters = parseFilters(await searchParams);
  const payload = await getAdminCommentQueue(filters);

  return <AdminCommentQueue {...payload} />;
}
