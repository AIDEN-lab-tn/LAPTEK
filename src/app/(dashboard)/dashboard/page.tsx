import { Content } from '@/components/Dashboard/home/content';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | NextCommerce",
  description: "Dashboard page for NextCommerce Template",
};

export default function DashboardPage() {
  return <Content />;
}