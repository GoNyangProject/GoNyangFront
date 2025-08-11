import styled from 'styled-components';
import { InputProps } from '../../../components/atom/Input';

export const InputWrap = styled.div<InputProps>`
    width: ${(props) => props.width};
    max-width: ${(props) => props.maxWidth};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;
    margin: ${(props) => props.margin};
    gap: ${(props) => (props.gap ? props.gap : '20px')};
`;

export const InputLabel = styled.label<InputProps>`
    width: ${(props) => props.labelWidth};
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    color: #ffffff;
`;

export const ErrorMessage = styled.div`
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    color: #eb2d00;
    margin: 5px 0 0 0;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
`;

export const InputItem = styled.input<InputProps>`
    width: 100%;
    height: ${(props) => props.height};
    font-size: ${(props) => (props.fontSize ? props.fontSize : '14px')};
    font-weight: ${(props) => (props.fontWeight ? props.fontWeight : '500')};
    font-family: ${(props) => props.fontFamily};
    line-height: 17px;
    text-align: ${(props) => props.textAlign};
    border: ${(props) => (props.border ? props.border : '1px solid bisque')};
    color: black;
    background-color: ${(props) => (props.backgroundColor ? props.backgroundColor : 'bisque')};
    padding: 0 5px;
    box-shadow: ${(props) => (props.isShadow ? '2px 2px 1px rgba(0, 0, 0, 0.05)' : 'none')};
    outline: none;
    cursor: inherit;
    &::placeholder {
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
    }
`;
