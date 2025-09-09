import { Method } from 'axios';
import { RequestType, ResponseType } from '../enum/Common';
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
    uuid: string;
    username: string;
    menuName: string;
    content: string;
    bookDate: Date;
    price: number;
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

export type BookInfo = {
    menu: Menu;
    userData: User;
    bookTime: string;
};
