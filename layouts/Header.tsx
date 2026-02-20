'use client';
import React, { useEffect, useState } from 'react'; // useState 추가
import { usePathname, useRouter } from 'next/navigation';
import NavMenu from '../components/molecules/NavMenu';
import LogoutButton from '../components/molecules/LogoutButton';
import LoginButton from '../components/molecules/LoginButton';
import MypageButton from '../components/molecules/MypageButton';
import AdminButton from '../components/molecules/AdminButton';
import { userStore } from '../store/userStore';
import {
    Hamburger,
    HeaderLogo,
    HeaderMainWrapper,
    HeaderWrapper,
    Overlay,
    SideMenu,
    SideNavWrapper,
    UserWrapper,
} from '../styles/components/molecules/Header/Header';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768 && isOpen) {
                setIsOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isOpen]);
    const pathname = usePathname();
    const router = useRouter();

    if (pathname.startsWith('/admin')) return null;

    const userData = userStore((state) => state.userData);
    const isLoggedIn = Boolean(userData?.memberId);
    const isAdmin = userData?.userType === 'ROLE_ADMIN';

    const toggleMenu = () => setIsOpen(!isOpen);

    const renderButtons = () => (
        <>
            {isLoggedIn ? (
                <>
                    {isAdmin ? <AdminButton /> : <MypageButton />}
                    <LogoutButton />
                </>
            ) : (
                <LoginButton />
            )}
        </>
    );

    return (
        <HeaderWrapper>
            <HeaderMainWrapper>
                <HeaderLogo onClick={() => router.push('/')} />

                <UserWrapper>
                    <NavMenu />
                    {renderButtons()}
                </UserWrapper>

                <Hamburger onClick={toggleMenu}>
                    <span />
                    <span />
                    <span />
                </Hamburger>
            </HeaderMainWrapper>

            {isOpen && <Overlay onClick={toggleMenu} />}

            <SideMenu $isOpen={isOpen}>
                <div className="close-btn" onClick={toggleMenu}>
                    &times;
                </div>

                <SideNavWrapper>
                    <div className="user-actions" onClick={toggleMenu}>
                        {isLoggedIn ? (
                            <>
                                {isAdmin ? <AdminButton /> : <MypageButton />}
                                <LogoutButton />
                            </>
                        ) : (
                            <LoginButton />
                        )}
                    </div>
                    <div className="main-nav" onClick={toggleMenu}>
                        <NavMenu />
                    </div>
                </SideNavWrapper>
            </SideMenu>
        </HeaderWrapper>
    );
};

export default Header;
