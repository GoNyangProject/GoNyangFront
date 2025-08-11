import styled from 'styled-components';

type InputItemProps = {
    $isError?: boolean;
};

export const InputItem = styled.input<InputItemProps>`
    display: block;
    width: 100%;
    margin-bottom: 16px;
    padding: 12px;
    border: 1px solid ${(props) => (props.$isError ? 'red' : '#ccc')};
    border-radius: 4px;
    outline: none;
    background-color: white;
    color: black;
    &:focus {
        border-color: ${(props) => (props.$isError ? 'red' : '#666')};
    }
`;
