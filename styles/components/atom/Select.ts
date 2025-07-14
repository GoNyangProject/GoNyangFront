import styled from 'styled-components';
import { CSSProperties } from 'react';

type SelectProps = {
    style?: CSSProperties;
    $width?: string;
    $height?: string;
    $color?: string;
    $selectedColor?: string;
    $isSelected?: boolean;
    $backgroundColor?: string;
    $selectedBackgroundColor?: string;
    $padding?: string;
    $margin?: string;
    $gap?: string;
    $fontSize?: string;
    $display?: string;
    $border?: string;
    $borderRadius?: string;
};

export const SelectWrapper = styled.select<SelectProps>`
    border-radius: ${(props) => props.$borderRadius};
    border: ${(props) => props.$border};
    background-color: ${(props) => props.$backgroundColor};
    gap: 1px;
    padding: 5px 10px;
    transition: all 0.3s;
    overflow: hidden;
`;

export const Option = styled.option<SelectProps>`
    color: ${(props) => (props.$isSelected ? props.$selectedColor : props.$color)};
    background-color: ${(props) => (props.$isSelected ? props.$selectedBackgroundColor : props.$backgroundColor)};
    border-radius: 7px;
`;
