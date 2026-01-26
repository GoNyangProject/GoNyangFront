import React, { useState } from 'react';
import { Field, FormSection, GuideText, InquiryQuestionWrapper, Label, TextArea } from '../../styles/components/molecules/InquiryQuestion';
import Button from '../atom/Button';
import Select from '../atom/Select';
import { SelectOption } from '../../types/Common';
import Input from '../atom/Input';
import { userStore } from '../../store/userStore';
import { Post } from '../../service/crud';

export type InquiryQuestionProps = {
    onBack: () => void;
    onSuccess: () => void;
};

const InquiryQuestion = ({ onBack, onSuccess }: InquiryQuestionProps) => {
    const { userData } = userStore();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedOption, setSelectedOption] = useState<SelectOption | null>(null);
    const SelectOption = [
        { value: 'ETC', label: '기타' },
        { value: 'ACCOUNT', label: '계정 문의' },
        { value: 'DELIVERY', label: '배송 문의' },
        { value: 'EXCHANGE_REFUND', label: '교환/환불 문의' },
    ];
    const DEFAULT_CATEGORY: SelectOption = {
        value: 'ETC',
        label: '기타',
    };

    const handleChangeOption = (option: SelectOption) => {
        setSelectedOption(option);
    };
    const handleBackClick = () => {
        const hasWritten = title.trim() || content.trim();

        if (!hasWritten) {
            onBack();
            return;
        }

        const isConfirm = window.confirm('지금까지 작성한 내용은 저장되지 않습니다.\n목록으로 돌아가시겠습니까?');

        if (isConfirm) {
            onBack();
        }
    };
    const handleClickSubmit = () => {
        if (!title.trim()) {
            alert('제목을 입력해주세요');
            return;
        }
        if (!content.trim()) {
            alert('문의 내용을 입력해주세요.');
            return;
        }
        const category = (selectedOption ?? DEFAULT_CATEGORY).value;
        const payload = { title: title, content: content, userId: userData?.userId, category: category };
        Post(
            '/mypage/inquiry/inquiries',
            payload,
            (response) => {
                if (response.result) {
                    alert('문의가 정상적으로 접수되었습니다.');
                    onSuccess();
                }
            },
            false,
        );
    };

    return (
        <div>
            <InquiryQuestionWrapper>
                <h1>1 : 1 문의</h1>
                <GuideText>
                    어떠한 내용이라도 답변드릴 준비가 되어 있습니다!
                    <br />
                    문의를 보내주세요! 가능한 한 빨리 답변 드리도록 하겠습니다.
                </GuideText>
                <Select
                    style={{ width: '100%', marginBottom: '20px', textAlign: 'center', backgroundColor: 'bisque' }}
                    option={SelectOption}
                    onChange={handleChangeOption}
                ></Select>
                <FormSection>
                    <Field>
                        <Label>
                            제목<span>*</span>
                        </Label>
                        <Input width="100%" placeholder="제목을 입력해주세요" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </Field>

                    <Field>
                        <Label>
                            설명<span>*</span>
                        </Label>
                        <TextArea placeholder="문의 내용을 입력해주세요" value={content} onChange={(e) => setContent(e.target.value)} />
                    </Field>
                </FormSection>
                <Button onClick={handleClickSubmit}>제출</Button>
            </InquiryQuestionWrapper>
            <Button onClick={handleBackClick}>목록으로</Button>
        </div>
    );
};

export default InquiryQuestion;
