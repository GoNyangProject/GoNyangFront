import React from 'react';
import { ImageViewer, ImageViewerWrapper } from '../../styles/components/molecules/ImageViewer';

export type ImageViwerProps = {
    src: string;
    width?: number;
    height?: number;
    borderRadius?: string;
    alt: string;
};

const ImageViewerComponent = ({ src, width, height, borderRadius, alt }: ImageViwerProps) => {
    return (
        <ImageViewerWrapper>
            <ImageViewer src={src} alt={alt} width={width} height={height} $borderRadius={borderRadius} />
        </ImageViewerWrapper>
    );
};

export default ImageViewerComponent;
