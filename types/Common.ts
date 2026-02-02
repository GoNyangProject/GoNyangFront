import { Method } from 'axios';
import { RequestType, ResponseType } from '../enum/Common';
import { InquiryStatus } from '../enum/InquiryStatus';
import { User } from '../store/userStore';

export type SelectOption = {
    value: string;
    label: string;
    disabled?: boolean;
};

export type COLUMNS = {
    seq: number;
    value: string;
    label: string;
};

export type Request = {
    url: string;
    method: Method;
    param?: object;
    type?: RequestType;
};

export type Response = {
    type: ResponseType;
    result?: object;
    errorCode: string;
    message?: string;
    authorization?: string;
    refreshToken?: string;
};

export type Book = {
    orderId: string;
    username: string;
    menuName: string;
    content: string;
    bookDate: Date;
    price: number;
    deletedAt: Date;
};

export type Menu = {
    id: number;
    menuName: string;
    bookCount: number;
    content: string;
    price: number;
    score: number;
};

export type PetApiResponse = {
    petId: number;
    petName?: string;
    catBreed?: string;
    petAge?: number;
    petGender?: string;
    catNotes?: string;
    petImagePath?: string;
};

export type InquiryResponse = {
    title: string;
    inquiryNumber: string;
    createdAt: string;
    status: 'SUCCESS' | 'PENDING';
};
export type InquiryDetailResponse = {
    answerUserId: string;
    answer: string;
    answeredAt: string;
    content: string;
    title: string;
    inquiryNumber: string;
    createdAt: string;
    status: 'SUCCESS' | 'PENDING';
};

export type InquiryTableRow = {
    title: string;
    inquiryNumber: string;
    createdAt: string;
    inquiryStatus: InquiryStatus;
};
export type BookInfo = {
    menu: Menu;
    userData: User;
    bookDate: string;
};

export type BoardInfo = {
    id: number;
    userId: string;
    title: string;
    content: string;
    createdAt: string;
    totalCount: number;
    viewCount: number;
    likeCount: number;
    imgUrl: string;
};

export type CommunityInfo = {
    boards: [];
    totalElements: number;
    totalPages: number;
};
export type CommentList = {
    children: Array<CommentList>;
    content: string;
    createdAt: Date;
    deletedAt: Date;
    id: number;
    writer: string;
    petImagePath: string | null;
};

export type AdminMemberList = {
    id: number;
    displayName: string;
    createdAt: string;
    useCount: number;
    totalSpentAmount: number;
    status: string;
    memo: string;
};

// export type AdminMemberResponse = {
//     content: AdminMemberList;
//     totalPages: number;
//     totalElements: number;
// };
// types/admin/inquiry.ts (권장 위치)

export type InquiryItem = {
    id: number;
    name: string;
    createdAt: string;
    category: string;
    inquiryNumber: string;
    inquiryStatus: string;
    title: string;
    content?: string;
    answer?: string;
};

// API 응답 전체 구조 타입
export type AdminInquiryListResponse = {
    content: InquiryItem[];
    totalPages: number;
    totalElements: number;
};

export type BoardResponseDTO = {
    id: number;
    title: string;
    content?: string; // 목록에서는 안 올 수도 있으니 선택 사항
    createdAt: string; // JSON으로 넘어올 땐 보통 string 형태입니다.
    viewCount: number;
    likeCount: number;
    imgUrl?: string;
    userId: string;
};

export type CommunityListResponse = {
    boards: BoardResponseDTO[];
    totalPages: number;
    totalElements: number;
};

export type FileInfoResponse = {
    src: string;
    fileName?: string;
};

export type FileUploadResponse = {
    message: string;
    result?: FileInfoResponse;
    type: string;
};

export type AdminBookResponse = {
    orderId: string;
    bookDate: string;
    price: number;
    memberId: string;
    username: string;
    userPhone: string | null;
    menuName: string;
    cancelled: boolean;
};

export type AdminBlockResponse = {
    id: number;
    blockDate: string;
    reason: string;
};
