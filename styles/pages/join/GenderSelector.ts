import styled, { css } from 'styled-components';

export const GenderButtonWrapper = styled.div`
    display: flex;
    width: 100%;
    margin-bottom: 16px;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #ccc;
    box-sizing: border-box;
`;

export const GenderButton = styled.div<{ selected: boolean }>`
    flex: 1;
    padding: 12px 0;
    cursor: pointer;
    text-align: center;
    user-select: none;
    color: #666;
    background-color: white;
    font-size: 15px;
    transition: all 0.2s;

    &:not(:last-child) {
        border-right: 1px solid #ccc;
    }

    ${({ selected }) =>
        selected &&
        css`
            background-color: #f0fff4;
            color: green;
            font-weight: bold;
        `}
`;
