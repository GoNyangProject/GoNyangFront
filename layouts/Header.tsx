'use client';
import React, { useEffect, useState } from 'react';
import { HeaderLogo, HeaderWrapper, UserWrapper } from '../styles/components/atom/Header';
import NavMenu from '../components/molecules/NavMenu';
import LogoutButton from '../components/molecules/LogoutButton';
import LoginButton from '../components/molecules/LoginButton';
import { useRouter } from 'next/navigation';
import MypageButton from '../components/molecules/MypageButton';

const Header = () => {
    const router = useRouter();
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const t = localStorage.getItem('Authorization');
        setToken(t);
    }, [token]);

    return (
        <HeaderWrapper>
            <NavMenu />
            <HeaderLogo onClick={() => router.push('/')}>로고부분이에요</HeaderLogo>
            <UserWrapper>
                {token ? (
                    <>
                        <LogoutButton />
                        <MypageButton />
                    </>
                ) : (
                    <LoginButton />
                )}
            </UserWrapper>
            {/*<UserWrapper>*/}
            {/*    <LoginButton />*/}
            {/*    <LogoutButton />*/}
            {/*</UserWrapper>*/}
        </HeaderWrapper>
    );
};

export default Header;
