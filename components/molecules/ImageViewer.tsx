import React from 'react';
import { ImageViewer } from '../../styles/components/molecules/ImageViewer';
import { StaticImageData } from 'next/image';

export type ImageViwerProps = {
    src: string | StaticImageData;
    width?: string;
    height?: string;
    borderRadius?: string;
    alt: string;
};

const ImageViewerComponent = ({ src, width, height, borderRadius, alt }: ImageViwerProps) => {
    return <ImageViewer src={src} alt={alt} width={100} height={200} $width={width} $height={height} $borderRadius={borderRadius} />;
};

export default ImageViewerComponent;
