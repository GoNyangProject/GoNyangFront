import { Method } from 'axios';
import { RequestType, ResponseType } from '../enum/Common';
import { InquiryStatus } from '../enum/InquiryStatus';

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
    uuid: string;
    username: string;
    menuName: string;
    content: string;
    bookDate: string;
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
