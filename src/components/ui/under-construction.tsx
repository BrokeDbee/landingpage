import { Construction } from "lucide-react";

export default function UnderConstruction() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
      <Construction className="w-16 h-16 mb-4 text-orange-500 animate-bounce" />
      <h1 className="mb-2 text-3xl font-bold text-gray-800">Under Construction</h1>
      <p className="max-w-md text-gray-600">
        We&apos;re working hard to bring you this page. Please check back soon!
      </p>
    </div>
  );
} 