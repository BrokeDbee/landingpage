import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function DocumentViewerSkeleton() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="space-y-6">
        {/* Header Skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-md bg-gray-200" />
            <div className="space-y-2">
              <Skeleton className="h-8 w-64 bg-gray-200" />
              <div className="flex items-center gap-4">
                <Skeleton className="h-4 w-24 bg-gray-200" />
                <Skeleton className="h-4 w-20 bg-gray-200" />
                <Skeleton className="h-4 w-28 bg-gray-200" />
              </div>
            </div>
          </div>
          <Skeleton className="h-10 w-32 bg-gray-200" />
        </div>

        {/* Info Card Skeleton */}
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <Skeleton className="h-6 w-20 bg-gray-200" />
              <Skeleton className="h-6 w-16 bg-gray-200" />
              <Skeleton className="h-6 w-12 bg-gray-200" />
            </div>
            <Skeleton className="h-4 w-full bg-gray-200" />
            <Skeleton className="h-4 w-3/4 bg-gray-200 mt-2" />
          </CardContent>
        </Card>

        {/* Preview Skeleton */}
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardContent className="p-8">
            <div className="flex items-center justify-center h-[60vh]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
