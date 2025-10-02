import styled from 'styled-components';

const Colors = {
    primary: '#B0926A', // 메인 강조색 (따뜻한 브라운/카멜)
    primaryDark: '#8D7250', // 메인 강조색 hover
    secondaryBg: '#FFF8F0', // 정보 리스트 배경 (연한 크림/베이지)
    secondaryBorder: '#E6D7C8', // 정보 리스트 테두리
    bg: '#FAF8F5', // 전체 페이지 배경 (아주 연한 베이지)
    cardBg: '#FFFFFF', // 카드 배경
    textDark: '#333333', // 일반 텍스트
    textMedium: '#666666', // 중간 톤 텍스트
    textLight: '#888888', // 연한 텍스트
    divider: '#EBE0D3', // 구분선 (대시 보더)
};

export const CompleteWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 80vh;
    padding: 20px;
    background-color: ${Colors.bg}; /* 변경 */
`;

export const ContentCard = styled.div`
    width: 100%;
    max-width: 400px;
    padding: 30px;
    background: ${Colors.cardBg}; /* 변경 */
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
    text-align: center;
`;

export const IconWrapper = styled.div`
    font-size: 48px;
    color: ${Colors.primary}; /* 변경 */
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: ${Colors.secondaryBg}; /* 변경 (아이콘 배경도 베이지 톤) */
    margin: 0 auto 15px;
`;

export const SuccessHeader = styled.div`
    margin-bottom: 25px;
`;

export const Title = styled.h1`
    font-size: 28px;
    font-weight: 800;
    color: ${Colors.primary}; /* 변경 */
    margin-top: 15px;
    margin-bottom: 10px;
`;

export const InfoListWrapper = styled.div`
    margin-top: 20px;
    padding: 15px;
    background-color: ${Colors.secondaryBg}; /* 변경 */
    border-radius: 8px;
    border: 1px solid ${Colors.secondaryBorder}; /* 변경 */
`;

export const InfoItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px dashed ${Colors.divider}; /* 변경 */

    &:last-child {
        border-bottom: none;
    }
`;

export const InfoLabel = styled.span`
    font-size: 14px;
    color: ${Colors.textMedium}; /* 변경 */
    font-weight: 500;
`;

export const InfoValue = styled.span<{ $isPrice?: boolean }>`
    font-size: ${(props) => (props.$isPrice ? '20px' : '15px')};
    font-weight: ${(props) => (props.$isPrice ? '700' : '600')};
    color: ${(props) => (props.$isPrice ? Colors.primary : Colors.textDark)}; /* 변경 */
`;

export const ButtonContainer = styled.div`
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const MainButton = styled.button`
    width: 100%;
    padding: 12px;
    background-color: ${Colors.primary}; /* 변경 */
    color: ${Colors.textDark};
    font-size: 16px;
    font-weight: 700;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: ${Colors.primaryDark}; /* 변경 */
    }
`;

export const SubButton = styled(MainButton)`
    background-color: ${Colors.cardBg}; /* 변경 */
    color: ${Colors.textDark}; /* 변경 */
    border: 1px solid ${Colors.primary}; /* 변경 */

    &:hover {
        background-color: ${Colors.secondaryBg}; /* 변경 */
    }
`;
