'use client';
import React, { ReactNode, useEffect, useState } from 'react';
import { MenuBarBody, MenuBarHeader, MenuBarWrapper, MypageLogo, MypageUser, MypageWrapper } from '../styles/pages/mypage/Mypage';
import { userStore } from '../store/userStore';
import Button from '../components/atom/Button';
import { usePathname, useRouter } from 'next/navigation';
import { MypageType, MypageURL } from '../enum/Mypage';

export type MypageProps = {
    children: ReactNode;
};

const Mypage = ({ children }: MypageProps) => {
    const { userData } = userStore();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<MypageType>(MypageType.MEMBER_INFO);
    const pathname = usePathname();

    const handleTabClick = (tab: MypageType) => {
        setActiveTab(tab);
        // alert('현재 개발중인 메뉴입니다.');
        // return '';
        switch (tab) {
            case MypageType.MEMBER_INFO:
                return router.push(MypageURL.MEMBER_INFO);
            case MypageType.BOOKING_INFO:
                return router.push(MypageURL.BOOKING_INFO);
            case MypageType.BOKKING_HISTORY:
                return router.push(MypageURL.BOKKING_HISTORY);
            case MypageType.SHOPPING_CART:
                return router.push(MypageURL.SHOPPING_CART);
            case MypageType.PURCHASE_HISOTRY:
                return router.push(MypageURL.PURCHASE_HISOTRY);
            case MypageType.MY_INQUIRY:
                return router.push(MypageURL.MY_INQUIRY);
        }
    };

    useEffect(() => {
        switch (pathname) {
            case MypageType.MEMBER_INFO:
                return setActiveTab(MypageType.MEMBER_INFO);
            case MypageType.BOOKING_INFO:
                return setActiveTab(MypageType.BOOKING_INFO);
            case MypageType.BOKKING_HISTORY:
                return setActiveTab(MypageType.BOKKING_HISTORY);
            case MypageType.SHOPPING_CART:
                return setActiveTab(MypageType.SHOPPING_CART);
            case MypageType.PURCHASE_HISOTRY:
                return setActiveTab(MypageType.PURCHASE_HISOTRY);
            case MypageType.MY_INQUIRY:
                return setActiveTab(MypageType.MY_INQUIRY);
            default:
                break;
        }
    }, [pathname]);

    return (
        <MypageWrapper>
            <MenuBarWrapper>
                <MenuBarHeader>
                    <MypageLogo />
                    <MypageUser>{userData.userId}</MypageUser>
                </MenuBarHeader>
                <MenuBarBody>
                    <Button
                        backgroundColor={activeTab === MypageType.MEMBER_INFO ? '#a68967' : 'bisque'}
                        border="none"
                        color="black"
                        fontSize="16px"
                        onClick={() => handleTabClick(MypageType.MEMBER_INFO)}
                    >
                        회원정보수정
                    </Button>
                    <Button
                        backgroundColor={activeTab === MypageType.BOOKING_INFO ? '#a68967' : 'bisque'}
                        border="none"
                        color="black"
                        fontSize="16px"
                        onClick={() => handleTabClick(MypageType.BOOKING_INFO)}
                    >
                        예약 정보
                    </Button>
                    <Button
                        backgroundColor={activeTab === MypageType.BOKKING_HISTORY ? '#a68967' : 'bisque'}
                        border="none"
                        color="black"
                        fontSize="16px"
                        onClick={() => handleTabClick(MypageType.BOKKING_HISTORY)}
                    >
                        예약 내역
                    </Button>
                    <Button
                        backgroundColor={activeTab === MypageType.SHOPPING_CART ? '#a68967' : 'bisque'}
                        border="none"
                        color="black"
                        fontSize="16px"
                        onClick={() => handleTabClick(MypageType.SHOPPING_CART)}
                    >
                        장바구니
                    </Button>
                    <Button
                        backgroundColor={activeTab === MypageType.PURCHASE_HISOTRY ? '#a68967' : 'bisque'}
                        border="none"
                        color="black"
                        fontSize="16px"
                        onClick={() => handleTabClick(MypageType.PURCHASE_HISOTRY)}
                    >
                        구매내역
                    </Button>
                    <Button
                        backgroundColor={activeTab === MypageType.MY_INQUIRY ? '#a68967' : 'bisque'}
                        border="none"
                        color="black"
                        fontSize="16px"
                        onClick={() => handleTabClick(MypageType.MY_INQUIRY)}
                    >
                        내 문의함
                    </Button>
                </MenuBarBody>
            </MenuBarWrapper>
            {children}
        </MypageWrapper>
    );
};

export default Mypage;
