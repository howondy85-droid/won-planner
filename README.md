# 원사부 플래너 — 올리는 방법 (순서대로)

## 0. 먼저 (중요)
기존 플래너 화면에서 **「⬇ 데이터 백업」** 을 눌러 JSON 파일을 꼭 저장해두세요. (새 버전에서 「⬆ 데이터 복원」으로 불러옵니다.)

## 1. Firebase 콘솔 설정 (wonsabu-planner 프로젝트)
1. **Authentication → 시작하기 → Google** 사용 설정, 지원 이메일 선택 후 저장
2. **Authentication → 설정 → 승인된 도메인** 에 `howondy85-droid.github.io` 추가
3. **Firestore Database → 데이터베이스 만들기** → 위치 `asia-northeast3 (서울)` → 프로덕션 모드
4. **Firestore → 규칙** 탭에 `firestore.rules` 파일 내용을 전부 붙여넣고 **게시**

## 2. GitHub에 올리기
1. https://github.com/howondy85-droid/won-planner 열기 (저장소는 **Public** 이어야 무료 Pages 사용 가능)
2. **Add file → Upload files** → 압축을 푼 폴더 안의 파일 전부(`index.html`, `manifest.json`, `service-worker.js`, `firestore.rules`, `icons` 폴더, `.github` 폴더)를 끌어다 놓기
   - `.github` 폴더는 숨김 폴더라 안 보이면, 저장소에서 **Add file → Create new file** 로 `.github/workflows/pages.yml` 을 만들어 내용을 붙여넣으세요.
3. **Commit changes**
4. **Settings → Pages → Build and deployment → Source: GitHub Actions** 선택
5. **Actions** 탭에서 배포가 초록색 체크가 되면 주소 접속: `https://howondy85-droid.github.io/won-planner/`

## 3. 기기에 앱처럼 설치
- **아이폰/아이패드(Safari)**: 주소 열기 → 공유 버튼 → **홈 화면에 추가**
- **안드로이드(Chrome)**: 메뉴 → **앱 설치(홈 화면에 추가)**
- **PC(Chrome)**: 주소창 오른쪽 설치 아이콘

## 4. 직원 추가할 때
`index.html` 의 `ALLOWED_EMAILS` 와 Firebase 규칙(`firestore.rules`)의 이메일 목록 **두 곳**에 같은 이메일을 추가하세요. 규칙이 실제 보안을 담당합니다.

## 알아둘 점
- 항목 하나당 저장 용량 한도는 약 1MB입니다. 사진은 자동으로 줄여 저장하고, 파일 첨부는 450KB까지 가능합니다.
- 아이폰에서 드래그는 길게(약 0.3초) 누른 뒤 끌어야 합니다. 안 되면 업무를 눌러 수정 창에서 날짜를 바꾸세요.
