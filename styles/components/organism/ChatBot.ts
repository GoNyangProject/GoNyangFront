import styled from 'styled-components';

export const FloatingButton = styled.div`
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 60px;
    height: 60px;
    background-color: #f5f5dc; /* 비스크 톤 */
    border: 2px solid #d2b48c;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 9999;
    transition: transform 0.2s;

    &:hover {
        transform: scale(1.1);
    }
`;

export const ChatContainer = styled.div<{ $isOpen: boolean }>`
    position: fixed;
    bottom: 100px;
    right: 30px;
    width: 350px;
    height: 550px; /* 조금 더 길게 잡아도 예뻐요 */
    max-height: 80vh; /* 화면의 80%를 넘지 않게 */
    background: white;
    border-radius: 20px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    display: ${(props) => (props.$isOpen ? 'flex' : 'none')};
    flex-direction: column;
    overflow: hidden;
    z-index: 9998;
    transition: all 0.3s ease-in-out;

    /* ✨ 모바일 반응형 핵심! (보통 768px 이하) */
    @media (max-width: 768px) {
        bottom: 0;
        right: 0;
        width: 100%; /* 가로 꽉 차게 */
        height: 100%; /* 세로 꽉 차게 */
        max-height: 100%;
        border-radius: 0; /* 모바일에선 둥근 모서리보다 꽉 찬 게 깔끔 */
    }
`;

export const ChatHeader = styled.div`
    background: #f5f5dc;
    padding: 15px 20px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .header-text {
        h3 {
            margin: 0;
            font-size: 16px;
            color: #555;
        }

        p {
            margin: 3px 0 0;
            font-size: 11px;
            color: #888;
        }
    }

    .close-mobile {
        display: none;
        font-size: 24px;
        cursor: pointer;
        @media (max-width: 768px) {
            display: block; /* 모바일에선 우측 상단 X 버튼 노출 */
        }
    }
`;

export const MessageList = styled.div`
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const MessageItem = styled.div<{ $isUser: boolean }>`
    display: flex;
    justify-content: ${(props) => (props.$isUser ? 'flex-end' : 'flex-start')};

    .bubble {
        max-width: 70%;
        padding: 10px 15px;
        border-radius: 15px;
        font-size: 14px;
        background: ${(props) => (props.$isUser ? '#ffe4b5' : '#f1f1f1')};
        color: #333;
    }
`;

export const InputArea = styled.div`
    padding: 15px;
    border-top: 1px solid #eee;
    display: flex;
    gap: 8px;
    background: white;

    @media (max-width: 768px) {
        padding-bottom: env(safe-area-inset-bottom); /* 아이폰 하단 바 대응 */
    }

    input {
        flex: 1;
        padding: 10px 15px;
        border: 1px solid #ddd;
        border-radius: 25px;
        outline: none;
        font-size: 14px; /* 모바일에선 16px 미만이면 자동 줌인될 수 있어 주의 */
    }

    button {
        background: #d2b48c;
        color: white;
        border: none;
        padding: 0 18px;
        border-radius: 25px;
        font-weight: bold;
        cursor: pointer;
    }
`;
