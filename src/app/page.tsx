'use client';
import React, { useEffect } from 'react';
import Button from '../../components/atom/Button';
import Select from '../../components/atom/Select';
import type { SelectOption } from '../../types/Common';
import Table from '../../components/atom/Table';
import { TEST_TABLE_COLUMNS } from '../../constants/table-init';
import DatePicker from '../../components/organisms/DatePicker';
import { useDialogStore } from '../../store/dialogStore';
import CalendarDialog from '../../components/organisms/dialog/CalendarDialog';
import ImageViewer from '../../components/molecules/ImageViewer';
import Card from '../../components/atom/Card';

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
    const { selectedDialogs } = useDialogStore();

    const handleClickBtn = () => {
        alert('버튼 클릭');
    };

    const handleChangeOption = (option: SelectOption) => {
        console.log(option);
    };

    return (
        <div style={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button onClick={handleClickBtn}>하이</Button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Select option={SelectOption} onChange={handleChangeOption} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Table readOnly={true} columns={TEST_TABLE_COLUMNS} rows={TEST_TABLE_ROWS} isCheckbox={true} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <DatePicker />
            </div>
            <Card
                isOpen={true}
                style={{
                    width: '50%',
                    padding: '20px 30px',
                    display: 'flex',
                    flexDirection: 'column',
                    overflowY: 'auto',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: '380px',
                }}
            >
                하응 기모찌 데스네 카드입니다
            </Card>
            <CalendarDialog />
        </div>
    );
};

export default Page;
