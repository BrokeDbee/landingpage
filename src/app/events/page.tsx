"use client";

import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Search, Filter, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/use-debounce";
import { format } from "date-fns";
import { getEvents, type Event } from "@/lib/api/services/event";

const CATEGORIES = [
  { value: "all", label: "All Categories" },
  { value: "academic", label: "Academic" },
  { value: "social", label: "Social" },
  { value: "sports", label: "Sports" },
  { value: "cultural", label: "Cultural" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const CardHover = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <motion.div
    whileHover={{
      y: -5,
      transition: { duration: 0.2 },
    }}
    whileTap={{ scale: 0.98 }}
    className={className + " h-full"}
  >
    {children}
  </motion.div>
);

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearch = useDebounce(searchQuery, 300);

  const {
    data: eventsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["events", currentPage, debouncedSearch, categoryFilter],
    queryFn: async () => {
      const response = await getEvents({
        page: currentPage,
        limit: 12,
        search: debouncedSearch || undefined,
        category: categoryFilter === "all" ? undefined : categoryFilter,
        published: true,
      });

      if (!response.success) {
        throw new Error(response.error || "Failed to fetch events");
      }

      return response.data;
    },
  });

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setCategoryFilter(value);
    setCurrentPage(1);
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
        <p className="text-gray-600 mb-8">
          Failed to load events. Please try again later.
        </p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-orange-800 bg-clip-text text-transparent">
              Upcoming Events
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover and join exciting events happening on campus. From academic
            conferences to cultural celebrations, there&apos;s something for
            everyone.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row gap-4 mb-12 max-w-2xl mx-auto"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search events..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>

          <Select value={categoryFilter} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-full md:w-[200px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="w-full h-48" />
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Events Grid */}
        {!isLoading && eventsData && (
          <>
            {eventsData.events.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <h3 className="text-2xl font-semibold mb-4">No events found</h3>
                <p className="text-gray-600 mb-8">
                  Try adjusting your search or filter criteria.
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery("");
                    setCategoryFilter("all");
                  }}
                >
                  Clear Filters
                </Button>
              </motion.div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {eventsData.events.map((event: Event) => (
                  <motion.div key={event.id} variants={itemVariants}>
                    <CardHover>
                      <Card className="group overflow-hidden h-full shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm py-0">
                        <div className="relative overflow-hidden">
                          <Image
                            src={event.image || "/placeholder.svg"}
                            alt={event.title}
                            width={400}
                            height={300}
                            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          {event.featured && (
                            <div className="absolute top-4 left-4">
                              <Badge className="bg-gradient-to-r from-blue-600 to-orange-600 text-white">
                                ⭐ Featured
                              </Badge>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <div className="flex flex-col flex-1 group-hover:text-blue-600 transition-colors duration-300 p-6">
                          <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                              <Avatar className="w-6 h-6">
                                <AvatarImage
                                  src={event.organizer.image || ""}
                                  alt={event.organizer?.username}
                                />
                                <AvatarFallback className="text-xs bg-blue-100 text-blue-700">
                                  {event.organizer.username.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-medium">
                                {event.organizer.username}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span>
                                {format(new Date(event.date), "MMM dd, yyyy")}
                              </span>
                            </div>
                          </div>

                          <Badge
                            variant="outline"
                            className={`mb-4 ${event.categoryColor}`}
                          >
                            {event.category}
                          </Badge>
                          <CardTitle className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                            {event.title}
                          </CardTitle>

                          <CardDescription className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                            {event.excerpt}
                          </CardDescription>

                          <div className="mt-auto space-y-2">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Clock className="w-4 h-4" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <MapPin className="w-4 h-4" />
                              <span>{event.location}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Users className="w-4 h-4" />
                              <span>
                                {event.currentAttendees} / {event.maxAttendees}{" "}
                                attendees
                              </span>
                            </div>
                          </div>

                          <Button
                            variant="ghost"
                            className="mt-4 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            asChild
                          >
                            <Link href={`/events/${event.slug}`}>
                              View Details
                            </Link>
                          </Button>
                        </div>
                      </Card>
                    </CardHover>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Pagination */}
            {eventsData.total > 12 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex justify-center mt-12"
              >
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <span className="flex items-center px-4 text-sm text-gray-600">
                    Page {currentPage} of {Math.ceil(eventsData.total / 12)}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage >= Math.ceil(eventsData.total / 12)}
                  >
                    Next
                  </Button>
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
