import React from 'react';
import { HeaderLoginWrapper } from '../../styles/components/molecules/Header';
import { useRouter } from 'next/navigation';
import Button from '../atom/Button';
import { userStore } from '../../store/userStore';

const initialUserStoreState = userStore.getState();

const LogoutButton = () => {
    const router = useRouter();
    const handleClickLogout = () => {
        localStorage.clear();
        userStore.persist.clearStorage();
        userStore.setState(initialUserStoreState, true);
        router.push('/member/login');
        router.refresh();
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
