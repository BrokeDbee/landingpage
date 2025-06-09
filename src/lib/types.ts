export type PermitResponse = {
  success: boolean
  data?: {
    permitCode: string;
    status: string;
    id: number;
    originalCode: string;
    startDate: Date;
    expiryDate: Date;
    amountPaid: number;
    studentId: number;
    issuedById: number | null;
    createdAt: Date;
    updatedAt: Date;
    student: {
      number: string;
      id: number;
      studentId: string;
      createdAt: Date;
      updatedAt: Date;
      name: string;
      email: string;
      course: string;
      level: string;
    }
  }
  permitCode?: string;
  qrCode?: string;
  error?: string;
}

export type StudentData = {
  number: string;
  studentId: string;
  id: number;
  name: string;
  email: string;
  course: string;
  level: string;
  createdAt: Date;
  updatedAt: Date;
}

export type FormData = {
  studentId: string;
  name: string;
  email: string;
  course: string;
  level: string;
  number: string;
}

export type PaymentResponse = {
  checkoutUrl: string
  reference: string
  status: 'PENDING' | 'SUCCESS' | 'FAILED' | 'CANCELLED'
}


export type PaymentStatus = 'PENDING' | 'SUCCESS' | 'FAILED'
export type VerifyPaymentResponse = {
  status: PaymentStatus,
  message: string,
  payment: any,
  permit: any | null,
  transactionId: string,
  amount: number,
  timestamp: string,
}
