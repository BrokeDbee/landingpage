import React from "react";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormData, StudentData } from "@/lib/types";

interface RequestSummaryProps {
  formData: FormData;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  studentData: StudentData | null;
}

export function RequestSummary({
  formData,
  setStep,
  studentData,
}: RequestSummaryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="mb-8 text-center">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 360 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500 to-blue-500"
        >
          <FileText className="w-10 h-10 text-white" />
        </motion.div>
        <h3 className="mb-2 text-3xl font-bold text-gray-800">
          Request Summary
        </h3>
        <p className="text-gray-600">
          Please review your information before proceeding
        </p>
      </div>

      <div className="p-8 border border-gray-200 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between py-3 border-b border-gray-200">
            <span className="font-medium text-gray-600">Student ID:</span>
            <span className="font-semibold text-gray-800">
              {formData.studentId}
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-between py-3 border-b border-gray-200">
            <span className="font-medium text-gray-600">Name:</span>
            <span className="font-semibold text-gray-800">{formData.name}</span>
          </div>
          <div className="flex flex-wrap items-center justify-between py-3 border-b border-gray-200">
            <span className="font-medium text-gray-600">Course:</span>
            <span className="font-semibold text-gray-800">
              {formData.course}
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-between py-3 border-b border-gray-200">
            <span className="font-medium text-gray-600">Level:</span>
            <span className="font-semibold text-gray-800">
              Level {formData.level}
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-between py-3 border-b border-gray-200">
            <span className="font-medium text-gray-600">Email:</span>
            <span className="font-semibold text-gray-800">
              {formData.email}
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-between py-3">
            <span className="font-medium text-gray-600">Phone Number:</span>
            <span className="font-semibold text-gray-800">
              {formData.number || "Not provided"}
            </span>
          </div>
        </div>
      </div>

      <div className="text-center">
        <p className="mb-4 text-gray-600">
          Please proceed to payment to continue with your permit request.
        </p>
        <div className="p-4 border border-blue-200 bg-blue-50 rounded-xl">
          <p className="font-medium text-blue-800">
            💡 Make sure all information is correct before proceeding to payment
          </p>
        </div>
      </div>

      <div className="flex justify-between mt-12">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={() => setStep(studentData ? 1.5 : 1.1)}
            variant="outline"
            className="px-8 py-3 border-2 border-gray-300 rounded-full hover:bg-gray-50"
          >
            Previous
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={() => setStep(3)}
            className="px-8 py-3 text-white rounded-full bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700"
          >
            Next
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
