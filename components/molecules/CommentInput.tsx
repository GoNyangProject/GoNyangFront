import React, { useState } from 'react';
import { CommentInputWrapper } from '../../styles/pages/menu/Comment';
import Button from '../atom/Button';

type CommentInputProps = {
    onSubmit: (content: string) => void;
    placeholder?: string;
};

const CommentInput = ({ onSubmit, placeholder = '댓글을 입력해주세요.' }: CommentInputProps) => {
    const [text, setText] = useState('');

    const handleBtnClick = () => {
        if (!text.trim()) {
            alert('내용을 입력해주세요.');
            return;
        }
        onSubmit(text);
        setText('');
    };

    return (
        <CommentInputWrapper>
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={placeholder}
                style={{
                    width: '100%',
                    height: '80px',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    resize: 'none',
                }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                <Button onClick={handleBtnClick} style={{ padding: '8px 20px', whiteSpace: 'nowrap' }}>
                    등록
                </Button>
            </div>
        </CommentInputWrapper>
    );
};

export default CommentInput;
