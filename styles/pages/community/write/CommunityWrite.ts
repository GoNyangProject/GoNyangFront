import styled from 'styled-components';

export const Container = styled.div`
    max-width: 900px;
    margin: 40px auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const TitleInput = styled.input`
    padding: 15px;
    font-size: 20px;
    border: none;
    border-bottom: 2px solid #eee;
    outline: none;

    &:focus {
        border-bottom: 2px solid #6d4c41;
    }
`;

export const SubmitButton = styled.button`
    align-self: flex-end;
    padding: 12px 30px;
    background-color: #6d4c41;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;

    &:hover {
        background-color: #5d3e35;
    }
`;

export const EditorWrapper = styled.div`
    width: 100%;
    border: 1px solid #e1e1e1;
    border-radius: 8px;
    overflow: hidden;
    background-color: #fff;

    .toolbar {
        padding: 8px;
        border-bottom: 1px solid #e1e1e1;
        background-color: #f9f9f9;
        display: flex;
        gap: 4px;

        button {
            padding: 4px 10px;
            border-radius: 4px;
            border: 1px solid #ddd;
            background: #fff;
            cursor: pointer;

            &:hover {
                background: #f0f0f0;
            }

            &.is-active {
                background: #6d4c41;
                color: #fff;
            }
        }
    }

    .tiptap {
        a {
            color: #007bff !important; /* 파란색 */
            text-decoration: underline !important; /* 밑줄 */
            font-weight: 500;
            cursor: pointer;

            &:hover {
                color: #0056b3; /* 마우스 올리면 더 진한 파란색 */
            }
        }

        padding: 20px;
        min-height: 500px;
        outline: none;

        /* --- 🖼️ 이미지 스타일링 시작 --- */

        img.uploaded-image {
            max-width: 100%; /* 부모 너비를 절대 넘지 않음 */
            height: auto; /* 비율 유지 */
            display: block; /* 다음 줄로 넘기기 */
            margin: 20px auto; /* 상하 간격 및 가로 중앙 정렬 */
            border-radius: 12px; /* 좀 더 부드러운 곡선 */
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05); /* 은은한 그림자 */
        }

        /* --------------------------- */

        p.is-editor-empty:first-child::before {
            content: attr(data-placeholder);
            float: left;
            color: #adb5bd;
            pointer-events: none;
            height: 0;
        }
    }
`;

export const FilterSection = styled.div`
    display: flex;
    justify-content: flex-start;
    /* 만약 드롭다운 너비가 너무 넓다면 여기서 조절 가능합니다 */
    width: 200px;
`;
