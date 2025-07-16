'use client';
import { JSX, MouseEvent, useMemo } from 'react';
import { Page, PageNumber, PaginationWrapper } from '../../../toss-front/styles/components/molecules/Pagination';
import Button from '../atom/Button';

type PaginationProps = {
    currentPage: number; // 현재 페이지 번호
    totalPage: number; // 전체 페이지 수
    groupSize?: number; // 한 그룹에 표시할 페이지번호 개수
    changePage?: (currentPage: number) => void; // 페이지 변환 함수
};

const Pagination = ({ currentPage, totalPage, groupSize = 5, changePage }: PaginationProps): JSX.Element => {
    // 현재 그룹의 시작 페이지번호
    const startPage = useMemo(() => {
        return Math.floor((currentPage - 1) / groupSize) * groupSize + 1;
    }, [currentPage, groupSize]);
    // 현재 그룹의 끝 페이지번호
    const endPage = useMemo(() => {
        let endPageNo = ((startPage - 1 + groupSize) / groupSize) * groupSize;
        if (endPageNo > totalPage) {
            endPageNo = totalPage;
        }
        return endPageNo;
    }, [startPage, groupSize, totalPage]);
    // 이전 그룹의 마지막 페이지
    const prevGroupEndPage = useMemo(() => {
        if (startPage > groupSize) {
            return startPage - 1;
        } else {
            return 0;
        }
    }, [startPage, groupSize]);
    // 다음 그룹의 첫 페이지
    const nextGroupStartPage = useMemo(() => {
        if (endPage < totalPage) {
            return endPage + 1;
        } else {
            return 0;
        }
    }, [endPage, totalPage]);
    // 페이지 번호 리스트
    const pageList = useMemo(() => {
        const pageArray = [];
        for (let i = startPage; i <= endPage; i++) {
            pageArray.push(i);
        }
        return pageArray;
    }, [endPage]);

    const handleClickMovePage = (currentPage: number) => (event: MouseEvent) => {
        event.preventDefault();
        if (typeof changePage === 'function') changePage(currentPage);
    };

    return (
        <PaginationWrapper style={{ display: totalPage === 0 ? 'none' : 'flex' }}>
            {prevGroupEndPage > 0 ? (
                <Page>
                    <Button
                        width="27px"
                        height="100%"
                        shadow="none"
                        border="none"
                        margin="0 2px 0 0"
                        color="#E5EBFF"
                        display="flex"
                        onClick={handleClickMovePage(prevGroupEndPage)}
                    >
                        &lt;
                    </Button>
                </Page>
            ) : null}
            {pageList.map((page, index) => {
                return (
                    <Page key={index}>
                        <Button
                            width="27px"
                            height="27px"
                            shadow="none"
                            border="none"
                            fontSize="14px"
                            style={{ fontWeight: page === currentPage ? 600 : 400 }}
                            borderRadius="2px"
                            backgroundColor={page === currentPage ? '#E5EBFF' : '#E5EBFF'}
                            color={page === currentPage ? '#3E66FB' : '#333333'}
                            onClick={handleClickMovePage(page)}
                        >
                            <PageNumber>{page}</PageNumber>
                        </Button>
                    </Page>
                );
            })}
            {nextGroupStartPage > 0 ? (
                <Page>
                    <Button
                        width="27px"
                        height="100%"
                        shadow="none"
                        border="none"
                        margin="0 0 0 2px"
                        color="#E5EBFF"
                        display="flex"
                        onClick={handleClickMovePage(nextGroupStartPage)}
                    >
                        &gt;
                    </Button>
                </Page>
            ) : null}
        </PaginationWrapper>
    );
};

Pagination.displayName = 'Pagination';
export default Pagination;
