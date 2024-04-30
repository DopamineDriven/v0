import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchComponent } from "@/components/search-component";

export const metadata = {
  title: "Home"
} satisfies Metadata;

export default function HomePage() {
  return (
    <Suspense>
      <SearchComponent />
    </Suspense>
  );
}
