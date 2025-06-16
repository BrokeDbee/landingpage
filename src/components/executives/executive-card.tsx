"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  User as UserIcon,
  Linkedin,
  Twitter,
  Github,
  Globe,
  Mail,
} from "lucide-react";
import Image from "next/image";
import { User } from "@prisma/client";

interface ExecutiveCardProps {
  executive: User;
}

export function ExecutiveCard({ executive }: ExecutiveCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "main_executive":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "other_executive":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "all_present":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "main_executive":
        return "Main Executive";
      case "other_executive":
        return "Executive";
      case "all_present":
        return "Present";
      default:
        return "Executive";
    }
  };

  const socialLinks = [
    {
      icon: Linkedin,
      url: (executive.socialLinks as any)?.linkedin,
      color: "hover:text-blue-600",
    },
    {
      icon: Twitter,
      url: (executive.socialLinks as any)?.twitter,
      color: "hover:text-blue-400",
    },
    {
      icon: Github,
      url: (executive.socialLinks as any)?.github,
      color: "hover:text-gray-900",
    },
    {
      icon: Globe,
      url: (executive.socialLinks as any)?.website,
      color: "hover:text-orange-600",
    },
  ];

  return (
    <Card className="group h-full bg-white border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-orange-200">
      <CardContent className="p-6 space-y-4">
        {/* Profile Image */}
        <div className="relative w-24 h-24 mx-auto">
          {executive.image ? (
            <Image
              src={executive.image || "/placeholder.svg"}
              alt={executive.name}
              fill
              className="object-cover rounded-full border-2 border-gray-100 group-hover:border-orange-200 transition-colors"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center border-2 border-gray-100 group-hover:border-orange-200 transition-colors">
              <UserIcon className="w-10 h-10 text-white" />
            </div>
          )}
        </div>

        {/* Basic Info */}
        <div className="text-center space-y-2">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
            {executive.name}
          </h3>
          <p className="text-orange-600 font-medium">{executive.position}</p>
          {executive.positionDescription && (
            <p className="text-sm text-gray-600">
              {executive.positionDescription}
            </p>
          )}
        </div>

        {/* Category Badge */}
        <div className="flex justify-center">
          <Badge className={getCategoryColor(executive.category || "")}>
            {getCategoryLabel(executive.category || "")}
          </Badge>
        </div>

        {/* Biography */}
        {executive.biography && (
          <p className="text-sm text-gray-600 line-clamp-3 text-center">
            {executive.biography}
          </p>
        )}

        {/* Social Links */}
        <div className="flex justify-center gap-3 pt-2">
          {socialLinks.map(
            ({ icon: Icon, url, color }, index) =>
              url && (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className={`p-2 h-auto text-gray-500 ${color} transition-colors`}
                  onClick={() =>
                    window.open(url, "_blank", "noopener,noreferrer")
                  }
                >
                  <Icon className="h-4 w-4" />
                </Button>
              )
          )}
          {executive.email && (
            <Button
              variant="ghost"
              size="sm"
              className="p-2 h-auto text-gray-500 hover:text-orange-600 transition-colors"
              onClick={() => window.open(`mailto:${executive.email}`, "_blank")}
            >
              <Mail className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
