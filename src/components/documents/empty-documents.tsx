"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Search, Upload } from "lucide-react";

interface EmptyDocumentsProps {
  hasFilters: boolean;
}

export function EmptyDocuments({ hasFilters }: EmptyDocumentsProps) {
  if (hasFilters) {
    return (
      <Card className="bg-white border-gray-200">
        <CardContent className="p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <Search className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No documents found
          </h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search terms or filters to find what you&apos;re
            looking for.
          </p>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Clear filters
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white border-gray-200">
      <CardContent className="p-12 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-orange-50 flex items-center justify-center">
          <FileText className="h-8 w-8 text-orange-500" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No documents yet
        </h3>
        <p className="text-gray-600 mb-6">
          Get started by uploading your first document to the library.
        </p>
        <Button className="bg-orange-600 hover:bg-orange-700 gap-2">
          <Upload className="h-4 w-4" />
          Upload Document
        </Button>
      </CardContent>
    </Card>
  );
}
