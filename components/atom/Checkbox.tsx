import React, { ChangeEventHandler, CSSProperties, ForwardedRef, forwardRef, JSX } from 'react';
import { CheckInput, CheckWrapper } from '../../styles/components/atom/Checkbox';

export type CheckProps = {
    checked?: boolean;
    defaultChecked?: boolean;
    name?: string;
    value?: string | number;
    disabled?: boolean;
    margin?: string;
    border?: string;
    borderRadius?: string;
    style?: CSSProperties;
    onChange?: ChangeEventHandler<HTMLInputElement>;
};

const Checkbox = forwardRef<HTMLInputElement, CheckProps>(
    (
        { checked, defaultChecked, name, border = 'none', borderRadius = '3px', margin = '2px', style, onChange, value, disabled }: CheckProps,
        ref: ForwardedRef<HTMLInputElement>,
    ): JSX.Element => {
        return (
            <CheckWrapper style={style}>
                <CheckInput
                    ref={ref}
                    checked={checked}
                    defaultChecked={defaultChecked}
                    onChange={onChange}
                    name={name}
                    value={value}
                    $margin={margin}
                    $border={border}
                    $borderRadius={borderRadius}
                    disabled={disabled}
                />
            </CheckWrapper>
        );
    },
);

Checkbox.displayName = 'Checkbox';
export default Checkbox;
