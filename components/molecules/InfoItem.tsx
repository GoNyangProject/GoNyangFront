import React, { useEffect, useRef, useState } from 'react';
import {
    ActionButton,
    ActionButtonWrapper,
    ImageActionWrapper,
    ImageInfoButton,
    ImageInfoButtonWrapper,
    ImageInfoText,
    InfoLeft,
    InfoRow,
    Label,
    Value,
} from '../../styles/components/molecules/InfoItem';
import { ImagePlaceholder, ImagePlaceHolderWrapper } from '../../styles/pages/mypage/account';
import { AccountFieldsType, PetInfoType } from '../../enum/FormFields';
import { JoinValidErrorMessage } from '../../styles/pages/join/JoinValidErrorMessage';

type InfoItemProps = {
    label?: AccountFieldsType | PetInfoType;
    value?: string;
    isButton?: boolean;
    alignItem?: string;
    isImagePlaceHolder?: boolean;
    onSave?: (label: AccountFieldsType | PetInfoType, newValue: string) => void;
    onCancel?: (label: AccountFieldsType | PetInfoType) => void;
    onEditStart?: () => void;
    errorMessage?: string;
    isEdit?: boolean;
    onChange?: (newValue: string) => void;
    onImageUpload?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    previewImage?: string | null;
    setPreviewImage?: (value: string | null) => void;
};

const InfoItem = ({
    label,
    value = '',
    isButton,
    alignItem = 'center',
    isImagePlaceHolder,
    onSave,
    onCancel,
    onEditStart,
    errorMessage,
    isEdit,
    onChange,
    onImageUpload,
    previewImage,
    setPreviewImage,
}: InfoItemProps) => {
    const [tempValue, setTempValue] = useState(value ?? '');
    const isChanged = tempValue !== value;

    useEffect(() => {
        if (tempValue !== value) {
            setTempValue(value ?? '');
        }
    }, [value]);

    const handleSettingClick = () => {
        onEditStart?.();
    };

    const handleSaveClick = () => {
        onSave?.(label!, tempValue);
    };

    const handleCancelClick = () => {
        setTempValue(value);
        onCancel?.(label!);
    };
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleImageButtonClick = () => {
        fileInputRef.current?.click();
    };
    return (
        <InfoRow>
            <InfoLeft $alignItem={alignItem}>
                <Label>{label}</Label>
                {isImagePlaceHolder ? (
                    <ImagePlaceHolderWrapper>
                        <input type="file" accept="image/png, image/jpeg" style={{ display: 'none' }} ref={fileInputRef} onChange={onImageUpload} />
                        <ImagePlaceholder>
                            {previewImage ? (
                                <img src={previewImage} alt="스토리지 이미지" />
                            ) : (
                                <img src="/images/account_placeholer_image.png" alt="기본 펫 이미지" />
                            )}
                        </ImagePlaceholder>
                        {isEdit && (
                            <ImageActionWrapper>
                                <ImageInfoButtonWrapper>
                                    <ImageInfoButton onClick={handleImageButtonClick}>변경</ImageInfoButton>
                                    <ImageInfoButton onClick={() => setPreviewImage?.(null)}>초기화</ImageInfoButton>
                                </ImageInfoButtonWrapper>
                                <ImageInfoText $marginTop="20px">PNG, JPG, JPEG의 확장자</ImageInfoText>
                                <ImageInfoText $marginTop="2px">1MB 이하의 이미지</ImageInfoText>
                            </ImageActionWrapper>
                        )}
                    </ImagePlaceHolderWrapper>
                ) : isEdit ? (
                    <>
                        <input
                            type="text"
                            value={tempValue}
                            onChange={(e) => {
                                const newValue = e.target.value;
                                setTempValue(newValue);
                                onChange?.(newValue);
                            }}
                            style={{
                                padding: '6px 8px',
                                border: '1px solid #ddd',
                                borderRadius: '6px',
                                width: '200px',
                                borderColor: errorMessage ? 'red' : undefined,
                            }}
                        />
                        {errorMessage && <JoinValidErrorMessage>{errorMessage}</JoinValidErrorMessage>}
                    </>
                ) : (
                    <Value>{value}</Value>
                )}
            </InfoLeft>

            {!isImagePlaceHolder &&
                isButton &&
                (isEdit ? (
                    <ActionButtonWrapper>
                        <ActionButton onClick={handleCancelClick}>취소</ActionButton>
                        <ActionButton onClick={handleSaveClick} disabled={!isChanged}>
                            저장
                        </ActionButton>
                    </ActionButtonWrapper>
                ) : (
                    <ActionButton onClick={handleSettingClick}>설정</ActionButton>
                ))}
        </InfoRow>
    );
};

export default InfoItem;
