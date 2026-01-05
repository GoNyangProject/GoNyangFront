import { NextRequest, NextResponse } from 'next/server';
import { Request, Response } from '../../../../types/Common';
import { ResponseType } from '../../../../enum/Common';

const DOMAIN = process.env.NEXT_PUBLIC_BACK_URL;

const _fetch = async (param: Request, cookieString: string) => {
    const result: Response = {
        type: ResponseType.SUCCESS,
        errorCode: '0000',
    };

    const response = await fetch(`${DOMAIN}${param.url}`, {
        method: param.method,
        headers: {
            'content-type': 'application/json',
            Cookie: cookieString,
        },
        body: param.method === 'GET' || param.method === 'DELETE' ? undefined : JSON.stringify(param.param),
    });

    const responseJson: Response = await response.json();

    if (!response.ok) {
        throw {
            message: responseJson.message || response.statusText,
            status: response.status,
            errorCode: responseJson.errorCode || String(response.status),
        };
    }

    result.errorCode = responseJson.errorCode;
    result.message = responseJson.message;
    result.result = responseJson.result;

    return {
        result,
        //프록시타게하려면 쿠키도 같이보내야함 유실되기때문에
        setCookie: response.headers.get('set-cookie'),
    };
};

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const cookieHeader = req.headers.get('cookie') ?? '';
        const { result, setCookie } = await _fetch(body as Request, cookieHeader);

        const response = NextResponse.json(result);

        if (setCookie) {
            response.headers.set('set-cookie', setCookie);
        }

        if (body.url.includes('/logout')) {
            response.cookies.set('accessToken', '', { path: '/', expires: new Date(0) });
            response.cookies.set('refreshToken', '', { path: '/', expires: new Date(0)});
        }
        return response;
    } catch (error: any) {
        return NextResponse.json(
            {
                type: ResponseType.FAIL,
                message: error?.message || 'Unknown Error',
                errorCode: error?.errorCode,
            },
            {
                status: error?.status || 400,
            },
        );
    }
}
