import React from 'react';
import { MenuType } from '../../../enum/Menu';
import Button from '../../../components/atom/Button';

interface MenuProps {
    setCurrentTab: React.Dispatch<React.SetStateAction<MenuType>>;
}

const PaymentComplete = ({ setCurrentTab }: MenuProps) => {
    const handleClickHome = () => {
        setCurrentTab(MenuType.MENU);
    };

    return (
        <div>
            <div>결제완료</div>
            <div>
                <Button onClick={handleClickHome}>처음으로</Button>
            </div>
        </div>
    );
};

export default PaymentComplete;
