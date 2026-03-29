import type { ReactElement, ReactNode } from "react";
import { redirect } from "next/navigation";

import { AdminSubnav } from "@/components/layout/admin-subnav";
import { getMockSessionForServer } from "@/server/auth/mock-session.server";

type AdminLayoutProps = {
  children: ReactNode;
};

export default async function AdminLayout({ children }: AdminLayoutProps): Promise<ReactElement> {
  const session = await getMockSessionForServer();

  if (!session.isAuthenticated || session.role !== "admin") {
    redirect("/login?next=%2Fadmin");
  }

  return (
    <>
      <AdminSubnav />
      {children}
    </>
  );
}
