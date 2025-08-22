import { AccountFieldsType, FormFieldsType, PetInfoType } from '../../../enum/FormFields';

const regex = {
    PASSWORD: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/,
    EMAIL: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    PHONE: /^01[016789]\d{3,4}\d{4}$/,
    NAME: /^[가-힣]{2,10}$/,
    BIRTH: /^(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])$/,
    Breed: /^[가-힣]{2,10}$/,
    NOTE_REGEX: /^[가-힣a-zA-Z0-9 .,!?()'"-]{0,30}$/,
    AGE: /^(?:[0-9]|1[0-9])$/,
};

export const validateField = (key: FormFieldsType, value: string): string => {
    const cleanValue = value.replace(/-/g, '');
    switch (key) {
        case FormFieldsType.PASSWORD:
            if (!regex.PASSWORD.test(value)) return '비밀번호 형식이 잘못됐습니다. 최소 8자 이상, 문자, 숫자, 특수문자 포함';
            break;
        case FormFieldsType.EMAIL:
            if (!regex.EMAIL.test(value)) return '이메일 형식이 올바르지 않습니다.';
            break;
        case FormFieldsType.ID:
            if (value.length < 5) return '아이디는 최소 5자 이상이어야 합니다.';
            break;
        case FormFieldsType.PHONE:
            if (!regex.PHONE.test(cleanValue)) return '전화번호 형식이 올바르지 않습니다. (예: 01012345678)';
            break;
        case FormFieldsType.NAME:
            if (!regex.NAME.test(value)) return '이름은 한글 2~10자만 가능합니다.';
            break;
        case FormFieldsType.BIRTH:
            if (!regex.BIRTH.test(cleanValue)) return '생년월일 형식이 올바르지 않습니다. (예: 19900101)';
            break;
        default:
            break;
    }

    return '';
};
export const validatePetField = (key: PetInfoType, value: string): string => {
    const cleanValue = value.replace(/\s/g, '');
    switch (key) {
        case PetInfoType.NAME:
            if (!regex.NAME.test(value)) return '이름은 한글 2~10자만 가능합니다.';
            break;
        case PetInfoType.Breed:
            if (!regex.Breed.test(cleanValue)) return '품종은 한글 2~10자만 가능합니다.';
            break;
        case PetInfoType.AGE:
            if (!regex.AGE.test(value)) return '나이는 0~19세 사이만 입력 가능합니다. 숫자만 입력(예: 9)';
            break;
        case PetInfoType.NOTE:
            if (!regex.NOTE_REGEX.test(value)) return '30자 미만으로 작성 가능합니다.';
            break;
        default:
            break;
    }

    return '';
};

export const checkIdDuplicate = async (id: string): Promise<string> => {
    if (id.length < 5) return '아이디는 최소 5자 이상이어야 합니다.';
    try {
        const response = await fetch(`http://localhost:8080/member/checkid?id=${id}`, { method: 'GET' });
        const data = await response.json();
        if (!data.result.available) return '이미 사용중인 아이디입니다.';
    } catch {
        return '아이디 중복 확인에 실패했습니다.';
    }
    return '';
};

export const modifyValidateField = (key: AccountFieldsType | PetInfoType, value: string): string => {
    const cleanValue = value.replace(/-/g, '');
    switch (key) {
        case AccountFieldsType.EMAIL:
            if (!regex.EMAIL.test(value)) return '이메일 형식이 올바르지 않습니다.';
            break;
        case AccountFieldsType.PHONE:
            if (!regex.PHONE.test(cleanValue)) return '전화번호 형식이 올바르지 않습니다. (예: 01012345678)';
            break;
        case AccountFieldsType.NAME:
            if (!regex.NAME.test(value)) return '이름은 한글 2~10자만 가능합니다.';
            break;
        default:
            break;
    }
    return '';
};
