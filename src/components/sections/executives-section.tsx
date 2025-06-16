"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getExecutives } from "@/lib/api/services/executive";
import { User } from "@prisma/client";

export default function ExecutivesSection() {
  const [executives, setExecutives] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExecutives = async () => {
      try {
        const data = await getExecutives("main_executive");

        if (!data.success) {
          throw new Error(data.error || "Failed to fetch executives");
        }

        setExecutives(data.data || []);
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
