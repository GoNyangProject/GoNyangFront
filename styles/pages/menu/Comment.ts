import styled from 'styled-components';

export const CommentInputWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 15px;
    width: 100%;
    padding: 15px;
    box-sizing: border-box;

    @media (max-width: 768px) {
        gap: 10px;
        padding: 10px;
    }
`;

export const CommentListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    box-sizing: border-box;
`;

export const CommentItemContainer = styled.div<{ $depth: number }>`
    width: 100%;
    box-sizing: border-box;
    padding-left: ${(props) => (props.$depth > 0 ? `${Math.min(props.$depth * 15, 45)}px` : '0')};
    border-left: ${(props) => (props.$depth > 0 ? '2px solid #f0f0f0' : 'none')};
    margin-bottom: 20px;

    @media (max-width: 768px) {
        padding-left: ${(props) => (props.$depth > 0 ? `${Math.min(props.$depth * 10, 30)}px` : '0')};
    }
`;

export const CommentHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
`;

export const CommentInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;

    .writer {
        font-weight: bold;
        font-size: 16px;
        color: #333;
    }

    .date {
        font-size: 13px;
        color: #999;
    }

    @media (max-width: 768px) {
        .writer {
            font-size: 14px;
        }

        .date {
            font-size: 11px;
        }
    }
`;

export const ActionGroup = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;

    button {
        padding: 6px 12px;
        font-size: 14px;
    }

    @media (max-width: 768px) {
        button {
            padding: 4px 10px;
            font-size: 12px;
        }
    }
`;

export const CommentContent = styled.div`
    margin-top: 10px;
    font-size: 16px;
    color: #444;
    line-height: 1.6;
    word-break: keep-all;
    overflow-wrap: break-word;

    @media (max-width: 768px) {
        font-size: 14px;
        line-height: 1.5;
        word-break: break-all;
    }
`;
export const ReplyInputBox = styled.div`
    margin-top: 12px;
    padding: 12px;
    background-color: #f8f9fa;
    border-radius: 8px;
    width: 100%;
    box-sizing: border-box;

    textarea {
        width: 100%;
        height: 60px;
        padding: 10px;
        border-radius: 4px;
        border: 1px solid #ddd;
        resize: none;
        box-sizing: border-box;
        font-size: 15px;
        line-height: 1.5;
    }

    .button-group {
        display: flex;
        justify-content: flex-end;
        gap: 8px;
        margin-top: 8px;
    }
`;

export const ChildrenWrapper = styled.div`
    margin-top: 15px;
`;
