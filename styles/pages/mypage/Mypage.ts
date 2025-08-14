import styled from 'styled-components';

export const MypageWrapper = styled.div`
    display: flex;
    height: 100%;
    padding: 80px;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    flex-direction: row;
`;

export const MenuBarWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 300px;
    height: 100%;
    gap: 15px;
    border-radius: 10px;
    border: 1px solid bisque;
    padding: 20px;
    background: url('/images/menubar.png') no-repeat center center;
    background-size: cover;
`;

export const MenuBarHeader = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const MypageLogo = styled.div`
    background: url('/images/mypage.jpg') no-repeat center center;
    background-size: contain;
    height: 100px;
`;
export const MypageUser = styled.span`
    text-align: center;
    font-size: 20px;
`;

export const MenuBarBody = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
    text-align: center;
    gap: 15px;
    padding: 10px;
`;
