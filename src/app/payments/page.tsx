'use client';
import React, { Suspense } from 'react';
import Payments from '@/app/payments/payments';
import { BoardCardWrapper } from '../../../styles/pages/menu/Board';
import { MainWrapper } from '../../../styles/pages/Main';

const Page = () => {
    return (
        <Suspense
            fallback={
                <MainWrapper>
                    <BoardCardWrapper>로딩 중...</BoardCardWrapper>
                </MainWrapper>
            }
        >
            <Payments />
        </Suspense>
    );
};

export default Page;
