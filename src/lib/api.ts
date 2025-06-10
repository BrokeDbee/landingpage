'use server'

import { StudentData, PaymentResponse, VerifyPaymentResponse } from "@/lib/types"
import axios from "axios"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || ""
axios.defaults.baseURL = API_BASE_URL

export const findStudentById = async (studentId: string): Promise<StudentData | null> => {
  try {
    const response = await axios.get(`/api/students/${studentId}`)
    return response.data as StudentData
  } catch (error) {
    console.error("Error fetching student data:", error)
    return null
  }
}

export const initiatePayment = async (data: {
  studentId: string;
  callback_url: string;
  studentData: {
    name: string;
    email: string;
    course: string;
    level: string;
    number: string;
  };
  amount: number;
  currency: string;
  metadata: {
    permitType: string;
  };
}): Promise<PaymentResponse> => {
  try {
    const response = await axios.post('/api/payments/initiate', data)
    return response.data

  } catch (error: any) {
    console.error("Error initiating payment:", error)
    throw new Error(error.response?.data?.error || "Payment initiation failed")
  }
}

export const verifyPayment = async (reference: string): Promise<VerifyPaymentResponse> => {
  try {
    const response = await axios.get(`/api/payments/verify/${reference}`)
    return response.data
  } catch (error) {
    console.error("Error verifying payment:", error)
    throw new Error("Payment verification failed")
  }
}

export const getPermit = async (permitCode: string): Promise<any> => {
  try {
    const response = await axios.get(`/api/permits/${permitCode}`)
    return response.data
  } catch (error) {
    console.error("Error fetching permit:", error)
    throw new Error("Permit retrieval failed")
  }
}



export const checkStudentStatus = async (studentId: string): Promise<any> => {
  try {
    const response = await axios.get(`/api/permits/status?studentId=${studentId}`)
    return response.data
  } catch (error) {
    console.error("Error checking student status:", error)
    throw new Error("Failed to check student status")
  }
}
export const checkPermitStatus = async (permitCode: string): Promise<any> => {
  try {
    const response = await axios.get(`/api/permits/status?code=${permitCode}`)
    return response.data
  } catch (error) {
    console.error("Error checking permit status:", error)
    throw new Error("Failed to check permit status")
  }
}


export const getExecutives = async (category?: string): Promise<any> => {
  try {
    const response = await axios.get('/api/executives', {
      params: { category }
    })
    return response.data
  } catch (error) {
    console.error("Error fetching executives:", error)
    throw new Error("Failed to fetch executives")
  }
}