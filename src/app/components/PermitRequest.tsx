'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaIdCard, FaGraduationCap, FaMoneyBillWave, FaCheckCircle, FaFileInvoiceDollar, FaSpinner, FaTimes, FaCreditCard } from 'react-icons/fa';

type PermitResponse = {
  status: 'approved' | 'rejected' | 'pending';
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

export default function PermitRequest() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [permitResponse, setPermitResponse] = useState<PermitResponse | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'success' | 'failed'>('pending');
  const [formData, setFormData] = useState({
    studentId: '',
    email: '',
    fullName: '',
    course: '',
    level: '',
    semester: '',
    academicYear: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      // TODO: Initialize Paystack payment here
      // This is where you'll integrate the actual Paystack payment
      // For now, we'll simulate a successful payment
      await new Promise(resolve => setTimeout(resolve, 2000));
      setPaymentStatus('success');
      setStep(4); // Move to request submission
    } catch (error) {
      console.error('Payment failed:', error);
      setPaymentStatus('failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with your actual API endpoint
      const response = await fetch('YOUR_APP_API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setPermitResponse(data);
      setStep(5);
    } catch (error) {
      console.error('Error submitting permit request:', error);
      setPermitResponse({
        status: 'rejected',
        message: 'Failed to process request. Please try again.'
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
            <h3 className="text-2xl font-bold text-primary mb-6">Student Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2">Student ID</label>
                <input
                  type="text"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Enter your student ID"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Course</label>
                <input
                  type="text"
                  name="course"
                  value={formData.course}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Enter your course"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Level</label>
                <select
                  name="level"
                  value={formData.level}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="">Select Level</option>
                  <option value="100">Level 100</option>
                  <option value="200">Level 200</option>
                  <option value="300">Level 300</option>
                  <option value="400">Level 400</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Semester</label>
                <select
                  name="semester"
                  value={formData.semester}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="">Select Semester</option>
                  <option value="1">First Semester</option>
                  <option value="2">Second Semester</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Academic Year</label>
                <input
                  type="text"
                  name="academicYear"
                  value={formData.academicYear}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="e.g., 2023/2024"
                />
              </div>
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
            <h3 className="text-2xl font-bold text-primary mb-6">Request Summary</h3>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Student ID:</span>
                  <span className="font-semibold">{formData.studentId}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-semibold">{formData.fullName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Semester:</span>
                  <span className="font-semibold">{formData.semester === '1' ? 'First' : 'Second'} Semester</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Academic Year:</span>
                  <span className="font-semibold">{formData.academicYear}</span>
                </div>
              </div>
            </div>
            <p className="text-gray-600 text-center mt-4">
              Please proceed to payment to continue with your permit request.
            </p>
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
            <h3 className="text-2xl font-bold text-primary mb-6">Payment Details</h3>
            <div className="bg-white border border-primary/20 rounded-lg p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <FaCreditCard className="text-primary text-xl" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">SRC Dues Payment</h4>
                  <p className="text-gray-600">Pay your SRC dues to proceed with the permit request</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Amount to Pay:</span>
                  <span className="font-bold text-xl text-primary">GH₵100.00</span>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-4">Payment Method</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handlePayment}
                      className="p-4 border rounded-lg hover:border-primary hover:bg-primary/5 transition-all"
                    >
                      <div className="flex items-center gap-2">
                        <FaMoneyBillWave className="text-primary" />
                        <span>Mobile Money</span>
                      </div>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handlePayment}
                      className="p-4 border rounded-lg hover:border-primary hover:bg-primary/5 transition-all"
                    >
                      <div className="flex items-center gap-2">
                        <FaCreditCard className="text-primary" />
                        <span>Card Payment</span>
                      </div>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handlePayment}
                      className="p-4 border rounded-lg hover:border-primary hover:bg-primary/5 transition-all"
                    >
                      <div className="flex items-center gap-2">
                        <FaMoneyBillWave className="text-primary" />
                        <span>Bank Transfer</span>
                      </div>
                    </motion.button>
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
              className="text-center py-12"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 mx-auto mb-6"
              >
                <FaSpinner className="text-primary text-4xl" />
              </motion.div>
              <h3 className="text-xl font-semibold text-gray-700">Processing Payment</h3>
              <p className="text-gray-600 mt-2">Please wait while we process your payment...</p>
            </motion.div>
          );
        }

        if (paymentStatus === 'success') {
          return (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <FaCheckCircle className="text-green-500 text-4xl" />
              </motion.div>
              <h3 className="text-2xl font-bold text-primary mb-4">Payment Successful!</h3>
              <p className="text-gray-600 mb-6">
                Your SRC dues have been paid successfully. You can now proceed with your permit request.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmit}
                className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Submit Permit Request
              </motion.button>
            </motion.div>
          );
        }

        if (paymentStatus === 'failed') {
          return (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <FaTimes className="text-red-500 text-4xl" />
              </motion.div>
              <h3 className="text-2xl font-bold text-red-600 mb-4">Payment Failed</h3>
              <p className="text-gray-600 mb-6">
                There was an error processing your payment. Please try again.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStep(3)}
                className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Try Again
              </motion.button>
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
              className="text-center py-12"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 mx-auto mb-6"
              >
                <FaSpinner className="text-primary text-4xl" />
              </motion.div>
              <h3 className="text-xl font-semibold text-gray-700">Processing Your Request</h3>
              <p className="text-gray-600 mt-2">Please wait while we verify your payment and generate your permit...</p>
            </motion.div>
          );
        }

        if (permitResponse?.status === 'approved' && permitResponse.permitDetails && permitResponse.receipt) {
          return (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <FaCheckCircle className="text-green-500 text-4xl" />
                </motion.div>
                <h3 className="text-2xl font-bold text-primary mb-4">Request Approved!</h3>
                <p className="text-gray-600">Your exam permit has been generated successfully.</p>
              </div>

              {/* Permit Details */}
              <div className="bg-white border border-primary/20 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-semibold text-primary mb-4">Exam Permit Details</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Permit Number</p>
                    <p className="font-semibold">{permitResponse.permitDetails.permitNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Student ID</p>
                    <p className="font-semibold">{permitResponse.permitDetails.studentId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Full Name</p>
                    <p className="font-semibold">{permitResponse.permitDetails.fullName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Course</p>
                    <p className="font-semibold">{permitResponse.permitDetails.course}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Level</p>
                    <p className="font-semibold">Level {permitResponse.permitDetails.level}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Semester</p>
                    <p className="font-semibold">{permitResponse.permitDetails.semester}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Academic Year</p>
                    <p className="font-semibold">{permitResponse.permitDetails.academicYear}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Issue Date</p>
                    <p className="font-semibold">{permitResponse.permitDetails.issueDate}</p>
                  </div>
                </div>
              </div>

              {/* Receipt Details */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Payment Receipt</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Receipt Number</p>
                    <p className="font-semibold">{permitResponse.receipt.receiptNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Amount Paid</p>
                    <p className="font-semibold">{permitResponse.receipt.amount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Payment Date</p>
                    <p className="font-semibold">{permitResponse.receipt.paymentDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Payment Method</p>
                    <p className="font-semibold">{permitResponse.receipt.paymentMethod}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-4 mt-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setStep(1);
                    setFormData({
                      studentId: '',
                      email: '',
                      fullName: '',
                      course: '',
                      level: '',
                      semester: '',
                      academicYear: ''
                    });
                    setPermitResponse(null);
                  }}
                  className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  New Request
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.print()}
                  className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Print Permit & Receipt
                </motion.button>
              </div>
            </motion.div>
          );
        }

        if (permitResponse?.status === 'rejected') {
          return (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <FaTimes className="text-red-500 text-4xl" />
              </motion.div>
              <h3 className="text-2xl font-bold text-red-600 mb-4">Request Rejected</h3>
              <p className="text-gray-600 mb-6">
                {permitResponse.message || 'Your request could not be processed. Please ensure you have paid your SRC dues and try again.'}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setStep(1);
                  setPermitResponse(null);
                }}
                className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Try Again
              </motion.button>
            </motion.div>
          );
        }

        return null;

      default:
        return null;
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-center mb-8">SRC Dues & Exam Permit</h2>
          <p className="text-gray-600 text-center mb-8">
            Pay your SRC dues to request your exam permit for the current semester.
          </p>

          <div className="bg-white rounded-xl shadow-lg p-8">
            {/* Progress Steps */}
            <div className="flex justify-between mb-8">
              {[1, 2, 3, 4, 5].map((stepNumber) => (
                <div
                  key={stepNumber}
                  className={`flex items-center ${
                    stepNumber !== 5 ? 'flex-1' : ''
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step >= stepNumber
                        ? 'bg-primary text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {stepNumber}
                  </div>
                  {stepNumber !== 5 && (
                    <div
                      className={`flex-1 h-1 mx-2 ${
                        step > stepNumber ? 'bg-primary' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Form Steps */}
            <AnimatePresence mode="wait">
              {renderStep()}
            </AnimatePresence>

            {/* Navigation Buttons */}
            {step < 3 && !isLoading && (
              <div className="flex justify-between mt-8">
                {step > 1 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setStep(prev => prev - 1)}
                    className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Previous
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setStep(prev => prev + 1)}
                  className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors ml-auto"
                >
                  Next
                </motion.button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
} 