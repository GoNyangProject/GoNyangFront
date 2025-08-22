import styled from 'styled-components';

type InfoProps = {
    $alignItem?: string;
};
export const InfoRow = styled.div`
    display: flex;
    justify-content: space-between; /* 좌측(라벨+값) / 우측(버튼) */
    align-items: center;
    padding: 12px 0;
    min-height: 32px;
`;

export const InfoLeft = styled.div<InfoProps>`
    display: flex;
    align-items: ${(props) => props.$alignItem};
    //align-items: center;
    gap: 8px; /* 라벨과 값 사이 여백 */
`;

export const Label = styled.span`
    font-weight: 500;
    color: #333;
    min-width: 80px; /* 라벨 폭 고정하면 정렬 깔끔 */
`;

export const Value = styled.span`
    color: #555;
`;

export const ActionButton = styled.button`
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 6px;
    padding: 4px 12px;
    cursor: pointer;
    font-size: 14px;

    &:hover {
        background-color: #eaeaea;
    }
`;

export const ActionButtonWrapper = styled.div`
    display: flex;
    gap: 8px;
`;

export const ImageActionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 4px;
    align-items: flex-start;
`;

export const ImageInfoButton = styled(ActionButton)`
    width: auto;
`;

export const ImageInfoText = styled.span<{ $marginTop?: string }>`
    font-size: 12px;
    color: #666;
    margin-top: ${(props) => props.$marginTop || '0'};
`;
export const ImageInfoButtonWrapper = styled.div`
    display: flex;
    gap: 8px;
`;

export const PetPaginationWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 8px 0;
`;
