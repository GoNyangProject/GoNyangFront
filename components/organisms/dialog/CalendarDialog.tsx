import React, { ChangeEvent, useEffect, useState } from 'react';
import Dialog from '../../molecules/Dialog';
import { DialogType } from '../../../enum/Dialog';
import { useDialogStore } from '../../../store/dialogStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Button from '../../atom/Button';
import ImageViewer from '../../molecules/ImageViewer';
import { CalendarContent } from '../../../styles/components/organism/DatePicker';
import Textarea from '../../atom/Textarea';
import test_img from '../../../public/images/test.png';
import useSWR from 'swr';
import axiosInstance from '../../../libs/axios';
import { Post } from '../../../service/crud';
import { formatDate } from '@/utils/validations/formValidators';

const fetcher = (payload: Request) => axiosInstance.post('/api/backend', payload).then((res) => res.data);

const CalendarDialog = () => {
    const { selectedDate, closeDialog, setSelectedDate } = useDialogStore();
    const [cancelContent, setCancelContent] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(0);

    const { data: data } = useSWR(
        {
            url: '/test',
            method: 'GET',
        },
        fetcher,
        {
            revalidateOnFocus: true,
            revalidateOnReconnect: true,
            fallbackData: '',
        },
    );

    useEffect(() => {
        const payload = {};
        Post('/test', payload, (response) => {}, false);
    }, []);

    const handleCancelBook = () => {};
    const handleClickCancel = () => {
        closeDialog(DialogType.CALENDAR);
    };

    const test_data = [
        {
            seq: 1,
            date: selectedDate,
            value: '테스트1',
        },
        {
            seq: 2,
            date: selectedDate,
            value: '테스트2',
        },
        {
            seq: 3,
            date: selectedDate,
            value: '테스트3',
        },
        {
            seq: 4,
            date: selectedDate,
            value: '테스트4',
        },
        {
            seq: 5,
            date: selectedDate,
            value: '테스트5',
        },
    ];

    const handleClickPreviousBook = () => {
        const page = currentPage - 1;
        if (page < 0) {
            setCurrentPage(test_data.length - 1);
        } else {
            setCurrentPage(page);
        }
    };
    const handleClickNextBook = () => {
        const page = currentPage + 1;
        if (test_data.length === page) {
            setCurrentPage(0);
        } else {
            setCurrentPage(page);
        }
    };

    const handleChangeCacelBook = (event: ChangeEvent<HTMLTextAreaElement>) => {
        console.log(event.target.value);
        setCancelContent(event.target.value);
    };

    return (
        <Dialog
            type={DialogType.CALENDAR}
            title={`${formatDate(selectedDate)} 일정`}
            width="50vw"
            height="70vh"
            style={{ backgroundColor: 'white' }}
            onClickConfirm={handleCancelBook}
            onClickCancel={handleClickCancel}
            confirmText={'예약 취소'}
            showBtn={true}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                    height: '100%',
                    padding: '0 10px',
                    alignItems: 'center',
                }}
            >
                <Button onClick={handleClickPreviousBook}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </Button>
                <div style={{ width: '100%', height: '100%' }}>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: '100%',
                            height: '80%',
                            backgroundColor: 'lime',
                        }}
                    >
                        <ImageViewer src={test_img} alt={'test'} width={'40%'} height={'50%'} borderRadius={'10px'} />
                        <CalendarContent>{data[currentPage]}</CalendarContent>
                    </div>
                    <div>
                        <Textarea
                            style={{ fontSize: '15px', height: '90px' }}
                            value={cancelContent}
                            onChange={handleChangeCacelBook}
                            placeholder={'취소 사유'}
                        ></Textarea>
                    </div>
                </div>
                <Button onClick={handleClickNextBook}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </Button>
            </div>
        </Dialog>
    );
};

export default CalendarDialog;
