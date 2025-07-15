import React from 'react';
import { HeaderButton, HeaderNavWrapper } from '../../styles/components/atom/Header';

const NavMenu = () => {
    return (
        <HeaderNavWrapper>
            <HeaderButton>회사소개</HeaderButton>
            <HeaderButton>예약</HeaderButton>
            <HeaderButton>shop</HeaderButton>
            <HeaderButton>커뮤니티</HeaderButton>
        </HeaderNavWrapper>
    );
};

export default NavMenu;
