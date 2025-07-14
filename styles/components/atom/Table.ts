import styled from 'styled-components';

export const TableWrapper = styled.table`
    border-collapse: collapse;
    text-align: center;
    border-top: 1px solid rgba(166, 137, 103, 0.4);
`;

export const Th = styled.th`
    height: 50px;
    font-weight: 400;
    box-sizing: border-box;
    background: #debe9a;
    border-width: 1px 0;

    & + th {
        border-left: 1px solid rgba(87, 90, 95, 0.4);
    }
`;

export const Tr = styled.tr`
    border-bottom: 1px solid rgba(87, 90, 95, 0.4);
`;

export const Td = styled.td<{ $isClick?: boolean }>`
    height: 50px;
    color: #000000;
    font-weight: 300;
    box-sizing: border-box;
    cursor: ${(props) => (props.$isClick ? 'pointer' : '')};

    & + td {
        border-left: 1px solid rgba(87, 90, 95, 0.4);
    }
`;

export const Tbody = styled.tbody`
    text-align: center;
`;
