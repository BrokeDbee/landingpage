"use client";

import type React from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard,
  CheckCircle,
  XCircle,
  Loader2,
  FileText,
  DollarSign,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type PermitResponse = {
  status: "approved" | "rejected" | "pending";
  permitDetails?: {
    permitNumber: string;
    studentId: string;
    fullName: string;
    course: string;
    level: string;
    semester: string;
    academicYear: string;
    issueDate: string;
    expiryDate: string;
  };
  receipt?: {
    receiptNumber: string;
    amount: string;
    paymentDate: string;
    paymentMethod: string;
  };
  message?: string;
};

export default function PermitRequestSection() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [permitResponse, setPermitResponse] = useState<PermitResponse | null>(
    null
  );
  const [paymentStatus, setPaymentStatus] = useState<
    "pending" | "success" | "failed"
  >("pending");
  const [formData, setFormData] = useState({
    studentId: "",
    email: "",
    fullName: "",
    course: "",
    level: "",
    semester: "",
    academicYear: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setPaymentStatus("success");
      setStep(4);
    } catch (error) {
      console.error("Payment failed:", error);
      setPaymentStatus("failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock successful response
      setPermitResponse({
        status: "approved",
        permitDetails: {
          permitNumber:
            "KU-2024-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
          studentId: formData.studentId,
          fullName: formData.fullName,
          course: formData.course,
          level: formData.level,
          semester:
            formData.semester === "1" ? "First Semester" : "Second Semester",
          academicYear: formData.academicYear,
          issueDate: new Date().toLocaleDateString(),
          expiryDate: new Date(
            Date.now() + 180 * 24 * 60 * 60 * 1000
          ).toLocaleDateString(),
        },
        receipt: {
          receiptNumber:
            "RCP-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
          amount: "GH₵100.00",
          paymentDate: new Date().toLocaleDateString(),
          paymentMethod: "Mobile Money",
        },
      });
      setStep(5);
    } catch (error) {
      console.error("Error submitting permit request:", error);
      setPermitResponse({
        status: "rejected",
        message: "Failed to process request. Please try again.",
      });
      setStep(5);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
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
                className="flex items-center justify-center w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-orange-500"
              >
                <User className="w-10 h-10 text-white" />
              </motion.div>
              <h3 className="mb-2 text-3xl font-bold text-gray-800">
                Student Information
              </h3>
              <p className="text-gray-600">
                Please provide your details to continue
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <motion.div whileFocus={{ scale: 1.02 }}>
                <label className="block mb-2 font-medium text-gray-700">
                  Student ID
                </label>
                <Input
                  type="text"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleInputChange}
                  placeholder="Enter your student ID"
                  className="w-full px-4 py-3 border-2 rounded-xl focus:border-blue-500"
                />
              </motion.div>

              <motion.div whileFocus={{ scale: 1.02 }}>
                <label className="block mb-2 font-medium text-gray-700">
                  Email
                </label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border-2 rounded-xl focus:border-blue-500"
                />
              </motion.div>

              <motion.div whileFocus={{ scale: 1.02 }}>
                <label className="block mb-2 font-medium text-gray-700">
                  Full Name
                </label>
                <Input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border-2 rounded-xl focus:border-blue-500"
                />
              </motion.div>

              <motion.div whileFocus={{ scale: 1.02 }}>
                <label className="block mb-2 font-medium text-gray-700">
                  Course
                </label>
                <Input
                  type="text"
                  name="course"
                  value={formData.course}
                  onChange={handleInputChange}
                  placeholder="Enter your course"
                  className="w-full px-4 py-3 border-2 rounded-xl focus:border-blue-500"
                />
              </motion.div>

              <motion.div whileFocus={{ scale: 1.02 }}>
                <label className="block mb-2 font-medium text-gray-700">
                  Level
                </label>
                <select
                  name="level"
                  value={formData.level}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 rounded-xl focus:border-blue-500"
                >
                  <option value="">Select Level</option>
                  <option value="100">Level 100</option>
                  <option value="200">Level 200</option>
                  <option value="300">Level 300</option>
                  <option value="400">Level 400</option>
                </select>
              </motion.div>

              <motion.div whileFocus={{ scale: 1.02 }}>
                <label className="block mb-2 font-medium text-gray-700">
                  Semester
                </label>
                <select
                  name="semester"
                  value={formData.semester}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 rounded-xl focus:border-blue-500"
                >
                  <option value="">Select Semester</option>
                  <option value="1">First Semester</option>
                  <option value="2">Second Semester</option>
                </select>
              </motion.div>

              <motion.div
                whileFocus={{ scale: 1.02 }}
                className="md:col-span-2"
              >
                <label className="block mb-2 font-medium text-gray-700">
                  Academic Year
                </label>
                <Input
                  type="text"
                  name="academicYear"
                  value={formData.academicYear}
                  onChange={handleInputChange}
                  placeholder="e.g., 2023/2024"
                  className="w-full px-4 py-3 border-2 rounded-xl focus:border-blue-500"
                />
              </motion.div>
            </div>
          </motion.div>
        );

      case 2:
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
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-600">Student ID:</span>
                  <span className="font-semibold text-gray-800">
                    {formData.studentId}
                  </span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-600">Name:</span>
                  <span className="font-semibold text-gray-800">
                    {formData.fullName}
                  </span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-600">Course:</span>
                  <span className="font-semibold text-gray-800">
                    {formData.course}
                  </span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-600">Level:</span>
                  <span className="font-semibold text-gray-800">
                    Level {formData.level}
                  </span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-600">Semester:</span>
                  <span className="font-semibold text-gray-800">
                    {formData.semester === "1" ? "First" : "Second"} Semester
                  </span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="font-medium text-gray-600">
                    Academic Year:
                  </span>
                  <span className="font-semibold text-gray-800">
                    {formData.academicYear}
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
                  💡 Make sure all information is correct before proceeding to
                  payment
                </p>
              </div>
            </div>
          </motion.div>
        );

      case 3:
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
                className="flex items-center justify-center w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-500 to-pink-500"
              >
                <DollarSign className="w-10 h-10 text-white" />
              </motion.div>
              <h3 className="mb-2 text-3xl font-bold text-gray-800">
                Payment Details
              </h3>
              <p className="text-gray-600">
                Complete your SRC dues payment to proceed
              </p>
            </div>

            <div className="p-8 bg-white border-2 border-blue-200 rounded-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full">
                  <CreditCard className="text-2xl text-blue-600" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-800">
                    SRC Dues Payment
                  </h4>
                  <p className="text-gray-600">
                    Pay your SRC dues to proceed with the permit request
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between p-6 border border-blue-200 bg-gradient-to-r from-blue-50 to-orange-50 rounded-xl">
                  <span className="text-lg font-medium text-gray-700">
                    Amount to Pay:
                  </span>
                  <span className="text-3xl font-bold text-blue-600">
                    GH₵100.00
                  </span>
                </div>

                <div className="pt-6 border-t">
                  <h4 className="mb-6 text-lg font-semibold text-gray-800">
                    Choose Payment Method
                  </h4>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {[
                      {
                        name: "Mobile Money",
                        icon: "📱",
                        desc: "MTN, Vodafone, AirtelTigo",
                      },
                      {
                        name: "Card Payment",
                        icon: "💳",
                        desc: "Visa, Mastercard",
                      },
                      {
                        name: "Bank Transfer",
                        icon: "🏦",
                        desc: "Direct bank transfer",
                      },
                    ].map((method, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handlePayment}
                        className="p-6 transition-all duration-300 border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 group"
                      >
                        <div className="text-center">
                          <div className="mb-3 text-3xl">{method.icon}</div>
                          <div className="font-semibold text-gray-800 transition-colors group-hover:text-blue-600">
                            {method.name}
                          </div>
                          <div className="mt-1 text-sm text-gray-500">
                            {method.desc}
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 4:
        if (isLoading) {
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-16 text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                className="w-20 h-20 mx-auto mb-8"
              >
                <Loader2 className="text-6xl text-blue-600" />
              </motion.div>
              <h3 className="mb-4 text-2xl font-semibold text-gray-700">
                Processing Payment
              </h3>
              <p className="text-gray-600">
                Please wait while we process your payment...
              </p>
              <div className="max-w-md p-4 mx-auto mt-8 bg-blue-50 rounded-xl">
                <p className="text-sm text-blue-800">
                  💡 Do not close this window or refresh the page
                </p>
              </div>
            </motion.div>
          );
        }

        if (paymentStatus === "success") {
          return (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
                className="flex items-center justify-center w-24 h-24 mx-auto mb-8 bg-green-100 rounded-full"
              >
                <CheckCircle className="text-5xl text-green-500" />
              </motion.div>
              <h3 className="mb-4 text-3xl font-bold text-green-600">
                Payment Successful!
              </h3>
              <p className="mb-8 text-lg text-gray-600">
                Your SRC dues have been paid successfully. You can now proceed
                with your permit request.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={handleSubmit}
                  className="px-8 py-4 text-lg text-white rounded-full shadow-lg bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                >
                  Submit Permit Request
                </Button>
              </motion.div>
            </motion.div>
          );
        }

        if (paymentStatus === "failed") {
          return (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
                className="flex items-center justify-center w-24 h-24 mx-auto mb-8 bg-red-100 rounded-full"
              >
                <XCircle className="text-5xl text-red-500" />
              </motion.div>
              <h3 className="mb-4 text-3xl font-bold text-red-600">
                Payment Failed
              </h3>
              <p className="mb-8 text-lg text-gray-600">
                There was an error processing your payment. Please try again.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => setStep(3)}
                  className="px-8 py-4 text-lg text-white rounded-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
                >
                  Try Again
                </Button>
              </motion.div>
            </motion.div>
          );
        }

        return null;

      case 5:
        if (isLoading) {
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-16 text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                className="w-20 h-20 mx-auto mb-8"
              >
                <Loader2 className="text-6xl text-blue-600" />
              </motion.div>
              <h3 className="mb-4 text-2xl font-semibold text-gray-700">
                Processing Your Request
              </h3>
              <p className="text-gray-600">
                Please wait while we verify your payment and generate your
                permit...
              </p>
            </motion.div>
          );
        }

        if (
          permitResponse?.status === "approved" &&
          permitResponse.permitDetails &&
          permitResponse.receipt
        ) {
          return (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8"
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
                  className="flex items-center justify-center w-24 h-24 mx-auto mb-6 bg-green-100 rounded-full"
                >
                  <CheckCircle className="text-5xl text-green-500" />
                </motion.div>
                <h3 className="mb-4 text-3xl font-bold text-green-600">
                  Request Approved!
                </h3>
                <p className="text-lg text-gray-600">
                  Your exam permit has been generated successfully.
                </p>
              </div>

              {/* Permit Details */}
              <div className="p-8 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-orange-50 rounded-2xl">
                <h4 className="flex items-center gap-3 mb-6 text-2xl font-semibold text-blue-800">
                  <FileText className="w-6 h-6" />
                  Exam Permit Details
                </h4>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {Object.entries(permitResponse.permitDetails).map(
                    ([key, value]) => (
                      <div key={key} className="p-4 bg-white/70 rounded-xl">
                        <p className="text-sm font-medium text-gray-600 capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </p>
                        <p className="text-lg font-semibold text-gray-800">
                          {value}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Receipt Details */}
              <div className="p-8 border-2 border-green-200 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl">
                <h4 className="flex items-center gap-3 mb-6 text-2xl font-semibold text-green-800">
                  <DollarSign className="w-6 h-6" />
                  Payment Receipt
                </h4>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {Object.entries(permitResponse.receipt).map(
                    ([key, value]) => (
                      <div key={key} className="p-4 bg-white/70 rounded-xl">
                        <p className="text-sm font-medium text-gray-600 capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </p>
                        <p className="text-lg font-semibold text-gray-800">
                          {value}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={() => {
                      setStep(1);
                      setFormData({
                        studentId: "",
                        email: "",
                        fullName: "",
                        course: "",
                        level: "",
                        semester: "",
                        academicYear: "",
                      });
                      setPermitResponse(null);
                      setPaymentStatus("pending");
                    }}
                    className="px-8 py-3 text-white rounded-full bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700"
                  >
                    New Request
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={() => window.print()}
                    variant="outline"
                    className="px-8 py-3 border-2 border-gray-300 rounded-full hover:bg-gray-50"
                  >
                    Print Permit & Receipt
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          );
        }

        if (permitResponse?.status === "rejected") {
          return (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
                className="flex items-center justify-center w-24 h-24 mx-auto mb-8 bg-red-100 rounded-full"
              >
                <XCircle className="text-5xl text-red-500" />
              </motion.div>
              <h3 className="mb-4 text-3xl font-bold text-red-600">
                Request Rejected
              </h3>
              <p className="mb-8 text-lg text-gray-600">
                {permitResponse.message ||
                  "Your request could not be processed. Please ensure you have paid your SRC dues and try again."}
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => {
                    setStep(1);
                    setPermitResponse(null);
                    setPaymentStatus("pending");
                  }}
                  className="px-8 py-4 text-lg text-white rounded-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
                >
                  Try Again
                </Button>
              </motion.div>
            </motion.div>
          );
        }

        return null;

      default:
        return null;
    }
  };

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div
          className={`absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height=\"60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">%3Cg fill="none" fillRule="evenodd">%3Cg fill="%23000000" fillOpacity="0.1">%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg>')]`}
        />
      </div>

      <div className="container relative z-10 px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="mb-12 text-center">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-500 to-blue-500"
            >
              <FileText className="w-10 h-10 text-white" />
            </motion.div>
            <h2 className="mb-4 text-4xl font-bold text-transparent md:text-5xl bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text">
              SRC Dues & Exam Permit
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              Pay your SRC dues to request your exam permit for the current
              semester.
            </p>
          </div>

          <div className="p-8 bg-white border border-gray-100 shadow-2xl rounded-3xl">
            {/* Progress Steps */}
            <div className="flex justify-between mb-12">
              {[1, 2, 3, 4, 5].map((stepNumber) => (
                <div
                  key={stepNumber}
                  className={`flex items-center ${
                    stepNumber !== 5 ? "flex-1" : ""
                  }`}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                      step >= stepNumber
                        ? "bg-gradient-to-r from-blue-600 to-orange-600 text-white shadow-lg"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {stepNumber}
                  </motion.div>
                  {stepNumber !== 5 && (
                    <div
                      className={`flex-1 h-2 mx-4 rounded-full transition-all duration-300 ${
                        step > stepNumber
                          ? "bg-gradient-to-r from-blue-600 to-orange-600"
                          : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Form Steps */}
            <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>

            {/* Navigation Buttons */}
            {step < 3 && !isLoading && (
              <div className="flex justify-between mt-12">
                {step > 1 && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={() => setStep((prev) => prev - 1)}
                      variant="outline"
                      className="px-8 py-3 border-2 border-gray-300 rounded-full hover:bg-gray-50"
                    >
                      Previous
                    </Button>
                  </motion.div>
                )}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="ml-auto"
                >
                  <Button
                    onClick={() => setStep((prev) => prev + 1)}
                    className="px-8 py-3 text-white rounded-full bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700"
                  >
                    Next
                  </Button>
                </motion.div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
