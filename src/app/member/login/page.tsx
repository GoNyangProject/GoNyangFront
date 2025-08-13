'use client';
import React, { ChangeEvent, useState } from 'react';
import Card from '../../../../components/atom/Card';
import { LoginFormWrapper, LoginLayoutMain, LoginLayoutWrapper, LoginTitle } from '../../../../styles/pages/member/Login';
import Input from '../../../../components/atom/Input';
import Button from '../../../../components/atom/Button';
import { Post } from '../../../../service/crud';
import { useRouter } from 'next/navigation';
import { ButtonWrapper } from '../../../../styles/components/atom/Header';
import { User, userStore } from '../../../../store/userStore';

const Page = () => {
    const router = useRouter();

    const [id, setId] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { setUserData } = userStore();

    const handleClickLogin = () => {
        const payload = {
            userId: id,
            password: password,
        };
        Post(
            '/member/login',
            payload,
            (response) => {
                if (response.errorCode == '0000') {
                    const userData: User = response.result as User;
                    setUserData(userData);
                    router.push('/');
                } else {
                    alert('아이디 또는 비밀번호가 일치하지 않습니다.');
                    router.push('/member/login');
                }
            },
            false,
        );
    };

    const handleClickJoin = () => {
        router.push('/member/join');
    };

    return (
        <LoginLayoutWrapper>
            <LoginLayoutMain>
                <Card
                    isOpen={true}
                    style={{
                        padding: '20px 30px',
                        display: 'flex',
                        flexDirection: 'column',
                        overflowY: 'auto',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'white',
                        borderRadius: '20px',
                        gap: '20px',
                    }}
                >
                    <LoginTitle>Login</LoginTitle>
                    <LoginFormWrapper>
                        <Input
                            type="text"
                            placeholder="아이디"
                            width="260px"
                            height="38px"
                            style={{ borderRadius: '10px' }}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setId(event.target.value.trim())}
                        />
                        <Input
                            type="password"
                            placeholder="비밀번호"
                            width="260px"
                            height="38px"
                            style={{ borderRadius: '10px' }}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value.trim())}
                        />
                        <ButtonWrapper>
                            <Button
                                width="100%"
                                height="52px"
                                fontSize="18px"
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
                                height="52px"
                                fontSize="18px"
                                backgroundColor="bisque"
                                border="none"
                                borderRadius="10px"
                                color="black"
                                onClick={handleClickJoin}
                            >
                                회원가입
                            </Button>
                        </ButtonWrapper>
                    </LoginFormWrapper>
                </Card>
            </LoginLayoutMain>
        </LoginLayoutWrapper>
    );
};

export default Page;
