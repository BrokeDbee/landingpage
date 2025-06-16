import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ExecutivesListSkeleton() {
  return (
    <div className="space-y-8">
      {/* Filters Skeleton */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <Skeleton className="h-10 flex-1 bg-gray-200" />
          <Skeleton className="h-10 w-64 bg-gray-200" />
        </div>
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-32 bg-gray-200" />
          <Skeleton className="h-4 w-24 bg-gray-200" />
        </div>
      </div>

      {/* Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i} className="bg-white border-gray-200">
            <CardContent className="p-6 space-y-4">
              <Skeleton className="w-24 h-24 rounded-full mx-auto bg-gray-200" />
              <div className="text-center space-y-2">
                <Skeleton className="h-5 w-32 mx-auto bg-gray-200" />
                <Skeleton className="h-4 w-24 mx-auto bg-gray-200" />
                <Skeleton className="h-3 w-40 mx-auto bg-gray-200" />
              </div>
              <Skeleton className="h-6 w-20 mx-auto bg-gray-200" />
              <div className="space-y-2">
                <Skeleton className="h-3 w-full bg-gray-200" />
                <Skeleton className="h-3 w-3/4 mx-auto bg-gray-200" />
              </div>
              <div className="flex justify-center gap-2">
                <Skeleton className="h-8 w-8 bg-gray-200" />
                <Skeleton className="h-8 w-8 bg-gray-200" />
                <Skeleton className="h-8 w-8 bg-gray-200" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
