import { Suspense } from "react";
import { DocumentViewer } from "@/components/documents/document-viewer";
import { DocumentViewerSkeleton } from "@/components/documents/document-viewer-skeleton";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function DocumentViewerPage({ params }: PageProps) {
  const resolvedParams = await params;
  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="space-y-8">
        <Suspense fallback={<DocumentViewerSkeleton />}>
          <DocumentViewer documentId={resolvedParams.id} />
        </Suspense>
      </div>
    </div>
  );
}
