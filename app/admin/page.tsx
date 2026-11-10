import type { Metadata } from "next";
import { AdminPanel } from "./admin-panel";

export const metadata: Metadata = {
  title: "Administración de shows",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminPanel />;
}
