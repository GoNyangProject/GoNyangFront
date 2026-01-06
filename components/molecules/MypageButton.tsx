import React from 'react';
import { MypageWrapper } from '../../styles/components/molecules/Header/Header';
import Button from '../atom/Button';
import { useRouter } from 'next/navigation';
import { MypageURL } from '../../enum/Mypage';

const MypageButton = () => {
    const router = useRouter();
    const handleClickMypage = () => {
        router.push(MypageURL.MEMBER_INFO);
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
