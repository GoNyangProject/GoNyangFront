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

    h1 {
        margin-bottom: 20px;
    }

    @media (max-width: 1024px) {
        width: 90%;
    }

    @media (max-width: 768px) {
        width: 100%;
        padding: 15px 5px;
    }
`;

export const SearchWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;

    &.notice-table {
        @media (max-width: 768px) {
            th:nth-child(1),
            td:nth-child(1) {
                width: 35px;
                text-align: left;
                padding-left: 5px;
            }

            th:nth-child(2),
            td:nth-child(2) {
                width: auto;
                text-align: left;
                padding-left: 10px;
                max-width: 0;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            th:nth-child(3),
            td:nth-child(3) {
                display: none;
            }

            th:nth-child(4),
            td:nth-child(4) {
                width: 45px;
                text-align: left !important;
                padding-left: 5px;
                font-size: 11px;
            }

            td textarea {
                text-align: left !important;
            }
        }
    }
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

    @media (max-width: 768px) {
        padding: 20px 15px;
    }
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

    @media (max-width: 768px) {
        font-size: 20px;
        line-height: 1.4;
    }
`;

export const DetailMeta = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
    font-size: 14px;
    color: #8b7d6b;
    flex-wrap: wrap;

    span::after {
        content: '|';
        margin-left: 15px;
        color: #eddecb;
    }

    span:last-child::after {
        content: '';
    }

    @media (max-width: 768px) {
        gap: 8px 12px;
        font-size: 12px;

        span::after {
            content: '';
            margin-left: 0;
        }
    }
`;

export const DetailBody = styled.div`
    width: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: 768px) {
        padding: 15px 10px;
    }
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
        max-width: 100%;
        height: auto;
    }

    &.view-content b {
        font-weight: bold;
    }

    &.view-content u {
        text-decoration: underline;
    }

    &.view-content a {
        color: #007bff;
        text-decoration: underline;
        transition: color 0.2s;

        &:hover {
            color: #0056b3;
            text-decoration: none;
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

    @media (max-width: 768px) {
        padding: 15px;
        justify-content: center;
    }
`;
