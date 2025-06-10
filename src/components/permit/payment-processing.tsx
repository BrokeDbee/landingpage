import React, { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  CheckCircle,
  XCircle,
  AlertTriangle,
  RefreshCw,
  Clock,
  Shield,
  ArrowLeft,
  Info,
  FileText,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { verifyPayment, getPermit } from "@/lib/api";
import Image from "next/image";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { PermitResponse } from "@/lib/types";

interface PaymentProcessingProps {
  isLoading: boolean;
  paymentStatus: "pending" | "success" | "failed" | "idle" | "verifying";
  setPaymentStatus: React.Dispatch<
    React.SetStateAction<
      "pending" | "success" | "failed" | "idle" | "verifying"
    >
  >;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  handleSubmit: () => void;
}

interface VerificationError {
  message: string;
  code: string;
  retryable: boolean;
  details?: string;
}

export function PaymentProcessing({
  isLoading,
  paymentStatus,
  setPaymentStatus,
  setStep,
}: PaymentProcessingProps) {
  const searchParams = useSearchParams();
  const reference = searchParams.get("trxref");
  const permitCode = searchParams.get("permitCode");
  const router = useRouter();
  const permitRef = useRef<HTMLDivElement>(null);

  const [verificationError, setVerificationError] =
    useState<VerificationError | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [verificationAttempts, setVerificationAttempts] = useState(0);
  const [processingStartTime] = useState(Date.now());

  const [timeElapsed, setTimeElapsed] = useState(0);
  const [verificationInterval, setVerificationInterval] =
    useState<NodeJS.Timeout | null>(null);
  const [permitResponse, setPermitResponse] = useState<PermitResponse | null>(
    null
  );
  const [isGeneratingPermit, setIsGeneratingPermit] = useState(false);

  // Timer for elapsed time
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(Math.floor((Date.now() - processingStartTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [processingStartTime]);

  const handleDownloadPDF = async () => {
    if (!permitResponse?.data) {
      alert("Unable to generate PDF. Please try again.");
      return;
    }

    try {
      // Create a clean HTML structure for PDF generation
      const permitHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: Arial, sans-serif; 
            background: white; 
            color: #000;
            padding: 20px;
            line-height: 1.4;
          }
          .permit-container { 
            max-width: 600px; 
            margin: 0 auto; 
            border: 3px solid #2563eb;
            border-radius: 12px;
            padding: 30px;
            background: linear-gradient(135deg, #f0f9ff 0%, #fff7ed 100%);
          }
          .header { 
            text-align: center; 
            margin-bottom: 30px; 
            border-bottom: 2px solid #2563eb;
            padding-bottom: 20px;
          }
          .header h1 { 
            font-size: 28px; 
            color: #1e40af; 
            margin-bottom: 8px;
            font-weight: bold;
          }
          .header h2 { 
            font-size: 22px; 
            color: #374151; 
            margin-bottom: 5px;
          }
          .header p { 
            font-size: 14px; 
            color: #6b7280;
          }
          .details-grid { 
            display: grid; 
            grid-template-columns: 1fr 1fr; 
            gap: 15px; 
            margin-bottom: 30px;
          }
          .detail-item { 
            background: rgba(255, 255, 255, 0.8); 
            padding: 15px; 
            border-radius: 8px;
            border: 1px solid #e5e7eb;
          }
          .detail-label { 
            font-size: 12px; 
            color: #2563eb; 
            font-weight: 600; 
            margin-bottom: 5px;
            text-transform: uppercase;
          }
          .detail-value { 
            font-size: 16px; 
            color: #111827; 
            font-weight: 600;
          }
          .permit-code { 
            font-family: 'Courier New', monospace;
            font-size: 18px !important;
          }
          .qr-section { 
            text-align: center; 
            margin-top: 30px;
            padding: 20px;
            background: rgba(34, 197, 94, 0.1);
            border: 2px solid #22c55e;
            border-radius: 12px;
          }
          .qr-title { 
            font-size: 16px; 
            color: #15803d; 
            font-weight: 600; 
            margin-bottom: 15px;
          }
          .qr-code { 
            margin: 15px 0;
          }
          .qr-note { 
            font-size: 12px; 
            color: #374151; 
            margin-top: 10px;
          }
          .footer-notice { 
            margin-top: 25px; 
            padding: 15px; 
            background: #fef3c7; 
            border: 1px solid #f59e0b;
            border-radius: 8px;
            text-align: center;
          }
          .footer-notice p { 
            font-size: 12px; 
            color: #92400e;
            font-weight: 500;
          }
          @media print {
            body { padding: 10px; }
            .permit-container { border: 2px solid #000; }
          }
        </style>
      </head>
      <body>
        <div class="permit-container">
          <div class="header">
            <h1>Student Representative Council</h1>
            <h2>Official Exam Permit</h2>
            <p>Academic Year 2023/2024</p>
          </div>
          
          <div class="details-grid">
            <div class="detail-item">
              <div class="detail-label">Permit Code</div>
              <div class="detail-value permit-code">${
                permitResponse.data.originalCode
              }</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Student ID</div>
              <div class="detail-value">${
                permitResponse.data.student.studentId
              }</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Full Name</div>
              <div class="detail-value">${
                permitResponse.data.student.name
              }</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Course of Study</div>
              <div class="detail-value">${
                permitResponse.data.student.course
              }</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Academic Level</div>
              <div class="detail-value">${
                permitResponse.data.student.level
              }</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Expiry Date</div>
              <div class="detail-value">${new Date(
                permitResponse.data.expiryDate
              ).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}</div>
            </div>
          </div>

          ${
            permitResponse.qrCode
              ? `
            <div class="qr-section">
              <div class="qr-title">Verification QR Code</div>
              <div class="qr-code">
                <img src="${permitResponse.qrCode}" width="150" height="150" alt="QR Code" style="border-radius: 8px;" />
              </div>
              <div class="qr-note">Present this QR code during examinations for verification</div>
            </div>
          `
              : ""
          }

          <div class="footer-notice">
            <p><strong>Important:</strong> This permit is valid only for the current academic session. Keep this document safe and present it during all examinations.</p>
          </div>
        </div>
      </body>
      </html>
    `;

      // Create a temporary iframe to render the HTML
      const iframe = document.createElement("iframe");
      iframe.style.position = "absolute";
      iframe.style.left = "-9999px";
      iframe.style.width = "800px";
      iframe.style.height = "1000px";
      document.body.appendChild(iframe);

      // Write HTML to iframe
      const iframeDoc =
        iframe.contentDocument || iframe.contentWindow?.document;
      if (!iframeDoc) {
        throw new Error("Unable to access iframe document");
      }

      iframeDoc.open();
      iframeDoc.write(permitHTML);
      iframeDoc.close();

      // Wait for content to load
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Generate canvas from iframe content
      const canvas = await html2canvas(iframeDoc.body, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        width: 800,
        height: 1000,
        onclone: (clonedDoc) => {
          const clonedBody = clonedDoc.body;
          clonedBody.style.transform = "scale(1)";
          clonedBody.style.transformOrigin = "top left";
        },
      });

      // Clean up iframe
      document.body.removeChild(iframe);

      // Create PDF
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Calculate dimensions to fit the page
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(
        pdfWidth / (imgWidth * 0.264583),
        pdfHeight / (imgHeight * 0.264583)
      );

      const scaledWidth = imgWidth * 0.264583 * ratio * 0.9;
      const scaledHeight = imgHeight * 0.264583 * ratio * 0.9;

      const xOffset = (pdfWidth - scaledWidth) / 2;
      const yOffset = (pdfHeight - scaledHeight) / 2;

      // Add image to PDF
      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(imgData, "PNG", xOffset, yOffset, scaledWidth, scaledHeight);

      // Add subtle watermark
      pdf.setFontSize(30);
      pdf.setTextColor(240, 240, 240);

      // Save PDF
      const fileName = `SRC_Exam_Permit_${
        permitResponse.data.originalCode
      }_${new Date().getFullYear()}.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert(
        "Failed to generate PDF. Please try again or contact support if the issue persists."
      );
    }
  };

  const resetForm = () => {
    router.replace("/services/permits/request");
    setStep(1);
    setPaymentStatus("pending");
  };

  const verifyPaymentWithRetry = useCallback(
    async (maxRetries = 3) => {
      if (!reference) {
        setVerificationError({
          message:
            "No payment reference found. Please start the payment process again.",
          code: "MISSING_REFERENCE",
          retryable: false,
        });
        setPaymentStatus("failed");
        return;
      }

      setPaymentStatus("verifying");
      setVerificationError(null);

      try {
        console.log(
          `Payment verification attempt ${
            verificationAttempts + 1
          }/${maxRetries} for reference: ${reference}`
        );

        const response = await verifyPayment(reference);

        console.log(
          `Payment verification response for attempt ${
            verificationAttempts + 1
          }:`,
          response
        );

        if (!response) {
          throw new Error(
            "No response received from payment verification service"
          );
        }

        if (response.status === "SUCCESS") {
          console.log("Payment verification successful");
          setPaymentStatus("success");
          if (verificationInterval) {
            clearInterval(verificationInterval);
            setVerificationInterval(null);
          }

          // Generate permit after successful payment
          setIsGeneratingPermit(true);
          try {
            router.replace(
              `/services/permits/request?permitCode=${response.permit.originalCode}`
            );
            const permitResponse = await getPermit(
              response.permit.originalCode
            );
            setPermitResponse(permitResponse);
          } catch (error) {
            console.error("Error generating permit:", error);
            setVerificationError({
              message:
                "Payment successful but failed to generate permit. Please contact support.",
              code: "PERMIT_GENERATION_FAILED",
              retryable: false,
            });
          } finally {
            setIsGeneratingPermit(false);
          }

          return;
        } else if (response.status === "FAILED") {
          console.log("Payment verification failed:", response.message);
          setVerificationError({
            message: response.message || "Payment verification failed",
            code: "VERIFICATION_FAILED",
            retryable: true,
            details: `Transaction ID: ${response.transactionId || "N/A"}`,
          });
          setPaymentStatus("failed");
          if (verificationInterval) {
            clearInterval(verificationInterval);
            setVerificationInterval(null);
          }
          return;
        } else if (response.status === "PENDING") {
          console.log("Payment still pending");
          setPaymentStatus("pending");
          // Start interval verification if not already started
          if (!verificationInterval) {
            const interval = setInterval(() => {
              setVerificationAttempts((prev) => prev + 1);
              verifyPaymentWithRetry(maxRetries);
            }, 10000); // Check every 10 seconds
            setVerificationInterval(interval);
          }
        }
      } catch (error) {
        console.error(
          `Payment verification attempt ${verificationAttempts + 1} failed:`,
          error
        );

        let errorMessage = "Unable to verify payment. Please try again.";
        let errorCode = "VERIFICATION_ERROR";
        let retryable = true;
        let details = "";

        if (error instanceof Error) {
          if (
            error.message.includes("network") ||
            error.message.includes("fetch")
          ) {
            errorMessage =
              "Network error during payment verification. Please check your connection.";
            errorCode = "NETWORK_ERROR";
          } else if (error.message.includes("timeout")) {
            errorMessage = "Payment verification timed out. Please try again.";
            errorCode = "TIMEOUT_ERROR";
          } else if (
            error.message.includes("server") ||
            error.message.includes("500")
          ) {
            errorMessage =
              "Server error during verification. Please try again in a few moments.";
            errorCode = "SERVER_ERROR";
          } else if (
            error.message.includes("unauthorized") ||
            error.message.includes("403")
          ) {
            errorMessage =
              "Authorization error. Please start the payment process again.";
            errorCode = "AUTH_ERROR";
            retryable = false;
          }
          details = error.message;
        }

        setVerificationError({
          message: errorMessage,
          code: errorCode,
          retryable,
          details,
        });
        setPaymentStatus("failed");
        if (verificationInterval) {
          clearInterval(verificationInterval);
          setVerificationInterval(null);
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [reference, setPaymentStatus, verificationAttempts, verificationInterval]
  );

  useEffect(() => {
    if (reference && paymentStatus !== "success") {
      verifyPaymentWithRetry();
    }

    // Cleanup interval on unmount
    return () => {
      if (verificationInterval) {
        clearInterval(verificationInterval);
      }
    };
  }, [reference, verifyPaymentWithRetry, paymentStatus, verificationInterval]);

  useEffect(() => {
    const genPermit = async () => {
      if (permitCode && !reference) {
        // Generate permit after successful payment
        setPaymentStatus("success");
        setIsGeneratingPermit(true);
        try {
          const permitResponse = await getPermit(permitCode);
          setPermitResponse(permitResponse);
        } catch (error) {
          console.error("Error generating permit:", error);
          setVerificationError({
            message:
              "Payment successful but failed to generate permit. Please contact support.",
            code: "PERMIT_GENERATION_FAILED",
            retryable: false,
          });
        } finally {
          setIsGeneratingPermit(false);
        }
      }
    };
    if (permitCode && !reference) {
      genPermit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [permitCode, reference]);

  const handleRetryVerification = () => {
    setRetryCount((prev) => prev + 1);
    setVerificationError(null);
    setVerificationAttempts(0);
    verifyPaymentWithRetry();
  };

  const handleGoBack = () => {
    setPaymentStatus("idle");
    setStep(3); // Go back to payment form
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Loading/Verifying State
  if (
    isLoading ||
    paymentStatus === "verifying" ||
    paymentStatus === "pending" ||
    isGeneratingPermit
  ) {
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
          className="flex items-center justify-center w-20 h-20 mx-auto mb-8 bg-blue-100 rounded-full"
        >
          <Loader2 className="w-12 h-12 text-blue-600" />
        </motion.div>

        <h3 className="mb-4 text-2xl font-semibold text-gray-700">
          {isGeneratingPermit
            ? "Generating Your Permit"
            : paymentStatus === "verifying"
            ? "Verifying Payment"
            : "Processing Payment"}
        </h3>

        <p className="mb-6 text-gray-600">
          {isGeneratingPermit
            ? "Please wait while we generate your exam permit..."
            : paymentStatus === "verifying"
            ? "Please wait while we verify your payment..."
            : "Please wait while we process your payment..."}
        </p>

        {/* Progress Indicators */}
        <div className="max-w-md mx-auto space-y-4">
          <div className="flex items-center justify-center gap-4 p-4 bg-blue-50 rounded-xl">
            <Shield className="w-5 h-5 text-blue-600" />
            <p className="text-sm text-blue-800">
              Secure payment processing in progress
            </p>
          </div>

          {paymentStatus === "verifying" && (
            <div className="flex items-center justify-center gap-4 p-4 bg-amber-50 rounded-xl">
              <Clock className="w-5 h-5 text-amber-600" />
              <div className="text-sm text-amber-800">
                <p>Verification attempt: {verificationAttempts}/3</p>
                <p>Time elapsed: {formatTime(timeElapsed)}</p>
              </div>
            </div>
          )}

          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-700">
              💡 <strong>Important:</strong> Do not close this window or refresh
              the page
            </p>
          </div>

          {reference && (
            <div className="p-3 bg-gray-100 rounded-lg">
              <p className="text-xs text-gray-600">
                Reference:{" "}
                <span className="font-mono font-semibold">{reference}</span>
              </p>
            </div>
          )}
        </div>
      </motion.div>
    );
  }

  // Success State with Permit
  if (
    paymentStatus === "success" &&
    permitResponse?.success &&
    permitResponse.data
  ) {
    return (
      <div className="space-y-8" ref={permitRef}>
        {/* Success Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center w-20 h-20 mx-auto bg-green-100 rounded-full">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-green-600 mb-2">
              Permit Generated Successfully!
            </h3>
            <p className="text-lg text-gray-600">
              Your exam permit is ready for download and use.
            </p>
          </div>
        </div>

        {/* Official Permit Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-blue-50 via-white to-orange-50 border-2 border-blue-200 rounded-2xl p-8 shadow-lg">
            {/* Permit Header */}
            <div className="text-center mb-8 pb-6 border-b-2 border-blue-200">
              <h1 className="text-3xl font-bold text-blue-800 mb-2">
                Student Representative Council
              </h1>
              <h2 className="text-2xl font-semibold text-gray-700 mb-1">
                Official Exam Permit
              </h2>
              <p className="text-sm text-gray-500 font-medium">
                Academic Year 2023/2024
              </p>
            </div>

            {/* Permit Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div className="bg-white/80 p-4 rounded-xl border border-blue-100">
                  <p className="text-sm font-medium text-blue-600 mb-1">
                    Permit Code
                  </p>
                  <p className="text-xl font-bold text-gray-800 font-mono">
                    {permitResponse.data.originalCode}
                  </p>
                </div>
                <div className="bg-white/80 p-4 rounded-xl border border-blue-100">
                  <p className="text-sm font-medium text-blue-600 mb-1">
                    Student ID
                  </p>
                  <p className="text-lg font-semibold text-gray-800">
                    {permitResponse.data.student.studentId}
                  </p>
                </div>
                <div className="bg-white/80 p-4 rounded-xl border border-blue-100">
                  <p className="text-sm font-medium text-blue-600 mb-1">
                    Full Name
                  </p>
                  <p className="text-lg font-semibold text-gray-800">
                    {permitResponse.data.student.name}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white/80 p-4 rounded-xl border border-blue-100">
                  <p className="text-sm font-medium text-blue-600 mb-1">
                    Course of Study
                  </p>
                  <p className="text-lg font-semibold text-gray-800">
                    {permitResponse.data.student.course}
                  </p>
                </div>
                <div className="bg-white/80 p-4 rounded-xl border border-blue-100">
                  <p className="text-sm font-medium text-blue-600 mb-1">
                    Academic Level
                  </p>
                  <p className="text-lg font-semibold text-gray-800">
                    {permitResponse.data.student.level}
                  </p>
                </div>
                <div className="bg-white/80 p-4 rounded-xl border border-blue-100">
                  <p className="text-sm font-medium text-blue-600 mb-1">
                    Expiry Date
                  </p>
                  <p className="text-lg font-semibold text-gray-800">
                    {new Date(
                      permitResponse.data.expiryDate
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* QR Code Section */}
            {permitResponse.qrCode && (
              <div className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200 rounded-2xl p-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <FileText className="w-5 h-5 text-green-600" />
                  <h4 className="text-lg font-semibold text-green-800">
                    Verification QR Code
                  </h4>
                </div>
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-white rounded-xl shadow-md">
                    <Image
                      src={permitResponse.qrCode}
                      alt="Permit Verification QR Code"
                      width={180}
                      height={180}
                      className="rounded-lg"
                    />
                  </div>
                </div>
                <p className="text-sm text-gray-600 max-w-md mx-auto">
                  Present this QR code during examinations for instant
                  verification of your permit status
                </p>
              </div>
            )}

            {/* Important Notice */}
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
              <p className="text-sm text-yellow-800 text-center font-medium">
                <strong>Important:</strong> This permit is valid only for the
                current academic session. Keep this document safe and present it
                during all examinations.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons flex flex-col sm:flex-row justify-center gap-4 pt-6">
          <button
            onClick={handleDownloadPDF}
            className="flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full hover:from-blue-700 hover:to-blue-800 transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
          >
            <Download className="w-5 h-5" />
            Download PDF Permit
          </button>
          <button
            onClick={resetForm}
            className="flex items-center justify-center gap-2 px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <RefreshCw className="w-5 h-5" />
            New Request
          </button>
        </div>
      </div>
    );
  }

  // Failed State
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
          <XCircle className="w-16 h-16 text-red-500" />
        </motion.div>

        <h3 className="mb-4 text-3xl font-bold text-red-600">
          {verificationError?.code === "PAYMENT_PENDING"
            ? "Payment Pending"
            : "Payment Failed"}
        </h3>

        <p className="mb-6 text-lg text-gray-600">
          {verificationError?.message ||
            "There was an error processing your payment. Please try again."}
        </p>

        {/* Error Details */}
        <AnimatePresence>
          {verificationError && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="max-w-md mx-auto mb-8"
            >
              <div className="p-4 bg-red-50 rounded-xl border border-red-200">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-red-800 text-left">
                      <p>
                        <strong>Error Code:</strong> {verificationError.code}
                      </p>
                      {verificationError.details && (
                        <p className="mt-2">
                          <strong>Details:</strong> {verificationError.details}
                        </p>
                      )}
                      {retryCount > 0 && (
                        <p className="mt-2">
                          <strong>Retry Attempts:</strong> {retryCount}
                        </p>
                      )}
                      {reference && (
                        <p className="mt-2">
                          <strong>Reference:</strong>
                          <span className="font-mono ml-1">{reference}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {verificationError?.retryable && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleRetryVerification}
                className="flex items-center gap-2 px-6 py-3 text-white rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
              >
                <RefreshCw className="w-4 h-4" />
                Verify Again
              </Button>
            </motion.div>
          )}

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleGoBack}
              variant="outline"
              className="flex items-center gap-2 px-6 py-3 rounded-full border-2 hover:bg-gray-50 transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              Try Different Payment
            </Button>
          </motion.div>
        </div>

        {/* Help Information */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="mt-8 max-w-md mx-auto p-4 bg-blue-50 rounded-xl"
        >
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-800 text-left">
              <p className="font-semibold mb-1">Need Help?</p>
              <p>
                If you continue to experience issues, please contact support
                with your reference number.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return null;
}
