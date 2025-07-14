'use client';
import React from 'react';
import Button from '../../components/atom/Button';

const Page = () => {
    const handleClickBtn = () => {
        alert('버튼 클릭');
    };

    return (
        <div style={{ padding: '30px', gap: '15px' }}>
            <Button onClick={handleClickBtn}>하이</Button>
        </div>
    );
};

export default Page;
