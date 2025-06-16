"use client";

import type React from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Search,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  User,
  FileText,
  Calendar,
  GraduationCap,
  Shield,
  Loader2,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  checkPermitStatus,
  checkStudentStatus,
} from "@/lib/api/services/student";

interface PermitStatus {
  valid: boolean;
  permit?: {
    student: {
      name: string;
      studentId: string;
      course: string;
      level: string;
    };
    expiryDate: string;
    issueDate: string;
    permitNumber: string;
    semester: string;
    academicYear: string;
  };
  reason?: string;
}

interface StudentStatus {
  hasActivePermit: boolean;
  permit?: {
    originalCode: string;
    expiryDate: string;
    issueDate: string;
    permitNumber: string;
    semester: string;
  };
  validity?: {
    daysRemaining: number;
    status: string;
  };
  message?: string;
}

export default function PermitStatusPage() {
  const [activeTab, setActiveTab] = useState("permit");
  const [permitCode, setPermitCode] = useState("");
  const [studentId, setStudentId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [permitStatus, setPermitStatus] = useState<PermitStatus | null>(null);
  const [studentStatus, setStudentStatus] = useState<StudentStatus | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  const fetchPermitStatus = async () => {
    if (!permitCode.trim()) {
      setError("Please enter a permit code");
      return;
    }

    setIsLoading(true);
    setError(null);
    setPermitStatus(null);

    try {
      const data = await checkPermitStatus(permitCode);

      if (!data.success) {
        setError(data.error || "Failed to check permit status");
        return;
      }

      setPermitStatus(data.data!);
    } catch (err) {
      console.error("Error checking permit status:", err);
      setError("Failed to check permit status. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStudentStatus = async () => {
    if (!studentId.trim()) {
      setError("Please enter a student ID");
      return;
    }

    setIsLoading(true);
    setError(null);
    setStudentStatus(null);

    try {
      const data = await checkStudentStatus(studentId);

      if (!data.success) {
        setError(data.error || "Failed to check student status");
        return;
      }

      setStudentStatus(data.data!);
    } catch (err) {
      console.error("Error checking student status:", err);
      setError("Failed to check student status. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === "Enter") {
      action();
    }
  };

  const resetSearch = () => {
    setPermitCode("");
    setStudentId("");
    setPermitStatus(null);
    setStudentStatus(null);
    setError(null);
  };

  const renderPermitStatus = () => {
    if (!permitStatus) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-6"
      >
        <Card
          className={`border-2 ${
            permitStatus.valid
              ? "border-green-200 bg-green-50"
              : "border-red-200 bg-red-50"
          }`}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              {permitStatus.valid ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
                  className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center"
                >
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
                  className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center"
                >
                  <XCircle className="w-6 h-6 text-red-600" />
                </motion.div>
              )}
              <div>
                <h3
                  className={`text-xl font-bold ${
                    permitStatus.valid ? "text-green-800" : "text-red-800"
                  }`}
                >
                  {permitStatus.valid ? "Valid Permit" : "Invalid Permit"}
                </h3>
                <p
                  className={`text-sm ${
                    permitStatus.valid ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {permitStatus.valid
                    ? "This permit is currently active"
                    : "This permit cannot be verified"}
                </p>
              </div>
            </CardTitle>
          </CardHeader>

          {permitStatus.permit && (
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                    <User className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-600">Student Name</p>
                      <p className="font-semibold text-gray-800">
                        {permitStatus.permit.student.name}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                    <Shield className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="text-sm text-gray-600">Student ID</p>
                      <p className="font-semibold text-gray-800">
                        {permitStatus.permit.student.studentId}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                    <GraduationCap className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-600">Course</p>
                      <p className="font-semibold text-gray-800">
                        {permitStatus.permit.student.course}
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                    <FileText className="w-5 h-5 text-orange-600" />
                    <div>
                      <p className="text-sm text-gray-600">Permit Number</p>
                      <p className="font-semibold text-gray-800">
                        {permitStatus.permit.permitNumber}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                    <Calendar className="w-5 h-5 text-red-600" />
                    <div>
                      <p className="text-sm text-gray-600">Expiry Date</p>
                      <p className="font-semibold text-gray-800">
                        {new Date(
                          permitStatus.permit.expiryDate
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                    <Clock className="w-5 h-5 text-indigo-600" />
                    <div>
                      <p className="text-sm text-gray-600">Level & Semester</p>
                      <p className="font-semibold text-gray-800">
                        Level {permitStatus.permit.student.level} -{" "}
                        {permitStatus.permit.semester}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </CardContent>
          )}

          {permitStatus.reason && (
            <CardContent>
              <Alert variant="destructive">
                <AlertCircle className="w-4 h-4" />
                <AlertTitle>Permit Issue</AlertTitle>
                <AlertDescription>
                  {permitStatus.reason === "expired"
                    ? "This permit has expired and is no longer valid for examinations."
                    : "The permit code you entered was not found in our system. Please check the code and try again."}
                </AlertDescription>
              </Alert>
            </CardContent>
          )}
        </Card>
      </motion.div>
    );
  };

  const renderStudentStatus = () => {
    if (!studentStatus) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-6"
      >
        <Card
          className={`border-2 ${
            studentStatus.hasActivePermit
              ? "border-green-200 bg-green-50"
              : "border-yellow-200 bg-yellow-50"
          }`}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              {studentStatus.hasActivePermit ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
                  className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center"
                >
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
                  className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center"
                >
                  <AlertCircle className="w-6 h-6 text-yellow-600" />
                </motion.div>
              )}
              <div>
                <h3
                  className={`text-xl font-bold ${
                    studentStatus.hasActivePermit
                      ? "text-green-800"
                      : "text-yellow-800"
                  }`}
                >
                  {studentStatus.hasActivePermit
                    ? "Active Permit Found"
                    : "No Active Permit"}
                </h3>
                <p
                  className={`text-sm ${
                    studentStatus.hasActivePermit
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {studentStatus.hasActivePermit
                    ? "You have a valid permit for examinations"
                    : "No current permit found for this student"}
                </p>
              </div>
            </CardTitle>
          </CardHeader>

          <CardContent>
            {studentStatus.hasActivePermit && studentStatus.permit && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-600">Permit Code</p>
                      <p className="font-semibold text-gray-800">
                        {studentStatus.permit.originalCode}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                    <Calendar className="w-5 h-5 text-red-600" />
                    <div>
                      <p className="text-sm text-gray-600">Expiry Date</p>
                      <p className="font-semibold text-gray-800">
                        {new Date(
                          studentStatus.permit.expiryDate
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                {studentStatus.validity && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="p-4 bg-blue-50 rounded-lg border border-blue-200"
                  >
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-sm text-blue-600">Validity Status</p>
                        <p className="font-semibold text-blue-800">
                          {studentStatus.validity.daysRemaining} days remaining
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {!studentStatus.hasActivePermit && (
              <Alert>
                <AlertCircle className="w-4 h-4" />
                <AlertTitle>No Active Permit</AlertTitle>
                <AlertDescription>{studentStatus.message}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden min-h-screen">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div
          className={`absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><g fill="#000000" fillOpacity=".1"><path d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]`}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link
              href="/services/permits"
              className="inline-flex items-center mb-6 text-sm text-gray-600 hover:text-blue-600 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Permits
            </Link>

            <div className="text-center">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Search className="w-10 h-10 text-white" />
              </motion.div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Check Permit Status
              </h1>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Verify the status of your exam permit using either the permit
                code or your student ID.
              </p>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-8 shadow-2xl border border-gray-100">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="space-y-6"
              >
                <TabsList className="grid w-full grid-cols-2 h-12">
                  <TabsTrigger
                    value="permit"
                    className="text-xs md:text-sm font-medium "
                  >
                    Check by Permit Code
                  </TabsTrigger>
                  <TabsTrigger
                    value="student"
                    className="text-xs md:text-sm font-medium"
                  >
                    Check by Student ID
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="permit" className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Permit Code
                      </label>
                      <div className="relative">
                        <Input
                          placeholder="e.g., KU-2024-EXAM001"
                          value={permitCode}
                          onChange={(e) => setPermitCode(e.target.value)}
                          onKeyPress={(e) =>
                            handleKeyPress(e, fetchPermitStatus)
                          }
                          className="pr-24 h-12 text-lg"
                          disabled={isLoading}
                        />
                        <div className="absolute right-2 top-2 flex gap-2">
                          {(permitCode || permitStatus) && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={resetSearch}
                              className="h-8 w-8 p-0"
                            >
                              <RefreshCw className="w-4 h-4" />
                            </Button>
                          )}
                          <Button
                            size="sm"
                            onClick={fetchPermitStatus}
                            disabled={isLoading || !permitCode.trim()}
                            className="h-8 px-3"
                          >
                            {isLoading ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Search className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-blue-800 text-sm">
                        <span className="font-semibold">💡 Tip:</span> Your
                        permit code can be found on your exam permit document or
                        in your confirmation email.
                      </p>
                    </div>
                  </motion.div>

                  <AnimatePresence>{renderPermitStatus()}</AnimatePresence>
                </TabsContent>

                <TabsContent value="student" className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Student ID
                      </label>
                      <div className="relative">
                        <Input
                          placeholder="e.g., 2023001"
                          value={studentId}
                          onChange={(e) => setStudentId(e.target.value)}
                          onKeyPress={(e) =>
                            handleKeyPress(e, fetchStudentStatus)
                          }
                          className="pr-24 h-12 text-lg"
                          disabled={isLoading}
                        />
                        <div className="absolute right-2 top-2 flex gap-2">
                          {(studentId || studentStatus) && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={resetSearch}
                              className="h-8 w-8 p-0"
                            >
                              <RefreshCw className="w-4 h-4" />
                            </Button>
                          )}
                          <Button
                            size="sm"
                            onClick={fetchStudentStatus}
                            disabled={isLoading || !studentId.trim()}
                            className="h-8 px-3"
                          >
                            {isLoading ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Search className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-green-800 text-sm">
                        <span className="font-semibold">💡 Tip:</span> Enter
                        your student ID to check if you have any active permits
                        for the current semester.
                      </p>
                    </div>
                  </motion.div>

                  <AnimatePresence>{renderStudentStatus()}</AnimatePresence>
                </TabsContent>
              </Tabs>

              {/* Error Display */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6"
                  >
                    <Alert variant="destructive">
                      <AlertCircle className="w-4 h-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Loading State */}
              <AnimatePresence>
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="mt-6 text-center py-8"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                      className="w-12 h-12 mx-auto mb-4"
                    >
                      <Loader2 className="w-12 h-12 text-blue-600" />
                    </motion.div>
                    <p className="text-gray-600">Checking permit status...</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>

          {/* Help Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Need Help?
              </h3>
              <p className="text-gray-600 mb-6">
                If you&apos;re having trouble finding your permit or need
                assistance, our support team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Link href="/services/permits/request">
                    Request New Permit
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/contact">Contact Support</Link>
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
