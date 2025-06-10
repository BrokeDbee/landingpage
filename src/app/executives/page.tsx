"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { getExecutives } from "@/lib/api";

interface Executive {
  id: number;
  name: string;
  image: string | null;
  position: string;
  positionDescription: string;
  biography: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    website?: string;
  };
  category: string;
}

export default function ExecutivesPage() {
  const [executives, setExecutives] = useState<Executive[]>([]);
  const [filteredExecutives, setFilteredExecutives] = useState<Executive[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    const fetchExecutives = async () => {
      try {
        const data = await getExecutives();

        if (!data.success) {
          throw new Error(data.error || "Failed to fetch executives");
        }

        setExecutives(data.data);
        setFilteredExecutives(data.data);
      } catch (err: any) {
        setError(err.message);
        console.error("Error fetching executives:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExecutives();
  }, []);

  useEffect(() => {
    let filtered = executives;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((exec) => exec.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (exec) =>
          exec.name.toLowerCase().includes(query) ||
          exec.position.toLowerCase().includes(query) ||
          exec.positionDescription.toLowerCase().includes(query)
      );
    }

    setFilteredExecutives(filtered);
  }, [executives, searchQuery, selectedCategory]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Failed to load executives</p>
      </div>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Our Executive Team
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Meet the dedicated leaders who drive our institution forward with
            vision and expertise.
          </p>
        </div>

        {/* Filters */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search executives..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="p-2 border rounded-md bg-white"
            >
              <option value="all">All Categories</option>
              <option value="main_executive">Main Executives</option>
              <option value="other_executive">Other Executives</option>
              <option value="all_present">All Present</option>
            </select>
          </div>
        </div>

        {/* Executive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredExecutives.map((executive, index) => (
            <motion.div
              key={executive.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden">
                    {executive.image ? (
                      <Image
                        src={executive.image}
                        alt={executive.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-4xl font-bold">
                        {executive.name.charAt(0)}
                      </div>
                    )}
                  </div>

                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {executive.name}
                    </h3>
                    <p className="text-blue-600 font-medium mb-3">
                      {executive.position}
                    </p>
                    <p className="text-gray-600 text-sm mb-4">
                      {executive.positionDescription}
                    </p>

                    {executive.biography && (
                      <p className="text-gray-600 text-sm mb-4">
                        {executive.biography}
                      </p>
                    )}

                    <div className="flex justify-center gap-3">
                      {executive.socialLinks?.linkedin && (
                        <a
                          href={executive.socialLinks.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-blue-600 transition-colors"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                          </svg>
                        </a>
                      )}
                      {executive.socialLinks?.twitter && (
                        <a
                          href={executive.socialLinks.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-blue-400 transition-colors"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                          </svg>
                        </a>
                      )}
                      {executive.socialLinks?.github && (
                        <a
                          href={executive.socialLinks.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-gray-900 transition-colors"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                        </a>
                      )}
                      {executive.socialLinks?.website && (
                        <a
                          href={executive.socialLinks.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-blue-500 transition-colors"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                            />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredExecutives.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">
              No executives found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
