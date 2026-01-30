import styled from 'styled-components';

export const CommunityWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    min-height: 100vh;
    background-color: white; // 전체 배경색 (홈페이지 톤에 맞춤)
    padding-top: 120px; // 헤더 높이에 따른 여백
    padding-bottom: 50px;
`;

export const CommunityContainer = styled.div`
    width: 65%; // 헤더의 HeaderMainWrapper와 통일감 부여
    display: flex;
    gap: 30px;
`;

export const SideBar = styled.aside`
    width: 200px;
    flex-shrink: 0;
`;

export const SideTitle = styled.h2`
    font-size: 1.5rem;
    color: #4a3a2a;
    margin-bottom: 20px;
    font-weight: 700;
`;

export const CategoryList = styled.ul`
    list-style: none;
    padding: 0;
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
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
`;

// --- 우측 게시글 목록 영역 ---
export const MainSection = styled.section`
    flex-grow: 1;
`;

export const SectionHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 20px;
`;

export const BoardTitle = styled.h3`
    margin-bottom: 0;
    white-space: nowrap;
    flex-shrink: 0;
    font-size: 24px; /* 기존 사이즈에 맞춰 조절 */
    font-weight: bold;
`;

export const WriteButton = styled.button`
    padding: 10px 20px;
    background-color: #4a3a2a;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;

    &:hover {
        opacity: 0.9;
    }
`;

export const PostListWrapper = styled.div`
    background: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    min-height: 500px;
`;

export const SearchInputWrapper = styled.div`
    display: flex;
    flex-direction: row;
    border: 1px solid bisque;
    border-radius: 5px;
    width: 100%;
    align-items: center;
`;

export const HeaderLeftGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`;

export const FilterGroup = styled.div`
    display: flex;
    gap: 8px;
    flex-shrink: 0;
`;

export const HeaderRightGroup = styled.div`
    flex-shrink: 0;
    margin-left: 20px;
`;
