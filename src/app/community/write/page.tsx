'use client';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Image from '@tiptap/extension-image';
import { useCallback, useEffect, useRef, useState } from 'react'; // useCallback 추가
import { Post, Upload } from '../../../../service/crud';
import { FileUploadResponse } from '../../../../types/Common';
import { Container, EditorWrapper, FilterSection, SubmitButton, TitleInput } from '../../../../styles/pages/community/write/CommunityWrite';
import DropDawnFilter from '../../../../components/molecules/admin/DropDawnFilter';
import Link from '@tiptap/extension-link';
import { useRouter, useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import { userStore } from '../../../../store/userStore';
import axiosInstance from '../../../../libs/axios';
import { getCookie } from '@/utils/cookie';

const BOARD_OPTIONS = [
    { label: '자유게시판', value: 'FREE_COMMUNITY' },
    { label: '정보 공유', value: 'INFO' },
    { label: '나눔 장터', value: 'FLEA_MARKET' },
];

const fetcher = (payload: Request) => axiosInstance.post('/api/backend', payload).then((res) => res.data.result);

const Page = () => {
    const [title, setTitle] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [boardCode, setBoardCode] = useState('');
    const router = useRouter();
    const params = useSearchParams();
    const boardId = params.get('boardId');

    useEffect(() => {
        const hasToken = getCookie('accessToken');
        if (!hasToken) {
            alert('로그인한 사용자만 접근할 수 있습니다.');
            router.replace('/member/login');
        }
    }, [router]);

    const { userData } = userStore();

    const { data: board_detail_data } = useSWR(
        boardId
            ? {
                  url: `/board/detail?boardCode=${boardId}&userId=${userData?.userId}`,
                  method: 'GET',
              }
            : null,
        fetcher,
        { revalidateOnFocus: false, revalidateOnReconnect: false, fallbackData: [] },
    );

    const editor = useEditor({
        extensions: [
            StarterKit,
            Image.configure({
                HTMLAttributes: { class: 'uploaded-image' },
            }),
            Link.configure({
                openOnClick: false,
                autolink: true,
                HTMLAttributes: {
                    class: 'content-link',
                    target: '_blank',
                    rel: 'noopener noreferrer',
                },
            }),
            Placeholder.configure({
                placeholder: '고양이에 대한 따뜻한 이야기를 들려주세요... 🐾',
            }),
        ],
        immediatelyRender: false,
    });

    useEffect(() => {
        if (board_detail_data) {
            console.log(board_detail_data);
            setTitle(board_detail_data.title);
            setBoardCode(board_detail_data.boardCode);
            if (editor && board_detail_data.content) {
                editor.commands.setContent(board_detail_data.content);
            }
        }
    }, [board_detail_data, editor]);

    const setLink = useCallback(() => {
        if (!editor) return;

        const previousUrl = editor.getAttributes('link').href;
        let url = window.prompt('URL을 입력해주세요', previousUrl);

        if (url === null) return;

        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }
        if (!/^https?:\/\//i.test(url)) {
            url = `https://${url}`;
        }
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }, [editor]);

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            alert('jpg, png, gif, webp 형식의 이미지만 업로드 가능합니다.');
            return;
        }
        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            alert('이미지 용량은 5MB를 초과할 수 없습니다.');
            return;
        }
        const formData = new FormData();
        formData.append('file', file);

        Upload('/community/upload', formData, (response) => {
            const res = response as FileUploadResponse;
            if (res.message === '요청 성공' && res.result) {
                const imageUrl = res.result.src;
                if (editor && imageUrl) {
                    editor.chain().focus().setImage({ src: imageUrl }).run();
                }
            }
        });
        if (e.target) e.target.value = '';
    };

    const handleSubmit = () => {
        if (!boardCode) {
            return alert('게시판을 선택해주세요.');
        }
        if (!title.trim() || !editor || editor.isEmpty) {
            return alert('제목과 내용을 입력해주세요.');
        }
        const payload = {
            title,
            content: editor.getHTML(),
            boardCode: boardCode,
            boardId: boardId,
        };
        Post(
            '/community/save',
            payload,
            (response) => {
                if (response.message === '요청 성공') {
                    alert('게시글이 성공적으로 등록되었습니다! 🐾');
                    router.push('/community');
                } else {
                    alert('등록에 실패했습니다. 다시 시도해주세요.');
                }
            },
            false,
        );
    };

    if (!editor) return null;

    return (
        <Container>
            <FilterSection>
                <DropDawnFilter options={BOARD_OPTIONS} value={boardCode} onChange={(val) => setBoardCode(val)} placeholder="게시판을 선택해주세요" />
            </FilterSection>
            <TitleInput type="text" placeholder="제목을 입력하세요" value={title} onChange={(e) => setTitle(e.target.value)} />

            <EditorWrapper>
                <div className="toolbar">
                    <button onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'is-active' : ''}>
                        <b>B</b>
                    </button>
                    <button onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'is-active' : ''}>
                        <i>I</i>
                    </button>
                    <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? 'is-active' : ''}>
                        • 리스트
                    </button>
                    <button onClick={setLink} className={editor.isActive('link') ? 'is-active' : ''}>
                        🔗 링크
                    </button>

                    <button onClick={handleImageClick}>🖼️ 사진</button>
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" style={{ display: 'none' }} />
                </div>

                <EditorContent editor={editor} />
            </EditorWrapper>

            <SubmitButton onClick={handleSubmit}>등록하기</SubmitButton>
        </Container>
    );
};

export default Page;
