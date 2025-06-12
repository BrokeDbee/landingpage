"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  MapPin,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getEvent } from "@/lib/api";
import { format } from "date-fns";
import { ShareDialog } from "@/components/ui/share-dialog";

export default function EventPage() {
  const params = useParams();
  const slug = params.slug as string;

  const {
    data: event,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["event", slug],
    queryFn: async () => {
      const response = await getEvent(slug);

      if (!response.success) {
        throw new Error(response.error || "Failed to fetch event");
      }

      return response.data;
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <Skeleton className="w-32 h-10 mb-8" />
            <Skeleton className="w-full h-96 mb-8 rounded-xl" />
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/2 mb-8" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        <div className="container mx-auto px-4 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <h1 className="text-4xl font-bold mb-4">Event Not Found</h1>
            <p className="text-gray-600 mb-8">
              The event you&apos;re looking for doesn&apos;t exist or has been
              removed.
            </p>
            <Button asChild>
              <Link href="/events">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Events
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Navigation */}
          <div className="flex items-center justify-between mb-8">
            <Button variant="ghost" className="hover:bg-white/50" asChild>
              <Link href="/events" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Events
              </Link>
            </Button>

            <ShareDialog
              title="event"
              url={window.location.href}
              description={event.excerpt}
            />
          </div>

          {/* Event Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <Badge className={event.categoryColor}>{event.category}</Badge>
              {event.featured && (
                <Badge className="bg-gradient-to-r from-blue-600 to-orange-600 text-white">
                  ⭐ Featured
                </Badge>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {event.title}
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              {event.excerpt}
            </p>

            {/* Organizer and Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage
                    src={event.organizer.image || ""}
                    alt={event.organizer?.username}
                  />
                  <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold">
                    {event.organizer.username.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-gray-900">
                    {event.organizer.username}
                  </p>
                  <p className="text-gray-500">Organizer</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{format(new Date(event.date), "MMMM dd, yyyy")}</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{event.time}</span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{event.location}</span>
              </div>

              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>
                  {event.currentAttendees} / {event.maxAttendees} attendees
                </span>
              </div>
            </div>
          </motion.div>

          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative overflow-hidden rounded-2xl mb-12 shadow-2xl"
          >
            <Image
              src={event.image || "/placeholder.svg"}
              alt={event.title}
              width={1200}
              height={600}
              className="w-full h-[500px] object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </motion.div>

          {/* Event Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
              <CardContent className="p-8 md:p-12">
                <div className="prose prose-lg prose-gray max-w-none">
                  <div
                    className="leading-relaxed text-gray-700"
                    style={{
                      whiteSpace: "pre-wrap",
                      overflowWrap: "break-word",
                    }}
                  >
                    {event.description}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Event Footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 pt-8 border-t border-gray-200"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-500">
                Organized by{" "}
                <span className="font-semibold text-gray-700">
                  {event.organizer.username}
                </span>
              </div>

              <div className="flex gap-2">
                <ShareDialog
                  title="event"
                  url={window.location.href}
                  description={event.excerpt}
                  trigger={
                    <Button variant="outline" size="sm">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share Event
                    </Button>
                  }
                />
                <Button asChild>
                  <Link href="/events">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    More Events
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
