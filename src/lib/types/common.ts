import { Permit, Role, Student, User } from "@prisma/client"

export interface ServiceResponse<T = unknown> {
    success: boolean
    data?: T
    error?: string
}
export interface PermitResponse extends ServiceResponse<(Permit & {
    student: Student
})> {
    qrCode?: string;
}
export interface PaginatedData<T> {
    data: T[]
    total: number
    page: number
    pageSize: number
    totalPages: number
}

export type PaginatedResponse<T> = ServiceResponse<PaginatedData<T>>


export type SessionUser = {
    id: number;
    username: string;
    image?: string | null;
    email: string;
    role: {
        id: number;
        name: string;
    };
}

export type AuthorizedUser = User & {
    role: Role
};



export type StudentPermit = Permit & {
    student: Student
    issuedBy: {
        username: string
    } | null
}

export type StudentDetails = Student & {
    permits: (Permit & {
        issuedBy: {
            username: string;
        } | null;
    })[];
};


export interface RoleWithPermissions extends Role {
    id: number;
    name: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;

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
