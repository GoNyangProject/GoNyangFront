'use client';
import React, { useEffect, useState } from 'react';
import { HeaderLogo, HeaderWrapper, UserWrapper } from '../styles/components/atom/Header';
import NavMenu from '../components/molecules/NavMenu';
import LoginButton from '../components/molecules/LoginButton';
import LogoutButton from '../components/molecules/LogoutButton';

const Header = () => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const t = localStorage.getItem('Authorization');
        setToken(t);
    }, [token]);

    return (
        <HeaderWrapper>
            <NavMenu />
            <HeaderLogo>로고부분이에요</HeaderLogo>
            <UserWrapper>{token ? <LogoutButton /> : <LoginButton />}</UserWrapper>
            {/*<UserWrapper>*/}
            {/*    <LoginButton />*/}
            {/*    <LogoutButton />*/}
            {/*</UserWrapper>*/}
        </HeaderWrapper>
    );
};

export default Header;
