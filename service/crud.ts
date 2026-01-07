import axiosInstance from '../libs/axios';
import { ResponseType } from '../enum/Common';
import { Response } from '../types/Common';

export const Post = (url: string, payload: object, callback?: (response: Response) => void, isAlert: boolean = true) => {
    const response: Response = {
        type: ResponseType.SUCCESS,
        errorCode: '0000',
    };

    axiosInstance
        .post('/api/backend', {
            url,
            method: 'POST',
            param: payload,
        })
        .then((res) => {
            response.result = res.data.result;
            response.message = res.data.message;
            response.errorCode = res.data.errorCode;

            if (typeof callback === 'function') callback(response);
        })
        .catch((error) => {
            console.error(error);
            response.type = ResponseType.FAIL;
            response.message = '요청에 실패하였습니다.';
        })
        .finally(() => {
            if (isAlert) alert(response.message);
        });
};

export const Get = (url: string, callback?: (response: Response) => void) => {
    const response: Response = {
        type: ResponseType.SUCCESS,
        errorCode: '0000',
    };

    axiosInstance
        .post('/api/backend', {
            url,
            method: 'GET',
        })
        .then((res) => {
            response.result = res.data.result;
            if (typeof callback === 'function') callback(response);
        })
        .catch((error) => {
            console.error(error);
        });
};
