import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { SYSTEM_PROMPT } from '../../../../constants/prompt';
import { CHAT_TOOLS, TOOL_CONFIG } from '@/app/api/chat/tool';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const DOMAIN = process.env.BACK_URL || process.env.NEXT_PUBLIC_BACK_URL;

async function fetchToSpring(url: string, cookie: string) {
    const response = await fetch(`${DOMAIN}${url}`, {
        headers: { 'content-type': 'application/json', Cookie: cookie },
    });
    const data = await response.json();
    return data?.result || '데이터가 없다냥!';
}

export async function POST(req: NextRequest) {
    try {
        const { messages } = await req.json();
        const cookieHeader = req.headers.get('cookie') ?? '';
        const systemMsg = { role: 'system', content: SYSTEM_PROMPT };

        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [systemMsg, ...messages],
            tools: CHAT_TOOLS,
        });

        const resMsg = response.choices[0].message;

        if (resMsg.tool_calls) {
            const toolResults = await Promise.all(
                resMsg.tool_calls.map(async (tool: any) => {
                    const handler = TOOL_CONFIG[tool.function.name];
                    const args = JSON.parse(tool.function.arguments);

                    const springData = handler ? await fetchToSpring(handler(args), cookieHeader) : '알 수 없는 도구냥!';

                    return {
                        role: 'tool' as const,
                        tool_call_id: tool.id,
                        content: JSON.stringify(springData),
                    };
                }),
            );

            const finalRes = await openai.chat.completions.create({
                model: 'gpt-4o-mini',
                messages: [systemMsg, ...messages, resMsg, ...toolResults],
            });

            return NextResponse.json({ result: finalRes.choices[0].message.content });
        }

        return NextResponse.json({ result: resMsg.content });
    } catch (error: any) {
        return NextResponse.json({ result: '고냥이가 꾹꾹이 중이라 잠시 후 다시 불러달라냥!' });
    }
}
