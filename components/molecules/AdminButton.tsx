import React from 'react';
import Button from '../atom/Button';
import { useRouter } from 'next/navigation';

const AdminButton = () => {
    const router = useRouter();
    const handleClickAdmin = () => {
        router.push('/admin');
    };
    return (
        <Button style={{ backgroundColor: '#FFFFFF' }} fontSize="15px" onClick={handleClickAdmin}>
            관리자 페이지
        </Button>
    );
};

export default AdminButton;
