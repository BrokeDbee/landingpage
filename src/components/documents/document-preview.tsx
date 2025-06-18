"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, ExternalLink } from "lucide-react";
import { DocumentWithRelations } from "@/lib/api/services/documents";
import Image from "next/image";

interface DocumentPreviewProps {
  document: DocumentWithRelations;
}

export function DocumentPreview({ document }: DocumentPreviewProps) {
  const [previewError, setPreviewError] = useState(false);
  const [loading, setLoading] = useState(true);
  const isImageFile = document?.fileType.startsWith("image/");
  const isPdfFile = document?.fileType === "application/pdf";
  const isDocFile =
    document?.fileType === "application/msword" ||
    document?.fileType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

  const canPreview = isImageFile || isPdfFile || isDocFile;

  if (!canPreview || previewError) {
    return <UnsupportedPreview document={document} />;
  }

  return (
    <Card className="bg-white border-gray-200 shadow-sm overflow-hidden">
      <CardContent className="p-0">
        <div className="h-[80vh] w-full relative">
          {loading && <DocumentPreviewLoading />}

          <div
            className={`absolute top-0 left-0 w-full h-full flex items-center justify-center transition-opacity duration-300 ${
              loading ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            {isImageFile && (
              <Image
                src={document.fileUrl}
                alt={document.title}
                width={800}
                height={600}
                onLoad={() => setLoading(false)}
                onError={() => {
                  setPreviewError(true);
                  setLoading(false);
                }}
                className="w-full h-auto"
              />
            )}

            {isPdfFile && (
              <object
                data={document.fileUrl}
                type="application/pdf"
                className="w-full h-[70vh] border rounded"
                onLoad={() => setLoading(false)}
                onError={() => {
                  setPreviewError(true);
                  setLoading(false);
                }}
              >
                <p>
                  Alternative text - include a link{" "}
                  <a href={document.fileUrl}>to the PDF!</a>
                </p>
              </object>
            )}

            {isDocFile && (
              <iframe
                src={`https://docs.google.com/gview?url=${encodeURIComponent(
                  document.fileUrl
                )}&embedded=true`}
                className="w-full h-[70vh] border rounded"
                onLoad={() => setLoading(false)}
                onError={() => {
                  setPreviewError(true);
                  setLoading(false);
                }}
                title="Document Preview"
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function DocumentPreviewLoading() {
  return (
    <Card className="bg-white border-gray-200 shadow-sm">
      <CardContent className="p-8">
        <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          <p className="text-gray-600">Loading document preview...</p>
        </div>
      </CardContent>
    </Card>
  );
}

function UnsupportedPreview({ document }: { document: DocumentWithRelations }) {
  return (
    <Card className="bg-white border-gray-200 shadow-sm">
      <CardContent className="p-8">
        <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
            <FileText className="h-10 w-10 text-gray-500" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-lg font-medium text-gray-900">
              Preview Not Available
            </h3>
            <p className="text-gray-600 max-w-md">
              This file type ({document.fileType.toUpperCase()}) cannot be
              previewed in the browser. Download the file to view its contents.
            </p>
          </div>
          <Button
            onClick={() => window.open(document.fileUrl, "_blank")}
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-50 gap-2"
          >
            <ExternalLink className="h-4 w-4" />
            Open in New Tab
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
