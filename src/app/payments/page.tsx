'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Post } from '../../../service/crud';

interface PaymentResult {
    amount: number;
    approvedAt: string;
    method: string;
    orderName: string;
    status: string;
}

interface PaymentResponse {
    type: string;
    message: string;
    result: PaymentResult;
}

const Page = () => {
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [payment, setPayment] = useState<PaymentResult | null>(null);

    useEffect(() => {
        const orderId = searchParams.get('orderId');
        const paymentKey = searchParams.get('paymentKey');
        const amount = searchParams.get('amount');
        const customerName = searchParams.get('customerName');
        const orderName = searchParams.get('orderName');
        const method = searchParams.get('method');

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
    }, [searchParams]);

    if (loading) return <h1>결제 처리 중...</h1>;
    if (error) return <h1>결제 처리 실패: {error}</h1>;

    return (
        <div>
            <h1>결제 성공!!!!!!</h1>
            {payment && (
                <>
                    <p>결제 일시 : {new Date(payment.approvedAt).toLocaleString()}</p>
                    <p>결제 상품 : {payment.orderName}</p>
                    <p>결제 가격 : {payment.amount}원</p>
                    <p>결제 방식 : {payment.method}</p>
                    <p>결제 상태 : {payment.status}</p>
                </>
            )}
        </div>
    );
};

export default Page;
