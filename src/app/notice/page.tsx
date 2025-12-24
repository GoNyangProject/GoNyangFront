'use client';
import React, { useState } from 'react';
import { NoticeCardWrapper } from '../../../styles/pages/menu/Notice';
import { MainWrapper } from '../../../styles/pages/Main';
import Input from '../../../components/atom/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { SearchInputWrapper } from '../../../styles/pages/mypage/Inquiry';
import Table from '../../../components/atom/Table';

const Page = () => {
    const [currentKeyword, setCurrentKeyword] = useState<string>('');
    const [searchKeyword, setSearchKeyword] = useState<string>('');

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
                <Table columns={[{ key: 'hi', value: '안녕' }]} rows={[{ hi: '반가워요' }, { hi: '테스트입니다' }]} readOnly={true} />
            </NoticeCardWrapper>
        </MainWrapper>
    );
};

export default Page;
