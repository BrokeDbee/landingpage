"use client";

import { useEffect, useState } from "react";
import {
  getDocumentById,
  downloadDocument,
  DocumentWithRelations,
} from "@/lib/api/services/documents";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Download,
  FileText,
  Calendar,
  User,
  Eye,
} from "lucide-react";
import Link from "next/link";
import { DocumentPreview } from "@/components/documents/document-preview";
import { ErrorBoundary } from "@/components/error-boundary";
import { toast } from "sonner";
import { DocumentViewerSkeleton } from "@/components/documents/document-viewer-skeleton"; // Import DocumentViewerSkeleton

interface DocumentViewerProps {
  documentId: string;
}

export function DocumentViewer({ documentId }: DocumentViewerProps) {
  const [document, setDocument] = useState<DocumentWithRelations | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        setLoading(true);
        setError(null);

        const id = Number.parseInt(documentId);
        if (isNaN(id)) {
          setError("Invalid document ID");
          return;
        }

        const response = await getDocumentById(id);

        if (response.success && response.data) {
          setDocument(response.data);
        } else {
          setError(response.error || "Failed to load document");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
        setError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();
  }, [documentId]);

  const handleDownload = async () => {
    if (!document) return;

    try {
      setDownloading(true);
      const downloadUrl = await downloadDocument(document.id);

      if (downloadUrl) {
        // Create a temporary link to trigger download
        const link = window.document.createElement("a");
        link.href = downloadUrl;
        link.download = document.title;
        window.document.body.appendChild(link);
        link.click();
        window.document.body.removeChild(link);

        toast.success("Download started");
      } else {
        // Fallback to opening in new tab
        window.open(document.fileUrl, "_blank");
      }
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download document");
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return <DocumentViewerSkeleton />;
  }

  if (error) {
    return <DocumentError error={error} />;
  }

  if (!document) {
    return <DocumentNotFound />;
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/documents">
              <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {document.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {document.uploadedBy.username}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(document.createdAt).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  {document.downloads} downloads
                </div>
              </div>
            </div>
          </div>

          <Button
            onClick={handleDownload}
            disabled={downloading}
            className="bg-orange-600 hover:bg-orange-700 text-white gap-2"
          >
            <Download className="h-4 w-4" />
            {downloading ? "Downloading..." : "Download"}
          </Button>
        </div>

        {/* Document Info */}
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-orange-500" />
                <span className="text-gray-700">
                  {(document.fileSize / 1024 / 1024).toFixed(2)} MB
                </span>
              </div>
              <Badge
                variant="secondary"
                className="bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                {document.category}
              </Badge>
              <Badge
                variant="secondary"
                className="bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                {document.fileType.toUpperCase()}
              </Badge>
              {document.isPublic && (
                <Badge className="bg-green-600 text-white">Public</Badge>
              )}
            </div>
            {document.description && (
              <p className="mt-4 text-gray-700">{document.description}</p>
            )}
          </CardContent>
        </Card>

        {/* Document Preview */}
        <ErrorBoundary fallback={<DocumentPreviewError />}>
          <DocumentPreview document={document} />
        </ErrorBoundary>
      </div>
    </div>
  );
}

function DocumentError({ error }: { error: string }) {
  return (
    <div className="container mx-auto py-12 px-4">
      <Card className="max-w-md mx-auto bg-red-50 border-red-200">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
            <FileText className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-red-800 mb-2">
            Error Loading Document
          </h2>
          <p className="text-red-700 mb-4">{error}</p>
          <Link href="/documents">
            <Button
              variant="outline"
              className="border-red-300 text-red-700 hover:bg-red-50"
            >
              Back to Documents
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

function DocumentNotFound() {
  return (
    <div className="container mx-auto py-12 px-4">
      <Card className="max-w-md mx-auto bg-white border-gray-200 shadow-sm">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <FileText className="h-8 w-8 text-gray-500" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Document Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The document you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <Link href="/documents">
            <Button className="bg-orange-600 hover:bg-orange-700">
              Back to Documents
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

function DocumentPreviewError() {
  return (
    <Card className="bg-white border-gray-200 shadow-sm">
      <CardContent className="p-8 text-center">
        <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Preview Unavailable
        </h3>
        <p className="text-gray-600">
          Unable to preview this document. You can still download it to view the
          content.
        </p>
      </CardContent>
    </Card>
  );
}
