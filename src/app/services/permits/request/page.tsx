"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StudentSearch } from "@/components/permit/student-search";
import { StudentInfoForm } from "@/components/permit/student-info-form";
import { StudentVerification } from "@/components/permit/student-verification";
import { RequestSummary } from "@/components/permit/request-summary";
import { PaymentForm } from "@/components/permit/payment-form";
import { PaymentProcessing } from "@/components/permit/payment-processing";
import { ProgressSteps } from "@/components/permit/progress-steps";
import { StudentData, FormData } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PermitRequestPage() {
  const [studentIdInput, setStudentIdInput] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  const [step, setStep] = useState(
    searchParams.get("step")
      ? parseFloat(searchParams.get("step")!)
      : searchParams.get("permitCode")
      ? 4
      : 1
  );
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<
    "pending" | "success" | "failed" | "idle" | "verifying"
  >("idle");
  const [formData, setFormData] = useState<FormData>({
    studentId: "",
    name: "",
    email: "",
    course: "",
    level: "",
    number: "",
  });

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <StudentSearch
            studentIdInput={studentIdInput}
            setStudentIdInput={setStudentIdInput}
            isSearching={isSearching}
            setIsSearching={setIsSearching}
            setStudentData={setStudentData}
            setSearchError={setSearchError}
            setFormData={setFormData}
            setStep={setStep}
            searchError={searchError}
          />
        );
      case 1.1:
        return (
          <StudentInfoForm
            formData={formData}
            setFormData={setFormData}
            searchError={searchError}
            setStep={setStep}
            studentIdInput={studentIdInput}
          />
        );
      case 1.5:
        return (
          <StudentVerification
            studentData={studentData}
            formData={formData}
            setFormData={setFormData}
            setStep={setStep}
          />
        );
      case 2:
        return (
          <RequestSummary
            formData={formData}
            setStep={setStep}
            studentData={studentData}
          />
        );
      case 3:
        return (
          <PaymentForm
            setStep={setStep}
            setPaymentStatus={setPaymentStatus}
            paymentStatus={paymentStatus}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
            formData={formData}
          />
        );
      case 4:
        return (
          <PaymentProcessing
            isLoading={isLoading}
            paymentStatus={paymentStatus}
            setPaymentStatus={setPaymentStatus}
            setStep={setStep}
            handleSubmit={() => {}}
          />
        );
      default:
        return null;
    }
  };

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container relative z-10 px-4 mx-auto">
        <Link
          href="/services/permits"
          className="inline-flex items-center mb-8 text-sm text-gray-600 hover:text-blue-600"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Permits
        </Link>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-transparent md:text-5xl bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text">
              SRC Dues & Exam Permit
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              Pay your SRC dues to request your exam permit for the current
              semester.
            </p>
          </div>

          <div className="p-8 bg-white border border-gray-100 shadow-2xl rounded-3xl">
            <ProgressSteps step={step} />
            <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
