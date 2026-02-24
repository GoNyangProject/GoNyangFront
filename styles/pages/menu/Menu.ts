import styled from 'styled-components';

export const MenuWrapper = styled.div`
    display: flex;
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;

    border-radius: 5px;
    flex-direction: column;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 30px;
    gap: 15px;
    background-color: #fff;

    @media (max-width: 768px) {
        width: 100%;
        max-width: none;
        padding: 15px;
    }
`;

export const MenuMainWrapper = styled.div`
    display: flex;
    width: 100%;
    height: 140px;
    flex-direction: row;
    border: 1px solid bisque;
    padding: 20px;
    border-radius: 12px;
    gap: 30px;
    align-items: center;
    background-color: white;
    transition: transform 0.2s;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }

    @media (max-width: 768px) {
        flex-direction: column;
        height: auto;
        align-items: center;
        text-align: center;
        gap: 15px;
        padding: 20px;
    }
`;

export const MenuTitle = styled.div`
    width: 100%;
    font-weight: 500;
    font-size: 2rem;
    text-align: center;
`;

export const MenuImg = styled.div<{ image: number }>`
    background: url(${(props) => `/images/menu/${props.image}.png`}) no-repeat center center;
    background-size: cover;
    width: 90px;
    height: 90px;
    border-radius: 10px;
    flex-shrink: 0;

    @media (max-width: 768px) {
        width: 120px;
        height: 120px;
    }
`;

export const MenuName = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: 1.25rem;
    font-weight: bold;
    color: #333;
`;
export const MenuContent = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    color: #666;
    font-size: 0.9rem;
    line-height: 1.4;

    @media (max-width: 768px) {
        white-space: normal;
        text-overflow: clip;
        overflow: visible;
        margin-top: 5px;
    }
`;

export const ButtonWrapper = styled.div`
    flex-shrink: 0;

    @media (max-width: 768px) {
        width: 100%;
        button {
            width: 100%;
            height: 45px;
        }
    }
`;
export const DateWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 20px;
`;

export const ServiceCard = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    padding: 24px;
    border: 1px solid bisque;
    width: 100%;

    @media (max-width: 768px) {
        padding: 15px;
        border-radius: 12px;
    }
`;

export const ServiceName = styled.h2`
    font-size: 28px;
    font-weight: 700;
    color: #333;
    margin-bottom: 8px;

    @media (max-width: 768px) {
        font-size: 20px;
    }
`;

export const ServiceDescription = styled.p`
    font-size: 16px;
    color: #666;
    margin-bottom: 20px;

    @media (max-width: 768px) {
        font-size: 14px;
        margin-bottom: 15px;
    }
`;

export const DetailsRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const Rating = styled.div`
    display: flex;
    align-items: center;
    font-size: 16px;
    color: #f7b731;
`;

export const Price = styled.div`
    font-size: 24px;
    font-weight: 600;
    color: #333333;
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 12px;
    margin-top: 20px;

    @media (max-width: 768px) {
        position: sticky;
        bottom: 20px;
        background: white;
        padding-top: 10px;
    }
`;

export const PreviousButton = styled.button`
    flex: 1;
    padding: 12px;
    border: 1px solid #ccc;
    background-color: #fff;
    color: #333;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    transition: background-color 0.2s;

    &:hover {
        background-color: #f0f0f0;
    }
`;

export const NextButton = styled.button`
    flex: 1;
    padding: 12px;
    border: none;
    background-color: bisque;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    transition: background-color 0.2s;

    &:hover {
        background-color: bisque;
    }
`;

export const MenuInfoBox = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;

    @media (max-width: 768px) {
        width: 100%;
    }
`;
export const DialogContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 10px;
    gap: 20px;
`;

export const TimeSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    width: 100%;
`;

export const TimeTitle = styled.div`
    font-size: 18px;
    font-weight: 600;
    color: #504538;
`;

export const TimeGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    width: 100%;
`;

export const TimeButton = styled.button<{ $isSelected: boolean; $isBooked?: any }>`
    padding: 12px 18px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 15px;
    font-weight: 500;
    transition: all 0.2s;

    background-color: ${(props) => (props.$isSelected ? '#D2B48C' : props.$isBooked ? '#eee' : 'bisque')};
    color: ${(props) => (props.$isBooked ? '#aaa' : '#333')};
    pointer-events: ${(props) => (props.$isBooked ? 'none' : 'auto')};

    &:hover {
        background-color: ${(props) => !props.$isBooked && '#f5d6b5'};
    }

    @media (max-width: 768px) {
        flex: 1 1 calc(45% - 10px);
        height: 50px;
    }
`;
