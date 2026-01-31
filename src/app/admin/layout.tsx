'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // 경로에 맞게 수정
import { userStore } from '../../../store/userStore';
import axiosInstance from '../../../libs/axios';
import useSWR from 'swr';
import {
    AdminLayoutWrapper,
    AdminLogo,
    Icon,
    MainContent,
    ReturnToUserHome,
    Sidebar,
    SidebarLink,
} from '../../../styles/components/molecules/Header/AdminHeader';
import { getCookie } from '@/utils/cookie';

const fetcher = (payload: Request) => axiosInstance.post('/api/backend', payload).then((res) => res.data.result);
export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { userData, reset } = userStore();
    const [isClient, setIsClient] = useState(false); // Hydration 이슈 방지

    const token = getCookie('accessToken');
    const { data: user_data, error } = useSWR(
        token
            ? {
                  url: `/auth/me`,
                  method: 'GET',
              }
            : null,
        fetcher,
        { revalidateOnFocus: false },
    );

    useEffect(() => {
        setIsClient(true); // 클라이언트 측에서 마운트되었음을 표시
    }, []);

    useEffect(() => {
        if (!isClient) return; // 클라이언트 측에서만 동작
        const isLocalAdmin = userData?.userType === 'ROLE_ADMIN';
        const isServerAdmin = user_data?.role === 'ROLE_ADMIN';
        if (!isLocalAdmin || !isServerAdmin || error) {
            alert('관리자 권한이 필요합니다.');
            reset();
            router.replace('/member/login');
        }
    }, [userData, router, reset, isClient]);

    if (!isClient || (!user_data && token)) {
        return <div style={{ backgroundColor: '#f4f4f4', height: '100vh' }}>권한 확인 중...</div>;
    }
    return (
        <AdminLayoutWrapper>
            <Sidebar>
                <AdminLogo>관리자 대시보드</AdminLogo>
                <nav>
                    <SidebarLink onClick={() => router.push('/admin')}>
                        <Icon /> 대시보드
                    </SidebarLink>
                    <SidebarLink onClick={() => router.push('/admin/users')}>
                        <Icon /> 회원 관리
                    </SidebarLink>
                    <SidebarLink onClick={() => router.push('/admin/reservation')}>
                        <Icon /> 예약 관리
                    </SidebarLink>
                    <SidebarLink onClick={() => router.push('/admin/inquiry')}>
                        <Icon /> 문의 관리
                    </SidebarLink>
                    <SidebarLink onClick={() => router.push('/admin/community')}>
                        <Icon /> 커뮤니티 관리
                    </SidebarLink>
                </nav>
                <ReturnToUserHome onClick={() => router.push('/')}>
                    <Icon /> 사용자 홈으로 돌아가기
                </ReturnToUserHome>
            </Sidebar>
            <MainContent>{children}</MainContent>
        </AdminLayoutWrapper>
    );
}
