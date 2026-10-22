import React from "react";
import { ClientPortalView } from "@/components/track/client-portal-view";

export default async function TrackPage({
  params,
}: {
  params: Promise<{ kode: string }>;
}) {
  const { kode } = await params;
  const kodeUpper = decodeURIComponent(kode).toUpperCase();

  return <ClientPortalView kode={kodeUpper} />;
}
