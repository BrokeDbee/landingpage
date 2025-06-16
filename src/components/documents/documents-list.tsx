"use client";

import { useEffect, useState, useMemo } from "react";
import {
  DocumentWithRelations,
  getDocuments,
} from "@/lib/api/services/documents";
import { DocumentCard } from "@/components/documents/document-card";
import { DocumentsFilters } from "@/components/documents/documents-filters";
import { DocumentsPagination } from "@/components/documents/documents-pagination";
import { DocumentsListSkeleton } from "@/components/documents/documents-list-skeleton";
import { EmptyDocuments } from "@/components/documents/empty-documents";
import { ErrorBoundary } from "@/components/error-boundary";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface DocumentsState {
  documents: DocumentWithRelations[];
  total: number;
  loading: boolean;
  error: string | null;
}

interface FiltersState {
  search: string;
  category: string;
  sortBy: "title" | "createdAt" | "downloads";
  sortOrder: "asc" | "desc";
  page: number;
  limit: number;
}

export function DocumentsList() {
  const [state, setState] = useState<DocumentsState>({
    documents: [],
    total: 0,
    loading: true,
    error: null,
  });

  const [filters, setFilters] = useState<FiltersState>({
    search: "",
    category: "",
    sortBy: "createdAt",
    sortOrder: "desc",
    page: 1,
    limit: 12,
  });

  const fetchDocuments = async () => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      const response = await getDocuments({
        page: filters.page,
        limit: filters.limit,
        category: filters.category || undefined,
      });

      if (
        response.success &&
        response.data &&
        response.data.data &&
        response.data.total !== undefined
      ) {
        setState((prev) => ({
          ...prev,
          documents: response.data!.data,
          total: response.data!.total,
          loading: false,
        }));
      } else {
        setState((prev) => ({
          ...prev,
          error: response.error || "Failed to load documents",
          loading: false,
        }));
      }
    } catch (error) {
      console.error("Error fetching documents:", error);
      setState((prev) => ({
        ...prev,
        error: "An unexpected error occurred",
        loading: false,
      }));
    }
  };

  useEffect(() => {
    fetchDocuments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.page, filters.limit, filters.category]);

  // Client-side filtering and sorting
  const filteredAndSortedDocuments = useMemo(() => {
    let filtered = state.documents;

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (doc) =>
          doc.title.toLowerCase().includes(searchLower) ||
          doc.description?.toLowerCase().includes(searchLower) ||
          doc.category.toLowerCase().includes(searchLower)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (filters.sortBy) {
        case "title":
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case "createdAt":
          aValue = new Date(a.createdAt).getTime();
          bValue = new Date(b.createdAt).getTime();
          break;
        case "downloads":
          aValue = a.downloads;
          bValue = b.downloads;
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return filters.sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return filters.sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [state.documents, filters.search, filters.sortBy, filters.sortOrder]);

  const updateFilters = (newFilters: Partial<FiltersState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const totalPages = Math.ceil(state.total / filters.limit);

  if (state.loading) {
    return <DocumentsListSkeleton />;
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
      <div className="space-y-6">
        <DocumentsFilters
          filters={filters}
          onFiltersChange={updateFilters}
          totalDocuments={state.total}
        />

        {filteredAndSortedDocuments.length === 0 ? (
          <EmptyDocuments hasFilters={!!(filters.search || filters.category)} />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAndSortedDocuments.map((document) => (
                <DocumentCard key={document.id} document={document} />
              ))}
            </div>

            {totalPages > 1 && (
              <DocumentsPagination
                currentPage={filters.page}
                totalPages={totalPages}
                onPageChange={(page) => updateFilters({ page })}
              />
            )}
          </>
        )}
      </div>
    </ErrorBoundary>
  );
}
