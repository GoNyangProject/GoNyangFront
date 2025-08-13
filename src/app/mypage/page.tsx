'use client';
import React, { useEffect } from 'react';
import { userStore } from '../../../store/userStore';

const Page = () => {
    const { userData } = userStore();
    useEffect(() => {
        console.log(userData);
    }, [userData]);
    return <div>{userData.userId}</div>;
};

export default Page;
