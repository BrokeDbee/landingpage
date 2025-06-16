"use client";

export function DocumentsHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Documents Library
        </h1>
        <p className="text-gray-600 text-lg">
          Access and manage your important documents and resources
        </p>
      </div>

      <div className="flex items-center gap-3"></div>
    </div>
  );
}
