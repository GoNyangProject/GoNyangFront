import styled from 'styled-components';

export const HeaderButton = styled.button`
    padding: 8px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background: #a68967;
    color: white;
    font-size: 15px;
    transition: all 0.2s;

    &:hover {
        opacity: 0.5;
    }
`;

export const HeaderNavWrapper = styled.nav`
    display: flex;
    gap: 12px;

    .emoji {
        display: none;
    }
`;

export const HeaderLoginWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    background: transparent;
    border: none;
    cursor: pointer;
    gap: 6px;
`;

export const HeaderWrapper = styled.div`
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    display: flex;
    justify-content: center;
    background-color: #a68967;
    color: black;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

export const HeaderMainWrapper = styled.header`
    width: 60%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    height: 100px;

    @media (max-width: 1024px) {
        width: 90%;
    }
    @media (max-width: 768px) {
        width: 100%;
        height: 70px;
    }
`;

export const HeaderLogo = styled.div`
    cursor: pointer;
    height: 100%;
    width: 200px;
    background: url('/images/logo.png') no-repeat center center;
    background-size: contain;
    @media (max-width: 768px) {
        width: 120px;
    }
`;

export const UserWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 2vw;

    @media (max-width: 768px) {
        display: none;
    }
`;

export const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 10px;
`;

export const MypageWrapper = styled.div``;

export const Hamburger = styled.div`
    display: none;
    flex-direction: column;
    gap: 5px;
    cursor: pointer;
    padding: 10px;

    span {
        width: 25px;
        height: 3px;
        background-color: white;
        border-radius: 2px;
    }

    @media (max-width: 768px) {
        display: flex;
    }
`;

export const SideMenu = styled.div<{ $isOpen: boolean }>`
    position: fixed;
    top: 0;
    right: ${({ $isOpen }) => ($isOpen ? '0' : '-280px')};
    width: 280px;
    height: 100%;
    background-color: white;
    z-index: 2000;
    padding: 20px;
    transition: right 0.3s ease-in-out;
    display: flex;
    flex-direction: column;
    gap: 20px;

    .close-btn {
        text-align: right;
        font-size: 24px;
        cursor: pointer;
        color: #a68967;
    }
`;

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1500;
`;

export const SideNavWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 20px;

    .user-actions {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding-bottom: 25px;
        border-bottom: 1px solid #eee;
        margin-bottom: 30px;
        margin-top: 10px;

        button {
            width: 100%;
            padding: 14px;
            border-radius: 12px;
            font-size: 16px;
            font-weight: 600;
            background: white;
            color: #a68967;
            border: 2px solid #a68967;
            box-shadow: 0 2px 8px rgba(166, 137, 103, 0.1);
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;

            &:active {
                background: #fdfaf7;
            }
        }
    }
    .main-nav {
        nav {
            display: flex;
            flex-direction: column;
            gap: 25px;

            button {
                background: none;
                border: none;
                padding: 0;
                font-size: 18px;
                font-weight: 500;
                display: flex;
                align-items: center;
                color: #444;
                cursor: pointer;

                .emoji {
                    display: inline-block !important;
                    margin-right: 12px;
                    font-size: 20px;
                }
            }
        }
    }
`;
