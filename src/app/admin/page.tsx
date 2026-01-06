'use client';

import React from 'react';
import styled from 'styled-components';

const Page = () => {
    return (
        <DashboardContainer>
            <h1>관리자 대시보드</h1>
            <p>환영합니다, 관리자님! 이곳에서 서비스의 전반적인 현황을 관리할 수 있습니다.</p>
            {/* 여기에 통계, 요약 정보 카드 등을 추가 */}
            <Widget>회원 현황</Widget>
            <Widget>상품 판매량</Widget>
        </DashboardContainer>
    );
};

const DashboardContainer = styled.div`
    padding: 20px;
`;

const Widget = styled.div`
    background-color: #f9f9f9;
    border: 1px solid #eee;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 15px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

export default Page;
