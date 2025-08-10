import { CSSProperties, ChangeEventHandler, FocusEventHandler, ForwardedRef, KeyboardEventHandler, forwardRef } from 'react';
import { ErrorMessage, InputItem, InputLabel, InputWrap } from '../../styles/components/atom/Input';

export type InputProps = {
    name?: string;
    style?: CSSProperties;
    width?: string;
    maxWidth?: string;
    labelWidth?: string;
    height?: string;
    margin?: string;
    placeholder?: string;
    label?: string;
    type?: string;
    errorMessage?: string;
    value?: string;
    fontSize?: string;
    fontWeight?: string;
    textAlign?: string;
    backgroundColor?: string;
    isShadow?: boolean;
    border?: string;
    readOnly?: boolean;
    defaultValue?: string;
    fontFamily?: string;
    disabled?: boolean;
    gap?: string;
    onBlur?: FocusEventHandler<HTMLInputElement>;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
    onKeyPress?: KeyboardEventHandler<HTMLInputElement>;
};

const Input = forwardRef(
    (
        {
            name,
            style,
            width,
            maxWidth,
            labelWidth,
            height,
            margin,
            placeholder,
            label,
            type,
            errorMessage,
            value,
            fontSize,
            fontWeight,
            fontFamily,
            textAlign,
            backgroundColor,
            isShadow = true,
            border,
            readOnly,
            defaultValue,
            disabled,
            gap,
            onBlur,
            onChange,
            onKeyDown,
            onKeyPress,
        }: InputProps,
        ref: ForwardedRef<HTMLInputElement>,
    ): JSX.Element => {
        return (
            <InputWrap gap={gap} margin={margin} width={width}>
                {label ? <InputLabel labelWidth={labelWidth}>{label}</InputLabel> : null}
                <div style={{ flex: 1 }}>
                    <InputItem
                        name={name}
                        style={style}
                        spellCheck="false"
                        maxWidth={maxWidth}
                        height={height}
                        placeholder={placeholder}
                        fontSize={fontSize}
                        fontWeight={fontWeight}
                        fontFamily={fontFamily}
                        textAlign={textAlign}
                        type={type}
                        value={value}
                        defaultValue={defaultValue}
                        backgroundColor={backgroundColor}
                        isShadow={isShadow}
                        border={border}
                        readOnly={readOnly}
                        disabled={disabled}
                        onBlur={onBlur}
                        onChange={onChange}
                        onKeyDown={onKeyDown}
                        onKeyPress={onKeyPress}
                        ref={ref}
                    />
                    {errorMessage ? <ErrorMessage title={errorMessage}>{errorMessage}</ErrorMessage> : null}
                </div>
            </InputWrap>
        );
    },
);

Input.displayName = 'Input';
export default Input;
