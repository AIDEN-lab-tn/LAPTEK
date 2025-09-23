import { Accounts } from '@/components/Dashboard/accounts';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accounts | Dashboard",
  description: "Accounts management page",
};

export default function AccountsPage() {
  return <Accounts />;
}