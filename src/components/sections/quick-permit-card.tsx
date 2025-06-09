import { FileText } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function QuickPermitCard() {
  return (
    <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100/50">
      <div className="flex items-start gap-4">
        <div className="p-3 text-white rounded-lg bg-gradient-to-r from-blue-600 to-blue-700">
          <FileText className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h3 className="mb-2 text-xl font-semibold text-gray-900">
            Need a Permit?
          </h3>
          <p className="mb-4 text-gray-600">
            Submit your permit request for exams. Quick and easy process!
          </p>
          <Link href="/services/permits/request">
            <Button className="w-full sm:w-auto">Request Permit</Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
