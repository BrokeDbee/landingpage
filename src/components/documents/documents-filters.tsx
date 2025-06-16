"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X, SortAsc, SortDesc } from "lucide-react";

interface FiltersState {
  search: string;
  category: string;
  sortBy: "title" | "createdAt" | "downloads";
  sortOrder: "asc" | "desc";
  page: number;
  limit: number;
}

interface DocumentsFiltersProps {
  filters: FiltersState;
  onFiltersChange: (filters: Partial<FiltersState>) => void;
  totalDocuments: number;
}

const categories = [
  "All Categories",
  "Academic",
  "Student Life",
  "Administrative",
  "Forms",
  "Policies",
];

export function DocumentsFilters({
  filters,
  onFiltersChange,
  totalDocuments,
}: DocumentsFiltersProps) {
  const hasActiveFilters = filters.search || filters.category;

  const clearFilters = () => {
    onFiltersChange({
      search: "",
      category: "",
      page: 1,
    });
  };

  return (
    <div className="space-y-4">
      {/* Search and Primary Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search documents..."
            value={filters.search}
            onChange={(e) =>
              onFiltersChange({ search: e.target.value, page: 1 })
            }
            className="pl-10"
          />
        </div>

        <Select
          value={filters.category}
          onValueChange={(value) =>
            onFiltersChange({
              category: value === "All Categories" ? "" : value,
              page: 1,
            })
          }
        >
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.sortBy}
          onValueChange={(value: "title" | "createdAt" | "downloads") =>
            onFiltersChange({ sortBy: value })
          }
        >
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="createdAt">Date Created</SelectItem>
            <SelectItem value="title">Title</SelectItem>
            <SelectItem value="downloads">Downloads</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            onFiltersChange({
              sortOrder: filters.sortOrder === "asc" ? "desc" : "asc",
            })
          }
          className="shrink-0"
        >
          {filters.sortOrder === "asc" ? (
            <SortAsc className="h-4 w-4" />
          ) : (
            <SortDesc className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Active Filters and Results Count */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-gray-600">
            {totalDocuments} document{totalDocuments !== 1 ? "s" : ""} found
          </span>

          {filters.search && (
            <Badge variant="secondary" className="gap-1">
              Search: {filters.search}
              <button
                onClick={() => onFiltersChange({ search: "", page: 1 })}
                className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}

          {filters.category && (
            <Badge variant="secondary" className="gap-1">
              Category: {filters.category}
              <button
                onClick={() => onFiltersChange({ category: "", page: 1 })}
                className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-gray-600"
          >
            Clear all filters
          </Button>
        )}
      </div>
    </div>
  );
}
