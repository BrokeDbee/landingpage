import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DollarSign,
  CreditCard,
  AlertCircle,
  CheckCircle,
  Loader2,
  RefreshCw,
  X,
} from "lucide-react";
import { FormData } from "@/lib/types";
import { initiatePayment } from "@/lib/api";

interface PaymentFormProps {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setPaymentStatus: React.Dispatch<
    React.SetStateAction<
      "pending" | "success" | "failed" | "idle" | "verifying"
    >
  >;
  paymentStatus: "pending" | "success" | "failed" | "idle" | "verifying";
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  formData: FormData;
}

interface PaymentError {
  message: string;
  code?: string;
  details?: string;
}

export function PaymentForm({
  setPaymentStatus,
  setIsLoading,
  formData,
  paymentStatus,
  isLoading,
}: PaymentFormProps) {
  const [paymentError, setPaymentError] = useState<PaymentError | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const paymentMethods = [
    {
      id: "mobile_money",
      name: "Mobile Money",
      icon: "📱",
      desc: "MTN, Vodafone, AirtelTigo",
    },
    {
      id: "card",
      name: "Card Payment",
      icon: "💳",
      desc: "Visa, Mastercard",
    },
    {
      id: "bank_transfer",
      name: "Bank Transfer",
      icon: "🏦",
      desc: "Direct bank transfer",
    },
  ];

  const handlePayment = async (methodId: string) => {
    // Clear previous errors
    setPaymentError(null);
    setSelectedMethod(methodId);
    setIsLoading(true);
    setPaymentStatus("pending");

    try {
      // Validate form data before payment
      if (!formData.studentId || !formData.name || !formData.email) {
        throw new Error("Missing required student information");
      }

      const paymentData = {
        studentId: formData.studentId,
        callback_url: `${window.location.origin}/services/permits/request?step=4`,
        studentData: {
          name: formData.name,
          email: formData.email,
          course: formData.course,
          level: formData.level,
          number: formData.studentId,
        },
        amount: 100,
        currency: "GHS",
        metadata: {
          permitType: "exam",
          paymentMethod: methodId,
          timestamp: new Date().toISOString(),
        },
      };

      const data = await initiatePayment(paymentData);

      if (!data || !data.checkoutUrl) {
        throw new Error("Invalid payment response from server");
      }

      // Redirect to payment gateway
      window.location.href = data.checkoutUrl;
    } catch (error) {
      console.error("Payment initiation failed:", error);

      // Handle different types of errors
      let errorMessage = "Payment failed. Please try again.";
      let errorCode = "UNKNOWN_ERROR";
      let errorDetails = "";

      if (error instanceof Error) {
        errorMessage = error.message;

        // Handle specific error types
        if (
          error.message.includes("network") ||
          error.message.includes("fetch")
        ) {
          errorMessage =
            "Network error. Please check your connection and try again.";
          errorCode = "NETWORK_ERROR";
        } else if (error.message.includes("timeout")) {
          errorMessage = "Request timed out. Please try again.";
          errorCode = "TIMEOUT_ERROR";
        } else if (error.message.includes("server")) {
          errorMessage = "Server error. Please try again in a few moments.";
          errorCode = "SERVER_ERROR";
        } else if (error.message.includes("validation")) {
          errorMessage = "Invalid payment data. Please check your information.";
          errorCode = "VALIDATION_ERROR";
        }

        errorDetails = error.stack || "";
      }

      setPaymentError({
        message: errorMessage,
        code: errorCode,
        details: errorDetails,
      });

      setPaymentStatus("failed");
      setRetryCount((prev) => prev + 1);
    } finally {
      setIsLoading(false);
      setSelectedMethod(null);
    }
  };

  const handleRetry = () => {
    setPaymentError(null);
    setPaymentStatus("idle");
    setRetryCount(0);
  };

  const getStatusMessage = () => {
    switch (paymentStatus) {
      case "pending":
        return {
          type: "info",
          icon: <Loader2 className="w-5 h-5 animate-spin" />,
          title: "Processing Payment",
          message:
            "Your payment is being processed. Please wait and do not close this window...",
          bgColor: "bg-blue-50",
          textColor: "text-blue-800",
          borderColor: "border-blue-200",
        };
      case "success":
        return {
          type: "success",
          icon: <CheckCircle className="w-5 h-5" />,
          title: "Payment Successful!",
          message:
            "Your payment has been processed successfully. Your permit is being generated.",
          bgColor: "bg-green-50",
          textColor: "text-green-800",
          borderColor: "border-green-200",
        };
      case "failed":
        return {
          type: "error",
          icon: <AlertCircle className="w-5 h-5" />,
          title: "Payment Failed",
          message:
            paymentError?.message ||
            "Payment could not be processed. Please try again.",
          bgColor: "bg-red-50",
          textColor: "text-red-800",
          borderColor: "border-red-200",
        };
      default:
        return null;
    }
  };

  const statusMessage = getStatusMessage();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="mb-8 text-center flex flex-wrap items-center justify-center">
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

      {/* Status Messages */}
      <AnimatePresence>
        {statusMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`p-4 rounded-lg border ${statusMessage.bgColor} ${statusMessage.borderColor} ${statusMessage.textColor}`}
          >
            <div className="flex items-start gap-3">
              {statusMessage.icon}
              <div className="flex-1">
                <h4 className="font-semibold">{statusMessage.title}</h4>
                <p className="text-sm mt-1">{statusMessage.message}</p>

                {/* Error Details */}
                {paymentStatus === "failed" && paymentError && (
                  <div className="mt-3 space-y-2">
                    {paymentError.code && (
                      <p className="text-xs opacity-75">
                        Error Code: {paymentError.code}
                      </p>
                    )}
                    {retryCount > 0 && (
                      <p className="text-xs opacity-75">
                        Retry Attempt: {retryCount}
                      </p>
                    )}
                    <div className="flex gap-2 mt-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleRetry}
                        className="flex items-center gap-2 px-3 py-1 text-xs bg-white rounded border hover:bg-gray-50 transition-colors"
                      >
                        <RefreshCw className="w-3 h-3" />
                        Try Again
                      </motion.button>
                    </div>
                  </div>
                )}
              </div>

              {/* Dismiss Button for Failed Status */}
              {paymentStatus === "failed" && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleRetry}
                  className="p-1 rounded-full hover:bg-red-100 transition-colors"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Payment Form */}
      {(paymentStatus === "idle" || paymentStatus === "failed") && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 bg-white border-2 border-blue-200 rounded-2xl"
        >
          <div className="flex items-center flex-wrap gap-4 mb-6">
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
            {/* Amount Display */}
            <div className="flex items-center flex-wrap justify-between p-6 border border-blue-200 bg-gradient-to-r from-blue-50 to-orange-50 rounded-xl">
              <span className="text-lg font-medium text-gray-700">
                Amount to Pay:
              </span>
              <span className="text-3xl font-bold text-blue-600">
                GH₵100.00
              </span>
            </div>

            {/* Payment Methods */}
            <div className="pt-6 border-t">
              <h4 className="mb-6 text-lg font-semibold text-gray-800">
                Choose Payment Method
              </h4>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {paymentMethods.map((method) => (
                  <motion.button
                    key={method.id}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handlePayment(method.id)}
                    disabled={isLoading}
                    className={`p-6 transition-all duration-300 border-2 rounded-xl group relative
                      ${
                        isLoading
                          ? "border-gray-200 bg-gray-50 cursor-not-allowed opacity-60"
                          : "border-gray-200 hover:border-blue-400 hover:bg-blue-50"
                      }
                      ${
                        selectedMethod === method.id && isLoading
                          ? "border-blue-400 bg-blue-50"
                          : ""
                      }`}
                  >
                    {/* Loading Indicator */}
                    {selectedMethod === method.id && isLoading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 rounded-xl">
                        <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                      </div>
                    )}

                    <div className="text-center">
                      <div className="mb-3 text-3xl">{method.icon}</div>
                      <div
                        className={`font-semibold transition-colors ${
                          isLoading
                            ? "text-gray-500"
                            : "text-gray-800 group-hover:text-blue-600"
                        }`}
                      >
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

            {/* Additional Info */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Note:</strong> You will be redirected to a secure
                payment gateway to complete your transaction. Please ensure you
                have sufficient funds and a stable internet connection.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
