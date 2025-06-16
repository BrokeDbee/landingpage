"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { getExecutives } from "@/lib/api/services/executive";
import { ExecutiveCard } from "@/components/executives/executive-card";
import { ExecutivesFilters } from "@/components/executives/executives-filters";
import { ExecutivesListSkeleton } from "@/components/executives/executives-list-skeleton";
import { EmptyExecutives } from "@/components/executives/empty-executives";
import { ErrorBoundary } from "@/components/error-boundary";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { User } from "@prisma/client";

interface ExecutivesState {
  executives: User[];
  loading: boolean;
  error: string | null;
}

interface FiltersState {
  search: string;
  category: string;
}

export function ExecutivesList() {
  const [state, setState] = useState<ExecutivesState>({
    executives: [],
    loading: true,
    error: null,
  });

  const [filters, setFilters] = useState<FiltersState>({
    search: "",
    category: "all",
  });

  useEffect(() => {
    const fetchExecutives = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));

        const response = await getExecutives(
          filters.category === "all" ? undefined : filters.category
        );

        if (response.success && response.data) {
          setState((prev) => ({
            ...prev,
            executives: response.data || [],
            loading: false,
          }));
        } else {
          setState((prev) => ({
            ...prev,
            error: response.error || "Failed to load executives",
            loading: false,
          }));
        }
      } catch (error) {
        console.error("Error fetching executives:", error);
        setState((prev) => ({
          ...prev,
          error: "An unexpected error occurred",
          loading: false,
        }));
      }
    };

    fetchExecutives();
  }, [filters.category]);

  // Client-side search filtering
  const filteredExecutives = useMemo(() => {
    if (!filters.search) return state.executives;

    const searchLower = filters.search.toLowerCase();
    return state.executives.filter(
      (executive) =>
        executive.name.toLowerCase().includes(searchLower) ||
        executive.position?.toLowerCase().includes(searchLower) ||
        executive.positionDescription?.toLowerCase().includes(searchLower) ||
        executive.biography?.toLowerCase().includes(searchLower)
    );
  }, [state.executives, filters.search]);

  const updateFilters = (newFilters: Partial<FiltersState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  if (state.loading) {
    return <ExecutivesListSkeleton />;
  }

  if (state.error) {
    return (
      <Alert className="border-red-200 bg-red-50">
        <AlertCircle className="h-4 w-4 text-red-600" />
        <AlertDescription className="text-red-800">
          {state.error}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <ErrorBoundary>
      <div className="space-y-8">
        <ExecutivesFilters
          filters={filters}
          onFiltersChange={updateFilters}
          totalExecutives={state.executives.length}
        />

        {filteredExecutives.length === 0 ? (
          <EmptyExecutives
            hasFilters={!!(filters.search || filters.category !== "all")}
          />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredExecutives.map((executive, index) => (
              <motion.div
                key={executive.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ExecutiveCard executive={executive} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </ErrorBoundary>
  );
}
