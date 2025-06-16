"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Filter, X } from "lucide-react";

interface FiltersState {
  search: string;
  category: string;
}

interface ExecutivesFiltersProps {
  filters: FiltersState;
  onFiltersChange: (filters: Partial<FiltersState>) => void;
  totalExecutives: number;
}

const categories = [
  { value: "all", label: "All Categories" },
  { value: "main_executive", label: "Main Executives" },
  { value: "other_executive", label: "Other Executives" },
  { value: "all_present", label: "All Present" },
];

export function ExecutivesFilters({
  filters,
  onFiltersChange,
  totalExecutives,
}: ExecutivesFiltersProps) {
  const hasActiveFilters = filters.search || filters.category !== "all";

  const clearFilters = () => {
    onFiltersChange({
      search: "",
      category: "all",
    });
  };

  return (
    <div className="space-y-4">
      {/* Search and Category Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search executives by name, position, or description..."
            value={filters.search}
            onChange={(e) => onFiltersChange({ search: e.target.value })}
            className="pl-10"
          />
        </div>

        <Select
          value={filters.category}
          onValueChange={(value) => onFiltersChange({ category: value })}
        >
          <SelectTrigger className="w-full sm:w-64">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Active Filters and Results Count */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-gray-600">
            {totalExecutives} executive{totalExecutives !== 1 ? "s" : ""} found
          </span>

          {filters.search && (
            <Badge variant="secondary" className="gap-1">
              Search: {filters.search}
              <button
                onClick={() => onFiltersChange({ search: "" })}
                className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}

          {filters.category !== "all" && (
            <Badge variant="secondary" className="gap-1">
              Category:{" "}
              {categories.find((c) => c.value === filters.category)?.label}
              <button
                onClick={() => onFiltersChange({ category: "all" })}
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
