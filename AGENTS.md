# AGENTS.md

## 프로젝트 개요
이 프로젝트는 사용자가 입력한 텍스트를 OpenAI API로 감성 분석하여
긍정 / 부정 / 중립 결과를 시각적으로 보여주는 감성 분석 서비스이다.

프로젝트는 감성적인 브랜드 사이트 느낌의 UI를 기반으로 구현한다.

참고 디자인 방향:
- 고급 위스키 브랜드 랜딩페이지 스타일
- 여백 중심 레이아웃
- 큰 타이포그래피
- 감성적인 이미지 사용
- 베이지 + 다크 브라운 + 레드 포인트 컬러
- 스크롤 기반 섹션 구성

기술 스택:
- Front-End: HTML, CSS, JavaScript
- Back-End: Node.js (Express)
- AI: OpenAI API
- DB: Supabase
- Deploy: Vercel

---

# AI 작업 규칙

## 절대 규칙

1. 사용자가 명시하지 않은 기능을 임의로 추가하지 않는다.
2. React, Vue, TypeScript 등 다른 프레임워크를 사용하지 않는다.
3. 반드시 HTML/CSS/Vanilla JS 기반으로 구현한다.
4. 모든 API Key는 서버 환경변수로 관리한다.
5. OpenAI API Key를 프론트엔드에 노출하지 않는다.
6. DB는 Supabase만 사용한다.
7. 서버는 Node.js + Express 구조로만 구현한다.
8. 디자인은 첨부된 레퍼런스 느낌을 유지한다.
9. 비전공자도 유지보수 가능하도록 단순한 구조를 유지한다.
10. 기능 구현 전 반드시 PRD.md와 docs 문서를 우선 참조한다.
