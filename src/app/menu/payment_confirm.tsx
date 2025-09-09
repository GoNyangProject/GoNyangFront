import React from 'react';
import { BookInfo } from '../../../types/Common';
import { MenuType } from '../../../enum/Menu';
import Button from '../../../components/atom/Button';

interface MenuProps {
    setCurrentTab: React.Dispatch<React.SetStateAction<MenuType>>;
    bookInfo: BookInfo | undefined;
}

const PaymentConfirm = ({ bookInfo, setCurrentTab }: MenuProps) => {
    const handleClickPrevious = () => {
        setCurrentTab(MenuType.DATE);
    };

    const handleClickNext = () => {
        alert('결제가 완료되었습니다!');
        setCurrentTab(MenuType.PAY_COMPLETE);
    };

    return (
        <div style={{ padding: '20px', gap: '200px' }}>
            <div>결제확인창</div>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <div>예약자명 : {bookInfo?.userData.username}</div>
                <div>예약 시간 : {bookInfo?.bookTime}</div>
                <div>시술명 : {bookInfo?.menu.menuName}</div>
                <div>내용 : {bookInfo?.menu.content}</div>
                <div>가격 : {bookInfo?.menu.price}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Button onClick={handleClickPrevious}>이전</Button>
                    <Button onClick={handleClickNext}>결제</Button>
                </div>
            </div>
        </div>
    );
};

export default PaymentConfirm;
