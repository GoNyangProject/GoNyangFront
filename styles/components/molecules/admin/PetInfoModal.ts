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

export const ContentBox = styled.div`
    background-color: #f8f9fa;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 20px;
    border: 1px solid #e9ecef;

    .label {
        font-size: 12px;
        color: #868e96;
        margin-bottom: 5px;
    }

    .text {
        font-size: 15px;
        line-height: 1.5;
        white-space: pre-wrap; /* 줄바꿈 허용 */
    }
`;
export const AnswerTextarea = styled.textarea`
    width: 100%;
    height: 150px;
    padding: 12px;
    border: 1px solid #dee2e6;
    border-radius: 8px;
    resize: none;
    font-size: 14px;
    margin-bottom: 20px;
    outline: none;

    &:focus {
        border-color: #3e66fb;
    }
`;
export const InfoGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-bottom: 15px;
    padding-bottom: 15px;
    border-bottom: 1px dashed #eee;

    .item {
        font-size: 13px;
        color: #666;

        strong {
            color: #333;
            margin-right: 5px;
        }
    }
`;
export const PetTabGroup = styled.div`
    display: flex;
    gap: 8px;
    margin-bottom: 20px;
    overflow-x: auto;
    padding-bottom: 5px;
`;

export const PetTab = styled.button<{ active: boolean }>`
    padding: 8px 16px;
    border-radius: 20px;
    border: 1px solid ${(props) => (props.active ? '#3E66FB' : '#eee')};
    background-color: ${(props) => (props.active ? '#3E66FB' : 'white')};
    color: ${(props) => (props.active ? 'white' : '#666')};
    cursor: pointer;
    font-size: 13px;
    white-space: nowrap;
    transition: all 0.2s;

    &:hover {
        border-color: #3e66fb;
    }
`;

export const PetImageHeader = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;

    img {
        width: 120px;
        height: 120px;
        object-fit: cover;
        border: 3px solid #f0f0f0;
    }
`;
