import styled, {keyframes} from 'styled-components';

export const MainWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const MainItemsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 20px;
`;

export const HeroSectionContainer = styled.section`
    width: 100%;
    padding: 100px 20px;
    background-color: #e7dbc9;
    text-align: center;
    box-shadow: 0 4px 15px rgba(255, 165, 0, 0.1);
    border-radius: 0 0 12px 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const HeroTitle = styled.h1`
    font-size: 3.8rem; /* 더 크게 */
    font-weight: 800;
    color: #a68967;
    margin-bottom: 20px;
    line-height: 1.3;

    @media (max-width: 768px) {
        font-size: 2.5rem; /* 모바일 반응형 */
    }
`;

export const HeroSubtitle = styled.p`
    font-size: 1.6rem;
    color: #4a3a2a;
    font-weight: 400;
    max-width: 900px;
    margin: 0 auto 40px auto;

    @media (max-width: 768px) {
        font-size: 1.1rem; /* 모바일 반응형 */
        margin-bottom: 30px;
    }
`;

export const GroomerSectionContainer = styled.section`
    width: 100%;
    padding: 60px 20px;
    margin: 40px auto;
    background-color: #a68967; /* 배경색 */
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05); /* 은은한 그림자 */
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export const SectionHeader = styled.h2`
    font-size: 2.5rem;
    font-weight: 700;
    color: white; /* 메인 컬러로 헤더 강조 */
    margin-bottom: 50px;
    position: relative;

    &::after {
        content: '';
        display: block;
        width: 60px;
        height: 4px;
        background-color: #a68967;
        margin: 15px auto 0;
        border-radius: 2px;
    }
`;

export const GroomerCardWrapper = styled.div`
    display: flex;
    gap: 40px;
    align-items: flex-start; /* 상단 정렬 */
    text-align: left;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        text-align: center;
    }
`;

export const ProfileImage = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    //background-color: #d8c7b4; /* 이미지 placeholder 색상 */
    overflow: hidden;
    flex-shrink: 0; /* 크기 유지 */
    /* 실제 이미지를 넣을 경우: background-image: url('...'); */
    background: url('/images/Instructor.jpg') no-repeat center center;
    background-size: cover;
    @media (max-width: 768px) {
        margin-bottom: 20px;
    }
`;

export const ProfileContent = styled.div`
    flex-grow: 1;
`;

export const GroomerName = styled.h3`
    font-size: 1.8rem;
    font-weight: 600;
    color: #4a3a2a; /* 진한 텍스트 색상 */
    margin-bottom: 10px;
`;

export const QualificationsList = styled.ul`
    list-style: none;
    padding: 0;
    margin-top: 20px;

    li {
        font-size: 1.1rem;
        color: #4a3a2a;
        margin-bottom: 8px;
        position: relative;
        padding-left: 20px;
    }

    li::before {
        content: '✓'; /* 체크 마크 아이콘 */
        color: white;
        font-weight: bold;
        display: inline-block;
        width: 1em;
        margin-left: -1em;
    }
`;

export const MenuSection = styled.section`
    width: 100%;
    max-width: 1200px;
    padding: 60px 0;
    margin: 0 auto;
    overflow: hidden;
`;

export const MenuFadeWrapper = styled.div<{ scrollPos: string }>`
    position: relative;
    width: 100%;
    transition: mask-image 1s ease;

    ${(props) => {
        if (props.scrollPos === 'left') {
            return `
                -webkit-mask-image: linear-gradient(to right, black 80%, transparent 100%);
                mask-image: linear-gradient(to right, black 80%, transparent 100%);
            `;
        } else if (props.scrollPos === 'right') {
            return `
                -webkit-mask-image: linear-gradient(to left, black 80%, transparent 100%);
                mask-image: linear-gradient(to left, black 80%, transparent 100%);
            `;
        } else if (props.scrollPos === 'middle') {
            return `
                -webkit-mask-image: linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%);
                mask-image: linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%);
            `;
        } else {
            return `mask-image: none;`;
        }
    }};
`;

export const MenuScrollContainer = styled.div`
    display: flex;
    padding: 20px;
    overflow-x: auto;
    white-space: nowrap;
    cursor: grab;
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
        display: none;
    }

    &:active {
        cursor: grabbing;
    }
`;

export const MenuCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 0 0 auto;
    width: 300px;
    user-select: none;
`;

export const MenuImageBox = styled.div`
    width: 250px;
    height: 250px;
    border-radius: 20px;
    background-color: #f3f3f3;
    overflow: hidden;
    margin-bottom: 15px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
    }

    &:hover img {
        transform: scale(1.05);
    }
`;

export const MenuName = styled.span`
    font-size: 1.2rem;
    font-weight: 600;
    color: #4a3a2a;
`;

export const scrollRight = keyframes`
    0% {
        transform: translateX(200%);
    }
    100% {
        transform: translateX(-100%);
    }
`;

export const MarqueeContainer = styled.div`
    width: 100%;
    overflow: hidden; // 스크롤바 방지 핵심
    background-color: #fff;
    padding: 20px 0;
    position: relative;
`;

export const MarqueeTrack = styled.div`
    display: flex;
    width: max-content;
    animation: ${scrollRight} 30s linear infinite;

    &:hover {
        animation-play-state: paused;
    }
`;

export const MarqueeItem = styled.div`
    width: 120px;
    margin: 0 30px;
    flex-shrink: 0;
    display: flex;
    align-items: center;

    img {
        width: 100%;
        height: auto;
        display: block;
        object-fit: contain;
    }
`;
