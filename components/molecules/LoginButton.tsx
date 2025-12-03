import React from 'react';
import { HeaderLoginWrapper } from '../../styles/components/molecules/Header';
import { useRouter } from 'next/navigation';
import Button from '../atom/Button';

const LoginButton = () => {
    const router = useRouter();
    return (
        <HeaderLoginWrapper>
            <Button fontSize="15px" onClick={() => router.push('/member/login')}>
                로그인
            </Button>
        </HeaderLoginWrapper>
    );
};

export default LoginButton;
