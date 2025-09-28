Food Reels 🍽️📱

🇰🇷 Korean | 🇺🇸 English

⸻

소개 / About

🇰🇷 보고, 즐기고, 주문하세요.
Food Reels는 사용자가 음식 영상을 보고 즉시 주문까지 할 수 있는, 모바일 중심의 혁신적인 웹 애플리케이션입니다. 매력적인 숏폼 비디오 피드와 편리한 주문 시스템을 결합하여, 음식 콘텐츠와 소비 경험 사이의 간극을 해결합니다. 이 프로젝트는 해커톤을 위해 모든 핵심 기능이 구현된 프로토타입으로 개발되었습니다.

🇺🇸 See it. Crave it. Order it.
Food Reels is a mobile-first web application that revolutionizes the food discovery and ordering experience by merging an engaging, short-form video feed with a seamless, integrated ordering system. This project was developed as a fully functional prototype for a hackathon.
<img width="1415" height="813" alt="Screenshot 2025-09-28 at 9 55 24 AM" src="https://github.com/user-attachments/assets/670c3590-572f-4b59-a2f0-2f9b56278408" />

목차 / Table of Contents
	•	프로젝트 소개 / About The Project
	•	문제점 / The Problem
	•	우리의 해결책 / Our Solution
	•	주요 기능 / Key Features
	•	사용 기술 / Built With
	•	시작하기 / Getting Started
	•	사전 준비 / Prerequisites
	•	설치 및 설정 / Installation & Setup
	•	사용 방법 / Usage

⸻

프로젝트 소개 / About The Project

문제점 / The Problem
	•	🇰🇷 현재의 음식 주문 시장은 단절되어 있습니다. 사용자들은 틱톡과 같은 비디오 플랫폼에서 멋진 음식 콘텐츠를 발견하지만, 막상 주문하려면 앱을 종료하고 다시 검색해야 하는 불편함을 겪습니다. 기존 배달 앱들은 정적인 메뉴판에 의존하여 음식의 진정한 매력을 전달하지 못합니다. 또한 신규 음식점은 리뷰 부족으로 인해 플랫폼 노출이 어렵습니다.
	•	🇺🇸 The current digital food landscape is disconnected. Users discover exciting food on video platforms like TikTok but face a frustrating gap when they want to order. Traditional delivery apps rely on static menus that fail to capture the true appeal of dishes. For new restaurants, lack of reviews makes it nearly impossible to gain visibility.

우리의 해결책 / Our Solution
	•	🇰🇷 Food Reels는 “영상에서 식탁까지(Watch-to-Table)” 경험을 제공합니다. 비디오 피드를 통해 지역 맛집을 발견하고, 콘텐츠에서 바로 주문이 가능합니다. 신규 음식점은 리뷰 수에 좌우되지 않고, 매력적인 영상 콘텐츠만으로도 고객을 유치할 수 있습니다.
	•	🇺🇸 Food Reels bridges this gap with a “Watch-to-Table” experience. Users can discover local cuisine through immersive videos and order directly from inspiring content. New restaurants succeed based on engaging content rather than pre-existing review volume.

⸻

주요 기능 / Key Features
	•	다이나믹 메인 피드 / Dynamic Main Feed
스토리 형식의 카테고리 탭과 함께 지역 음식점 포스트 스크롤 피드 제공
	•	릴스 피드 / Immersive Reels Feed
전체 화면 수직 스크롤 영상, Intersection Observer API 기반 효율적 재생
	•	주문 시스템 / Interactive Ordering
	•	메인 메뉴 수량 조절 / Adjust dish quantity
	•	사이드 메뉴 개별 수량 조절 / Side dishes with individual controls
	•	실시간 총액 업데이트 / Real-time price updates
	•	결제 수단 선택 및 주문 / Payment & order placement
	•	검색 페이지 / Functional Search Page
슬라이드 검색 UI, 실시간 필터링, 최근 검색어, 카테고리별 탐색
	•	사용자 프로필 / Comprehensive User Profile
	•	주문 내역 / Order history (localStorage)
	•	결제 수단 & 배송지 / Payment & delivery
	•	리뷰, 알림, 개인 설정 / Reviews, notifications, settings
	•	Firebase 연동 / Firebase Integration
안전한 로그인 & 회원가입 / Secure authentication

⸻

사용 기술 / Built With

프론트엔드 / Frontend:
	•	HTML5
	•	CSS3 (Tailwind CSS CDN)
	•	Vanilla JavaScript (ES6+)

백엔드 & 서비스 / Backend & Services:
	•	Firebase Authentication
	•	Firebase Hosting

⸻

시작하기 / Getting Started

사전 준비 / Prerequisites
	•	🇰🇷 Node.js와 Firebase CLI가 필요합니다.
	•	🇺🇸 You need Node.js and Firebase CLI installed.

	•	Node.js: https://nodejs.org/
	•	Firebase CLI:
  npm install -g firebase-tools

npm install -g firebase-tools
	1.	리포지토리 복제 / Clone the repository: git clone https://github.com/your-username/Food-Reel.git
  2.	프로젝트 디렉토리 이동 / Navigate to project: cd Food-Reel
  3.	Firebase 프로젝트 연결 / Set up Firebase Project:
	  •	Firebase 콘솔에서 새 프로젝트 생성 / Create a project in Firebase Console
	  •	프로젝트 연결: firebase use --add
    •	새 Firebase 프로젝트 선택 시 필요한 SDK가 자동 구성됨

사용 방법 / Usage
	1.	서버 시작 / Start the server: firebase serve
  2.	애플리케이션 열기 / Open the application:
	  •	보통 http://localhost:5000에서 실행됨
	  •	Open the shown URL (usually http://localhost:5000) in your browser. Food Reel
  
