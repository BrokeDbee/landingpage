"use client";

import { useEffect, useState } from "react";
import { getDocumentById } from "@/lib/api/services/documents";
import { DocumentWithRelations } from "@/lib/api/services/documents";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

// Dynamically import DocViewer to avoid SSR issues
const DocViewer = dynamic(() => import("react-doc-viewer"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[80vh] flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-orange-500"></div>
    </div>
  ),
});

export default function DocumentViewerClient({
  params,
}: {
  params: { id: string };
}) {
  const [document, setDocument] = useState<DocumentWithRelations | null>(null);
  const [loading, setLoading] = useState(true);
  // const [fileUrl, setFileUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const id = parseInt(params.id);
        const [docResponse] = await Promise.all([
          getDocumentById(id),
          // downloadDocument(id),
        ]);

        if (docResponse.success && docResponse.data) {
          setDocument(docResponse.data);
        }
        // if (downloadResponse) {
        //   setFileUrl(downloadResponse);
        // }
      } catch (error) {
        console.error("Error fetching document:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();
  }, [params.id]);

  if (loading) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-slate-800 rounded w-1/4"></div>
          <div className="h-96 bg-slate-800 rounded"></div>
        </div>
      </div>
    );
  }

  if (!document) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500">
            Document not found
          </h1>
          <Link href="/documents">
            <Button className="mt-4">Back to Documents</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/documents">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-6 w-6" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-white via-orange-200 to-blue-200 bg-clip-text">
                {document.title}
              </h1>
              <p className="text-slate-400">
                Uploaded by {document.uploadedBy.username}
              </p>
            </div>
          </div>
          <Button
            onClick={() => window.open(document.fileUrl, "_blank")}
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            Download
          </Button>
        </div>

        <div className="w-full h-[80vh] rounded-lg overflow-hidden border border-slate-800 bg-slate-900">
          <DocViewer
            documents={[{ uri: document.fileUrl }]}
            theme={{
              primary: "#f97316",
              secondary: "#1e293b",
              tertiary: "#0f172a",
              text_primary: "#ffffff",
              text_secondary: "#94a3b8",
              text_tertiary: "#475569",
              disableThemeScrollbar: false,
            }}
            style={{ height: "100%" }}
          />
        </div>
      </div>
    </div>
  );
}
