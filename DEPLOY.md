# GitHub 배포 가이드

웹사이트를 GitHub에 업로드하고 배포하는 방법입니다.

## 1. 파일 준비 (완료됨)
현재 폴더(`/Users/youngju/Documents/웹사이트 제작`)에 업로드를 위한 준비를 마쳤습니다.
- **.gitignore**: 불필요한 시스템 파일과 백업 파일을 제외하도록 설정했습니다.
- **README.md**: 프로젝트 설명을 추가했습니다.

## 2. GitHub 저장소(Repository) 만들기
1. [GitHub](https://github.com)에 로그인합니다.
2. 우측 상단 `+` 버튼을 누르고 **New repository**를 클릭합니다.
3. **Repository name**에 원하는 이름(예: `archive-collection` 또는 `my-website`)을 입력합니다.
4. **Public** (공개) 또는 **Private** (비공개)를 선택합니다.
5. `Initialize this repository with:` 섹션은 **비워둡니다** (이미 로컬에 파일이 있으므로).
6. **Create repository** 버튼을 클릭합니다.

## 3. 파일 업로드 방법 (가장 쉬운 방법: GitHub Desktop 또는 웹 업로드)

### 방법 A: 웹 브라우저로 직접 업로드 (초보자 추천)
1. 생성된 GitHub 저장소 화면에서 `"uploading an existing file"` 링크를 찾거나, 상단 메뉴의 **Add file > Upload files**를 클릭합니다.
2. 내 컴퓨터의 폴더(`/Users/youngju/Documents/웹사이트 제작`) 안에 있는 **모든 파일과 폴더**를 드래그해서 브라우저로 끌어다 놓습니다.
   *(주의: `.DS_Store`나 백업 파일은 `.gitignore`에 적혀있지만 웹 업로드시에는 수동으로 제외하고 드래그하는 것이 좋습니다. `index.html`, `css`, `js`, `img` 등 핵심 파일 위주로 올려주세요.)*
3. 아래 **Commit changes** 버튼을 누릅니다.

### 방법 B: 터미널 사용 (개발자 추천)
이 방법이 가장 깔끔하게 올라갑니다.

1. 터미널(Terminal) 앱을 엽니다.
2. 프로젝트 폴더로 이동합니다:
   ```bash
   cd "/Users/youngju/Documents/웹사이트 제작"
   ```
3. 깃(Git)을 초기화하고 파일을 담습니다:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```
4. GitHub 저장소 주소를 연결하고 올립니다 (GitHub 저장소 화면에 나오는 주소 복사):
   ```bash
   git branch -M main
   git remote add origin https://github.com/사용자아이디/저장소이름.git
   git push -u origin main
   ```
   git push -u origin main
   ```

## 5. 중요: GitHub 인증 토큰(Token) 발급 방법
2021년부터 GitHub는 터미널에서 비밀번호 대신 **Personal Access Token**을 사용해야 합니다.
**토큰은 한 번 닫으면 다시 볼 수 없으므로, 생성 직후 어딘가에 복사해두어야 합니다!**

### 토큰 생성 순서
1. [GitHub 토큰 설정 페이지](https://github.com/settings/tokens/new)로 접속합니다.
2. **Note** 칸에 용도(예: `Macbook Website`)를 적습니다.
3. **Expiration**(유효 기간)을 설정합니다. (계속 쓸 거라면 `No expiration` 추천)
4. **Select scopes**에서 **`repo`** 체크박스를 반드시 선택합니다. (가장 중요! ✅)
5. 맨 아래 **Generate token** 녹색 버튼을 누릅니다.
6. `ghp_`로 시작하는 긴 코드가 나오면 **복사** 버튼을 누릅니다. **(지금 복사 안 하면 영영 못 봅니다!)**

### 터미널에서 사용하기
터미널에서 `Password:` 입력이 나올 때, 방금 복사한 토큰을 **붙여넣기(Command+V)** 하고 엔터를 칩니다.
*(보안상 화면에는 아무 글자도 안 뜨니 당황하지 말고 엔터를 누르세요.)*

## 4. GitHub Pages로 웹사이트 공개하기 (선택 사항)
올린 파일을 실제 웹사이트 주소로 접속하고 싶다면:
1. GitHub 저장소의 **Settings** 탭으로 이동합니다.
2. 좌측 메뉴에서 **Pages**를 클릭합니다.
3. **Build and deployment** > **Source**에서 `Deploy from a branch`를 선택합니다.
4. **Branch**를 `main` (또는 `master`), 폴더를 `/(root)`로 설정하고 **Save**를 누릅니다.
5. 잠시 후 상단에 생성된 웹사이트 주소가 나타납니다.
