import styled from 'styled-components';

type TextareaProps = {
    $margin?: string;
    $gap?: string;
    $labelWidth?: string;
    $labelMargin?: string;
    $justify?: string;
    $flex?: string;
};

export const TextareaWrap = styled.div<TextareaProps>`
    flex: ${(props) => (props.$flex ? props.$flex : '1')};
    display: flex;
    flex-direction: row;
    justify-content: ${(props) => (props.$justify ? props.$justify : 'space-between')};
    font-weight: 700;
    font-size: 15px;
    line-height: 18px;
    margin: ${(props) => props.$margin};
    gap: ${(props) => (props.$gap ? props.$gap : '20px')};
`;

export const TextareaInput = styled.textarea`
    outline: none;
    resize: none;
    width: 100%;
    height: 37px;
    background-color: rgb(69 71 77);
    border: 1px solid #575a5f;
    padding: 10px;
    color: #ffffff;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    white-space: pre;

    cursor: inherit;

    ::-webkit-scrollbar {
        display: none;
    }

    &:disabled {
        cursor: default;
    }

    &:focus {
        border: 1px solid #fff;
    }

    &::placeholder {
        color: #afafaf;
    }
`;

export const TextareaLabel = styled.label<TextareaProps>`
    margin: ${(props) => (props.$labelMargin ? props.$labelMargin : '5px 0 0 0')};
    width: ${(props) => props.$labelWidth};
    color: #ffffff;
    font-weight: 400;
`;
