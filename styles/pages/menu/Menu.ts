import styled from 'styled-components';

export const MenuWrapper = styled.div`
    display: flex;
    width: 100%;
    border-radius: 5px;
    flex-direction: column;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 15px;
    gap: 15px;
`;

export const MenuMainWrapper = styled.div`
    display: flex;
    width: 100%;
    height: 100px;
    min-height: 100px;
    flex-direction: row;
    border: 1px solid bisque;
    padding: 10px;
    border-radius: 5px;
    gap: 30px;
    align-items: center;
`;

export const MenuTitle = styled.div`
    width: 100%;
    font-weight: 500;
    font-size: 2rem;
    text-align: center;
`;

export const MenuImg = styled.div<{ image: number }>`
    background: url(${(props) => `/images/menu/${props.image}.png`}) no-repeat center center;
    background-size: contain;
    width: 80px;
    min-width: 50px;
    height: 100%;
`;

export const MenuName = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;
export const MenuContent = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    white-space: pre;
    text-overflow: ellipsis;
    overflow: hidden;
`;

export const ButtonWrapper = styled.div`
    flex-shrink: 0; /* 버튼 크기 고정 */
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const DateWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 20px;
`;

export const ServiceCard = styled.div`
    display: flex;
    flex-direction: row;
    background-color: #ffffff;
    border-radius: 16px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 24px;
    border: 1px solid bisque;
    width: 100%;
    height: 100%;
    gap: 15px;
`;

export const ServiceName = styled.h2`
    font-size: 28px;
    font-weight: 700;
    color: #333333;
    margin: 0 0 8px; /* 아래쪽 여백 설정 */
`;

export const ServiceDescription = styled.p`
    font-size: 16px;
    font-weight: 400;
    color: #666666;
    margin: 0 0 24px;
`;

export const DetailsRow = styled.div`
    display: flex;
    justify-content: space-between; /* 양 끝에 배치 */
    align-items: center;
`;

export const Rating = styled.div`
    display: flex;
    align-items: center;
    font-size: 16px;
    color: #f7b731; /* 별 색상 */
`;

export const Price = styled.div`
    font-size: 24px;
    font-weight: 600;
    color: #333333;
`;
