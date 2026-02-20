import styled from 'styled-components';

export const DialogWrapper = styled.div<{ $isOpen?: boolean }>`
    display: ${(props) => (props.$isOpen ? 'flex' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 9999;
    justify-content: center;
    align-items: center;

    background-color: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(2px);
`;

export const DialogInner = styled.div<{ $width?: string; $height?: string }>`
    width: 550px;
    height: auto;
    max-width: 90vw;
    max-height: 90vh;

    background-color: white;
    border-radius: 20px;
    border: 3px solid #504538;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    @media (max-width: 768px) {
        width: 95vw;
    }
`;

export const DialogHeader = styled.div`
    width: 100%;
    height: 60px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: bisque;
    border-radius: 20px 20px 0 0;
    font-size: 24px;
    font-weight: 700;
    color: #504538;

    @media (max-width: 768px) {
        font-size: 20px;
    }
`;

export const DialogBody = styled.div`
    width: 100%;
    height: auto;
    padding: 20px;
    color: black;
    overflow-y: auto;
`;

export const DialogFooter = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 10px;
    padding: 15px;

    button {
        @media (max-width: 768px) {
            flex: 1;
            max-width: none;
            width: auto;
        }
    }
`;
