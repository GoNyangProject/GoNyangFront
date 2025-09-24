import styled from 'styled-components';

export const PaymentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px;
    background-color: #f9f9f9;
    min-height: 100vh;
`;

export const Card = styled.div`
    width: 100%;
    max-width: 700px;
    padding: 30px;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 25px;
`;

export const Title = styled.h2`
    font-size: 24px;
    font-weight: bold;
    color: #333;
    text-align: center;
    margin-bottom: 10px;
`;

export const InfoItem = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #eee;
    font-size: 16px;
    color: #555;
`;

export const InfoLabel = styled.div`
    font-weight: 600;
    color: #333;
`;

export const PriceItem = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 15px 0;
    border-top: 2px solid #ddd;
    font-size: 20px;
    font-weight: bold;
    color: #333;
`;
