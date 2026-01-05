import React from 'react';
import { HeaderLoginWrapper } from '../../styles/components/molecules/Header';
import Button from '../atom/Button';
import { userStore } from '../../store/userStore';
import { Post } from '../../service/crud';
import { useRouter } from 'next/navigation';

const LogoutButton = () => {
    const router = useRouter();
    const handleClickLogout = () => {
        const payload = {};
        Post(
            '/member/logout',
            payload,
            () => {
                userStore.getState().reset();
                userStore.persist.clearStorage();
                router.push('/member/login');
                router.refresh();
            },
            false,
        );
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
