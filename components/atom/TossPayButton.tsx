'use client';

import React from 'react';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import Button from './Button';
import { PaymentsType } from '../../enum/PaymentsType';

type TossPayRequest =
    | { method: PaymentsType.CARD; options: BasePaymentOptions }
    | { method: PaymentsType.VIRTUAL_ACCOUNT; options: VirtualAccountPaymentOptions }
    | { method: PaymentsType.TRANSFER; options: BasePaymentOptions };

interface BasePaymentOptions {
    amount: number; //가격
    orderId: string; //주문번호
    orderName: string; //상품이름
    customerName: string; //주문자
    successUrl: string; //성공시 이동할 url
    failUrl: string; //실패시 이동할 url
}

interface VirtualAccountPaymentOptions extends BasePaymentOptions {
    validHours?: number;
    cashReceipt?: {
        type: '소득공제' | '지출증빙';
    };
}

const TossPayButton = ({ method, options }: TossPayRequest) => {
    const handleClick = async () => {
        try {
            const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY!;
            const tossPayments = await loadTossPayments(clientKey);

            await tossPayments.requestPayment(method, options);
        } catch (err) {
            console.error(err);
        }
    };

    return <Button onClick={handleClick}>결제하기</Button>;
};

export default TossPayButton;
