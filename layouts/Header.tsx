'use client';
import React, { useEffect } from 'react';
import { HeaderLogo, HeaderWrapper, UserWrapper } from '../styles/components/atom/Header';
import NavMenu from '../components/molecules/NavMenu';
import LoginButton from '../components/molecules/LoginButton';
import LogoutButton from '../components/molecules/LogoutButton';

const Header = () => {
    const token = localStorage.getItem('Authorization');

    useEffect(() => {
        console.log(token);
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
