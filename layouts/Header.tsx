'use client';
import React from 'react';
import { HeaderLogo, HeaderMainWrapper, HeaderWrapper, UserWrapper } from '../styles/components/molecules/Header';
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
            <HeaderMainWrapper>
                <HeaderLogo onClick={() => router.push('/')} />
                <UserWrapper>
                    <NavMenu />
                    {isLoggedIn ? (
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                            <LogoutButton />
                            <MypageButton />
                        </div>
                    ) : (
                        <LoginButton />
                    )}
                </UserWrapper>
            </HeaderMainWrapper>
        </HeaderWrapper>
    );
};

export default Header;
