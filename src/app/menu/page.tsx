'use client';
import React, { useState } from 'react';
import Card from '../../../components/atom/Card';
import useSWR from 'swr';
import axiosInstance from '../../../libs/axios';
import { MenuType } from '../../../enum/Menu';
import Menu from '@/app/menu/menu';
import BookMenu from '@/app/menu/date';
import PaymentConfirm from '@/app/menu/payment_confirm';
import { BookInfo, Menu as MenuComponent } from '../../../types/Common';

const fetcher = (payload: Request) => axiosInstance.post('/api/backend', payload).then((res) => res.data.result);

const Page = () => {
    const [currentTab, setCurrentTab] = useState<MenuType>(MenuType.MENU);
    const [selectedMenu, setSelectedMenu] = useState<MenuComponent | undefined>();
    const [bookInfo, setBookInfo] = useState<BookInfo>();
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

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                minHeight: '100vh',
                padding: '20px 0', // 위아래 여백
            }}
        >
            <Card
                style={{
                    margin: '10px',
                    width: '95%',
                    maxWidth: '1200px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: 'none',
                    boxShadow: 'none',
                    backgroundColor: 'transparent',
                }}
            >
                {(() => {
                    switch (currentTab) {
                        case MenuType.MENU:
                            return <Menu data={menu_data} setCurrentTab={setCurrentTab} setSelectedMenu={setSelectedMenu} />;
                        case MenuType.DATE:
                            return <BookMenu selectedMenu={selectedMenu} setCurrentTab={setCurrentTab} setBookInfo={setBookInfo} />;
                        case MenuType.PAY_CONFIRM:
                            return <PaymentConfirm setCurrentTab={setCurrentTab} bookInfo={bookInfo} />;
                    }
                })()}
            </Card>
        </div>
    );
};

export default Page;
