import styled from 'styled-components';

export const MypageWrapper = styled.div`
    display: flex;
    width: 100%;
    max-width: 1300px;
    margin: 0 auto;
    min-height: calc(100vh - 80px); /* 💡 헤더 높이만큼 빼주기 (예: 헤더가 80px일 때) */
    padding: 40px 20px; /* 💡 너무 과했던 패딩(80px)을 줄임 */
    gap: 40px;
    flex-direction: row;
    box-sizing: border-box;
    align-items: flex-start; /* 💡 메뉴바와 본문을 상단 정렬 */

    @media (max-width: 1024px) {
        padding: 30px 15px;
        gap: 20px;
    }

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        padding: 20px;
    }
`;

export const MenuBarWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 280px; /* 💡 메뉴바도 살짝 키우면 더 안정적이에요 */
    flex-shrink: 0; /* 💡 메뉴바 너비 고정 */
    gap: 15px;
    border-radius: 15px;
    border: 1px solid bisque;
    padding: 25px;
    background: white; /* 기존 배경 이미지에 맞춰 조절하세요 */
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

    @media (max-width: 768px) {
        width: 100%;
        max-width: 400px;
    }
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

export const BookItemWrapper = styled.div``;

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
    align-items: flex-start;
`;

export const BookControlls = styled.div`
    display: flex;
    align-items: center;
    justify-content: right;
`;
