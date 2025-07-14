import styled from 'styled-components';

type CheckInputProps = {
    $borderRadius?: string;
    $border?: string;
    $margin?: string;
};

export const CheckWrapper = styled.div`
    display: inline-block;
    user-select: none;
    align-items: center;
`;

export const CheckDisplay = styled.span`
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    transition: all 0.2s;
`;

export const CheckInput = styled.input.attrs(({ type = 'checkbox' }) => ({ type }))<CheckInputProps>`
    display: none;

    & + ${CheckDisplay} {
        width: 18px;
        height: 18px;
        border: ${(props) => props.$border};
        margin: ${(props) => props.$margin};
        background: url(/images/icon-chk.png) left top no-repeat;
        border-radius: ${(props) => props.$borderRadius};
        cursor: pointer;
    }

    &:checked + ${CheckDisplay} {
        &::after {
            position: absolute;
            content: '';
            top: auto;
            left: auto;
            background: url(/images/icon-chk-ov.png) left top no-repeat;
            width: 18px;
            height: 18px;
            margin: 0;
            padding: 0;
            border-radius: 2px;
        }
    }

    &:disabled + ${CheckDisplay} {
        cursor: default;
    }
`;
