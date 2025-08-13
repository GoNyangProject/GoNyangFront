import React from 'react';
import { HeaderLoginWrapper } from '../../styles/components/atom/Header';
import { useRouter } from 'next/navigation';
import Button from '../atom/Button';
import { userStore } from '../../store/userStore';

const LogoutButton = () => {
    const router = useRouter();
    const handleClickLogout = () => {
        localStorage.clear();
        userStore.persist.clearStorage();
        router.push('/member/login');
    };

    return (
        <HeaderLoginWrapper>
            <Button fontSize="15px" onClick={handleClickLogout}>
                로그아웃
            </Button>
        </HeaderLoginWrapper>
    );
};

export default LogoutButton;
