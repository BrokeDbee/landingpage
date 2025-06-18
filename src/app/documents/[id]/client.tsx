"use client";

import { useEffect, useState } from "react";
import { getDocumentById } from "@/lib/api/services/documents";
import { DocumentWithRelations } from "@/lib/api/services/documents";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Dynamically import DocViewer to avoid SSR issues

export default function DocumentViewerClient({
  params,
}: {
  params: { id: string };
}) {
  const [document, setDocument] = useState<DocumentWithRelations | null>(null);
  const [loading, setLoading] = useState(true);
  // const [fileUrl, setFileUrl] = useState<string | null>(null);
  const isImageFile = document?.fileType.startsWith("image/");
  const isPdfFile = document?.fileType === "application/pdf";
  const isDocFile =
    document?.fileType === "application/msword" ||
    document?.fileType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

  const canPreview = isImageFile || isPdfFile || isDocFile;

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
          {canPreview && (
            <div className="w-full h-full flex items-center justify-center ">
              {isImageFile && (
                <Image
                  src={document.fileUrl}
                  alt={document.title}
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
              )}
              {isPdfFile && (
                <object
                  data={document.fileUrl}
                  type="application/pdf"
                  className="w-full h-[70vh] border rounded"
                >
                  <p>
                    Alternative text - include a link{" "}
                    <a href={document.fileUrl}>to the PDF!</a>
                  </p>
                </object>
              )}
              {isDocFile && (
                <div className="w-full h-full">
                  <iframe
                    src={`https://docs.google.com/gview?url=${encodeURIComponent(
                      document.fileUrl
                    )}&embedded=true`}
                    className="w-full h-[70vh] border rounded"
                    title="Document Preview"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
