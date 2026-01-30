import styled from 'styled-components';

export const BoardCardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 60%;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    padding: 25px;
    gap: 15px;
`;

export const SearchWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export const DetailContainer = styled.div`
    width: 100%;
    background-color: #ffffff;
    border: 1px solid #eddecb;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(255, 228, 196, 0.2);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const DetailHeader = styled(SearchWrapper)`
    padding: 30px 40px;
    border-bottom: 1px solid #f5ebd7;
    background-color: #fffaf0;
`;

export const DetailTitleWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
`;

export const DetailUpdateWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
`;

export const DetailTitle = styled.h2`
    font-size: 24px;
    font-weight: 700;
    color: #4a3f35;
    margin-bottom: 12px;
`;

export const DetailMeta = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
    font-size: 14px;
    color: #8b7d6b;

    span::after {
        content: '|';
        margin-left: 15px;
        color: #eddecb;
    }

    span:last-child::after {
        content: '';
    }
`;

export const DetailBody = styled.div`
    width: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const DetailImageBox = styled.div`
    width: 250px;
    height: 250px;
    border-radius: 20px;
    background-color: #f3f3f3;
    overflow: hidden;
    margin-bottom: 15px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

export const DetailContent = styled.div`
    padding: 20px;
    line-height: 1.8;
    font-size: 16px;
    color: #5a4d41;
    white-space: pre-wrap;
    word-break: break-all;

    &.view-content img {
        max-width: 100%; /* 이미지가 화면 밖으로 나가는 것 방지 */
        height: auto;
    }

    &.view-content b {
        font-weight: bold;
    }

    &.view-content u {
        text-decoration: underline;
    }

    &.view-content a {
        color: #007bff; /* 링크 느낌이 나는 파란색 */
        text-decoration: underline; /* 밑줄 추가 */
        transition: color 0.2s;

        &:hover {
            color: #0056b3; /* 마우스 올렸을 때 더 진한 파란색 */
            text-decoration: none; /* 마우스 올리면 밑줄 제거(취향껏 선택) */
        }
    }

    &.view-content ul {
        list-style: disc;
        padding-left: 20px;
    }

    &.view-content ol {
        list-style: decimal;
        padding-left: 20px;
    }
`;

export const ButtonWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding: 20px 40px;
    border-top: 1px solid #f5ebd7;
    background-color: #fffaf0;
    align-items: center;
    white-space: nowrap;
    gap: 15px;
`;
