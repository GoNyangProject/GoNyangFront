import styled from 'styled-components';

export const DialogWrapper = styled.div<{ $isOpen?: boolean }>`
    display: ${(props) => (props.$isOpen ? 'flex' : 'none')};
    width: inherit;
    height: inherit;
    background-color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
`;
export const DialogInner = styled.div<{ $width?: string; $height: string }>`
    width: ${(props) => props.$width};
    height: ${(props) => props.$height};
`;
export const DialogHeader = styled.div``;
export const DialogBody = styled.div``;
export const DialogFooter = styled.div``;
