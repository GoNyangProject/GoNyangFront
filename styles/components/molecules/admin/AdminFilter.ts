import styled from 'styled-components';

export const DropdownWrapper = styled.div`
    border: 1px solid bisque;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    position: relative;
    min-width: 70px;
    justify-content: space-between;
    width: 100%;

    @media (max-width: 768px) {
        height: 32.33px;
    }
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
