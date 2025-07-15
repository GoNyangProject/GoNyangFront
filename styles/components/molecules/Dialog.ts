import styled from 'styled-components';

export const DialogWrapper = styled.div<{ $isOpen?: boolean }>`
    display: ${(props) => (props.$isOpen ? 'flex' : 'none')};
    width: inherit;
    height: inherit;
    border: 3px solid #504538;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    background-color: #504538;
`;
export const DialogInner = styled.div<{ $width?: string; $height: string }>`
    width: ${(props) => props.$width};
    height: ${(props) => props.$height};
    background-color: white;
    border-radius: 20px;
`;
export const DialogHeader = styled.div`
    width: 100%;
    height: 15%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #504538;
    border-radius: 20px 20px 0 0;
    font-size: 45px;
    font-weight: 500;
`;
export const DialogBody = styled.div`
    width: 100%;
    height: 70%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
`;
export const DialogFooter = styled.div`
    width: 100%;
    height: 15%;
    text-align: center;
    display: flex;
    justify-content: right;
    align-items: center;
    padding: 20px;
    background-color: #b7a99a;
    border-radius: 0 0 20px 20px;
    gap: 20px;
`;
