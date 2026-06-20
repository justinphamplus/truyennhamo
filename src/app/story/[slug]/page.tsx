import { redirect } from "next/navigation";

type LegacyStoryPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function LegacyStoryPage({
  params,
}: LegacyStoryPageProps) {
  const { slug } = await params;
  redirect(`/truyen/${encodeURIComponent(slug)}`);
}
