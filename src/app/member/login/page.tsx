'use client';
import React, { ChangeEvent, useState } from 'react';
import Card from '../../../../components/atom/Card';
import { LoginFormWrapper, LoginLayoutMain, LoginLayoutWrapper, LoginTitle } from '../../../../styles/pages/member/Login';
import Input from '../../../../components/atom/Input';
import Button from '../../../../components/atom/Button';
import { useRouter } from 'next/navigation';
import { User, userStore } from '../../../../store/userStore';
import SocialLoginButtons from '../../../../components/molecules/SocialLoginButtons';
import { Post } from '../../../../service/crud';

const Page = () => {
    const router = useRouter();
    const [id, setId] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { setUserData } = userStore();

    const handleClickLogin = () => {
        const payload = { userId: id, password: password };
        Post(
            '/member/login',
            payload,
            (response) => {
                if (response.type == 'SUCCESS') {
                    const loginUser = response.result as User;
                    setUserData(loginUser);
                    router.push('/');
                } else {
                    alert('아이디 또는 비밀번호가 일치하지 않습니다.');
                }
            },
            false,
        );
    };

    const handleClickJoin = () => router.push('/member/join');
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleClickLogin();
    };

    return (
        <LoginLayoutWrapper>
            <LoginLayoutMain>
                <Card
                    isOpen={true}
                    style={{
                        padding: '30px 20px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'white',
                        borderRadius: '20px',
                        gap: '20px',
                        width: '100%',
                        height: 'auto',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    }}
                >
                    <LoginTitle>Login</LoginTitle>
                    <LoginFormWrapper>
                        <Input
                            type="text"
                            placeholder="아이디"
                            width="90%"
                            height="45px"
                            style={{ borderRadius: '10px' }}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setId(event.target.value.trim())}
                        />
                        <Input
                            type="password"
                            placeholder="비밀번호"
                            width="90%"
                            height="45px"
                            style={{ borderRadius: '10px' }}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value.trim())}
                            onKeyDown={handleKeyDown}
                        />
                        <div
                            style={{
                                width: '90%',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px',
                                marginTop: '10px',
                            }}
                        >
                            <Button
                                width="100%"
                                height="50px"
                                fontSize="16px"
                                backgroundColor="bisque"
                                border="none"
                                borderRadius="10px"
                                color="black"
                                onClick={handleClickLogin}
                            >
                                로그인
                            </Button>
                            <Button
                                width="100%"
                                height="50px"
                                fontSize="16px"
                                backgroundColor="bisque"
                                border="none"
                                borderRadius="10px"
                                color="black"
                                onClick={handleClickJoin}
                            >
                                회원가입
                            </Button>
                        </div>
                        <div style={{ width: '90%' }}>
                            <SocialLoginButtons />
                        </div>
                    </LoginFormWrapper>
                </Card>
            </LoginLayoutMain>
        </LoginLayoutWrapper>
    );
};
export default Page;
