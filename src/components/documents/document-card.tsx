"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
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

  return (
    <Card className="group h-full bg-white border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 hover:border-orange-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <div className="p-2 rounded-lg bg-orange-50 text-orange-600 shrink-0">
              <FileText className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-gray-900 truncate group-hover:text-orange-600 transition-colors">
                {document.title}
              </h3>
              <p className="text-sm text-gray-500 truncate">
                {formatFileSize(document.fileSize)} •{" "}
                {document.fileType.toUpperCase()}
              </p>
            </div>
          </div>
          {document.isPublic && (
            <Badge
              variant="secondary"
              className="bg-green-50 text-green-700 border-green-200 shrink-0"
            >
              Public
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-4">
        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2 min-h-[2.5rem]">
          {document.description || "No description available"}
        </p>

        {/* Category */}
        <Badge variant="outline" className="w-fit">
          {document.category}
        </Badge>

        {/* Metadata */}
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

        {/* Actions */}
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
