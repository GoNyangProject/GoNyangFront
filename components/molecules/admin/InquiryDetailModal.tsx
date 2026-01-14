import React, { useState } from 'react';
import { InquiryItem } from '../../../types/Common';
import {
    AnswerTextarea,
    ButtonGroup,
    CloseButton,
    ContentBox,
    InfoGrid,
    ModalContent,
    ModalHeader,
    ModalOverlay,
} from '../../../styles/components/molecules/admin/InquiryDetailModal';
import Button from '../../atom/Button';
import { CATEGORY_MAP } from '../../../data/data-init';

type InquiryDetailModalProps = {
    inquiry: InquiryItem;
    onClose: () => void;
    onAnswer: (id: number, answer: string) => void; // 답변 등록 함수
};

const InquiryDetailModal = ({ inquiry, onAnswer, onClose }: InquiryDetailModalProps) => {
    const [answerText, setAnswerText] = useState(inquiry.answer || '');

    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()} style={{ width: '550px' }}>
                <ModalHeader>
                    <h3>문의 상세 정보</h3>
                    <CloseButton onClick={onClose}>&times;</CloseButton>
                </ModalHeader>
                <InfoGrid>
                    <div className="item">
                        <strong>작성자</strong> {inquiry.name}
                    </div>
                    <div className="item">
                        <strong>카테고리</strong> {CATEGORY_MAP[inquiry.category] || inquiry.category}
                    </div>
                    <div className="item">
                        <strong>문의번호</strong> {inquiry.inquiryNumber}
                    </div>
                    <div className="item">
                        <strong>등록일시</strong> {inquiry.createdAt?.replace('T', ' ').substring(0, 16)}
                    </div>
                </InfoGrid>

                {/* 실무 포인트 2: 문의 내용 (Q) */}
                <ContentBox>
                    <div className="title-area">Q. {inquiry.title}</div>
                    <div className="text-area">{inquiry.content}</div>
                </ContentBox>

                {/* 실무 포인트 3: 답변 영역 (A) */}
                <div style={{ fontWeight: '700', marginBottom: '8px', fontSize: '14px', color: '#3E66FB' }}>
                    <span style={{ marginRight: '5px' }}>●</span> 관리자 답변
                </div>
                <AnswerTextarea
                    value={answerText}
                    onChange={(e) => setAnswerText(e.target.value)}
                    placeholder="고객에게 전달될 답변 내용을 성심껏 작성해주세요."
                />

                <ButtonGroup>
                    <Button width="120px" height="40px" backgroundColor="#3E66FB" color="white" onClick={() => onAnswer(inquiry.id, answerText)}>
                        {inquiry.inquiryStatus === 'SUCCESS' ? '답변 수정' : '답변 등록'}
                    </Button>
                    <Button width="80px" height="40px" backgroundColor="#eee" color="#333" onClick={onClose}>
                        닫기
                    </Button>
                </ButtonGroup>
            </ModalContent>
        </ModalOverlay>
    );
};

export default InquiryDetailModal;
