import styled from 'styled-components';

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

export const ModalContent = styled.div`
    background-color: white;
    padding: 30px;
    border-radius: 8px;
    width: 500px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
`;

export const MemoTextarea = styled.textarea`
    width: 100%;
    height: 200px;
    padding: 15px;
    border-radius: 4px;
    border: 1px solid #ddd;
    resize: none;
    font-size: 14px;
    box-sizing: border-box;
    margin-top: 15px;
    outline: none;

    &:focus {
        border-color: #3e66fb;
    }
`;

export const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;

    h3 {
        margin: 0;
        font-size: 18px;
        color: #333;
    }
`;

export const CloseButton = styled.button`
    border: none;
    background: none;
    font-size: 24px;
    cursor: pointer;
    color: #999;
    
    &:hover {
        color: #333;
    }
`;

export const ButtonGroup = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
`;