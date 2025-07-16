import styled from 'styled-components';

export const CardWrapper = styled.div<{ $isOpen?: boolean }>`
    display: ${(props) => (props.$isOpen ? 'block' : 'none')};
    width: 100%;
    height: 100%;
    flex: 1;
    background: #a68967;
    border: 1px solid #a68967;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.05);
    overflow: hidden;
`;
