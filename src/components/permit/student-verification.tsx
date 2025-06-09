import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, User } from "lucide-react";

import { StudentData, FormData } from "@/lib/types";
import { Button } from "../ui/button";

interface StudentVerificationProps {
  studentData: StudentData | null;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

export function StudentVerification({
  studentData,
  setStep,
}: StudentVerificationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="mb-8 text-center">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 360 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500 to-blue-500"
        >
          <CheckCircle className="w-10 h-10 text-white" />
        </motion.div>
        <h3 className="mb-2 text-3xl font-bold text-gray-800">Student Found</h3>
        <p className="text-gray-600">
          We&apos;ve found your information in our system
        </p>
      </div>

      <div className="p-6 mb-6 border border-green-200 rounded-xl bg-green-50">
        <div className="flex items-start gap-4 flex-wrap">
          <div className="p-3 bg-green-100 rounded-full">
            <User className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h4 className="mb-2 text-xl font-semibold text-gray-800">
              {studentData?.name}
            </h4>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              <p className="text-gray-600">
                <span className="font-medium">ID:</span>{" "}
                {studentData?.studentId}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Email:</span> {studentData?.email}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Course:</span>{" "}
                {studentData?.course}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Level:</span> {studentData?.level}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Phone Number:</span>{" "}
                {studentData?.number}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-12">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={() => setStep(1)}
            variant="outline"
            className="px-8 py-3 border-2 border-gray-300 rounded-full hover:bg-gray-50"
          >
            Previous
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={() => {
              setStep(2);
            }}
            className="px-8 py-3 text-white rounded-full bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700"
          >
            Next
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
