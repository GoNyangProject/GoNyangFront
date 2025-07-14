'use client';
import React from 'react';
import Button from '../../components/atom/Button';
import Select from '../../components/atom/Select';
import type { SelectOption } from '../../types/Common';
import Table from '../../components/atom/Table';
import { TEST_TABLE_COLUMNS } from '../../constants/table-init';

const SelectOption = [
    {
        value: '1',
        label: 'test1',
    },
    {
        value: '2',
        label: 'test2',
    },
    {
        value: '3',
        label: 'test3',
    },
];
const TEST_TABLE_ROWS = [
    { test1: '1번', test2: '강인구', test3: '첫 번째 테스트' },
    { test1: '2번', test2: '김성우', test3: '두 번째 테스트' },
    { test1: '3번', test2: '박지원', test3: '세 번째 테스트' },
];
const Page = () => {
    const handleClickBtn = () => {
        alert('버튼 클릭');
    };

    const handleChangeOption = (option: SelectOption) => {
        console.log(option);
    };

    return (
        <div>
            <div style={{ padding: '30px', gap: '15px' }}>
                <Button onClick={handleClickBtn}>하이</Button>
            </div>
            <div>
                <Select option={SelectOption} onChange={handleChangeOption} />
            </div>
        <div style={{ padding: '30px', gap: '15px' }}>
            <Button onClick={handleClickBtn}>하이</Button>
            <Table readOnly={true} columns={TEST_TABLE_COLUMNS} rows={TEST_TABLE_ROWS} isCheckbox={true} />
        </div>
    );
};

export default Page;
