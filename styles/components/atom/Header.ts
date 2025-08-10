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

export const HeaderLoginWrapper = styled.button`
    display: flex;
    align-items: center;
    color: white;
    background: transparent;
    border: none;
    cursor: pointer;
    gap: 6px;
`;

export const HeaderWrapper = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #a68967;
    color: black;
    padding: 0 16px;
    height: 70px;
`;

export const HeaderLogo = styled.div`
    font-size: 14px;
    text-align: center;
`;

export const UserWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
`;
