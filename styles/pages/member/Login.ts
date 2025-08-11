import styled from 'styled-components';

export const LoginLayoutWrapper = styled.div`
    width: 100vw;
    height: calc(100vh - 70px);
    display: flex;
    //background-color: bisque;
    background: url('/images/login_background.png') no-repeat center center;
    background-size: cover;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    flex-direction: row;
`;

export const LoginLayoutMain = styled.div`
    width: 20vw;
    height: 50%;
`;

export const LoginTitle = styled.div`
    color: black;
    font-size: 30px;
    border: 1px solid bisque;
    display: flex;
    padding: 10px 20px;
    border-radius: 15px;
    background-color: bisque;
`;

export const LoginFormWrapper = styled.div`
    display: flex;
    border: 3px solid bisque;
    border-radius: 15px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    padding: 10px;
`;
