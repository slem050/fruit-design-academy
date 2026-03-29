import type { ReactElement, ReactNode } from "react";
import { redirect } from "next/navigation";

import { getMockSessionForServer } from "@/server/auth/mock-session.server";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default async function DashboardLayout({ children }: DashboardLayoutProps): Promise<ReactElement> {
  const session = await getMockSessionForServer();

  if (!session.isAuthenticated || session.role !== "student") {
    redirect("/login?next=%2Fdashboard");
  }

  return <>{children}</>;
}
