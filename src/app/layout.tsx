import { SidebarProvider, SidebarInset } from "@/app/components/ui/sidebar";
import { AppSidebar } from "@/app/components/shared/AppSidebar";
import { Header } from "./components/shared/Header";

export default function Layout({
  children,
}: {
  children: React.ReactNode | React.FC;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main className="flex-1 p-4">{children as React.ReactNode}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
