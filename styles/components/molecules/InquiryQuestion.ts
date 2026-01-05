import styled from 'styled-components';

export const InquiryQuestionWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 0;
`;

export const GuideText = styled.p`
    font-size: 20px;
    line-height: 1.6;
    margin-bottom: 20px;
    text-align: center;
`;

export const FormSection = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const Field = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const Label = styled.label`
    font-weight: 600;
    font-size: 14px;

    span {
        color: red;
        margin-left: 4px;
    }
`;

export const TextArea = styled.textarea`
    width: 100%;
    min-height: 140px;
    padding: 12px;
    font-size: 14px;
    border: 1px solid #ccc;
    resize: vertical;
    margin-bottom: 20px;
`;
