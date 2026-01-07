import React from 'react';
import { AdminMemberList } from '../../../types/Common';

type MemoCellProps = {
    rowData: AdminMemberList;
    onOpenModal: (data: AdminMemberList) => void;
};
const MemoCell = ({ rowData, onOpenModal }: MemoCellProps) => {
    const hasMemo = !!rowData.memo && rowData.memo.trim() !== '';

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* 💡 메모가 있으면 '메모보기' 문구와 아이콘 표시 */}
            {hasMemo ? (
                <div
                    onClick={(e) => {
                        e.stopPropagation();
                        onOpenModal(rowData);
                    }}
                    style={{
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        color: '#3E66FB', // 포인트 컬러 사용
                        fontWeight: '500',
                    }}
                >
                    <span style={{ fontSize: '14px', textDecoration: 'underline' }}>메모보기</span>
                    <span style={{ fontSize: '14px' }}>📝</span>
                </div>
            ) : (
                /* 💡 메모가 없으면 기존처럼 '메모 없음' 유지 */
                <div
                    onClick={(e) => {
                        e.stopPropagation();
                        onOpenModal(rowData);
                    }}
                    style={{
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        color: '#ccc',
                    }}
                >
                    <span style={{ fontSize: '14px' }}>메모 없음</span>
                    <span style={{ fontSize: '14px', opacity: 0.5 }}>📝</span>
                </div>
            )}
        </div>
    );
};

export default MemoCell;
