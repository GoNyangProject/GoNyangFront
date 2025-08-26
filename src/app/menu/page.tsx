'use client';
import React, { useState } from 'react';
import Card from '../../../components/atom/Card';
import useSWR from 'swr';
import axiosInstance from '../../../libs/axios';
import { MenuType } from '../../../enum/Menu';
import Menu from '@/app/menu/menu';
import Date from '@/app/menu/date';
import PaymentConfirm from '@/app/menu/payment_confirm';
import PaymentComplete from '@/app/menu/payment_complete';
import { Menu as MenuComponent } from '../../../types/Common';

const fetcher = (payload: Request) => axiosInstance.post('/api/backend', payload).then((res) => res.data.result);
const Page = () => {
    const [currentTab, setCurrentTab] = useState<MenuType>(MenuType.MENU);
    const [selectedMenu, setSelectedMenu] = useState<MenuComponent | undefined>();
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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Card
                style={{
                    margin: '10px',
                    width: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {(() => {
                    switch (currentTab) {
                        case MenuType.MENU:
                            return <Menu data={menu_data} setCurrentTab={setCurrentTab} setSelectedMenu={setSelectedMenu} />;
                        case MenuType.DATE:
                            return <Date selectedMenu={selectedMenu} setCurrentTab={setCurrentTab} setSelectedMenu={setSelectedMenu} />;
                        case MenuType.PAY_CONFIRM:
                            return <PaymentConfirm selectedMenu={selectedMenu} setCurrentTab={setCurrentTab} setSelectedMenu={setSelectedMenu} />;
                        case MenuType.PAY_COMPLETE:
                            return <PaymentComplete setCurrentTab={setCurrentTab} />;
                    }
                })()}
            </Card>
        </div>
    );
};

export default Page;
