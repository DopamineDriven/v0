import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchComponent } from "@/components/search-component";

import { Button } from "@dd/ui";

export const metadata = {
  title: "Home"
} satisfies Metadata;

export default function HomePage() {
  return (
    <Suspense>
      <SearchComponent />
      <Button Component='button' variant='ghost' size='lg'>
        GHOST
      </Button>
    </Suspense>
  );
}
