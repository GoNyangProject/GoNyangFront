'use client';
import React, { Suspense } from 'react';
import NoticeDetail from '@/app/notice/detail/detail';
import { BoardCardWrapper } from '../../../../styles/pages/menu/Board';
import { MainWrapper } from '../../../../styles/pages/Main';

const Page = () => {
    return (
        <Suspense
            fallback={
                <MainWrapper>
                    <BoardCardWrapper>로딩 중...</BoardCardWrapper>
                </MainWrapper>
            }
        >
            <NoticeDetail />
        </Suspense>
    );
};

export default Page;
