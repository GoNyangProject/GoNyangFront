import { NextRequest, NextResponse } from 'next/server';
import { Request, Response } from '../../../../types/Common';
import { ResponseType } from '../../../../enum/Common';

const DOMAIN = process.env.BACK_URL;

const _fetch = async (param: Request, incomingHeaders: Headers) => {
    const authHeader = incomingHeaders.get('Authorization');
    const refreshHeader = incomingHeaders.get('Refresh-Token');

    const result: Response = {
        type: ResponseType.SUCCESS,
        errorCode: '0000',
    };

    const response = await fetch(`${DOMAIN}${param.url}`, {
        method: param.method,
        headers: {
            'content-type': 'application/json',
            ...(authHeader ? { Authorization: authHeader } : {}),
            ...(refreshHeader ? { 'Refresh-Token': refreshHeader } : {}),
        },
        body: JSON.stringify(param.param),
    });

    const authorization = response.headers.get('Authorization');
    const refreshToken = response.headers.get('Refresh-Token');
    if (param.url === '/member/login' && authorization != null && refreshToken != null) {
        result.authorization = authorization;
        result.refreshToken = refreshToken;
    } else {
        const responseJson: Response = await response.json();
        if (responseJson) {
            result.errorCode = responseJson.errorCode;
            result.message = responseJson.message;
            result.result = responseJson.result;
        }
    }

    return result;
};

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const result = await _fetch(body as Request, req.headers);
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json(
            {
                type: ResponseType.FAIL,
                message: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 400 }
        );
    }
}

