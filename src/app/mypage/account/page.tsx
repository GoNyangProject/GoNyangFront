'use client';
import React, { useEffect, useState } from 'react';
import { AccountBox, AccountHeader, AccountTitle } from '../../../../styles/pages/mypage/Account';
import InfoItem from '../../../../components/molecules/InfoItem';
import { ActionButton, ActionButtonWrapper, PetPaginationWrapper } from '../../../../styles/components/molecules/InfoItem';
import { AccountFieldsType, PetInfoType } from '../../../../enum/FormFields';
import { modifyValidateField, validatePetField } from '@/utils/validations/formValidators';
import { Post } from '../../../../service/crud';
import axiosInstance from '../../../../libs/axios';
import { userStore } from '../../../../store/userStore';
import useSWR, { mutate } from 'swr';
import {CommonResponse, PetApiResponse} from '../../../../types/Common';

type PetForm = {
    petId?: number;
    [PetInfoType.NAME]: string;
    [PetInfoType.Breed]: string;
    [PetInfoType.AGE]: string;
    [PetInfoType.GENDER]: string;
    [PetInfoType.NOTE]: string;
};
const emptyPetForm = (): PetForm => ({
    petId: undefined,
    [PetInfoType.NAME]: '',
    [PetInfoType.Breed]: '',
    [PetInfoType.AGE]: '',
    [PetInfoType.GENDER]: '',
    [PetInfoType.NOTE]: '',
});

interface MyPetProfileModifyResponse {
    status: string;
    petImagePath: string | null;
}

const fetcher = (payload: Request) => axiosInstance.post('/api/backend', payload).then((res) => res.data.result);

