# 영유의 서랍장

<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>내 블로그</title>
  <style>
    @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');

    body {
      margin: 0;
      font-family: 'Pretendard', sans-serif;
      background-color: #D4E0EE;
      color: #333;
    }

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: white;
      padding: 15px 40px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .logo {
      font-size: 20px;
      font-weight: bold;
      color: #729960;
    }

    nav {
      display: flex;
      gap: 30px;
    }

    nav a {
      text-decoration: none;
      color: #333;
      font-weight: 600;
      transition: color 0.3s;
    }

    nav a:hover {
      color: #729960;
    }

    main {
      padding: 40px;
      max-width: 900px;
      margin: 0 auto;
    }

    .section {
      display: none;
    }

    .section.active {
      display: block;
    }

    ul.post-list {
      list-style: none;
      padding: 0;
    }

    ul.post-list li {
      margin: 10px 0;
      background: white;
      border-radius: 8px;
      padding: 15px 20px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
      cursor: pointer;
      transition: background 0.3s;
    }

    ul.post-list li:hover {
      background-color: #f7f9fb;
    }

    .photo-gallery img {
      width: 100%;
      max-width: 300px;
      border-radius: 8px;
      margin: 10px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    }

  </style>
</head>
<body>
  <header>
    <div class="logo"><이미지></div>
    <nav>
      <a href="#" id="diaryBtn">일기장</a>
      <a href="#" id="photoBtn">사진 모음집</a>
    </nav>
  </header>

  <main>
    <!-- 일기장 섹션 -->
    <section id="diary" class="section active">
      <h2>일기장</h2>
      <ul class="post-list">
        <li>🌿 나의 첫 번째 일기</li>
        <li>☕ 카페에서의 하루</li>
        <li>🌧️ 비 오는 날의 생각들</li>
      </ul>
    </section>

    <!-- 사진 모음집 섹션 -->
    <section id="photos" class="section">
      <h2>사진 모음집</h2>
      <ul class="post-list">
        <li>📸 봄 소풍 사진</li>
        <li>🏖️ 여름 바다</li>
        <li>🍁 가을 단풍길</li>
      </ul>
      <div class="photo-gallery">
        <img src="https://via.placeholder.com/300x200?text=사진1" alt="사진1">
        <img src="https://via.placeholder.com/300x200?text=사진2" alt="사진2">
        <img src="https://via.placeholder.com/300x200?text=사진3" alt="사진3">
      </div>
    </section>
  </main>

  <script>
    const diaryBtn = document.getElementById('diaryBtn');
    const photoBtn = document.getElementById('photoBtn');
    const diarySection = document.getElementById('diary');
    const photoSection = document.getElementById('photos');

    diaryBtn.addEventListener('click', () => {
      diarySection.classList.add('active');
      photoSection.classList.remove('active');
    });

    photoBtn.addEventListener('click', () => {
      photoSection.classList.add('active');
      diarySection.classList.remove('active');
    });
  </script>
</body>
</html>
