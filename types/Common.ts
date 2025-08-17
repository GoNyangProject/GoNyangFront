import { Method } from 'axios';
import { RequestType, ResponseType } from '../enum/Common';

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
    username: string;
    menuName: string;
    content: string;
    bookDate: string;
};
