'use client';
import React from 'react';
import { HeaderLogo, HeaderWrapper, UserWrapper } from '../styles/components/molecules/Header';
import NavMenu from '../components/molecules/NavMenu';
import LogoutButton from '../components/molecules/LogoutButton';
import LoginButton from '../components/molecules/LoginButton';
import { useRouter } from 'next/navigation';
import MypageButton from '../components/molecules/MypageButton';
import { userStore } from '../store/userStore';

const Header = () => {
    const router = useRouter();

    const userData = userStore((state) => state.userData);
    const isLoggedIn = !!userData.memberId;

    return (
        <HeaderWrapper>
            <NavMenu />
            <HeaderLogo onClick={() => router.push('/')}>로고부분이에요</HeaderLogo>
            <UserWrapper>
                {isLoggedIn ? (
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
