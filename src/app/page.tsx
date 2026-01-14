'use client';
import React, { useEffect, useRef, useState } from 'react';
import Button from '../../components/atom/Button';
import { userStore } from '../../store/userStore';
import {
    GroomerCardWrapper,
    GroomerName,
    GroomerSectionContainer,
    HeroSectionContainer,
    HeroSubtitle,
    HeroTitle,
    MainItemsWrapper,
    MainWrapper,
    MarqueeContainer,
    MarqueeItem,
    MarqueeTrack,
    MenuCard,
    MenuFadeWrapper,
    MenuImageBox,
    MenuName,
    MenuScrollContainer,
    MenuSection,
    ProfileContent,
    ProfileImage,
    QualificationsList,
    SectionHeader,
} from '../../styles/pages/Main';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import axiosInstance from '../../libs/axios';
import { Menu } from '../../types/Common';
import Card from '../../components/atom/Card';
import { getCookie } from '@/utils/cookie';

const fetcher = (payload: Request) => axiosInstance.post('/api/backend', payload).then((res) => res.data.result);
const Page = () => {
    const { setUserData } = userStore();
    const token = getCookie('accessToken');
    const { data: user_data, error } = useSWR(
        token
            ? {
                  url: `/auth/me`,
                  method: 'GET',
              }
            : null,
        fetcher,
        { revalidateOnFocus: false },
    );

    useEffect(() => {
        if (error) console.error('SWR 에러 발생:', error);
        if (user_data) {
            console.log('유저 데이터 로드 성공:', user_data);
            setUserData(user_data);
        }
    }, [user_data, error]);

    const router = useRouter();
    const { userData } = userStore();
    const scrollRef = useRef(null);
    const [isDrag, setIsDrag] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollPos, setScrollPos] = useState('left'); // 'left', 'middle', 'right', 'none'

    useEffect(() => {
        console.log(userData);
    }, [userData]);

    const handleScroll = (e) => {
        const { scrollLeft, scrollWidth, clientWidth } = e.currentTarget;

        const isAtStart = scrollLeft <= 5;
        const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 5;

        if (isAtStart && isAtEnd) setScrollPos('none');
        else if (isAtStart) setScrollPos('left');
        else if (isAtEnd) setScrollPos('right');
        else setScrollPos('middle');
    };

    const onDragStart = (e) => {
        e.preventDefault();
        setIsDrag(true);
        setStartX(e.pageX + scrollRef.current.scrollLeft);
    };

    const onDragEnd = () => {
        setIsDrag(false);
    };

    const onDragMove = (e) => {
        if (isDrag) {
            scrollRef.current.scrollLeft = startX - e.pageX;
        }
    };

    const handleClickBook = () => {
        if (!userData) {
            if (confirm('로그인이 필요한 서비스입니다. 로그인 페이지로 이동할까요?')) {
                router.push('/member/login');
            }
        } else {
            router.push('/menu');
        }
    };

    const { data: menu_data } = useSWR(
        {
            url: `/menu`,
            method: 'GET',
        },
        fetcher,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            fallbackData: [],
        },
    );

    const { data: contract_data } = useSWR(
        {
            url: `/contract`,
            method: 'GET',
        },
        fetcher,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            fallbackData: [],
        },
    );

    return (
        <MainWrapper>
            <MainItemsWrapper>
                {/*<div style={{ display: 'flex', justifyContent: 'center' }}>*/}
                {/*    <Select option={SelectOption} onChange={handleChangeOption} />*/}
                {/*</div>*/}
                {/*<div style={{display: 'flex', justifyContent: 'center'}}>*/}
                {/*    <Table readOnly={true} columns={TEST_TABLE_COLUMNS} rows={TEST_TABLE_ROWS} isCheckbox={true}/>*/}
                {/*</div>*/}
                <HeroSectionContainer>
                    <HeroTitle>
                        스트레스 없이 편안하게
                        <br />
                        냥이를 위한 프리미엄 미용 서비스
                    </HeroTitle>
                    <HeroSubtitle>
                        전문 캣 그루머의 1:1 케어와 무마취/저자극 기술로
                        <br />
                        소중한 우리 아이의 행복한 미용 경험을 약속합니다.
                    </HeroSubtitle>
                    <Button
                        onClick={handleClickBook}
                        style={{
                            fontSize: '1.2rem',
                            padding: '15px 40px',
                            backgroundColor: 'bisque',
                            borderColor: 'bisque',
                            color: '#4a3a2a',
                            fontWeight: '700',
                            borderRadius: '8px',
                        }}
                    >
                        예약하러 가기
                    </Button>
                </HeroSectionContainer>
                {/*<div style={{ width: '100%', backgroundColor: 'white', borderRadius: '10px', height: '60px' }} />*/}
                <GroomerSectionContainer>
                    <SectionHeader>전문 캣 그루머 소개</SectionHeader>
                    <GroomerCardWrapper>
                        {/* 캣 그루머 사진 영역 */}
                        <ProfileImage />

                        <ProfileContent>
                            <GroomerName>김집사 그루머 (Kim Jip-sa)</GroomerName>
                            <p style={{ color: '#4a3a2a', lineHeight: 1.6 }}>
                                &#34;고양이의 언어와 컨디션을 최우선으로 생각합니다.&#34;
                                <br />
                                10년 경력의 캣 전문 미용사로, 반려묘의 스트레스를 최소화하는 무마취 저자극 미용 노하우를 보유하고 있습니다. 아이들이 편안함을
                                느낄 때 최고의 아름다움이 나온다고 믿습니다.
                            </p>

                            <QualificationsList>
                                <li>KFA 공인 캣 그루머 자격증 1급</li>
                                <li>반려동물 행동 교정사 수료</li>
                                <li>무마취/저자극 미용 경력 10년</li>
                                <li>누적 미용 건수 5,000건 이상</li>
                            </QualificationsList>
                        </ProfileContent>
                    </GroomerCardWrapper>
                </GroomerSectionContainer>
                <MenuSection>
                    <SectionHeader>미용 서비스 메뉴</SectionHeader>
                    <MenuFadeWrapper scrollPos={scrollPos}>
                        <MenuScrollContainer
                            ref={scrollRef}
                            onScroll={handleScroll}
                            onMouseDown={onDragStart}
                            onMouseMove={onDragMove}
                            onMouseUp={onDragEnd}
                            onMouseLeave={onDragEnd}
                        >
                            {menu_data.map((menu: Menu) => (
                                <MenuCard key={menu.id}>
                                    <MenuImageBox>
                                        {/* 이미지가 없을 경우를 대비해 배경색이나 placeholder 처리 가능 */}
                                        <img src={`${process.env.NEXT_PUBLIC_MENU_URL}/${menu.id}.png`} alt={menu.menuName} />
                                    </MenuImageBox>
                                    <MenuName>{menu.menuName}</MenuName>
                                </MenuCard>
                            ))}
                        </MenuScrollContainer>
                    </MenuFadeWrapper>
                </MenuSection>
                <MarqueeContainer>
                    <MarqueeTrack>
                        {contract_data.map((contract) => (
                            <MarqueeItem key={`${contract.name}`}>
                                <img src={contract.imgUrl} alt={contract.name} />
                            </MarqueeItem>
                        ))}
                    </MarqueeTrack>
                </MarqueeContainer>
                <Card
                    isOpen={true}
                    style={{
                        width: '50%',
                        padding: '20px 30px',
                        display: 'flex',
                        flexDirection: 'column',
                        overflowY: 'auto',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    Card 컴포넌트
                </Card>
                {/*<CalendarDialog />*/}
            </MainItemsWrapper>
        </MainWrapper>
    );
};

export default Page;
