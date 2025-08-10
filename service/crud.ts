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
            url: url,
            method: 'POST',
            param: payload,
        })
        .then((res) => {
            response.result = res.data.result;
            response.message = '등록에 성공하였습니다.';
            response.errorCode = res.data.errorCode;
            if (response.type === ResponseType.FAIL) {
                response.message = '등록에 실패하였습니다.';
                return;
            }
            if (typeof callback === 'function') callback(response);
        })
        .catch((error) => {
            console.log(error);
            response.message = '등록에 실패하였습니다.';
            response.type = ResponseType.FAIL;
        })
        .finally(() => {
            if (isAlert) alert(response.message);
        });
};
