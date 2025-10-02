import React from 'react';
import { BookInfo } from '../../../types/Common';
import { MenuType } from '../../../enum/Menu';
import { Card, InfoItem, InfoLabel, PaymentWrapper, PriceItem, Title } from '../../../styles/pages/menu/Payment';
import { ButtonContainer, PreviousButton } from '../../../styles/pages/menu/Menu';
import { PaymentsType } from '../../../enum/PaymentsType';
import TossPayButton from '../../../components/atom/TossPayButton';

interface MenuProps {
    setCurrentTab: React.Dispatch<React.SetStateAction<MenuType>>;
    bookInfo: BookInfo | undefined;
}

const PaymentConfirm = ({ bookInfo, setCurrentTab }: MenuProps) => {
    const handleClickPrevious = () => {
        setCurrentTab(MenuType.DATE);
    };

    return (
        <PaymentWrapper>
            <Card>
                <Title>예약 확인 및 결제</Title>
                <div>
                    <InfoItem>
                        <InfoLabel>예약자명</InfoLabel>
                        <div>{bookInfo?.userData.username}</div>
                    </InfoItem>
                    <InfoItem>
                        <InfoLabel>예약 시간</InfoLabel>
                        <div>{bookInfo?.bookTime}</div>
                    </InfoItem>
                    <InfoItem>
                        <InfoLabel>시술명</InfoLabel>
                        <div>{bookInfo?.menu.menuName}</div>
                    </InfoItem>
                    <InfoItem style={{ flexDirection: 'column' }}>
                        <InfoLabel>내용</InfoLabel>
                        <div>{bookInfo?.menu.content}</div>
                    </InfoItem>
                </div>

                <PriceItem>
                    <InfoLabel>총 결제 금액</InfoLabel>
                    <div>{bookInfo?.menu.price.toLocaleString()}</div>
                </PriceItem>

                <ButtonContainer>
                    <PreviousButton onClick={handleClickPrevious}>이전</PreviousButton>
                    <TossPayButton
                        method={PaymentsType.CARD}
                        options={{
                            amount: bookInfo!.menu.price,
                            orderId: 'order_' + new Date().getTime(),
                            orderName: bookInfo!.menu.menuName,
                            customerName: bookInfo!.userData.username,
                            successUrl: `${window.location.origin}/payments?orderName=${encodeURIComponent(bookInfo!.menu.menuName)}&customerName=${encodeURIComponent(bookInfo!.userData.username)}&method=${PaymentsType.CARD}`,
                            failUrl: `${window.location.origin}/payment/fail`,
                        }}
                    />
                </ButtonContainer>
            </Card>
        </PaymentWrapper>
    );
};

export default PaymentConfirm;
