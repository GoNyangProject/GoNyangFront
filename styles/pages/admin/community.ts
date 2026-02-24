import styled from 'styled-components';

export const AdminHeaderArea = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;
    margin-bottom: 25px;
    padding: 0 5px;
`;

export const FilterWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

export const SearchInputWrapper = styled.div`
    display: flex;
    flex-direction: row;
    border: 1px solid bisque;
    border-radius: 5px;
    width: 350px;
    align-items: center;
    background-color: white;
    padding-right: 10px;
`;

export const SelectWrapper = styled.div`
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    width: auto;
`;
