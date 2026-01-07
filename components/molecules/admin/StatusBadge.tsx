import React from 'react';
import { AdminMemberList } from '../../../types/Common';
import Button from '../../atom/Button';

type StatusBadgeProps = {
    rowData: AdminMemberList;
    onStatusChange: (data: AdminMemberList) => void;
};
const StatusBadge = ({ rowData, onStatusChange }: StatusBadgeProps) => {
    const isNormal = rowData.status === 'NORMAL';
    return (
        <Button
            width="60px"
            height="30px"
            backgroundColor={isNormal ? '#f6ffed' : '#fff1f0'}
            style={{
                color: isNormal ? '#52c41a' : '#ff4d4f',
                border: `1px solid ${isNormal ? '#b7eb8f' : '#ffa39e'}`,
                fontSize: '12px',
                cursor: 'pointer',
            }}
            onClick={(e) => {
                e.stopPropagation();
                onStatusChange(rowData);
            }}
        >
            {isNormal ? '정상' : '이용정지'}
        </Button>
    );
};

export default StatusBadge;
