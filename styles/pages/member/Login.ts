import styled from 'styled-components';

export const LoginLayoutWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    background: url('/images/login_background.png') no-repeat center center;
    background-size: cover;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    flex-direction: row;

    @media (max-width: 768px) {
        background-position: 94% 100%;
        background-size: 400%;
    }
`;

export const LoginLayoutMain = styled.div`
    width: 400px;
    height: auto;
    max-width: 90vw;

    @media (max-width: 768px) {
        width: 90%;
    }
`;

export const LoginTitle = styled.div`
    color: black;
    font-size: 30px;
    border: 1px solid bisque;
    display: flex;
    padding: 10px 20px;
    border-radius: 15px;
    background-color: bisque;
    margin-top: 20px;
`;

export const LoginFormWrapper = styled.div`
    display: flex;
    width: 100%;
    border: 3px solid bisque;
    border-radius: 15px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
    padding: 20px 10px;
    margin-bottom: 10px;
`;