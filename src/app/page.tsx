'use client';
import React from 'react';
import Button from '../../components/atom/Button';
import Select from '../../components/atom/Select';
import type { SelectOption } from '../../types/Common';

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
        </div>
    );
};

export default Page;
