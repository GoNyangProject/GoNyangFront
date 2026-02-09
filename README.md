# 🚀 프로젝트 소개

> **반려묘와 집사를 위한 스마트 미용 예약 플랫폼**
>
> [고냥 서비스](http://gonyang.shop)

# 📅 개발시간
* 25.11.01 ~ 진행중
# 🛠️ 기술스택

| 컴포넌트      | 플랫폼                         | 참고사항                                    |
|-----------|-----------------------------|-----------------------------------------|
| 프론트엔드     | nextjs / typescript / react | zustand(Global State) / swr(Data Fetch) |
| 백엔드       | Spring boot                 | Spring Security / JWT / OAUTH 2.0       |
| 데이터베이스    | mariadb                     | redis (Cache/Session)                   |
| 인프라       | AWS  / Docker / NGINX(SSL)  | Storage(S3)                             |
| IDE       | IntelliJ                    |                                         |
| Framework | Spring boot 3.5.3           |                                         |
| ORM       | Spring Data JPA             |                                         |

# 🗺️ ️프로젝트 아키텍처

![project_architecture](/public/images/readme/project_architecture.png)

# 📌 주요기능

* 소셜 로그인
    * OAuth 2.0 기반 간편 인증: 카카오 및 구글 계정을 이용한 빠른 회원가입 및 로그인 제공
    * JWT 보안 인증: Access Token과 Refresh Token을 활용한 안전한 사용자 인증 유지 및 세션 관리
    * 권한 분리: 일반 사용자(집사)와 비즈니스 사용자(미용사) 권한을 구분하여 차별화된 메뉴 제공

* 예약 서비스
    * 캘린더를 활용해 직관적인 UI를 통한 예약 날짜 및 시간 선택
    * 실시간 예약 현황: SWR을 활용해 새로고침 없이 실시간으로 비어있는 미용 시간대 확인
    * 중복 예약 방지: 데이터베이스 트랜잭션 관리를 통해 동일 시간대 중복 예약 원천 차단
    * 예약 히스토리: 사용자의 과거 미용 내역 및 다가올 예약 일정을 한눈에 관리하는 마이페이지

* 커뮤니티 및 공지사항 게시판
    * 이미지 업로드: AWS S3를 연동하여 미용 후기 및 공지사항 내 고화질 이미지 첨부 기능
    * 검색 및 필터: 제목, 내용, 작성자 기반의 빠른 검색 기능 제공

* 결제 서비스
    * toss payments API 를 활용한 결제 인터페이스 구현

* 관리자
    * 전체 예약 현황, 회원현황, 게시판을 한눈에 확인하는 관리자 전용 페이지
    * 콘텐츠 관리: 부적절한 게시글 삭제 및 공지사항 관리

# 🔭 향후 개발 계획

### 🛠️ 관리자

* 월별/일별 예약 현황 및 매출 통계 시각화 (차트 도입) / 차트 : Chart.js
* 신청한 미용사의 자격증 및 포트폴리오 검토 후 승인/거절 프로세스
* 서비스 공지 및 이벤트 게시글 상단 고정/수정/삭제 기능
* 결제 내역 통합 조회 및 정책에 따른 부분/전체 환불 처리 시스템

### 👑 사용자 및 서비스 확장

* 일반 사용자가 아닌 미용사로 신청할 수 있는 양식 및 업로드 기능
* 반려동물 관련 용품 및 자체 제작 굿즈 판매 페이지 구축 / 검색 : Elastic Search
* 여러 상품을 담아 한 번에 결제할 수 있는 장바구니 및 수량 조절 기능
* 예약 및 주문 상태에 따른 실시간 알림 서비스

🏠 메인 페이지 (main_page)
![메인 페이지](/public/images/readme/main_page.png)
<details> <summary>📸 예약 상세 (book_detail)</summary>

![예약 상세](/public/images/readme/book_detail.png)
</details>

<details> <summary>👤 마이페이지 (mypage)</summary>

![마이페이지](/public/images/readme/mypage.png)
</details>
<details> <summary>📢 공지사항 (notice)</summary>

![공지사항](/public/images/readme/notice.png)
</details>
<details> <summary>👥 커뮤니티 (community)</summary>

![커뮤니티](/public/images/readme/community.png)
</details>
<details> <summary>📝 게시글 상세 (board_detail)</summary>

![게시글 상세](/public/images/readme/board_detail.png)
</details>
<details> <summary>💬 댓글 (comment)</summary>

![댓글](/public/images/readme/comment.png)
</details>
<details> <summary>⚙️ 게시글 관리 (board_manage)</summary>

![게시글 관리](/public/images/readme/board_manage.png)
</details>
<details> <summary>🗓️ 예약 관리 (book_manage)</summary>

![예약 관리](/public/images/readme/book_manage.png)
</details>








