import React, { ChangeEvent, CSSProperties, useState } from 'react';
import { Option, SelectWrapper } from '../../styles/components/atom/Select';
import { SelectOption } from '../../types/Common';

export type SelectProps = {
    option: Array<SelectOption>;
    defaultValue?: SelectOption;
    style?: CSSProperties;
    width?: string;
    height?: string;
    color?: string;
    backgroundColor?: string;
    padding?: string;
    margin?: string;
    gap?: string;
    fontSize?: string;
    display?: string;
    border?: string;
    borderRadius?: string;
    onChange: (option: SelectOption) => void;
};
const Select = ({
    option,
    defaultValue = option[0],
    style,
    width,
    height,
    color,
    backgroundColor = '#a68967',
    padding,
    margin,
    gap,
    fontSize,
    onChange,
    border = '1px solid #a68967',
    borderRadius = '7px',
}: SelectProps) => {
    const [, setSelectedOption] = useState<SelectOption>();
    const handleChangeOption = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedOptionValue = event.target.value;
        const optionValue = option.find((f: SelectOption) => f.value === selectedOptionValue);
        if (optionValue) {
            setSelectedOption(optionValue);
            onChange(optionValue);
        }
    };

    return (
        <SelectWrapper
            style={style}
            $width={width}
            $height={height}
            $color={color}
            defaultValue={defaultValue.value}
            $borderRadius={borderRadius}
            $backgroundColor={backgroundColor}
            $padding={padding}
            $border={border}
            $fontSize={fontSize}
            $gap={gap}
            $margin={margin}
            onChange={handleChangeOption}
        >
            {Array.isArray(option) &&
                option.map((option) => {
                    return <Option key={option.value} label={option.label} value={option.value} disabled={!!option.disabled}></Option>;
                })}
        </SelectWrapper>
    );
};

export default Select;
