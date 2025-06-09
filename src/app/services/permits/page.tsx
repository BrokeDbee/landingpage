import { FileText, Clock, CheckCircle } from "lucide-react";
import Link from "next/link";

const permitServices = [
  {
    title: "Request Permit",
    description: "Submit a new permit request for various student activities",
    icon: FileText,
    href: "/services/permits/request",
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "Check Status",
    description: "Track the status of your submitted permit requests",
    icon: Clock,
    href: "/services/permits/status",
    color: "from-orange-500 to-orange-600",
  },
  {
    title: "Permit History",
    description: "View your past permit requests and their outcomes",
    icon: CheckCircle,
    href: "/services/permits/history",
    color: "from-green-500 to-green-600",
  },
];

export default function PermitsPage() {
  return (
    <div className="container py-12 mx-auto">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900">
          Student Permits
        </h1>
        <p className="mb-8 text-lg text-gray-600">
          Manage your student permits and requests in one place. Submit new
          requests, track their status, and view your permit history.
        </p>
      </div>

      <div className="grid gap-6 mt-12 md:grid-cols-3">
        {permitServices.map((service) => {
          const Icon = service.icon;
          return (
            <Link key={service.title} href={service.href} className="group">
              <div className="h-full p-6 transition-all duration-300 bg-white rounded-xl shadow-sm hover:shadow-md">
                <div
                  className={`inline-flex p-3 mb-4 rounded-lg bg-gradient-to-r ${service.color} text-white`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900 group-hover:text-blue-600">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
