import { ChangeEventHandler, CompositionEventHandler, CSSProperties, ForwardedRef, forwardRef, JSX, KeyboardEventHandler, ReactNode, useEffect } from 'react';
import { TextareaInput, TextareaLabel, TextareaWrap } from '../../styles/components/atom/Textarea';

export type TextareaProps = {
    value?: string | string[];
    cols?: number;
    rows?: number;
    title?: string;
    label?: string;
    name?: string;
    placeholder?: string;
    disabled?: boolean;
    margin?: string;
    readOnly?: boolean;
    defaultValue?: string;
    gap?: string;
    resize?: boolean;
    labelWidth?: string;
    labelMargin?: string;
    style?: CSSProperties;
    justify?: string;
    children?: ReactNode;
    flex?: string;
    onChange?: ChangeEventHandler<HTMLTextAreaElement>;
    onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement>;
    onKeyUp?: KeyboardEventHandler<HTMLTextAreaElement>;
    onCompositionStart?: CompositionEventHandler<HTMLTextAreaElement>;
    onCompositionEnd?: CompositionEventHandler<HTMLTextAreaElement>;
};

const Textarea = forwardRef(
    (
        {
            value,
            justify,
            rows,
            cols,
            title,
            readOnly,
            margin,
            gap,
            name,
            defaultValue,
            placeholder,
            label,
            disabled,
            resize,
            style,
            labelWidth,
            children,
            flex,
            onChange,
            onKeyDown,
            onKeyUp,
            onCompositionStart,
            onCompositionEnd,
        }: TextareaProps,
        ref: ForwardedRef<HTMLTextAreaElement>,
    ): JSX.Element => {
        // [값에 맞춘 리사이즈] 시작 - Ref 를 넘겨줘야 작동
        useEffect(() => {
            if (resize && ref && 'current' in ref && ref.current) {
                ref.current.style.height = '0px';
                const scrollHeight = ref.current.scrollHeight;
                ref.current.style.height = scrollHeight + 'px';
            }
        }, [value]);

        // [값에 맞춘 리사이즈] 끝

        return (
            <TextareaWrap $gap={gap} $margin={margin} $justify={justify} $flex={flex}>
                {label ? <TextareaLabel $labelWidth={labelWidth}>{label}</TextareaLabel> : null}
                <TextareaInput
                    ref={ref}
                    cols={cols}
                    rows={rows}
                    value={value || ''}
                    readOnly={readOnly}
                    defaultValue={defaultValue}
                    title={title}
                    name={name}
                    placeholder={placeholder}
                    disabled={disabled}
                    style={style}
                    onChange={onChange}
                    onKeyUp={onKeyUp}
                    onKeyDown={onKeyDown}
                    onCompositionStart={onCompositionStart}
                    onCompositionEnd={onCompositionEnd}
                />
                {children}
            </TextareaWrap>
        );
    },
);

Textarea.displayName = 'Textarea';
export default Textarea;
