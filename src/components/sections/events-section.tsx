"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Users, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getFeaturedEvents, type Event } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { format } from "date-fns";

const getRandomEventImage = () => {
  return `/images/event-placeholder-${Math.floor(Math.random() * 3) + 1}.svg`;
};

export default function EventsSection() {
  const {
    data: eventsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["featured-events"],
    queryFn: async () => {
      const response = await getFeaturedEvents(4);
      if (!response.success) {
        throw new Error(response.error || "Failed to fetch featured events");
      }
      return response.data.events;
    },
  });

  if (isLoading) {
    return (
      <section
        className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50"
        id="events"
      >
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div className="space-y-2">
              <Skeleton className="h-10 w-64" />
              <Skeleton className="h-5 w-80" />
            </div>
            <Skeleton className="h-10 w-32 mt-4 md:mt-0" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
              >
                <Skeleton className="w-full h-52" />
                <div className="p-6">
                  <Skeleton className="h-7 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-full mb-3" />
                  <Skeleton className="h-4 w-2/3 mb-6" />
                  <div className="space-y-3">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !eventsData || eventsData.length === 0) {
    return null;
  }

  return (
    <section
      className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50"
      id="events"
    >
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12"
        >
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Upcoming <span className="text-primary">Events</span>
            </h2>
            <p className="text-gray-500 max-w-lg">
              Join us for these exciting opportunities to connect, learn, and
              grow
            </p>
          </div>
          <Button variant="outline" className="mt-4 md:mt-0 group" asChild>
            <Link href="/events" className="flex items-center gap-2">
              View Calendar
              <Calendar className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {eventsData.map((event: Event, index: number) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={event.featured ? "md:col-span-2" : ""}
            >
              <div
                className={`
                h-full bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md 
                transition-all duration-300 border border-gray-100
                ${event.featured ? "md:grid md:grid-cols-2" : ""}
              `}
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={event.image || getRandomEventImage()}
                    alt={event.title}
                    width={600}
                    height={400}
                    className={`w-full object-cover transition-transform duration-500 hover:scale-105
                      ${event.featured ? "h-64 md:h-full" : "h-52"}
                    `}
                  />
                  {event.featured && (
                    <div className="absolute top-4 left-4 z-10">
                      <Badge className="bg-primary hover:bg-primary/90 flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        <span>Featured</span>
                      </Badge>
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="font-medium">
                      {event.category}
                    </Badge>
                  </div>
                </div>

                <div className="p-6 flex flex-col h-full">
                  <div className="">
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 mb-6 line-clamp-3">
                      {event.excerpt}
                    </p>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-gray-600">
                      <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-md">
                        <Calendar className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm">
                        {format(new Date(event.date), "MMMM dd, yyyy")}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-gray-600">
                      <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-md">
                        <Clock className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm">{event.time}</span>
                    </div>

                    <div className="flex items-center gap-3 text-gray-600">
                      <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-md">
                        <MapPin className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm">{event.location}</span>
                    </div>

                    <div className="flex items-center gap-3 text-gray-600">
                      <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-md">
                        <Users className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm">
                        {event.currentAttendees} / {event.maxAttendees}{" "}
                        attendees
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/events/${event.slug}`}
                    className="inline-flex items-center text-primary font-medium hover:underline group"
                  >
                    View details
                    <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-10 text-center md:hidden"
        >
          <Button asChild>
            <Link href="/events">View All Events</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
