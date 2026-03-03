import { ChatCompletionTool } from 'openai/resources/chat/completions';

export const CHAT_TOOLS: ChatCompletionTool[] = [
    {
        type: 'function',
        function: {
            name: 'check_availability',
            description: '특정 날짜와 서비스 메뉴를 기준으로 예약 가능 여부를 확인한다냥!',
            parameters: {
                type: 'object',
                properties: {
                    date: { type: 'string', description: 'YYYY-MM-DD' },
                    serviceType: {
                        type: 'string',
                        description:
                            '사용자가 요청한 미용 서비스의 명칭이다냥. 만약 사용자가 메뉴를 명시하지 않았다면, 도구를 실행하지 말고 먼저 어떤 메뉴를 원하는지 되물어봐야 한다냥! 추가로 예약을 도와주진 못하니까 알려주기만해!',
                        enum: ['기본 미용', '목욕 패키지', '발톱 & 브러싱', '스페셜 미용', '스킨케어', '시니어 케어', '프리미엄 패키지'],
                    },
                },
                required: ['date', 'serviceType'],
            },
        },
    },
    {
        type: 'function',
        function: {
            name: 'get_my_book',
            description: '현재 로그인한 사용자의 가장 최근 예약 내역 1건을 조회한다냥!',
            parameters: { type: 'object', properties: {} },
        },
    },
    {
        type: 'function',
        function: {
            name: 'get_recent_notices',
            description: '최신 공지사항 및 이벤트 정보를 조회한다냥!',
            parameters: { type: 'object', properties: {} },
        },
    },
    {
        type: 'function',
        function: {
            name: 'search_community',
            description: '커뮤니티 게시글 검색냥! 사용자가 입력한 단어 형태 그대로 키워드를 추출해라냥.',
            parameters: {
                type: 'object',
                properties: {
                    keyword: { type: 'string', description: '검색 키워드 (예: 캣타워)' },
                },
                required: ['keyword'],
            },
        },
    },
    {
        type: 'function',
        function: {
            name: 'get_my_inquiry_status',
            description: '로그인한 사용자가 남긴 1:1 문의의 답변 상태를 확인한다냥!',
            parameters: { type: 'object', properties: {} },
        },
    },
];

export const TOOL_CONFIG: Record<string, (args: any) => string> = {
    check_availability: (args) => `/llm/book/check?date=${args.date}&serviceType=${encodeURIComponent(args.serviceType)}`,
    get_my_book: () => '/llm/book/my-book',
    get_recent_notices: () => '/llm/notices',
    search_community: (args) => `/llm/community/search?keyword=${encodeURIComponent(args.keyword)}`,
    get_my_inquiry_status: () => '/llm/inquiry/my',
};
