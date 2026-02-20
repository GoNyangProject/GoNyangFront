import styled from 'styled-components';

export const CommunityWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    min-height: 100vh;
    background-color: white;
    padding-top: 120px;
    padding-bottom: 50px;

    @media (max-width: 768px) {
        padding-top: 80px;
    }
`;

export const CommunityContainer = styled.div`
    width: 65%;
    display: flex;
    gap: 30px;

    @media (max-width: 1024px) {
        width: 95%;
        flex-direction: column;
        gap: 20px;
    }
`;

export const SideBar = styled.aside`
    width: 200px;
    flex-shrink: 0;

    .mobile-write-btn {
        display: none;
    }

    @media (max-width: 1024px) {
        width: 100%;
        .sidebar-header {
            padding: 0 5px;
        }
        .mobile-write-btn {
            display: block;
        }
    }
`;

export const SideTitle = styled.h2`
    font-size: 1.5rem;
    color: #4a3a2a;
    margin-bottom: 20px;
    font-weight: 700;

    @media (max-width: 1024px) {
        font-size: 18px;
        margin-bottom: 10px;
        padding-left: 5px;
    }
`;

export const CategoryList = styled.ul`
    list-style: none;
    padding: 0;
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

    @media (max-width: 1024px) {
        display: flex;
        overflow-x: auto;
        box-shadow: none;
        border-bottom: 1px solid #eee;
        border-radius: 0;
    }
`;

export const CategoryItem = styled.li<{ $active: boolean }>`
    padding: 15px 20px;
    cursor: pointer;
    font-weight: ${(props) => (props.$active ? '700' : '400')};
    background-color: ${(props) => (props.$active ? 'bisque' : 'white')};
    color: #4a3a2a;
    transition: all 0.2s;

    &:hover {
        background-color: ${(props) => (props.$active ? 'bisque' : '#fff8f0')};
    }

    @media (max-width: 1024px) {
        flex: 1;
        text-align: center;
        white-space: nowrap;
        padding: 12px 10px;
        border-bottom: ${(props) => (props.$active ? '2px solid #4a3a2a' : 'none')};
    }
`;

export const MainSection = styled.section`
    flex-grow: 1;
`;

export const SectionHeader = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    margin-bottom: 20px;
    gap: 20px;

    @media (max-width: 768px) {
        display: block;
        margin-bottom: 10px;
    }

    @media (max-width: 1024px) {
        .web-write-btn {
            display: none;
        }
    }
`;
export const BoardTitle = styled.h3`
    margin: 0;
    white-space: nowrap;
    flex-shrink: 0;
    font-size: 24px;
    font-weight: bold;

    @media (max-width: 768px) {
        display: none;
    }
`;

export const WriteButton = styled.button`
    padding: 10px 20px;
    background-color: #4a3a2a;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;

    &:hover {
        opacity: 0.9;
    }

    @media (max-width: 768px) {
        width: auto;
        padding: 6px 12px;
        font-size: 14px;
    }
`;

export const PostListWrapper = styled.div`
    background: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    min-height: 500px;

    table {
        width: 100%;
        table-layout: fixed;
    }

    th:nth-child(1),
    td:nth-child(1) {
        width: 60px;
        text-align: center;
    }

    th:nth-child(2),
    td:nth-child(2) {
        width: auto;
        text-align: left;
    }

    th:nth-child(3),
    td:nth-child(3) {
        width: 140px;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    th:nth-child(4),
    td:nth-child(4) {
        width: 100px;
        text-align: center;
    }

    th:nth-child(5),
    td:nth-child(5) {
        width: 80px;
        text-align: center;
    }

    .mobile-only-time {
        display: none;
    }

    @media (max-width: 768px) {
        .mobile-only-time {
            display: block;
        }

        padding: 10px;

        table {
            width: 100%;
            table-layout: fixed;
        }

        th,
        td {
            padding: 12px 5px;
            vertical-align: middle !important;
        }

        th:nth-child(1),
        td:nth-child(1) {
            width: 35px;
            text-align: center;
            font-size: 12px;
        }

        th:nth-child(2),
        td:nth-child(2) {
            width: auto;
            text-align: left;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        th:nth-child(3),
        td:nth-child(3) {
            width: 70px;
            text-align: left;
            font-size: 11px;
            color: #666;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        th:nth-child(4),
        td:nth-child(4) {
            display: none;
        }

        th:nth-child(5),
        td:nth-child(5) {
            width: 40px;
            text-align: center;
            font-size: 11px;
            color: #888;
        }
    }
`;

export const SearchInputWrapper = styled.div`
    display: flex;
    align-items: center;
    border: 1px solid bisque;
    border-radius: 5px;
    padding: 2px 10px;
    width: 250px;

    @media (max-width: 768px) {
        flex: 1;
        width: auto;
    }
`;

export const HeaderLeftGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;

    @media (max-width: 768px) {
        width: 100%;
        order: 2;
    }
`;

export const FilterGroup = styled.div`
    flex-shrink: 0;

    @media (max-width: 768px) {
        width: 85px;
        flex-shrink: 0;
    }
`;

export const HeaderRightGroup = styled.div`
    flex-shrink: 0;
    margin-left: auto;

    @media (max-width: 768px) {
        margin-left: 0;
        order: 1;
    }
`;

export const SearchAndFilterRow = styled.div`
    display: flex;
    width: 100%;
    gap: 8px;
    align-items: center;
    box-sizing: border-box;

    @media (max-width: 768px) {
        width: 100%;
        justify-content: space-between;
    }
`;
