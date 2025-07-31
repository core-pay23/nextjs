import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardProvider from "@/providers/DashboardProvider";
export default function Layout({ children }) {
  return (
    <DashboardProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </DashboardProvider>
  );
}
