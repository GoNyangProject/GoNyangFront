import React, { CSSProperties, JSX, ReactNode } from 'react';
import { CardWrapper } from '../../styles/components/atom/Card';

type CardProps = {
    isOpen?: boolean;
    children: ReactNode;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    style?: CSSProperties;
};

const Card = ({ children, style, isOpen = true, onClick }: CardProps): JSX.Element => {
    return (
        <CardWrapper style={style} onClick={onClick} $isOpen={isOpen}>
            {children}
        </CardWrapper>
    );
};

export default Card;
