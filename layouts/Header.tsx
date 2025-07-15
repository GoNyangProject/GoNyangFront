'use client';
import React from 'react';
import { HeaderLogo, HeaderWrapper } from '../styles/components/atom/Header';
import NavMenu from '../components/molecules/NavMenu';
import LoginButton from '../components/molecules/LoginButton';

const Header = () => {
    return (
        <HeaderWrapper>
            <NavMenu />
            <HeaderLogo>로고부분이에요</HeaderLogo>
            <LoginButton />
        </HeaderWrapper>
    );
};

export default Header;
