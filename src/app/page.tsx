import { PrototypeShell } from "@/components/prototype-shell";
import { getHomepageData } from "@/lib/queries/homepage";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const homepageCatalog = await getHomepageData();

  return <PrototypeShell page="home" homepageCatalog={homepageCatalog} />;
}
