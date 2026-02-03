'use client';
import React, { Suspense } from 'react';
import CommunityWrite from '@/app/community/write/write';
import { MainWrapper } from '../../../../styles/pages/Main';
import { BoardCardWrapper } from '../../../../styles/pages/menu/Board';

const Page = () => {
    return (
        <Suspense
            fallback={
                <MainWrapper>
                    <BoardCardWrapper>로딩 중...</BoardCardWrapper>
                </MainWrapper>
            }
        >
            <CommunityWrite />
        </Suspense>
    );
};

export default Page;
