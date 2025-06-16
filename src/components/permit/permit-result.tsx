"use client";

import type React from "react";
import { useEffect, useRef } from "react";
import {
  CheckCircle,
  XCircle,
  FileText,
  Download,
  Loader2,
  RefreshCw,
} from "lucide-react";
import Image from "next/image";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { PermitResponse } from "@/lib/types/common";
import { useRouter } from "next/navigation";
import { Student } from "@prisma/client";

interface PermitResultProps {
  isLoading: boolean;
  permitResponse: PermitResponse | null;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setStudentIdInput: React.Dispatch<React.SetStateAction<string>>;
  setStudentData: React.Dispatch<React.SetStateAction<Student | null>>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Student>>>;
  setPermitResponse: React.Dispatch<
    React.SetStateAction<PermitResponse | null>
  >;
  setPaymentStatus: React.Dispatch<
    React.SetStateAction<
      "pending" | "success" | "failed" | "idle" | "verifying"
    >
  >;
  handleSubmit: () => void;
}

export function PermitResult({
  isLoading,
  permitResponse,
  setStep,
  setStudentIdInput,
  setStudentData,
  setFormData,
  setPermitResponse,
  setPaymentStatus,
  handleSubmit,
}: PermitResultProps) {
  const permitRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    handleSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetForm = () => {
    router.replace("/services/permits/request");
    setStep(1);
    setStudentIdInput("");
    setStudentData(null);
    setFormData({
      studentId: "",
      name: "",
      email: "",
      course: "",
      level: "",
      number: "",
    });
    setPermitResponse(null);
    setPaymentStatus("pending");
  };

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
                permitResponse.data.student?.studentId
              }</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Full Name</div>
              <div class="detail-value">${
                permitResponse.data.student?.name
              }</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Course of Study</div>
              <div class="detail-value">${
                permitResponse.data.student?.course
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
          // Ensure all styles are applied
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

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-6">
        <div className="relative">
          <Loader2 className="w-16 h-16 text-blue-600 animate-spin" />
          <div className="absolute inset-0 w-16 h-16 border-4 border-blue-200 rounded-full animate-pulse"></div>
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-semibold text-gray-800">
            Processing Your Request
          </h3>
          <p className="text-gray-600 max-w-md">
            Please wait while we verify your payment and generate your exam
            permit...
          </p>
        </div>
      </div>
    );
  }

  if (permitResponse?.success && permitResponse.data) {
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
                      src={permitResponse.qrCode || "/placeholder.svg"}
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

  if (!permitResponse?.success) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-6">
        <div className="flex items-center justify-center w-20 h-20 mx-auto bg-red-100 rounded-full">
          <XCircle className="w-12 h-12 text-red-600" />
        </div>
        <div className="text-center space-y-4">
          <h3 className="text-3xl font-bold text-red-600">Request Rejected</h3>
          <div className="max-w-md mx-auto">
            <p className="text-lg text-gray-600 mb-4">
              {permitResponse?.error ||
                "Your request could not be processed. Please ensure you have paid your SRC dues and try again."}
            </p>
          </div>
          <button
            onClick={() => {
              setStep(1);
              setPermitResponse(null);
              setPaymentStatus("pending");
            }}
            className="flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full hover:from-red-700 hover:to-red-800 transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return null;
}
