import styled from 'styled-components';

export const HeaderButton = styled.button`
    padding: 8px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background: #a68967;
    color: white;
    font-size: 15px;
    transition: all 0.2s;

    &:hover {
        opacity: 0.5;
    }
`;

export const HeaderNavWrapper = styled.nav`
    display: flex;
    gap: 12px;
`;

export const HeaderLoginWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    background: transparent;
    border: none;
    cursor: pointer;
    gap: 6px;
`;

export const HeaderWrapper = styled.div`
    display: flex;
    background-color: #a68967;
    color: black;
    justify-content: center;
`;

export const HeaderMainWrapper = styled.header`
    width: 60%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    height: 100px;
`;

export const HeaderLogo = styled.div`
    font-size: 14px;
    text-align: center;
    cursor: pointer;
    height: 100%;
    width: 200px;
    background: url('/images/logo.png') no-repeat center center;
    background-size: contain;
`;

export const UserWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 2vw;
`;

export const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 10px;
`;

export const MypageWrapper = styled.div``;
