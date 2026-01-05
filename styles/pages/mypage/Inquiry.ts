import styled from 'styled-components';

export const InquiryHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

export const InquiryWrapper = styled.div`
    width: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px;
    gap: 15px;
`;

export const SearchInputWrapper = styled.div`
    display: flex;
    flex-direction: row;
    border: 1px solid bisque;
    border-radius: 5px;
    width: 100%;
    align-items: center;
`;

export const DropdownWrapper = styled.div`
    border: 1px solid bisque;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    position: relative;
    min-width: 120px;
    justify-content: space-between;
`;

export const DropdownOptions = styled.div`
    position: absolute;
    top: 110%;
    left: 0;
    right: 0;
    border: 1px solid bisque;
    border-radius: 5px;
    background-color: white;
    z-index: 10;
    display: flex;
    flex-direction: column;
`;

export const DropdownOption = styled.div`
    padding: 5px 10px;
    cursor: pointer;

    &:hover {
        background-color: #f0f0f0;
    }
`;
