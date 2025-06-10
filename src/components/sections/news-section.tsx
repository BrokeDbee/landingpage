"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, Clock, BookOpen, Zap } from "lucide-react";
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
      delayChildren: 0.2,
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
      ease: "easeOut",
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
      transition: { duration: 0.2, ease: "easeOut" },
    }}
    whileTap={{ scale: 0.98 }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function NewsSection() {
  const { data: articles, isLoading } = useQuery<NewsArticle[]>({
    queryKey: ["featured-news"],
    queryFn: async () => {
      const response = await getNewsArticles({
        featured: true,
      });
      if (!response.success) {
        throw new Error("Failed to fetch news articles");
      }

      return response.data.articles;
    },
  });

  if (isLoading) {
    return (
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        <div className="container relative z-10 px-4 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <Skeleton className="w-full h-80 mb-4" />
              <Skeleton className="h-8 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            <div className="lg:col-span-4 space-y-6">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-32" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  console.log("Fetched articles:", articles);

  if (!articles || articles.length === 0) {
    return null;
  }

  const featuredArticle = articles[0];
  const sideArticles = articles.slice(1);

  return (
    <section
      className="relative py-24 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30"
      id="news"
      aria-label="Campus News Section"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-100/30 to-orange-100/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 70,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-emerald-100/30 to-cyan-100/30 rounded-full blur-3xl"
        />
      </div>

      <div className="container relative z-10 px-4 mx-auto max-w-7xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col items-start justify-between gap-6 mb-16 md:flex-row md:items-end"
        >
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex items-center gap-2"
            >
              <Zap className="w-6 h-6 text-blue-600" />
              <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
                Latest Updates
              </span>
            </motion.div>
            <h2 className="text-4xl font-bold text-gray-900 md:text-6xl">
              <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-orange-800 bg-clip-text text-transparent">
                Campus News
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
              Stay informed about the latest developments, initiatives, and
              opportunities that shape our campus community.
            </p>
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              asChild
            >
              <Link href="/news">
                <BookOpen className="w-4 h-4 mr-2" />
                View All Articles
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* News Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-8 lg:grid-cols-12"
        >
          {/* Featured Article */}
          <motion.div variants={itemVariants} className="lg:col-span-8">
            <CardHover>
              <Card className="group overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm pb-0">
                <div className="relative overflow-hidden">
                  <Image
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    width={800}
                    height={600}
                    className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-6 left-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: "spring" }}
                    >
                      <Badge className="bg-gradient-to-r from-blue-600 to-orange-600 text-white border-0 px-4 py-2 text-sm font-semibold">
                        ⭐ Featured Story
                      </Badge>
                    </motion.div>
                  </div>
                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <Badge
                      variant="secondary"
                      className={featuredArticle.categoryColor}
                    >
                      {featuredArticle.category}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-8">
                  <div className="flex items-center gap-6 mb-6 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="text-xs bg-blue-100 text-blue-700">
                          {featuredArticle.author.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">
                        {featuredArticle.author.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(
                          featuredArticle.publishedAt
                        ).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{featuredArticle.readTime}</span>
                    </div>
                  </div>

                  <CardTitle className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                    {featuredArticle.title}
                  </CardTitle>

                  <CardDescription className="text-gray-600 text-lg leading-relaxed mb-6">
                    {featuredArticle.excerpt}
                  </CardDescription>

                  <motion.div
                    whileHover={{ x: 5 }}
                    className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors cursor-pointer"
                  >
                    <Link href={`/news/${featuredArticle.slug}`}>
                      Continue Reading
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </motion.div>
                </CardContent>
              </Card>
            </CardHover>
          </motion.div>

          {/* Side Articles */}
          <div className="lg:col-span-4 space-y-6">
            {sideArticles.map((article, index) => (
              <motion.div
                key={article.id}
                variants={itemVariants}
                custom={index}
              >
                <CardHover>
                  <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm h-full my-0 py-0">
                    <div className="flex h-full">
                      <div className="relative w-24 flex-shrink-0 overflow-hidden">
                        <Image
                          width={400}
                          height={300}
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10 group-hover:to-black/20 transition-all duration-300" />
                      </div>

                      <CardContent className="flex-1 p-4 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <Badge
                              variant="outline"
                              className={`text-xs ${article.categoryColor}`}
                            >
                              {article.category}
                            </Badge>
                          </div>

                          <CardTitle className="text-base font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                            {article.title}
                          </CardTitle>

                          <CardDescription className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {article.excerpt}
                          </CardDescription>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Avatar className="w-4 h-4">
                                <AvatarFallback className="text-xs bg-gray-100 text-gray-600">
                                  {article.author.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <span>{article.author.name}</span>
                            </div>
                            <span>
                              {new Date(
                                article.publishedAt
                              ).toLocaleDateString()}
                            </span>
                          </div>

                          <motion.div
                            whileHover={{ x: 3 }}
                            className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
                          >
                            <Link href={`/news/${article.slug}`}>
                              Read More
                              <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                            </Link>
                          </motion.div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </CardHover>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
