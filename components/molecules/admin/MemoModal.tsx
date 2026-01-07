import React, { useState } from 'react';
import { AdminMemberList } from '../../../types/Common';
import Button from '../../atom/Button';
import { ButtonGroup, CloseButton, MemoTextarea, ModalContent, ModalHeader, ModalOverlay } from '../../../styles/components/molecules/admin/MemoModal';

type MemoModalProps = {
    member: AdminMemberList;
    onClose: () => void;
    onUpdate: (id: number, memo: string) => void;
    onDelete: (id: number) => void;
};
const MemoModal = ({ member, onClose, onDelete, onUpdate }: MemoModalProps) => {
    const [text, setText] = useState(member.memo || '');

    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <ModalHeader>
                    <h3>{member.displayName}님 메모</h3>
                    <CloseButton onClick={onClose}>&times;</CloseButton>
                </ModalHeader>

                <MemoTextarea value={text} onChange={(e) => setText(e.target.value)} placeholder="메모 내용을 입력해주세요." />

                <ButtonGroup>
                    <Button width="80px" height="35px" backgroundColor="#3E66FB" color="white" onClick={() => onUpdate(member.id, text)}>
                        수정
                    </Button>
                    <Button width="80px" height="35px" backgroundColor="#ff4d4f" color="white" onClick={() => onDelete(member.id)}>
                        삭제
                    </Button>
                    <Button width="80px" height="35px" backgroundColor="#eee" color="#333" onClick={onClose}>
                        닫기
                    </Button>
                </ButtonGroup>
            </ModalContent>
        </ModalOverlay>
    );
};

export default MemoModal;
