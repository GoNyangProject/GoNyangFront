'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Post } from '../../../service/crud';
import {
    ButtonContainer,
    CompleteWrapper,
    ContentCard,
    IconWrapper,
    InfoItem,
    InfoLabel,
    InfoListWrapper,
    InfoValue,
    MainButton,
    SubButton,
    SuccessHeader,
    Title,
} from '../../../styles/pages/Payments';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import { userStore } from '../../../store/userStore';

interface PaymentResult {
    amount: number;
    approvedAt: string;
    method: string;
    orderName: string;
    status: string;
    menuId: number;
    bookDate: Date;
}

interface PaymentResponse {
    type: string;
    message: string;
    result: PaymentResult;
}

const Payments = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [payment, setPayment] = useState<PaymentResult | null>(null);
    const { userData } = userStore();

    useEffect(() => {
        if (userData?.memberId) {
            const orderId = searchParams.get('orderId');
            const paymentKey = searchParams.get('paymentKey');
            const amount = searchParams.get('amount');
            const customerName = searchParams.get('customerName');
            const orderName = searchParams.get('orderName');
            const method = searchParams.get('method');
            const menuId = searchParams.get('menuId');
            const bookDate = searchParams.get('bookDate');

            if (!orderId || !paymentKey || !amount || !customerName || !orderName || !method) {
                setError('결제 정보가 누락되었습니다.');
                setLoading(false);
                return;
            }

            const payload = { orderId, paymentKey, amount, customerName, orderName, method };

            Post(
                '/payments',
                payload,
                (response: PaymentResponse) => {
                    if (response.type === 'SUCCESS' && response.result) {
                        setPayment(response.result);
                    } else {
                        setError('결제 등록에 실패했습니다.');
                    }
                    setLoading(false);
                },
                false,
            );

            const bookPayload = {
                orderId: orderId,
                menuId: menuId,
                price: amount,
                memberId: userData.memberId,
                bookDate: bookDate,
            };
            Post('/book', bookPayload, (response) => {}, false);
        }
    }, [searchParams, userData]);

    if (loading) return <h1>결제 처리 중...</h1>;
    if (error) return <h1>결제 처리 실패: {error}</h1>;

    const handleClickHome = () => {
        router.push('/');
    };
    const handleClickMyPage = () => {
        router.push('/mypage/book');
    };

    return (
        <CompleteWrapper>
            <ContentCard>
                {payment?.status === 'SUCCESS' && (
                    <>
                        <SuccessHeader>
                            <IconWrapper>
                                <FontAwesomeIcon
                                    icon={faCalendarCheck}
                                    // 아이콘 자체의 크기는 IconWrapper에서 조절하므로 여기서 style은 제거합니다.
                                />
                            </IconWrapper>
                            <Title>예약 및 결제 완료 🎉</Title>
                            <p style={{ color: '#888', fontSize: '15px' }}>성공적으로 결제가 처리되었습니다.</p>
                        </SuccessHeader>
                        <InfoListWrapper>
                            <InfoItem>
                                <InfoLabel>결제 상품</InfoLabel>
                                <InfoValue>{payment.orderName}</InfoValue>
                            </InfoItem>
                            <InfoItem>
                                <InfoLabel>결제 일시</InfoLabel>
                                <InfoValue>{new Date(payment.approvedAt).toLocaleString('ko-KR')}</InfoValue>
                            </InfoItem>

                            {/* 총 결제 금액을 강조 */}
                            <InfoItem>
                                <InfoLabel style={{ fontWeight: 700 }}>총 결제 금액</InfoLabel>
                                <InfoValue $isPrice>{payment.amount.toLocaleString()}원</InfoValue>
                            </InfoItem>
                        </InfoListWrapper>
                    </>
                )}
                {payment?.status === 'EXIST' && (
                    <SuccessHeader>
                        <IconWrapper>
                            <FontAwesomeIcon icon={faCalendarCheck} />
                        </IconWrapper>
                        <Title>이미 처리된 결제입니다.</Title>
                    </SuccessHeader>
                )}

                {!payment && <p style={{ color: 'red', marginTop: '20px' }}>결제 정보가 없습니다. 관리자에게 문의하세요.</p>}

                <ButtonContainer>
                    <MainButton onClick={handleClickMyPage}>예약/결제 내역 확인</MainButton>
                    <SubButton onClick={handleClickHome}>메인 페이지로 이동</SubButton>
                </ButtonContainer>
            </ContentCard>
        </CompleteWrapper>
    );
};

export default Payments;
