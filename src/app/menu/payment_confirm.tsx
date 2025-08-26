import React from 'react';
import { Menu, Menu as MenuComponent } from '../../../types/Common';
import { MenuType } from '../../../enum/Menu';
import Button from '../../../components/atom/Button';

interface MenuProps {
    selectedMenu: Menu | undefined;
    setCurrentTab: React.Dispatch<React.SetStateAction<MenuType>>;
    setSelectedMenu: React.Dispatch<React.SetStateAction<MenuComponent | undefined>>;
}

const PaymentConfirm = ({ selectedMenu, setCurrentTab, setSelectedMenu }: MenuProps) => {
    const handleClickPrevious = () => {
        setCurrentTab(MenuType.DATE);
    };

    const handleClickNext = () => {
        alert('결제가 완료되었습니다!');
        setCurrentTab(MenuType.PAY_COMPLETE);
    };

    return (
        <div>
            <div>결제확인창</div>
            <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                <Button onClick={handleClickPrevious}>이전</Button>
                <Button onClick={handleClickNext}>결제</Button>
            </div>
        </div>
    );
};

export default PaymentConfirm;
