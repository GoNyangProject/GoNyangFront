import React, { useState } from 'react';
import { CommentInputWrapper } from '../../styles/pages/menu/Comment';
import Button from '../atom/Button';
import { userStore } from '../../store/userStore';

type CommentInputProps = {
    onSubmit: (content: string) => void;
    placeholder?: string;
};

const CommentInput = ({ onSubmit, placeholder = '댓글을 입력해주세요.' }: CommentInputProps) => {
    const [text, setText] = useState('');
    const { userData } = userStore();

    const handleBtnClick = () => {
        if (!text.trim()) {
            alert('내용을 입력해주세요.');
            return;
        }
        onSubmit(text);
        setText('');
    };

    return (
        <CommentInputWrapper style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
            <div
                style={{
                    flexShrink: 0,
                    width: '45px',
                    height: '45px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '1px solid #eee',
                    marginTop: '5px',
                }}
            >
                <img
                    src={userData?.petImagePath || '/images/account_placeholer_image.png'}
                    alt="my-pet"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </div>
            <div style={{ flexGrow: 1 }}>
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
                        display: 'block',
                    }}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                    <Button onClick={handleBtnClick} style={{ padding: '8px 20px', whiteSpace: 'nowrap' }}>
                        등록
                    </Button>
                </div>
            </div>
        </CommentInputWrapper>
    );
};

export default CommentInput;
