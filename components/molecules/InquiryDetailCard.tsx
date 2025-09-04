import React from 'react';
import { InquiryDetailResponse } from '../../types/Common';

const InquiryDetailCard = ({ inquiry, onBack }: { inquiry: InquiryDetailResponse; onBack: () => void }) => {
    const handleClick = () => {
        alert('라우터푸쉬 문의하기');
    };
    return (
        <div
            style={{
                padding: '20px',
                background: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            }}
        >
            <button
                onClick={onBack}
                style={{
                    marginBottom: '15px',
                    background: 'transparent',
                    border: 'none',
                    color: '#0070f3',
                    cursor: 'pointer',
                    fontSize: '14px',
                }}
            >
                ← 전체 문의 보기
            </button>

            <h2 style={{ marginBottom: '10px' }}>{inquiry.title}</h2>
            <p
                style={{
                    borderBottom: '1px solid #d2d2d2',
                    paddingBottom: '10px',
                    marginBottom: '15px',
                }}
            >
                {inquiry.content}
            </p>
            <p>
                <strong>{inquiry.answerUserId}</strong>
            </p>
            <p>{inquiry.answeredAt ? new Date(inquiry.answeredAt).toLocaleString() : '아직 답변이 준비 중입니다.'}</p>

            <p>{inquiry.answer}</p>

            <div
                style={{
                    marginTop: '40px',
                    textAlign: 'center',
                    padding: '20px',
                    borderTop: '1px solid #eee',
                }}
            >
                <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>
                    도움이 더 필요하시다면
                    <br />
                    문의를 등록해 주세요.
                </h3>
                <button
                    style={{
                        padding: '12px 30px',
                        fontSize: '16px',
                        backgroundColor: 'bisque',
                        color: 'black',
                        border: 'none',
                        borderRadius: '25px',
                        cursor: 'pointer',
                    }}
                    onClick={handleClick}
                >
                    문의하기
                </button>
            </div>
        </div>
    );
};
export default InquiryDetailCard;
