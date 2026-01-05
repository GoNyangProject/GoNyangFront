'use client';

import React, { useMemo, useState } from 'react';
import { INQUIRY_COLUMNS } from '../../../../constants/table-init';
import InquiryTable from '../../../../components/atom/InquiryTable';
import Input from '../../../../components/atom/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { InquiryStatus } from '../../../../enum/InquiryStatus';
import { DropdownOption, DropdownOptions, DropdownWrapper, InquiryHeader, InquiryWrapper, SearchInputWrapper } from '../../../../styles/pages/mypage/Inquiry';
import axiosInstance from '../../../../libs/axios';
import { userStore } from '../../../../store/userStore';
import useSWR, {mutate} from 'swr';
import { InquiryDetailResponse, InquiryResponse, InquiryTableRow } from '../../../../types/Common';
import Pagination from '../../../../components/molecules/Pagination';
import { Post } from '../../../../service/crud';
import InquiryDetailCard from '../../../../components/molecules/InquiryDetailCard';
import Button from '../../../../components/atom/Button';
import InquiryQuestion from '../../../../components/molecules/InquiryQuestion';

const fetcher = (payload: Request) => axiosInstance.post('/api/backend', payload).then((res) => res.data.result);

const Page = () => {
    const [statusOpen, setStatusOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<InquiryStatus>(InquiryStatus.ALL);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [appliedKeyword, setAppliedKeyword] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedInquiry, setSelectedInquiry] = useState<InquiryDetailResponse | null>(null);
    const [isWriting, setIsWriting] = useState(false);

    const rowsPerPage = 5;
    const { userData } = userStore();

    const { data: user_inquiry = [] } = useSWR(
        {
            url: `/mypage/inquiry?userId=${userData.userId}`,
            method: 'GET',
        },
        fetcher,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        },
    );

    const statusOptions = Object.values(InquiryStatus);

    const inquiryRows: InquiryTableRow[] = useMemo(
        () =>
            user_inquiry.map((inquiry: InquiryResponse) => ({
                title: inquiry.title,
                inquiryNumber: inquiry.inquiryNumber,
                createdAt: new Date(inquiry.createdAt).toLocaleDateString(),
                inquiryStatus: inquiry.status === 'SUCCESS' ? InquiryStatus.SUCCESS : inquiry.status === 'PENDING' ? InquiryStatus.FAIL : InquiryStatus.ALL,
            })),
        [user_inquiry],
    );

    const filteredRows: InquiryTableRow[] = useMemo(
        () =>
            inquiryRows
                .filter((row) => selectedStatus === InquiryStatus.ALL || row.inquiryStatus === selectedStatus)
                .filter((row) => row.title.toLowerCase().includes(appliedKeyword.toLowerCase())),
        [inquiryRows, selectedStatus, appliedKeyword],
    );

    const totalPage = Math.ceil(filteredRows.length / rowsPerPage);

    const paginatedRows = useMemo(() => filteredRows.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage), [filteredRows, currentPage]);

    const handleCellClick = (_key: string, rowData: any) => {
        const payload = { inquiryNumber: rowData.inquiryNumber };

        Post(
            '/mypage/inquiry',
            payload,
            (response) => {
                setSelectedInquiry(response.result as InquiryDetailResponse);
            },
            false,
        );
    };

    return (
        <InquiryWrapper>
            {isWriting ? (
                <InquiryQuestion
                    onBack={() => setIsWriting(false)}
                    onSuccess={() => {
                        setIsWriting(false);
                        mutate({
                            url: `/mypage/inquiry?userId=${userData.userId}`,
                            method: 'GET',
                        });
                    }}
                />
            ) : (
                <>
                    <InquiryHeader>
                        <h1>내 문의함</h1>
                        {!selectedInquiry && <Button onClick={() => setIsWriting(true)}>1:1 문의하기</Button>}
                    </InquiryHeader>

                    {selectedInquiry ? (
                        <InquiryDetailCard inquiry={selectedInquiry} onBack={() => setSelectedInquiry(null)} />
                    ) : (
                        <>
                            <div style={{ display: 'flex', gap: '10px' }}>
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
                                        value={searchKeyword}
                                        onChange={(e) => setSearchKeyword(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                setAppliedKeyword(searchKeyword);
                                            }
                                        }}
                                    />
                                    <FontAwesomeIcon icon={faMagnifyingGlass} color="gray" style={{ padding: '5px' }} />
                                </SearchInputWrapper>

                                <DropdownWrapper onClick={() => setStatusOpen((prev) => !prev)}>
                                    {selectedStatus}
                                    <FontAwesomeIcon icon={faChevronDown} color="gray" />
                                    {statusOpen && (
                                        <DropdownOptions>
                                            {statusOptions.map((status) => (
                                                <DropdownOption
                                                    key={status}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedStatus(status as InquiryStatus);
                                                        setStatusOpen(false);
                                                    }}
                                                >
                                                    {status}
                                                </DropdownOption>
                                            ))}
                                        </DropdownOptions>
                                    )}
                                </DropdownWrapper>
                            </div>

                            <InquiryTable columns={INQUIRY_COLUMNS} rows={paginatedRows} readOnly clickKeys={['title']} onCellClick={handleCellClick} />

                            <Pagination currentPage={currentPage} totalPage={totalPage} changePage={setCurrentPage} />
                        </>
                    )}
                </>
            )}
        </InquiryWrapper>
    );
};

export default Page;
