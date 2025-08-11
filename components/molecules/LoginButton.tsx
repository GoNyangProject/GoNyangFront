import React from 'react';
import { HeaderLoginWrapper } from '../../styles/components/atom/Header';
import { useRouter } from 'next/navigation';

const LoginButton = () => {
    const router = useRouter();
    return (
        <HeaderLoginWrapper onClick={() => router.push('/member/login')}>
            <span>로그인</span>
        </HeaderLoginWrapper>
    );
};

export default LoginButton;
