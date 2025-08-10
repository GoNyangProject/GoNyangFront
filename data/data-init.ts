import { FormFieldsType } from '../enum/FormFields';

export type FormState = {
    [key in FormFieldsType]: string;
};

export type FormErrors = {
    [key in FormFieldsType]?: string;
};

export const initialFormState: FormState = {
    [FormFieldsType.ID]: '',
    [FormFieldsType.PASSWORD]: '',
    [FormFieldsType.EMAIL]: '',
    [FormFieldsType.NAME]: '',
    [FormFieldsType.BIRTH]: '',
    [FormFieldsType.PHONE]: '',
};
