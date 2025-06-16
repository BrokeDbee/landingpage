import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function DocumentsListSkeleton() {
  return (
    <div className="space-y-6">
      {/* Filters Skeleton */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <Skeleton className="h-10 flex-1 bg-gray-200" />
          <Skeleton className="h-10 w-48 bg-gray-200" />
          <Skeleton className="h-10 w-48 bg-gray-200" />
          <Skeleton className="h-10 w-10 bg-gray-200" />
        </div>
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-32 bg-gray-200" />
          <Skeleton className="h-4 w-24 bg-gray-200" />
        </div>
      </div>

      {/* Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i} className="bg-white border-gray-200">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2 flex-1">
                  <Skeleton className="h-9 w-9 rounded-lg bg-gray-200" />
                  <div className="flex-1 space-y-1">
                    <Skeleton className="h-5 w-full bg-gray-200" />
                    <Skeleton className="h-4 w-20 bg-gray-200" />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-full bg-gray-200" />
                <Skeleton className="h-4 w-3/4 bg-gray-200" />
              </div>
              <Skeleton className="h-6 w-20 bg-gray-200" />
              <div className="space-y-2">
                <Skeleton className="h-3 w-24 bg-gray-200" />
                <Skeleton className="h-3 w-20 bg-gray-200" />
                <Skeleton className="h-3 w-28 bg-gray-200" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-8 flex-1 bg-gray-200" />
                <Skeleton className="h-8 w-10 bg-gray-200" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
