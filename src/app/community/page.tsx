'use client';
import React, { useState } from 'react';
import {
    BoardTitle,
    CategoryItem,
    CategoryList,
    CommunityContainer,
    CommunityWrapper,
    MainSection,
    PostListWrapper,
    SectionHeader,
    SideBar,
    SideTitle,
    WriteButton,
} from '../../../styles/pages/community/Community';
import InquiryTable from '../../../components/atom/InquiryTable';
import { communityColumns } from '../../../constants/table-init';

const Page = () => {
    const [category, setCategory] = useState('자유게시판');

    return (
        <CommunityWrapper>
            <CommunityContainer>
                {/* 좌측 메뉴 */}
                <SideBar>
                    <SideTitle>커뮤니티</SideTitle>
                    <CategoryList>
                        <CategoryItem $active={category === '자유게시판'} onClick={() => setCategory('자유게시판')}>
                            자유게시판
                        </CategoryItem>
                        <CategoryItem $active={category === '정보공유'} onClick={() => setCategory('정보공유')}>
                            정보공유
                        </CategoryItem>
                        <CategoryItem $active={category === '나눔장터'} onClick={() => setCategory('나눔장터')}>
                            나눔장터
                        </CategoryItem>
                    </CategoryList>
                </SideBar>

                {/* 우측 게시판 */}
                <MainSection>
                    <SectionHeader>
                        <BoardTitle>{category}</BoardTitle>
                        <WriteButton>글쓰기</WriteButton>
                    </SectionHeader>

                    <PostListWrapper>
                        {/* 여기에 이제 Table 컴포넌트나 리스트를 넣으면 됩니다! */}
                        <InquiryTable columns={communityColumns} rows={[]}></InquiryTable>
                        <div style={{ textAlign: 'center', color: '#888', paddingTop: '100px' }}>아직 게시글이 없습니다. 첫 글을 남겨보세요! 🐾</div>
                    </PostListWrapper>
                </MainSection>
            </CommunityContainer>
        </CommunityWrapper>
    );
};

export default Page;
