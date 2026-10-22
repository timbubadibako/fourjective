import React from "react";
import { getProjectByAccessCode } from "@/lib/supabase";
import { ClientPortalView } from "@/components/track/client-portal-view";

export default async function TrackPage({
  params,
}: {
  params: Promise<{ kode: string }>;
}) {
  const { kode } = await params;
  const kodeUpper = decodeURIComponent(kode).toUpperCase();

  // Fetch real data from Supabase
  const project = await getProjectByAccessCode(kodeUpper);

  return <ClientPortalView kode={kodeUpper} initialProject={project} />;
}
