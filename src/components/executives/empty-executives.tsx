"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Search } from "lucide-react";

interface EmptyExecutivesProps {
  hasFilters: boolean;
}

export function EmptyExecutives({ hasFilters }: EmptyExecutivesProps) {
  if (hasFilters) {
    return (
      <Card className="bg-white border-gray-200">
        <CardContent className="p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <Search className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No executives found
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
          <Users className="h-8 w-8 text-orange-500" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No executives available
        </h3>
        <p className="text-gray-600 mb-6">
          The executive team information is currently being updated.
        </p>
        <Button className="bg-orange-600 hover:bg-orange-700">
          Contact Administration
        </Button>
      </CardContent>
    </Card>
  );
}