const Page = () => {
    const { userData, setUserData } = userStore();

    const { data: user_account } = useSWR(
        {
            url: `/mypage/useraccount?userId=${userData?.userId}`,
            method: 'GET',
        },
        fetcher,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            fallbackData: [],
        },
    );
    const [profile, setProfile] = useState({
        [AccountFieldsType.NAME]: '',
        [AccountFieldsType.EMAIL]: '',
        [AccountFieldsType.PHONE]: '',
    });

    const [editingField, setEditingField] = useState<string | null>(null);
    const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

    const [pets, setPets] = useState<PetForm[]>([]);
    const [tempPets, setTempPets] = useState<PetForm[]>([]);
    const [petImages, setPetImages] = useState<(string | null)[]>([]);
    const [originalPetImagePaths, setOriginalPetImagePaths] = useState<(string | null)[]>([]);
    const [currentPetIndex, setCurrentPetIndex] = useState(0);
    const [petValidationErrors, setPetValidationErrors] = useState<{ [key: string]: string }>({});
    const [isPetEditMode, setIsPetEditMode] = useState(false);

    useEffect(() => {
        if (!user_account || user_account.length === 0) return;

        const newProfile = {
            [AccountFieldsType.NAME]: user_account.username || '',
            [AccountFieldsType.EMAIL]: user_account.email || '',
            [AccountFieldsType.PHONE]: user_account.phoneNumber || '',
        };

        setProfile((prev) =>
            prev[AccountFieldsType.NAME] === newProfile[AccountFieldsType.NAME] &&
            prev[AccountFieldsType.EMAIL] === newProfile[AccountFieldsType.EMAIL] &&
            prev[AccountFieldsType.PHONE] === newProfile[AccountFieldsType.PHONE]
                ? prev
                : newProfile,
        );

        const mappedPets: PetForm[] = (user_account.pets ?? []).map((p: PetApiResponse) => ({
            petId: p.petId,
            [PetInfoType.NAME]: p.petName || '',
            [PetInfoType.Breed]: p.catBreed || '',
            [PetInfoType.AGE]: String(p.petAge ?? ''),
            [PetInfoType.GENDER]: p.petGender || '',
            [PetInfoType.NOTE]: p.catNotes || '',
        }));

        const mappedImages: (string | null)[] = (user_account.pets ?? []).map((p: PetApiResponse) =>
            p?.petImagePath ? p.petImagePath.replace(/\\/g, '/').replace(/^\./, '') : null,
        );

        setPets((prev) => (JSON.stringify(prev) === JSON.stringify(mappedPets) ? prev : mappedPets));
        setTempPets((prev) => (JSON.stringify(prev) === JSON.stringify(mappedPets) ? prev : mappedPets));
        setPetImages((prev) => (JSON.stringify(prev) === JSON.stringify(mappedImages) ? prev : mappedImages));
        setOriginalPetImagePaths((prev) => (JSON.stringify(prev) === JSON.stringify(mappedImages) ? prev : mappedImages));
        setCurrentPetIndex(0);
        setPetValidationErrors({});
        setIsPetEditMode(false);
    }, [user_account]);

    const handleSettingClick = (field: string) => setEditingField(field);

    const handleCancel = () => {
        setValidationErrors((prev) => {
            const next = { ...prev };
            if (editingField) delete next[editingField];
            return next;
        });
        setEditingField(null);
    };

    const handleSave = async (field: AccountFieldsType | PetInfoType, newValue: string) => {
        const fieldType = Object.keys(AccountFieldsType).find((key) => AccountFieldsType[key as keyof typeof AccountFieldsType] === field);
        const payload = { userId: userData?.userId, fieldType, value: newValue };

        const errorMsg = modifyValidateField(field, newValue);
        if (errorMsg) {
            setValidationErrors((prev) => ({ ...prev, [field]: errorMsg }));
            setEditingField(field);
            return;
        }

        setValidationErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors[field];
            return newErrors;
        });

        Post(
            '/mypage/useraccount/profile',
            payload,
            () => {
                mutate({ url: `/mypage/useraccount?userId=${userData?.userId}`, method: 'GET' });
            },
            false,
        );
        setEditingField(null);
    };

    const handleAddPet = () => {
        const newIdx = pets.length;
        const empty = emptyPetForm();
        setPets((prev) => [...prev, empty]);
        setTempPets((prev) => [...prev, empty]);
        setPetImages((prev) => [...prev, null]);
        setOriginalPetImagePaths((prev) => [...prev, null]);
        setCurrentPetIndex(newIdx);
        setPetValidationErrors({});
        setIsPetEditMode(true);
    };

    const handleDeletePet = () => {
        if (pets.length === 0) return;
        const confirmDelete = window.confirm('정말 삭제하시겠습니까?');
        if (!confirmDelete) return;
        const targetPet = pets[currentPetIndex];
        if (!targetPet.petId) return;
        const payload = { userId: userData?.userId, petId: targetPet.petId };
        Post(
            '/mypage/useraccount/profile/pet/delete',
            payload,
            () => {
            },
            false,
        );
        const nextIndex = Math.max(0, currentPetIndex - 1);
        setPets((prev) => prev.filter((_, i) => i !== currentPetIndex));
        setTempPets((prev) => prev.filter((_, i) => i !== currentPetIndex));
        setPetImages((prev) => prev.filter((_, i) => i !== currentPetIndex));
        setOriginalPetImagePaths((prev) => prev.filter((_, i) => i !== currentPetIndex));
        setCurrentPetIndex(nextIndex);
        setPetValidationErrors({});
        setIsPetEditMode(false);
    };

    // 펫 수정 취소
    const handlePetCancel = () => {
        if (pets.length === 0) {
            setIsPetEditMode(false);
            return;
        }
        const targetPet = tempPets[currentPetIndex];
        if (!targetPet.petId) {
            const nextIndex = Math.max(0, currentPetIndex - 1);
            setPets((prev) => prev.filter((_, i) => i !== currentPetIndex));
            setTempPets((prev) => prev.filter((_, i) => i !== currentPetIndex));
            setPetImages((prev) => prev.filter((_, i) => i !== currentPetIndex));
            setOriginalPetImagePaths((prev) => prev.filter((_, i) => i !== currentPetIndex));
            setCurrentPetIndex(nextIndex);
        } else {
            // 기존 펫이면 원래 값 복원
            setTempPets((prev) => {
                const next = [...prev];
                next[currentPetIndex] = pets[currentPetIndex];
                return next;
            });
            setPetImages((prev) => {
                const next = [...prev];
                next[currentPetIndex] = originalPetImagePaths[currentPetIndex];
                return next;
            });
        }
        setPetValidationErrors({});
        setIsPetEditMode(false);
    };

    const handlePetInfoSave = () => {
        if (pets.length === 0) return;

        const targetPet = tempPets[currentPetIndex];

        const errors: { [key: string]: string } = {};
        (Object.entries(targetPet) as [keyof PetForm, string][]).forEach(([k, v]) => {
            const errorMsg = validatePetField(k as unknown as PetInfoType, String(v));
            if (errorMsg) errors[k as string] = errorMsg;
        });

        if (Object.keys(errors).length > 0) {
            setPetValidationErrors(errors);
            return;
        }

        const payload = {
            userId: userData?.userId,
            petId: targetPet.petId,
            name: targetPet[PetInfoType.NAME],
            breed: targetPet[PetInfoType.Breed],
            age: targetPet[PetInfoType.AGE],
            gender: targetPet[PetInfoType.GENDER],
            note: targetPet[PetInfoType.NOTE],
            imageBase64: petImages[currentPetIndex],
        };
        Post(
            '/mypage/useraccount/profile/pet',
            payload,
            (response) => {
                const fullResponse = response as CommonResponse<MyPetProfileModifyResponse>;
                const res = fullResponse.result;
                mutate({ url: `/mypage/useraccount?userId=${userData?.userId}`, method: 'GET' });
                if (res && res.petImagePath && userData) {
                    setUserData({
                        ...userData,
                        petImagePath: res.petImagePath,
                    });
                }
                setIsPetEditMode(false);
                setPetValidationErrors({});
            },
            false,
        );
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const allowedTypes = ['image/png', 'image/jpeg'];
        if (!allowedTypes.includes(file.type)) {
            alert('PNG, JPG, JPEG 파일만 업로드 가능합니다.');
            return;
        }

        if (file.size > 1024 * 1024) {
            alert('이미지는 1MB 이하만 업로드 가능합니다.');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const dataUrl = reader.result as string;
            setPetImages((prev) => {
                const next = [...prev];
                next[index] = dataUrl;
                return next;
            });
        };
        reader.readAsDataURL(file);
    };
    const isPetChanged = () => {
        const original = pets[currentPetIndex];
        const temp = tempPets[currentPetIndex];
        const originalImage = originalPetImagePaths[currentPetIndex];
        const currentImage = petImages[currentPetIndex];

        if (!original || !temp) return false;

        const textChanged = Object.keys(temp).some((key) => {
            if (key === 'petId') return false;
            return String(temp[key as keyof PetForm]) !== String(original[key as keyof PetForm]);
        });
        const imageChanged = currentImage !== originalImage;
        return textChanged || imageChanged;
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '15px',
                gap: '20px',
                width: '40%',
                alignItems: 'center',
            }}
        >
            <AccountBox>
                <AccountHeader>
                    <AccountTitle>내 프로필</AccountTitle>
                </AccountHeader>
                {Object.entries(profile).map(([key, val]) => (
                    <InfoItem
                        key={key}
                        label={key as AccountFieldsType}
                        value={val}
                        isButton={editingField === null || editingField === key}
                        onSave={handleSave}
                        onEditStart={() => handleSettingClick(key)}
                        onCancel={handleCancel}
                        errorMessage={validationErrors[key]}
                        isEdit={editingField === key}
                    />
                ))}
            </AccountBox>

            <AccountBox>
                <AccountHeader>
                    <AccountTitle>마이 펫 정보</AccountTitle>
                    {isPetEditMode ? (
                        <ActionButtonWrapper>
                            <ActionButton onClick={handlePetCancel}>취소</ActionButton>
                            <ActionButton onClick={handlePetInfoSave} disabled={!isPetChanged()}>
                                저장
                            </ActionButton>
                        </ActionButtonWrapper>
                    ) : (
                        <ActionButtonWrapper>
                            <ActionButton onClick={handleAddPet}>등록</ActionButton>
                            {pets.length > 0 && (
                                <>
                                    <ActionButton onClick={() => setIsPetEditMode(true)}>수정</ActionButton>
                                    <ActionButton onClick={handleDeletePet}>삭제</ActionButton>
                                </>
                            )}
                        </ActionButtonWrapper>
                    )}
                </AccountHeader>
                {pets.length > 0 && (
                    <PetPaginationWrapper>
                        <ActionButton onClick={() => setCurrentPetIndex((i) => Math.max(0, i - 1))} disabled={currentPetIndex === 0}>
                            {'<'}
                        </ActionButton>
                        <span>
                            {currentPetIndex + 1} / {pets.length}
                        </span>
                        <ActionButton
                            onClick={() => setCurrentPetIndex((i) => Math.min(pets.length - 1, i + 1))}
                            disabled={currentPetIndex === pets.length - 1}
                        >
                            {'>'}
                        </ActionButton>
                    </PetPaginationWrapper>
                )}
                {pets.length > 0 && (
                    <>
                        <InfoItem
                            key={`image-${currentPetIndex}-${isPetEditMode ? 'edit' : 'view'}`}
                            alignItem="start"
                            label={PetInfoType.IMAGE}
                            isImagePlaceHolder={true}
                            isButton={false}
                            isEdit={isPetEditMode}
                            onImageUpload={(e) => handleImageUpload(e, currentPetIndex)}
                            previewImage={petImages[currentPetIndex] ?? null}
                            setPreviewImage={(newValue) => {
                                setPetImages((prev) => {
                                    const next = [...prev];
                                    next[currentPetIndex] = newValue;
                                    return next;
                                });
                            }}
                        />

                        {(Object.entries(tempPets[currentPetIndex]) as [keyof PetForm, string][])
                            .filter(([key]) => key !== 'petId')
                            .map(([key, val]) => (
                                <InfoItem
                                    key={`${String(key)}-${isPetEditMode ? 'edit' : 'view'}`}
                                    label={key as unknown as PetInfoType}
                                    value={val}
                                    isButton={false}
                                    isEdit={isPetEditMode}
                                    onChange={(newValue) => {
                                        setTempPets((prev) => {
                                            const next = [...prev];
                                            next[currentPetIndex] = { ...next[currentPetIndex], [key]: newValue };
                                            return next;
                                        });
                                    }}
                                    errorMessage={petValidationErrors[String(key)]}
                                />
                            ))}
                    </>
                )}
            </AccountBox>
        </div>
    );
};

export default Page;
