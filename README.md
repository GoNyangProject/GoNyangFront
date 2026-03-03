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
  
* AI 비서 '고냥이' (Chatbot)
  * OpenAI GPT-4o-mini 기반: 단순 답변을 넘어 서비스 내 데이터를 실시간으로 조회하는 스마트 챗봇
  * Function Calling(Tool Use): 챗봇이 직접 백엔드 API를 호출하여 예약 가능 여부, 내 예약 내역, 문의 상태 등을 실시간 응답
  * 스마트 문의 요약: 1:1 문의의 답변 내용을 요약하여 유저에게 즉시 전달하는 사용자 편의성 극대화

* 결제 서비스
    * toss payments API 를 활용한 결제 인터페이스 구현

* 인프라 및 네트워크 최적화 (Nginx & Docker)
  * Nginx 리버스 프록시 설정: 단일 도메인(gonyang.shop)에서 `/api`는 스프링 부트로, `/api/chat` 및 프론트 경로는 Next.js로 효율적으로 라우팅
  * SSL 보안 적용: Let's Encrypt를 활용한 HTTPS 적용으로 사용자 데이터 전송 구간 암호화 및 보안 등급 강화
  * Docker 컨테이너화: 프론트엔드, 백엔드, DB를 컨테이너로 격리하여 독립적인 실행 환경 구축 및 배포 편의성 증대

* 관리자
    * 전체 예약 현황, 회원현황, 게시판을 한눈에 확인하는 관리자 전용 페이지
    * 콘텐츠 관리: 부적절한 게시글 삭제 및 공지사항 관리
* 무중단 배포 및 자동화 (CI/CD)
  * GitHub Actions를 활용한 지속적 통합 및 자동 배포 시스템 구축
* 사용자 중심 반응형 웹
  * 모바일/태블릿/PC 전 기기 최적화된 UI 제공

# 🔭 향후 개발 계획

### 🛠️ 관리자

* 월별/일별 예약 현황 및 매출 통계 시각화 (차트 도입) / 차트 : Chart.js
* 신청한 미용사의 자격증 및 포트폴리오 검토 후 승인/거절 프로세스
* 서비스 공지 및 이벤트 게시글 상단 고정/수정/삭제 기능
* 결제 내역 통합 조회 및 정책에 따른 부분/전체 환불 처리 시스템

### 👑 사용자 및 서비스 확장

* **리뷰 시스템 및 검색 고도화 (Elasticsearch)**
  * 단순 DB 검색을 넘어 **Elasticsearch**를 도입하여 대용량 리뷰 데이터의 고속 풀텍스트 검색 구현
  * 한국어 형태소 분석기(Nori)를 활용한 정교한 키워드 추출 및 검색 정확도 향상
  * 별점, 최신순, 키워드 포함 여부 등 다양한 필터를 조합한 스마트 리뷰 탐색 기능
* 일반 사용자가 아닌 미용사로 신청할 수 있는 양식 및 업로드 기능
* 예약 상태에 따른 실시간 알림 서비스

### 👑 챗봇 서비스 확장

* 예약 자동화: 챗봇 대화 도중 바로 예약을 생성할 수 있는 완벽한 예약 프로세스 연동


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
<details> <summary>🤖 챗봇 (chatbot)</summary>

![챗봇](/public/images/readme/chatbot.png)
</details>










