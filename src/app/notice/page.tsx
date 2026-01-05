'use client';
import React, { useEffect, useState } from 'react';
import { NoticeCardWrapper } from '../../../styles/pages/menu/Notice';
import { MainWrapper } from '../../../styles/pages/Main';
import Input from '../../../components/atom/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { SearchInputWrapper } from '../../../styles/pages/mypage/Inquiry';
import Table from '../../../components/atom/Table';
import { NOTICE_COLUMNS } from '../../../constants/table-init';
import { NoticeInfo } from '../../../types/Common';
import axiosInstance from '../../../libs/axios';
import useSWR from 'swr';
import { BoardType } from '../../../enum/BoardType';

const fetcher = (payload: Request) => axiosInstance.post('/api/backend', payload).then((res) => res.data.result);

const Page = () => {
    const [currentKeyword, setCurrentKeyword] = useState<string>('');
    const [searchKeyword, setSearchKeyword] = useState<string>('');

    const handleClickNotice = (key: string, rowData: NoticeInfo, event: React.MouseEvent) => {
        // 특정 데이터를 활용해 알림창 띄우기
        alert(`${rowData.title} 글을 클릭하셨습니다!`);
    };

    const { data: notice_data } = useSWR(
        {
            url: `/board?boardCode=${BoardType.NOTICE}&searchKeyword=${searchKeyword}`,
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
        console.log(notice_data);
    }, [notice_data]);

    return (
        <MainWrapper style={{ padding: '25px' }}>
            <NoticeCardWrapper>
                <SearchInputWrapper>
                    <Input
                        style={{
                            backgroundColor: 'white',
                            padding: '5px 10px',
                            border: 'none',
                            fontSize: '20px',
                            boxShadow: 'none',
                        }}
                        width="100%"
                        placeholder="검색어를 입력해주세요"
                        value={currentKeyword}
                        onChange={(e) => setCurrentKeyword(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                setSearchKeyword(currentKeyword);
                            }
                        }}
                    />
                    <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        color="gray"
                        cursor="pointer"
                        style={{ padding: '5px' }}
                        onClick={() => setSearchKeyword(currentKeyword)}
                    />
                </SearchInputWrapper>
                <Table columns={NOTICE_COLUMNS} rows={notice_data} readOnly={true} clickKeys={['title']} onCellClick={handleClickNotice} />
            </NoticeCardWrapper>
        </MainWrapper>
    );
};

export default Page;
