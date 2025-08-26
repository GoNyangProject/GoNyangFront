import React from 'react';
import { MenuContent, MenuMainWrapper, MenuTitle, MenuWrapper } from '../../../styles/pages/menu/Menu';
import Button from '../../../components/atom/Button';
import { Menu as MenuComponent } from '../../../types/Common';
import { MenuType } from '../../../enum/Menu';

interface MenuProps {
    data: MenuComponent[];
    setCurrentTab: React.Dispatch<React.SetStateAction<MenuType>>;
    setSelectedMenu: React.Dispatch<React.SetStateAction<MenuComponent | undefined>>;
}

const Menu = ({ data, setCurrentTab, setSelectedMenu }: MenuProps) => {
    const handleClickBook = (id: number) => {
        const menu = data.find((menu) => menu.id === id);
        if (menu) {
            setSelectedMenu(menu);
            setCurrentTab(MenuType.DATE);
        }
    };

    return (
        <MenuWrapper>
            {data?.map((menu: MenuComponent, index: number) => (
                <MenuMainWrapper key={index}>
                    <MenuTitle>{menu.menuName}</MenuTitle>
                    <MenuContent>{menu.content}</MenuContent>
                    <Button onClick={() => handleClickBook(menu.id)}>예약하기</Button>
                </MenuMainWrapper>
            ))}
        </MenuWrapper>
    );
};

export default Menu;
