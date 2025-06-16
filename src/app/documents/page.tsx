import { Suspense } from "react";
import { DocumentsList } from "@/components/documents/documents-list";
import { DocumentsHeader } from "@/components/documents/documents-header";
import { DocumentsListSkeleton } from "@/components/documents/documents-list-skeleton";

export default function DocumentsPage() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="space-y-8">
        <DocumentsHeader />
        <Suspense fallback={<DocumentsListSkeleton />}>
          <DocumentsList />
        </Suspense>
      </div>
    </div>
  );
}
