"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle,
  XCircle,
  User,
  Calendar,
  Hash,
  Shield,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { checkPermitStatus, PermitStatus } from "@/lib/api/services/student";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const [result, setResult] = useState<PermitStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyPermit = async () => {
      const code = searchParams.get("code");

      if (!code) {
        setResult({ valid: false, reason: "No permit code provided" });
        setLoading(false);
        return;
      }

      try {
        const res = await checkPermitStatus(code);
        if (!res.success || !res.data) {
          setResult({ valid: false, reason: "Permit not found" });
          setLoading(false);
          return;
        }
        setResult(res.data);
      } catch (error) {
        console.error("Error verifying permit:", error);
        setResult({ valid: false, reason: "Error verifying permit" });
      } finally {
        setLoading(false);
      }
    };

    verifyPermit();
  }, [searchParams]);

  const handleDownloadPDF = async () => {
    if (!result || !result.valid) {
      alert("Unable to generate PDF. Please try again.");
      return;
    }
    const verificationUrl = `${window.location.origin}/verify?code=${result.permit?.originalCode}`;
    const qrCode = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
      verificationUrl
    )}&size=200x200`;
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
                result.permit?.originalCode
              }</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Student ID</div>
              <div class="detail-value">${
                result.permit?.student.studentId
              }</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Full Name</div>
              <div class="detail-value">${result.permit?.student.name}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Course of Study</div>
              <div class="detail-value">${result.permit?.student.course}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Academic Level</div>
              <div class="detail-value">${result.permit?.student.level}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Expiry Date</div>
              <div class="detail-value">${new Date(
                result.permit?.expiryDate || ""
              ).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}</div>
            </div>
          </div>

          ${
            qrCode
              ? `
            <div class="qr-section">
              <div class="qr-title">Verification QR Code</div>
              <div class="qr-code">
                <img src="${qrCode}" width="150" height="150" alt="QR Code" style="border-radius: 8px;" />
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
        result.permit?.originalCode
      }_${new Date().getFullYear()}.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert(
        "Failed to generate PDF. Please try again or contact support if the issue persists."
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen p-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 flex items-center justify-center">
        <Card className="w-full max-w-md border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="space-y-4 text-center">
              <div className="flex items-center justify-center w-20 h-20 p-4 mx-auto bg-blue-100 rounded-full shadow-lg dark:bg-blue-900/50">
                <Loader2 className="w-10 h-10 text-blue-600 dark:text-blue-400 animate-spin" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Verifying Permit
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Please wait while we validate your permit code...
                </p>
              </div>
              <div className="flex justify-center">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-600 rounded-full dark:bg-blue-400 animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-blue-600 rounded-full dark:bg-blue-400 animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-blue-600 rounded-full dark:bg-blue-400 animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
      <div className="max-w-2xl pt-8 mx-auto">
        <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
          <CardHeader className="pb-6 text-center">
            <div
              className={`mx-auto p-4 rounded-full w-20 h-20 flex items-center justify-center shadow-lg ${
                result?.valid
                  ? "bg-green-100 dark:bg-green-900/50"
                  : "bg-red-100 dark:bg-red-900/50"
              }`}
            >
              {result?.valid ? (
                <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
              ) : (
                <XCircle className="w-10 h-10 text-red-600 dark:text-red-400" />
              )}
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
              {result?.valid ? "Valid Permit" : "Invalid Permit"}
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              {result?.valid
                ? "This permit has been successfully verified"
                : "This permit could not be verified"}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {result?.valid ? (
              <div className="space-y-6">
                {/* Status Badge */}
                <div className="flex justify-center">
                  <Badge className="px-4 py-2 text-green-800 bg-green-100 border border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-800">
                    <Shield className="w-4 h-4 mr-2" />
                    {result.permit?.status || "Active"}
                  </Badge>
                </div>

                <Separator className="bg-gray-200 dark:bg-slate-600" />

                {/* Student Information */}
                <div className="space-y-4">
                  <h3 className="flex items-center text-lg font-semibold text-gray-900 dark:text-white">
                    <User className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                    Student Information
                  </h3>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-slate-700/50 dark:border-slate-600">
                      <div className="flex items-center space-x-3">
                        <User className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Student Name
                          </p>
                          <p className="text-lg font-semibold text-gray-900 dark:text-white">
                            {result.permit?.student.name}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-slate-700/50 dark:border-slate-600">
                      <div className="flex items-center space-x-3">
                        <Hash className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Student ID
                          </p>
                          <p className="font-mono text-lg font-semibold text-gray-900 dark:text-white">
                            {result.permit?.student.studentId}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-slate-700/50 dark:border-slate-600">
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Expiry Date
                          </p>
                          <p className="text-lg font-semibold text-gray-900 dark:text-white">
                            {new Date(
                              result.permit?.expiryDate || ""
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Actions */}
                <div className="pt-4 border-t border-gray-200 dark:border-slate-600">
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button
                      className="flex-1 text-white bg-blue-600 shadow-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                      onClick={handleDownloadPDF}
                      disabled={loading || !result.valid}
                    >
                      Download Permit
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 text-gray-700 border-gray-300 dark:border-slate-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700"
                      asChild
                    >
                      <Link href="/contact">Contact Support</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Error Message */}
                <div className="p-4 border border-red-200 rounded-lg bg-red-50 dark:bg-red-900/20 dark:border-red-800">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium text-red-800 dark:text-red-300">
                        Verification Failed
                      </h3>
                      <p className="mt-1 text-sm text-red-700 dark:text-red-400">
                        {result?.reason ||
                          "The permit code you entered is not valid or has expired."}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Help Section */}
                <div className="p-4 border border-blue-200 rounded-lg bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800">
                  <h3 className="mb-2 text-sm font-medium text-blue-800 dark:text-blue-300">
                    Need Help?
                  </h3>
                  <ul className="space-y-1 text-sm text-blue-700 dark:text-blue-400">
                    <li>• Check that your permit code is entered correctly</li>
                    <li>• Ensure your permit hasn&apos;t expired</li>
                    <li>
                      • Contact Student Services if you believe this is an error
                    </li>
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button
                    className="flex-1 text-white bg-blue-600 shadow-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                    asChild
                  >
                    <Link href="/service/permits/status">Try Again</Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 text-gray-700 border-gray-300 dark:border-slate-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700"
                  >
                    <Link href="/contact">Contact Support</Link>
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
