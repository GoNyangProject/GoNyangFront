import React from 'react';
import { MypageWrapper } from '../../styles/components/atom/Header';
import Button from '../atom/Button';
import { useRouter } from 'next/navigation';

const MypageButton = () => {
    const router = useRouter();
    const handleClickMypage = () => {
        router.push('/mypage');
    };
    return (
        <MypageWrapper>
            <Button fontSize="15px" onClick={handleClickMypage}>
                마이페이지
            </Button>
        </MypageWrapper>
    );
};

export default MypageButton;
