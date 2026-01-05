'use client';

import React from 'react';

const providers = [
    {
        name: 'google',
        bgColor: '#ffffff',
        icon: '/icons/google.svg',
        url: '/auth/google',
    },
    {
        name: 'naver',
        bgColor: '#03C75A',
        icon: '/icons/NAVER_login_Dark_KR_green_icon_H48.png',
        url: '/auth/naver',
    },
    {
        name: 'kakao',
        bgColor: '#FEE500',
        icon: '/icons/kakaotalk_sharing_btn_small_ov.png',
        url: '/auth/kakao',
    },
];

const SocialLoginButtons = () => {
    return (
        <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
            {providers.map((p) => (
                <div
                    key={p.name}
                    onClick={() => (window.location.href = p.url)}
                    style={{
                        width: 48,
                        height: 48,
                        borderRadius: 12,
                        backgroundColor: p.bgColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                        transition: 'all 0.15s ease-in-out',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.2)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.15)';
                    }}
                    onMouseDown={(e) => {
                        e.currentTarget.style.transform = 'scale(0.96)';
                    }}
                    onMouseUp={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                >
                    <img src={p.icon} alt={p.name} width={22} height={22} />
                </div>
            ))}
        </div>
    );
};

export default SocialLoginButtons;
