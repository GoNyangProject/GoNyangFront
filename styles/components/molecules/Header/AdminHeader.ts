import styled from 'styled-components';

export const AdminLayoutWrapper = styled.div`
    display: flex;
    min-height: 100vh;
    background-color: #f0f2f5; /* 관리자 페이지 전체 배경색 */
`;

export const Sidebar = styled.aside`
    width: 250px;
    background-color: #333d49; /* 딥 차콜 */
    color: #f0f2f5;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between; /* 로고와 하단 버튼 분리 */
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

export const AdminLogo = styled.h2`
    color: #ffffff;
    text-align: center;
    margin-bottom: 30px;
    font-size: 1.5rem;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

export const SidebarLink = styled.div`
    display: flex;
    align-items: center;
    padding: 12px 10px;
    margin-bottom: 10px;
    border-radius: 8px;
    cursor: pointer;
    transition:
        background-color 0.2s,
        color 0.2s;
    font-size: 1rem;

    &:hover {
        background-color: #4a5462;
        color: #ffffff;
    }
`;

export const Icon = styled.img`
    width: 20px;
    height: 20px;
    margin-right: 10px;
    filter: invert(1);
`;

export const ReturnToUserHome = styled(SidebarLink)`
    margin-top: auto;
    background-color: #556270;

    &:hover {
        background-color: #6c7a89;
    }
`;
export const MainContent = styled.main`
    flex-grow: 1;
    padding: 30px;
    background-color: #ffffff;
`;
