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
export const STATUS_OPTIONS = [
    { label: '전체 상태', value: 'ALL' },
    { label: '답변 대기', value: 'PENDING' },
    { label: '답변 완료', value: 'SUCCESS' },
];

export const CATEGORY_OPTIONS = [
    { label: '전체 카테고리', value: 'ALL' },
    { label: '계좌 문의', value: 'ACCOUNT' },
    { label: '결제 문의', value: 'PAYMENT' },
    { label: '기타', value: 'ETC' },
];
export const CATEGORY_MAP: Record<string, string> = {
    ACCOUNT: '계좌 문의',
    EXCHANGE_REFUND: '교환/환불',
    DELIVERY: '배송 문의',
    PAYMENT: '결제 문의',
    ETC: '기타',
};

export const STATUS_MAP: Record<string, string> = {
    PENDING: '답변 대기',
    SUCCESS: '답변 완료',
};
export const ADMIN_USERS_OPTION = [
    { label: '이름순', value: 'NAME' },
    { label: '가입일 순', value: 'JOIN' },
    { label: '이용횟수 순', value: 'USE' },
    { label: '누적 금액 순', value: 'SUM' },
];
export const ADMIN_USERS_STATUS_OPTION = [
    { label: '상태', value: 'ALL' },
    { label: '정상', value: 'NORMAL' },
    { label: '이용정지', value: 'BANNED' },
];
export const COMMUNITY_SORT_OPTION = [
    { label: '최신순', value: 'latest' },
    { label: '조회수순', value: 'views' },
    { label: '좋아요순', value: 'likes' },
];

export const BOARD_STATUS_OPTIONS = [
    { label: '전체 상태', value: '' },
    { label: '게시 중', value: 'NORMAL' },
    { label: '삭제됨', value: 'DELETED' },
];
export const BOARD_CATEGORY_MAP: { [key: string]: string } = {
    NOTICE: '공지사항',
    INQUIRY: '1:1문의',
    FREE_COMMUNITY: '자유게시판',
    FLEA_MARKET: '나눔장터',
    INFO: '정보공유',
};
export const ADMIN_CATEGORY_OPTIONS = [
    { label: '전체 카테고리', value: '' },
    { label: '공지사항', value: 'NOTICE' },
    { label: '자유게시판', value: 'FREE_COMMUNITY' },
    { label: '나눔장터', value: 'FLEA_MARKET' },
];
export const SORT_OPTIONS = [
    { label: '최신순', value: 'createdAt,desc' },
    { label: '조회수 높은순', value: 'viewCount,desc' },
    { label: '좋아요 많은순', value: 'likeCount,desc' },
    { label: '오래된순', value: 'createdAt,asc' },
];
