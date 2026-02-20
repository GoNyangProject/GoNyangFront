export const timeAgo = (dateParam: string | Date) => {
    const date = typeof dateParam === 'string' ? new Date(dateParam) : dateParam;
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    // 1분 미만
    if (diffInSeconds < 60) return '방금 전';

    // 1시간 미만
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes}분 전`;

    // 24시간 미만
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}시간 전`;

    // 7일 미만
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}일 전`;

    // 7일 이후 또는 연도가 다를 때
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    // 현재 연도와 글 작성 연도가 다르면 연도까지 표시 (예: 2025-01-30)
    if (year !== now.getFullYear()) {
        return `${year}-${month}-${day}`;
    }

    // 같은 연도면 월-일만 표시 (예: 01-30)
    return `${month}-${day}`;
};