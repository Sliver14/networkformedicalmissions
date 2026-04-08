import prisma from "@/lib/prisma";
import EditEventForm from "@/components/admin/EditEventForm";
import { notFound } from "next/navigation";

export default async function EditEventPage({ params }: { params: { id: string } }) {
  const event = await prisma.event.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!event) {
    notFound();
  }

  return <EditEventForm event={event} />;
}
