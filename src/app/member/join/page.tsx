'use client';
import React, { useState } from 'react';
import JoinInput from '../../../../components/atom/JoinInput';
import Button from '../../../../components/atom/Button';
import { MemberJoinBox } from '../../../../styles/pages/join/Section';
import { GenderButton, GenderButtonWrapper } from '../../../../styles/pages/join/GenderSelector';
import { FormErrors, FormState, initialFormState } from '../../../../data/data-init';
import { FormFieldsType } from '../../../../enum/FormFields';
import { JoinValidErrorMessage } from '../../../../styles/pages/join/JoinValidErrorMessage';
import { checkIdDuplicate, validateField } from '@/utils/validations/formValidators';
import { Post } from '../../../../service/crud';
import { Gender } from '../../../../enum/Common';
import { useRouter } from 'next/navigation';

const Page = () => {
    const router = useRouter();
    const [gender, setGender] = useState<Gender>(Gender.MALE);
    const [form, setForm] = useState<FormState>(initialFormState);
    const [errors, setErrors] = useState<FormErrors>({});
    const [isIdAvailable, setIsIdAvailable] = useState<boolean | null>(null);

    const onChange = (key: FormFieldsType) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, [key]: e.target.value }));
        setErrors((prev) => ({ ...prev, [key]: '' }));
    };
    const onBlur = (key: FormFieldsType) => async (e: React.FocusEvent<HTMLInputElement>) => {
        const FormFieldTypeValue = e.target.value;
        if (key === FormFieldsType.ID) {
            const errorMsg = await checkIdDuplicate(FormFieldTypeValue);
            setErrors((prev) => ({ ...prev, [key]: errorMsg }));
            setIsIdAvailable(errorMsg === '');
        } else {
            const errorMsg = validateField(key, e.target.value);
            setErrors((prev) => ({ ...prev, [key]: errorMsg }));
        }
    };
    const onSubmit = async () => {
        const hasError: FormErrors = {};
        let isError = false;

        (Object.keys(form) as FormFieldsType[]).forEach((key) => {
            const errorMessage = validateField(key, form[key]);
            if (errorMessage) {
                isError = true;
                hasError[key] = errorMessage;
            }
        });
        if (!hasError[FormFieldsType.ID]) {
            const idErrorMsg = await checkIdDuplicate(form[FormFieldsType.ID]);
            if (idErrorMsg) {
                isError = true;
                hasError[FormFieldsType.ID] = idErrorMsg;
            }
        }
        setErrors(hasError);

        if (isError) return;

        Post(
            '/member/join',
            {
                userId: form[FormFieldsType.ID],
                password: form[FormFieldsType.PASSWORD],
                email: form[FormFieldsType.EMAIL],
                username: form[FormFieldsType.NAME],
                birth: form[FormFieldsType.BIRTH],
                gender: gender,
                phoneNumber: form[FormFieldsType.PHONE],
            },
            (response) => {
                if (!response) return;
                alert('회원가입이 완료 되었습니다.');
                setForm(initialFormState);
                setErrors({});
                setIsIdAvailable(null);
                setGender(Gender.MALE);
                router.push('/member/login');
            },
            false,
        );
    };

    return (
        <>
            <h1 style={{ color: 'black', paddingTop: '40px', textAlign: 'center' }}>로고부분</h1>
            <MemberJoinBox>
                <JoinInput
                    placeholder="아이디"
                    value={form[FormFieldsType.ID]}
                    onChange={onChange(FormFieldsType.ID)}
                    onBlur={onBlur(FormFieldsType.ID)}
                    isError={!!errors[FormFieldsType.ID]}
                />
                {errors[FormFieldsType.ID] ? (
                    <JoinValidErrorMessage>{errors[FormFieldsType.ID]}</JoinValidErrorMessage>
                ) : isIdAvailable ? (
                    <JoinValidErrorMessage style={{ color: 'green' }}>사용 가능한 아이디입니다.</JoinValidErrorMessage>
                ) : null}

                <JoinInput
                    type="password"
                    placeholder="비밀번호"
                    value={form[FormFieldsType.PASSWORD]}
                    onChange={onChange(FormFieldsType.PASSWORD)}
                    onBlur={onBlur(FormFieldsType.PASSWORD)}
                    isError={!!errors[FormFieldsType.PASSWORD]}
                />
                {errors[FormFieldsType.PASSWORD] && <JoinValidErrorMessage>{errors[FormFieldsType.PASSWORD]}</JoinValidErrorMessage>}

                <JoinInput
                    placeholder="이메일"
                    value={form[FormFieldsType.EMAIL]}
                    onChange={onChange(FormFieldsType.EMAIL)}
                    onBlur={onBlur(FormFieldsType.EMAIL)}
                    isError={!!errors[FormFieldsType.EMAIL]}
                />
                {errors[FormFieldsType.EMAIL] && <JoinValidErrorMessage>{errors[FormFieldsType.EMAIL]}</JoinValidErrorMessage>}
            </MemberJoinBox>

            <MemberJoinBox>
                <JoinInput
                    placeholder="이름"
                    value={form[FormFieldsType.NAME]}
                    onChange={onChange(FormFieldsType.NAME)}
                    onBlur={onBlur(FormFieldsType.NAME)}
                    isError={!!errors[FormFieldsType.NAME]}
                />
                {errors[FormFieldsType.NAME] && <JoinValidErrorMessage>{errors[FormFieldsType.NAME]}</JoinValidErrorMessage>}
                <JoinInput
                    placeholder="생년월일(8자)"
                    value={form[FormFieldsType.BIRTH]}
                    onChange={onChange(FormFieldsType.BIRTH)}
                    onBlur={onBlur(FormFieldsType.BIRTH)}
                    isError={!!errors[FormFieldsType.BIRTH]}
                />
                {errors[FormFieldsType.BIRTH] && <JoinValidErrorMessage>{errors[FormFieldsType.BIRTH]}</JoinValidErrorMessage>}
                <GenderButtonWrapper>
                    <GenderButton selected={gender === Gender.MALE} onClick={() => setGender(Gender.MALE)}>
                        남자
                    </GenderButton>
                    <GenderButton selected={gender === Gender.FEMALE} onClick={() => setGender(Gender.FEMALE)}>
                        여자
                    </GenderButton>
                </GenderButtonWrapper>
                <JoinInput
                    placeholder="전화번호"
                    value={form[FormFieldsType.PHONE]}
                    onChange={onChange(FormFieldsType.PHONE)}
                    onBlur={onBlur(FormFieldsType.PHONE)}
                    isError={!!errors[FormFieldsType.PHONE]}
                />
                {errors[FormFieldsType.PHONE] && <JoinValidErrorMessage>{errors[FormFieldsType.PHONE]}</JoinValidErrorMessage>}
            </MemberJoinBox>

            <Button
                onClick={onSubmit}
                border="none"
                borderRadius="8px"
                display="block"
                width="100%"
                margin="0 auto"
                padding="20px"
                fontSize="18px"
                style={{
                    maxWidth: '400px',
                    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                }}
            >
                동의하고 시작하기
            </Button>
        </>
    );
};

export default Page;
