import styled from 'styled-components';
import Image from 'next/image';

type ImageViewerProps = {
    $width?: number;
    $height?: number;
    $borderRadius?: string;
};

export const ImageViewerWrapper = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
`;
export const ImageViewer = styled(Image)<ImageViewerProps>`
    border-radius: ${(props) => (props.$borderRadius ? props.$borderRadius : '20px')};
`;
