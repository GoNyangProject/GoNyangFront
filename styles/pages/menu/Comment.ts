import styled from 'styled-components';

export const CommentInputWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
    width: 100%;
    padding: 15px;
`;

export const CommentListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: 100%;
    justify-content: center;
`;

export const CommentItemContainer = styled.div<{ $depth: number }>`
    margin-left: ${(props) => (props.$depth > 0 ? `${props.$depth * 20}px` : '0')};
    padding-left: ${(props) => (props.$depth > 0 ? '15px' : '0')};
    border-left: ${(props) => (props.$depth > 0 ? '2px solid #f0f0f0' : 'none')};
    margin-bottom: 20px;
`;

export const CommentHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const CommentInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;

    .writer {
        font-weight: bold;
        font-size: 14px;
    }

    .date {
        font-size: 12px;
        color: #999;
    }
`;

export const ActionGroup = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
`;

export const CommentContent = styled.div`
    margin-top: 8px;
    font-size: 15px;
    color: #333;
    line-height: 1.5;
`;

// 대댓글 입력 박스
export const ReplyInputBox = styled.div`
    margin-top: 12px;
    padding: 12px;
    background-color: #f8f9fa;
    border-radius: 8px;

    textarea {
        width: 100%;
        height: 60px;
        padding: 10px;
        border-radius: 4px;
        border: 1px solid #ddd;
        resize: none;
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
