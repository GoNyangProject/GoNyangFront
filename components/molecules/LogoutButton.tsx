import React from 'react';
import { HeaderLoginWrapper } from '../../styles/components/atom/Header';
import { useRouter } from 'next/navigation';

const LogoutButton = () => {
    const router = useRouter();
    const handleClickLogout = () => {
        localStorage.clear();
        router.push('/member/login');
    };

    return (
        <HeaderLoginWrapper onClick={handleClickLogout}>
            <span>로그아웃</span>
        </HeaderLoginWrapper>
    );
};

export default LogoutButton;
