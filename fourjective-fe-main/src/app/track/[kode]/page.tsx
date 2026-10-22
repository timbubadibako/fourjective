import React from "react";
import { redirect } from "next/navigation";
import { getProjectByAccessCode } from "@/lib/supabase";
import { ClientPortalView } from "@/components/track/client-portal-view";

export default async function TrackPage({
  params,
}: {
  params: Promise<{ kode: string }>;
}) {
  const { kode } = await params;
  const kodeUpper = decodeURIComponent(kode).trim().toUpperCase();

  // Fetch real data from Supabase
  const project = await getProjectByAccessCode(kodeUpper);

  // Redirect guard: jika kode tidak terdaftar di Supabase, lempar kembali ke portal dengan flag error
  if (!project) {
    redirect(`/portal?error=invalid&kode=${encodeURIComponent(kodeUpper)}`);
  }

  return <ClientPortalView kode={kodeUpper} initialProject={project} />;
}
