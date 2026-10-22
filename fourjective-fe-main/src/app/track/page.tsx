import { redirect } from "next/navigation";

export default function TrackIndexPage() {
  /* Default ke portal gate untuk memasukkan kode sekolah */
  redirect("/portal");
}
