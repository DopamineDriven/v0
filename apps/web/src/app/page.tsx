import type { Metadata } from "next";
import { Button } from "@dd/ui";
import { Suspense } from "react";
import { SearchComponent } from "@/components/search-component";

export const metadata = {
  title: "Home"
} satisfies Metadata;

export default function HomePage() {
  return (
    <Suspense>
      <SearchComponent />
      <div className='mx-auto my-auto flex h-screen min-h-full w-screen min-w-full flex-row justify-center justify-items-center'>
        <Button Component='button' variant='secondary' size='lg'>
          SECONDARY
        </Button>
      </div>
    </Suspense>
  );
}
