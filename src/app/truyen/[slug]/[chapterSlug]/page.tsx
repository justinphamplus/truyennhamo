import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PrototypeShell } from "@/components/prototype-shell";
import { getReaderData } from "@/lib/queries/reader";

type ReaderPageProps = {
  params: Promise<{
    slug: string;
    chapterSlug: string;
  }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: ReaderPageProps): Promise<Metadata> {
  const { slug, chapterSlug } = await params;
  const payload = await getReaderData(slug, chapterSlug);

  if (!payload) {
    return { title: "Không tìm thấy chương | Ruby Noir" };
  }

  return {
    title: `${payload.chapter.label} - ${payload.story.title} | Ruby Noir`,
    description: payload.chapter.isLocked
      ? `Thông tin chương VIP của ${payload.story.title}.`
      : `Đọc ${payload.chapter.label} của ${payload.story.title}.`,
  };
}

export default async function ReaderPage({ params }: ReaderPageProps) {
  const { slug, chapterSlug } = await params;
  const reader = await getReaderData(slug, chapterSlug);

  if (!reader) notFound();

  return <PrototypeShell page="reader" reader={reader} />;
}
