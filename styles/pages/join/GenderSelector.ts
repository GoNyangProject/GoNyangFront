import styled, { css } from 'styled-components';

export const GenderButton = styled.div<{ selected: boolean }>`
    flex: 1;
    padding: 10px 0;
    border-width: 1px;
    border-style: solid;
    border-color: #ccc;
    cursor: pointer;
    text-align: center;
    user-select: none;
    color: black;

    ${({ selected }) =>
        selected &&
        css`
            border-color: green;
            color: green;
        `}
`;

export const GenderButtonWrapper = styled.div`
    display: flex;
    margin-bottom: 16px;
    border-radius: 4px;
    overflow: hidden;
    border: 1px solid #ccc;
`;
