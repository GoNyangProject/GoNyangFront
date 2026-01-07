import styled from 'styled-components';

export const TableWrapper = styled.table`
    width: 100%;
    border-collapse: collapse;
    text-align: left; /* 가운데 정렬 대신 왼쪽 정렬 */
`;

export const Th = styled.th`
    height: 48px;
    font-weight: 500;
    font-size: 14px;
    color: #555;
    text-align: left;
    border-bottom: 1px solid #e0e0e0;
    padding: 0 12px;
    line-height: 1.5;
`;

export const Td = styled.td<{ $isClick?: boolean }>`
    height: 48px;
    font-size: 14px;
    color: #000;
    font-weight: 400;
    padding: 0 12px;
    line-height: 1.5;
    cursor: ${(props) => (props.$isClick ? 'pointer' : 'default')};
    text-align: left;
`;

export const Tr = styled.tr`
    border-bottom: 1px solid #e0e0e0;

    &:nth-child(even) {
        background-color: #fafafa; /* 홀짝 줄무늬 */
    }
`;

export const Tbody = styled.tbody`
    text-align: center;
`;
