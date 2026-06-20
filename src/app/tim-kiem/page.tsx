import type { Metadata } from "next";

import { PrototypeShell } from "@/components/prototype-shell";
import { searchStories } from "@/lib/queries/search";

type SearchPageProps = {
  searchParams: Promise<{
    q?: string | string[];
    rank?: string | string[];
    id?: string | string[];
  }>;
};

export const dynamic = "force-dynamic";

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function parseCursor(rankValue?: string, idValue?: string) {
  const rank = Number(rankValue);
  const id = Number(idValue);

  if (!Number.isFinite(rank) || !Number.isSafeInteger(id) || id <= 0) {
    return null;
  }

  return { rank, id };
}

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const params = await searchParams;
  const query = firstValue(params.q)?.trim();

  return {
    title: query ? `Tìm kiếm “${query}” | Ruby Noir` : "Tìm kiếm truyện | Ruby Noir",
    description: query
      ? `Kết quả tìm kiếm truyện và tác giả cho “${query}”.`
      : "Tìm kiếm truyện theo tên, nội dung hoặc tác giả.",
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = firstValue(params.q) ?? "";
  const cursor = parseCursor(firstValue(params.rank), firstValue(params.id));
  const search = await searchStories(query, cursor);

  return <PrototypeShell page="search" search={search} />;
}
