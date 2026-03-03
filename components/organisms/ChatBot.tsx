'use client';
import React, { useEffect, useRef, useState } from 'react';
import { ChatContainer, ChatHeader, FloatingButton, InputArea, MessageItem, MessageList } from '../../styles/components/organism/ChatBot';
import { usePathname } from 'next/navigation';
import axiosInstance from '../../libs/axios';
import { userStore } from '../../store/userStore';

const quickQuestions = ['내일 예약 가능해?', '내 문의 답변 달렸어?', '캣타워 나눔 글 있어?', '최신 이벤트 알려줘!'];
const ChatBot = () => {
    const { userData } = userStore();
    useEffect(() => {
        if (!userData) {
            setMessages([{ role: 'assistant', content: '안냥! 고냥서비스에 대해 궁금한 게 있냥?' }]);
            setIsOpen(false);
        }
    }, [userData]);
    const pathname = usePathname();
    const hiddenPaths = ['/member/login', '/member/join', '/admin'];
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([{ role: 'assistant', content: '안냥! 고냥서비스에 대해 궁금한 게 있냥?' }]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const messageListRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messageListRef.current) {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
        }
    }, [messages]);

    const toggleChat = () => setIsOpen(!isOpen);

    const handleSend = async (overrideInput?: string) => {
        const messageToSend = overrideInput || input;

        if (!messageToSend.trim() || isLoading) return;

        const userMsg = { role: 'user', content: messageToSend };
        const newMessages = [...messages, userMsg];
        setMessages(newMessages);
        setInput('');
        setIsLoading(true);

        try {
            const response = await axiosInstance.post('/api/chat', {
                messages: newMessages,
            });

            if (response.data && response.data.result) {
                setMessages((prev) => [...prev, { role: 'assistant', content: response.data.result }]);
            }
        } catch (error) {
            console.error('에러 발생냥!', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (hiddenPaths.some((path) => pathname.startsWith(path))) return null;

    return (
        <>
            <FloatingButton onClick={toggleChat}>{isOpen ? '❌' : '🐾'}</FloatingButton>

            <ChatContainer $isOpen={isOpen}>
                <ChatHeader>
                    <div className="header-text">
                        <h3>고냥 AI 상담원</h3>
                        <p>무엇이든 물어보라냥!</p>
                    </div>
                </ChatHeader>

                <MessageList ref={messageListRef}>
                    {messages.map((msg, idx) => (
                        <MessageItem key={idx} $isUser={msg.role === 'user'}>
                            <div className="bubble">{msg.content}</div>
                        </MessageItem>
                    ))}
                    {isLoading && (
                        <MessageItem $isUser={false}>
                            <div className="bubble">고냥이가 생각 중이다냥...🐾</div>
                        </MessageItem>
                    )}
                </MessageList>
                {!isLoading && (
                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '8px',
                            padding: '10px',
                            backgroundColor: '#f9f9f9',
                            borderTop: '1px solid #eee',
                        }}
                    >
                        {quickQuestions.map((q, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleSend(q)}
                                style={{
                                    fontSize: '12px',
                                    padding: '5px 10px',
                                    borderRadius: '15px',
                                    border: '1px solid #ddd',
                                    backgroundColor: 'white',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                }}
                                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#fff9c4')}
                                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'white')}
                            >
                                {q}
                            </button>
                        ))}
                    </div>
                )}

                <InputArea>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="질문을 입력해라냥..."
                        disabled={isLoading}
                    />
                    <button onClick={() => handleSend()} disabled={isLoading}>
                        {isLoading ? '...' : '전송'}
                    </button>
                </InputArea>
            </ChatContainer>
        </>
    );
};

export default ChatBot;
