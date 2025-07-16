import { NextRequest, NextResponse } from 'next/server';
import { Request, Response } from '../../../../types/Common';
import { ResponseType } from '../../../../enum/Common';

const DOMAIN = process.env.BACK_URL;

const _fetch = async (param: Request) => {
    const result: Response = {
        type: ResponseType.SUCCESS,
        errorCode: '0000',
    };
    const response = await fetch(`${DOMAIN}${param.url}`, {
        method: param.method,
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(param.param),
    });
    const responseJson = await response.json();

    return result;
};

export async function POST(req: NextRequest) {
    let result;
    let param;
    try {
        const body = await req.json();
        param = body as Request;
        result = _fetch(param);
    } catch (error) {
        let errorMessage = '';
        if (error instanceof Error) {
            errorMessage = error.message;
            return NextResponse.json(
                {
                    type: ResponseType.FAIL,
                    message: errorMessage,
                },
                { status: 400 },
            );
        }
    }
    return NextResponse.json(result);
}
