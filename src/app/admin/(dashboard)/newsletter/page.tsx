import prisma from "@/lib/prisma";
import NewsletterManager from "@/components/admin/NewsletterManager";

export const dynamic = 'force-dynamic';

export default async function AdminNewsletterPage() {
  const subscribers = await prisma.newsletter.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <NewsletterManager subscribers={subscribers} />;
}
