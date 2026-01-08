'use client';
import React, { useEffect } from 'react';
import axiosInstance from '../../../../libs/axios';
import { useSearchParams } from 'next/navigation';
import useSWR from 'swr';

const fetcher = (payload: Request) => axiosInstance.post('/api/backend', payload).then((res) => res.data.result);
const Page = () => {
    const params = useSearchParams();
    const boardId = params.get('notice');

    const { data: notice_detail_data } = useSWR(
        {
            url: `/board/detail?boardCode=${boardId}`,
            method: 'GET',
        },
        fetcher,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            fallbackData: [],
        },
    );

    useEffect(() => {
        console.log(notice_detail_data);
    }, [notice_detail_data]);

    return <div>gdgd</div>;
};

export default Page;
