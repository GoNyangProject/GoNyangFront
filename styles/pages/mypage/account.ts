import styled from 'styled-components';

export const AccountBox = styled.section`
    width: 100%;
    max-width: 800px;
    margin: 40px auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.1);
`;

export const AccountHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px; /* 제목과 InfoItem 간격 */
`;

export const AccountTitle = styled.h1`
    font-size: 18px;
    font-weight: bold;
    margin: 0;
`;
export const ImagePlaceholder = styled.div`
    width: 80px;
    height: 80px;
    background-color: #e0e0e0;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #999;
    font-size: 12px;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;
export const ImagePlaceHolderWrapper = styled.div`
    display: flex;
    align-items: start;
    gap: 12px;
`;
