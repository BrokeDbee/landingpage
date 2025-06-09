import { ArrowLeft, Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function PermitStatusPage() {
  return (
    <div className="container py-12 mx-auto">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/services/permits"
          className="inline-flex items-center mb-8 text-sm text-gray-600 hover:text-blue-600"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Permits
        </Link>

        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            Check Permit Status
          </h1>
          <p className="text-gray-600">
            Enter your permit reference number to check the status of your request.
          </p>
        </div>

        <Card className="p-6">
          <div className="space-y-6">
            <div className="relative">
              <Input
                placeholder="Enter permit reference number"
                className="pr-12"
              />
              <Button
                size="icon"
                className="absolute right-1 top-1"
                variant="ghost"
              >
                <Search className="w-4 h-4" />
              </Button>
            </div>

            <div className="p-4 text-center text-gray-500 bg-gray-50 rounded-lg">
              Enter a permit reference number to check its status
            </div>
          </div>
        </Card>

        <div className="mt-8">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            Recent Permits
          </h2>
          <div className="space-y-4">
            {/* This would be populated with actual permit data */}
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">
                    Event Permit #12345
                  </h3>
                  <p className="text-sm text-gray-500">Submitted on Jan 15, 2024</p>
                </div>
                <span className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-full">
                  Pending
                </span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 