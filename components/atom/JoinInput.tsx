import React from 'react';
import { InputItem } from '../../styles/components/atom/join/JoinInput';

type InputProps = {
    type?: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    isError?: boolean;
};

const JoinInput = ({ type = 'text', onChange, value, placeholder, onBlur, isError }: InputProps) => {
    return <InputItem type={type} placeholder={placeholder} value={value} onChange={onChange} onBlur={onBlur} $isError={isError} />;
};

export default JoinInput;
