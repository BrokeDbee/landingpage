"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, ExternalLink } from "lucide-react";
import dynamic from "next/dynamic";
import { DocumentWithRelations } from "@/lib/api/services/documents";

// Dynamically import DocViewer to avoid SSR issues
const DocViewer = dynamic(() => import("react-doc-viewer"), {
  ssr: false,
  loading: () => <DocumentPreviewLoading />,
});

interface DocumentPreviewProps {
  document: DocumentWithRelations;
}

export function DocumentPreview({ document }: DocumentPreviewProps) {
  const [previewError] = useState(false);

  // Check if file type is supported for preview
  const supportedTypes = [
    "pdf",
    "doc",
    "docx",
    "txt",
    "jpg",
    "jpeg",
    "png",
    "gif",
  ];
  const fileExtension = document.fileType.toLowerCase();
  const isPreviewSupported = supportedTypes.includes(fileExtension);

  if (!isPreviewSupported || previewError) {
    return <UnsupportedPreview document={document} />;
  }

  return (
    <Card className="bg-white border-gray-200 shadow-sm overflow-hidden">
      <CardContent className="p-0">
        <div className="h-[80vh] w-full">
          <DocViewer
            documents={[{ uri: document.fileUrl, fileType: "pdf" }]}
            theme={{
              primary: "#f97316",
              secondary: "#f8fafc",
              tertiary: "#ffffff",
              text_primary: "#1f2937",
              text_secondary: "#4b5563",
              text_tertiary: "#6b7280",
              disableThemeScrollbar: false,
            }}
            style={{
              height: "100%",
              backgroundColor: "#ffffff",
            }}
            config={{
              header: {
                disableHeader: false,
                disableFileName: false,
                retainURLParams: false,
              },
            }}
          />
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
