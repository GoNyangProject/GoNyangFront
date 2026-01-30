import React from 'react';
import { ButtonWrapper, MenuContent, MenuImg, MenuMainWrapper, MenuName, MenuTitle, MenuWrapper } from '../../../styles/pages/menu/Menu';
import Button from '../../../components/atom/Button';
import { Menu as MenuComponent } from '../../../types/Common';
import { MenuType } from '../../../enum/Menu';
import { userStore } from '../../../store/userStore';
import { useRouter } from 'next/navigation';

interface MenuProps {
    data: MenuComponent[];
    setCurrentTab: React.Dispatch<React.SetStateAction<MenuType>>;
    setSelectedMenu: React.Dispatch<React.SetStateAction<MenuComponent | undefined>>;
}

const Menu = ({ data, setCurrentTab, setSelectedMenu }: MenuProps) => {
    const router = useRouter();
    const { userData } = userStore();
    const handleClickBook = (id: number) => {
        if (userData != null) {
            const menu = data.find((menu) => menu.id === id);
            if (menu) {
                setSelectedMenu(menu);
                setCurrentTab(MenuType.DATE);
            }
        } else {
            alert('로그인 후 예약가능합니다.');
            router.push('/member/login');
            return;
        }
    };

    return (
        <MenuWrapper>
            <MenuTitle>† 오늘의 뽀송 메뉴 ♤</MenuTitle>
            {data?.map((menu: MenuComponent, index: number) => (
                <MenuMainWrapper key={index}>
                    <MenuImg image={menu.id} />
                    <div style={{ width: '80%' }}>
                        <MenuName>{menu.menuName}</MenuName>
                        <MenuContent>{menu.content}</MenuContent>
                    </div>
                    <ButtonWrapper>
                        <Button style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }} onClick={() => handleClickBook(menu.id)}>
                            예약하기
                        </Button>
                    </ButtonWrapper>
                </MenuMainWrapper>
            ))}
        </MenuWrapper>
    );
};

export default Menu;
