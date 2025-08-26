import React, { useEffect } from 'react';
import { Menu, Menu as MenuComponent } from '../../../types/Common';
import { MenuType } from '../../../enum/Menu';
import Button from '../../../components/atom/Button';

interface MenuProps {
    setCurrentTab: React.Dispatch<React.SetStateAction<MenuType>>;
    selectedMenu: Menu | undefined;
    setSelectedMenu: React.Dispatch<React.SetStateAction<MenuComponent | undefined>>;
}

const Date = ({ selectedMenu, setCurrentTab }: MenuProps) => {
    useEffect(() => {
        console.log(selectedMenu);
    }, [selectedMenu]);

    const handleClickPrevious = () => {
        setCurrentTab(MenuType.MENU);
    };

    const handleClickNext = () => {
        setCurrentTab(MenuType.PAY_CONFIRM);
    };

    return (
        <div>
            <div>날짜선택창</div>
            <div>시술명 : {selectedMenu?.menuName}</div>
            <div>시술내용 : {selectedMenu?.content}</div>
            <div>예약횟수 : {selectedMenu?.bookCount}</div>
            <div>가격 : {selectedMenu?.price}</div>
            <div>평점 : {selectedMenu?.score}</div>
            <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                <Button onClick={handleClickPrevious}>이전</Button>
                <Button onClick={handleClickNext}>다음</Button>
            </div>
        </div>
    );
};

export default Date;
