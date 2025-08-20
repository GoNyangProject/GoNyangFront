import styled from 'styled-components';

export const MypageWrapper = styled.div`
    display: flex;
    height: 100%;
    padding: 80px;
    justify-content: center;
    //align-items: center;
    overflow: hidden;
    flex-direction: row;
`;

export const MenuBarWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 250px;
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

export const BookWrapper = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid bisque;
    padding: 15px;
    gap: 15px;
    border-radius: 5px;
    box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.05);
    margin: 10px 0;
`;

export const BookItemWrapper = styled.div`
    border: 1px solid bisque;
    border-radius: 5px;
    padding: 15px;
`;

export const BookHeader = styled.div`
    font-weight: 590;
    font-size: 23px;
`;

export const BookMainWrapper = styled.div`
    border: 1px solid bisque;
    border-radius: 5px;
    padding: 15px;
    margin: 10px;
    display: flex;
    flex-direction: row;
    gap: 15px;
`;

export const MypageTitle = styled.div`
    font-size: 35px;
    width: 100%;
`;

export const BookMenuLogo = styled.div`
    background: url('/images/test.png') no-repeat center center;
    background-size: contain;
    width: 20%;
`;

export const BookContent = styled.div`
    display: flex;
    width: 65%;
    flex-direction: column;
`;

export const BookControlls = styled.div`
    display: flex;
    align-items: center;
    justify-content: right;
`;
