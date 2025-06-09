import React, { useEffect, useState, useCallback } from "react";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { verifyPayment } from "@/lib/api";

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

interface VerificationResult {
  status: "SUCCESS" | "FAILED" | "PENDING";
  message?: string;
  transactionId?: string;
  amount?: number;
  timestamp?: string;
  payment?: any;
  permit?: any;
}

export function PaymentProcessing({
  isLoading,
  paymentStatus,
  setPaymentStatus,
  setStep,
  handleSubmit,
}: PaymentProcessingProps) {
  const searchParams = useSearchParams();
  const reference = searchParams.get("trxref");
  const router = useRouter();

  const [verificationError, setVerificationError] =
    useState<VerificationError | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [verificationAttempts, setVerificationAttempts] = useState(0);
  const [processingStartTime] = useState(Date.now());
  const [verificationResult, setVerificationResult] =
    useState<VerificationResult | null>(null);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [verificationInterval, setVerificationInterval] =
    useState<NodeJS.Timeout | null>(null);

  // Timer for elapsed time
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(Math.floor((Date.now() - processingStartTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [processingStartTime]);

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

        setVerificationResult({
          status: response.status,
          message: response.message,
          transactionId: response.transactionId,
          amount: response.amount,
          timestamp: response.timestamp,
          payment: response.payment,
          permit: response.permit,
        });

        if (response.status === "SUCCESS") {
          console.log("Payment verification successful");
          setPaymentStatus("success");
          if (verificationInterval) {
            clearInterval(verificationInterval);
            setVerificationInterval(null);
          }
          router.replace(
            `/services/permits/request?permitCode=${response.permit?.originalCode}`
          );
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
    paymentStatus === "pending"
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
          {paymentStatus === "verifying"
            ? "Verifying Payment"
            : "Processing Payment"}
        </h3>

        <p className="mb-6 text-gray-600">
          {paymentStatus === "verifying"
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

  // Success State
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
          <CheckCircle className="w-16 h-16 text-green-500" />
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-4 text-3xl font-bold text-green-600"
        >
          Payment Successful!
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8 text-lg text-gray-600"
        >
          Your SRC dues have been paid successfully. You can now proceed with
          your permit request.
        </motion.p>

        {/* Success Details */}
        {verificationResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="max-w-md mx-auto mb-8 p-4 bg-green-50 rounded-xl border border-green-200"
          >
            <div className="space-y-2 text-sm text-green-800">
              {verificationResult.transactionId && (
                <p>
                  <strong>Transaction ID:</strong>{" "}
                  {verificationResult.transactionId}
                </p>
              )}
              {verificationResult.amount && (
                <p>
                  <strong>Amount:</strong> GH₵{verificationResult.amount}
                </p>
              )}
              {verificationResult.timestamp && (
                <p>
                  <strong>Time:</strong>{" "}
                  {new Date(verificationResult.timestamp).toLocaleString()}
                </p>
              )}
              {verificationResult.permit && (
                <p>
                  <strong>Permit Code:</strong>{" "}
                  {verificationResult.permit.originalCode}
                </p>
              )}
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={handleSubmit}
            className="px-8 py-4 text-lg text-white rounded-full shadow-lg bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 transition-all duration-300"
          >
            Submit Permit Request
          </Button>
        </motion.div>
      </motion.div>
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
