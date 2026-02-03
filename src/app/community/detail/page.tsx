'use client';
import React, { Suspense } from 'react';
import CommunityDetail from '@/app/community/detail/detail';
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
            <CommunityDetail />
        </Suspense>
    );
};

export default Page;
