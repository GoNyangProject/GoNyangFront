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
