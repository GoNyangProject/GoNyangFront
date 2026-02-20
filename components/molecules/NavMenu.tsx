import React from 'react';
import { HeaderButton, HeaderNavWrapper } from '../../styles/components/molecules/Header/Header';
import { useRouter } from 'next/navigation';

const NavMenu = () => {
    const router = useRouter();
    return (
        <HeaderNavWrapper>
            <HeaderButton>
                <span className="emoji">🏠</span> About
            </HeaderButton>
            <HeaderButton onClick={() => router.push('/menu')}>
                <span className="emoji">📅</span> 예약
            </HeaderButton>
            <HeaderButton onClick={() => router.push('/notice')}>
                <span className="emoji">📢</span> 공지사항
            </HeaderButton>
            <HeaderButton onClick={() => router.push('/community')}>
                <span className="emoji">🐾</span> 커뮤니티
            </HeaderButton>
        </HeaderNavWrapper>
    );
};

export default NavMenu;
