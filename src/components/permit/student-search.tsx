import React from "react";
import { motion } from "framer-motion";
import { Search, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { findStudentById } from "@/lib/api";
import { StudentData, FormData } from "@/lib/types";

interface StudentSearchProps {
  studentIdInput: string;
  setStudentIdInput: React.Dispatch<React.SetStateAction<string>>;
  isSearching: boolean;
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
  setStudentData: React.Dispatch<React.SetStateAction<StudentData | null>>;
  setSearchError: React.Dispatch<React.SetStateAction<string | null>>;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  searchError: string | null;
}

export function StudentSearch({
  studentIdInput,
  setStudentIdInput,
  isSearching,
  setIsSearching,
  setStudentData,
  setSearchError,
  setFormData,
  setStep,
  searchError,
}: StudentSearchProps) {
  const handleStudentSearch = async () => {
    if (!studentIdInput.trim()) {
      setSearchError("Please enter a student ID");
      return;
    }

    setIsSearching(true);
    setSearchError(null);

    try {
      const student = await findStudentById(studentIdInput);
      if (student) {
        setStudentData(student);
        setFormData({
          studentId: student.studentId,
          email: student.email,
          name: student.name,
          course: student.course,
          level: student.level,
          number: student.number,
        });
        setStep(1.5);
      } else {
        setSearchError(
          "Student not found. Please enter your details manually."
        );
        setStep(1.1);
      }
    } catch (error) {
      console.error("Error searching for student:", error);
      setSearchError("An error occurred while searching. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

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
          className="flex items-center justify-center w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-orange-500"
        >
          <Search className="w-10 h-10 text-white" />
        </motion.div>
        <h3 className="mb-2 text-3xl font-bold text-gray-800">
          Student Verification
        </h3>
        <p className="text-gray-600">
          Please enter your student ID to begin the permit request process
        </p>
      </div>

      <div className="p-8 border border-gray-200 rounded-xl bg-gray-50">
        <div className="flex flex-col gap-4">
          <label className="block font-medium text-gray-700">Student ID</label>
          <div className="flex gap-3 flex-wrap">
            <Input
              type="text"
              value={studentIdInput}
              onChange={(e) => setStudentIdInput(e.target.value)}
              placeholder="e.g., 2023001"
              className="w-full px-4 py-3 text-lg border-2 rounded-xl focus:border-blue-500"
            />
            <Button
              onClick={handleStudentSearch}
              disabled={isSearching || !studentIdInput.trim()}
              className="px-6 py-3 text-white rounded-xl bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700 w-full"
            >
              {isSearching ? (
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              ) : (
                <Search className="w-5 h-5 mr-2" />
              )}
              {isSearching ? "Searching..." : "Search"}
            </Button>
          </div>

          {searchError && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="w-4 h-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{searchError}</AlertDescription>
            </Alert>
          )}
        </div>
      </div>
      <div className="p-4 mt-4 border border-blue-200 rounded-lg bg-blue-50">
        <p className="text-blue-800">
          <span className="font-semibold">💡 Note:</span> Enter your student ID
          to automatically retrieve your information. If you&apos;re a new
          student or your ID is not found, you&apos;ll be asked to enter your
          details manually.
        </p>
      </div>
    </motion.div>
  );
}
