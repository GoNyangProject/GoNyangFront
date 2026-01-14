import React, { useEffect, useRef, useState } from 'react';
import { DropdownOption, DropdownOptions, DropdownWrapper } from '../../../styles/components/molecules/admin/AdminFilter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

type AdminFilterProps = {
    options: { label: string; value: string }[];
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
};
const useOutsideClick = (callback: () => void) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [callback]);

    return ref;
};
const AdminFilter = ({ options, value, placeholder, onChange }: AdminFilterProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useOutsideClick(() => setIsOpen(false));
    const selectedLabel = options.find((opt) => opt.value === value)?.label || placeholder;

    return (
        <DropdownWrapper ref={dropdownRef} onClick={() => setIsOpen(!isOpen)}>
            <span>{selectedLabel}</span>
            <FontAwesomeIcon icon={faChevronDown} size="xs" color="gray" />

            {isOpen && (
                <DropdownOptions>
                    {options.map((opt) => (
                        <DropdownOption
                            key={opt.value}
                            onClick={() => {
                                onChange(opt.value);
                                setIsOpen(false);
                            }}
                        >
                            {opt.label}
                        </DropdownOption>
                    ))}
                </DropdownOptions>
            )}
        </DropdownWrapper>
    );
};

export default AdminFilter;
