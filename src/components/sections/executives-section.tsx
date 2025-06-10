"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
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
}

export default function ExecutivesSection() {
  const [executives, setExecutives] = useState<Executive[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExecutives = async () => {
      try {
        const data = await getExecutives("main_executive");

        if (!data.success) {
          throw new Error(data.error || "Failed to fetch executives");
        }

        setExecutives(data.data);
      } catch (err: any) {
        setError(err.message);
        console.error("Error fetching executives:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExecutives();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
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
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Meet Our Leadership
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our dedicated team of executives works tirelessly to ensure the
            success of our students and the growth of our institution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {executives.map((executive, index) => (
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

                    <div className="flex justify-center gap-3 mb-4">
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
                    </div>
                  </div>
                </CardContent>
              </Card>
              </motion.div>
            ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg">
            <Link href="/executives">
              View All Executives
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
