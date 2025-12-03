import React from 'react';
import { HeaderButton, HeaderNavWrapper } from '../../styles/components/molecules/Header';
import { useRouter } from 'next/navigation';

const NavMenu = () => {
    const router = useRouter();
    return (
        <HeaderNavWrapper>
            <HeaderButton>회사소개</HeaderButton>
            <HeaderButton onClick={() => router.push('/menu')}>예약</HeaderButton>
            <HeaderButton>shop</HeaderButton>
            <HeaderButton>커뮤니티</HeaderButton>
        </HeaderNavWrapper>
    );
};

export default NavMenu;
