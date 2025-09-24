import { Products } from '@/components/Dashboard/products/index';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products | Laptek Dashboard",
  description: "Products management page for Laptek store",
};

export default function ProductsPage() {
  return <Products />;
}