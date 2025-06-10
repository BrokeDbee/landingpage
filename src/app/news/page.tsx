"use client";

import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { getNewsArticles } from "@/lib/api";

interface NewsArticle {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  image: string;
  category: string;
  categoryColor: string;
  featured: boolean;
  published: boolean;
  publishedAt: string;
  readTime: string;
  author: {
    name: string;
    image: string;
  };
}

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
    className={className}
  >
    {children}
  </motion.div>
);

export default function NewsPage() {
  const { data: articles, isLoading } = useQuery<NewsArticle[]>({
    queryKey: ["news"],
    queryFn: async () => {
      const response = await getNewsArticles({
        page: 1,
        limit: 10,
        category: undefined,
      });
      return response.data.articles;
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
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
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Latest News & Updates
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Stay informed about the latest developments, initiatives, and
          opportunities that shape our campus community.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {articles?.map((article) => (
          <motion.div key={article.id} variants={itemVariants}>
            <CardHover>
              <Card className="group overflow-hidden h-full">
                <div className="relative overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {article.featured && (
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-gradient-to-r from-blue-600 to-orange-600 text-white">
                        Featured
                      </Badge>
                    </div>
                  )}
                </div>

                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="text-xs bg-blue-100 text-blue-700">
                          {article.author.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span>{article.author.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(article.publishedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <Badge
                    variant="outline"
                    className={`mb-4 ${article.categoryColor}`}
                  >
                    {article.category}
                  </Badge>

                  <CardTitle className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                    {article.title}
                  </CardTitle>

                  <CardDescription className="text-gray-600 mb-4 line-clamp-3">
                    {article.excerpt}
                  </CardDescription>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{article.readTime}</span>
                    </div>
                    <Button
                      variant="ghost"
                      className="text-blue-600 hover:text-blue-700"
                      asChild
                    >
                      <Link href={`/news/${article.slug}`}>Read More</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </CardHover>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
