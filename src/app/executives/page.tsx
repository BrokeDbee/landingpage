import { Suspense } from "react";
import { ExecutivesHeader } from "@/components/executives/executives-header";
import { ExecutivesList } from "@/components/executives/executives-list";
import { ExecutivesListSkeleton } from "@/components/executives/executives-list-skeleton";

export default function ExecutivesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50">
      <div className="container mx-auto py-8 px-4 max-w-7xl">
        <div className="space-y-8">
          <ExecutivesHeader />
          <Suspense fallback={<ExecutivesListSkeleton />}>
            <ExecutivesList />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
