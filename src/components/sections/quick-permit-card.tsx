import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function QuickPermitCard() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8 lg:p-12">
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
              Quick Permit Application
            </h2>
            <p className="text-gray-600 text-base md:text-lg">
              Apply for your student permit quickly and easily through our
              streamlined process.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="w-full sm:w-auto" asChild>
                <Link
                  href="/services/permits/request"
                  className="flex items-center justify-center"
                >
                  Apply Now
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square md:aspect-auto md:h-full bg-gradient-to-br from-blue-50 to-orange-50 rounded-xl p-6">
              {/* Add your permit card illustration or form here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
