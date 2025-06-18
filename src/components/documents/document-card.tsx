"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Download, Eye, Calendar, User } from "lucide-react";
import Link from "next/link";
import { DocumentWithRelations } from "@/lib/api/services/documents";

interface DocumentCardProps {
  document: DocumentWithRelations;
}

export function DocumentCard({ document }: DocumentCardProps) {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Format file type to prevent overflow and ensure consistency
  const formatFileType = (fileType: string) => {
    const maxLength = 10; // Maximum length for file type display
    const normalizedType = fileType.toUpperCase().replace(/[^A-Z0-9]/g, '');
    return normalizedType.length > maxLength 
      ? `${normalizedType.substring(0, maxLength)}...`
      : normalizedType;
  };

  return (
    <Card className="group h-full bg-white border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 hover:border-orange-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between relative max-w-full">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <div className="p-2 rounded-lg bg-orange-50 text-orange-600 shrink-0">
              <FileText className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-gray-900 truncate group-hover:text-orange-600 transition-colors">
                {document.title}
              </h3>
              <p
                className="text-sm text-gray-500 flex items-center gap-1"
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                <span>{formatFileSize(document.fileSize)}</span>
                <span>•</span>
                <span className="inline-block max-w-[100px] truncate">
                  {formatFileType(document.fileType)}
                </span>
              </p>
            </div>
          </div>
        
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-4">
        <p className="text-sm text-gray-600 line-clamp-2 min-h-[2.5rem]">
          {document.description || "No description available"}
        </p>

        <Badge variant="outline" className="w-fit">
          {document.category}
        </Badge>

        <div className="space-y-2 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            <span>By {document.uploadedBy.username}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{formatDate(document.createdAt)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Download className="h-3 w-3" />
            <span>{document.downloads} downloads</span>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Link href={`/documents/${document.id}`} className="flex-1">
            <Button
              variant="outline"
              size="sm"
              className="w-full gap-2 hover:bg-orange-50 hover:border-orange-200"
            >
              <Eye className="h-4 w-4" />
              View
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.open(document.fileUrl, "_blank")}
            className="px-3 hover:bg-orange-50"
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}