'use client';
import React from 'react';
import { HeaderLogo, HeaderWrapper, UserWrapper } from '../styles/components/molecules/Header/Header';
import NavMenu from '../components/molecules/NavMenu';
import LogoutButton from '../components/molecules/LogoutButton';
import LoginButton from '../components/molecules/LoginButton';
import { usePathname, useRouter } from 'next/navigation';
import MypageButton from '../components/molecules/MypageButton';
import { userStore } from '../store/userStore';
import AdminButton from '../components/molecules/AdminButton';

const Header = () => {
    const pathname = usePathname();
    const router = useRouter();

    if (pathname.startsWith('/admin')) {
        return null;
    }

    const userData = userStore((state) => state.userData);
    const isLoggedIn = Boolean(userData?.memberId);
    const isAdmin = userData?.role === 'ROLE_ADMIN';

    return (
        <HeaderWrapper>
            <NavMenu />
            <HeaderLogo onClick={() => router.push('/')}>로고부분이에요</HeaderLogo>

            <UserWrapper>
                {isLoggedIn ? (
                    <>
                        {isAdmin ? <AdminButton /> : <MypageButton />}
                        <LogoutButton />
                    </>
                ) : (
                    <LoginButton />
                )}
            </UserWrapper>
        </HeaderWrapper>
    );
};

export default Header;
