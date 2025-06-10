"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "next/navigation";
import { getArticle } from "@/lib/api";

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

export default function ArticlePage() {
  const params = useParams();
  const { data: article, isLoading } = useQuery<NewsArticle>({
    queryKey: ["article", params.slug],
    queryFn: async () => {
      const response = await getArticle(params.slug as string);

      if (!response.success) {
        throw new Error(response.error || "Failed to fetch article");
      }

      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="w-full h-96 mb-8" />
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-4 w-1/2 mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
        <p className="text-gray-600 mb-8">
          The article you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
        <Button asChild>
          <Link href="/news">Back to News</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <Button variant="ghost" className="mb-8 hover:bg-gray-100" asChild>
          <Link href="/news" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to News
          </Link>
        </Button>

        <div className="relative overflow-hidden rounded-xl mb-8">
          <Image
            src={article.image}
            alt={article.title}
            width={1200}
            height={600}
            className="w-full h-[400px] object-cover"
          />
          {article.featured && (
            <div className="absolute top-4 left-4">
              <Badge className="bg-gradient-to-r from-blue-600 to-orange-600 text-white">
                Featured
              </Badge>
            </div>
          )}
        </div>

        <div className="flex items-center gap-6 mb-8 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="text-sm bg-blue-100 text-blue-700">
                {article.author.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className="font-medium">{article.author.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{article.readTime}</span>
          </div>
        </div>

        <Badge variant="outline" className={`mb-6 ${article.categoryColor}`}>
          {article.category}
        </Badge>

        <h1 className="text-4xl font-bold mb-6">{article.title}</h1>

        <div className="prose prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>
      </motion.div>
    </div>
  );
}
