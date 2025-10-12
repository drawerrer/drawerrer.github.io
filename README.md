
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>영유의 서랍장</title>
  <style>
    @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');

    body {
      margin: 0;
      font-family: 'Pretendard', sans-serif;
      background-color: #D4E0EE;
      color: #2c2c2c;
      line-height: 1.7;
      transition: background-color 0.3s ease;
    }

    header {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 60px 70px 30px 70px;
    }

  <div class="logo">
    <img src="정영주 컵앤하겐.png" alt="CopenHagen 로고" height="60">
  </div>
  <nav>
    <a href="#" id="diaryLink" class="active">일기장</a>
    <a href="#" id="photoLink">사진 모음집</a>
  </nav>
</header>
    }

    nav {
      display: flex;
      gap: 25px;
    }

    nav a {
      text-decoration: none;
      color: #2c2c2c;
      font-weight: 500;
      font-size: 17px;
      letter-spacing: -0.3px;
      transition: color 0.3s;
    }

    nav a:hover, nav a.active {
      color: #729960;
    }

    main {
      max-width: 720px;
      margin: 0 auto;
      padding: 0 30px 80px;
    }

    section {
      display: none;
      animation: fadeIn 0.4s ease;
    }

    section.active {
      display: block;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .post-list {
      list-style: none;
      padding: 0;
      margin: 40px 0 0 0;
      border-top: 1px solid rgba(0, 0, 0, 0.08);
    }

    .post-list li {
      font-size: 16px;
      padding: 14px 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
      cursor: pointer;
      transition: color 0.2s;
    }

    .post-list li:hover {
      color: #729960;
    }

    .post-list li span.date {
      color: #729960;
      font-weight: 500;
      margin-right: 10px;
      font-size: 15px;
    }

    .post-content {
      display: none;
      animation: fadeIn 0.4s ease;
    }

    .post-content.active {
      display: block;
    }

    .post-content h2 {
      font-size: 20px;
      color: #2c2c2c;
      margin-top: 20px;
      margin-bottom: 10px;
    }

    .post-content .date {
      color: #729960;
      font-size: 14px;
      margin-bottom: 20px;
      display: block;
    }

    .post-content p {
      font-size: 16px;
      line-height: 1.8;
      color: #333;
      white-space: pre-line;
    }

    .back-link {
      display: inline-block;
      margin-top: 30px;
      color: #729960;
      text-decoration: none;
      font-size: 15px;
      transition: opacity 0.3s;
    }

    .back-link:hover {
      opacity: 0.7;
    }

    .photo-gallery {
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
      margin-top: 30px;
    }

    .photo-gallery img {
      width: 100%;
      max-width: 220px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .photo-gallery img:hover {
      transform: scale(1.03);
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.12);
    }

    footer {
      text-align: center;
      font-size: 13px;
      color: rgba(0,0,0,0.4);
      padding-bottom: 30px;
    }
  </style>
</head>
<body>
  <header>
    <div class="logo"><이미지></div>
    <nav>
      <a href="#" id="diaryLink" class="active">일기장</a>
      <a href="#" id="photoLink">사진 모음집</a>
    </nav>
  </header>

  <main>
    <!-- 일기장 -->
    <section id="diary" class="active">
      <ul class="post-list">
        <li data-id="1"><span class="date">2025.10.12</span> - 단풍이 시작된 아침</li>
        <li data-id="2"><span class="date">2025.10.09</span> - 조용한 카페의 오후</li>
        <li data-id="3"><span class="date">2025.10.03</span> - 비 오는 거리에서</li>
      </ul>

      <!-- 글 상세보기 -->
      <div class="post-content" id="post1">
        <h2>단풍이 시작된 아침</h2>
        <span class="date">2025.10.12</span>
        <p>
오늘 아침, 창문을 열었을 때 공기가 달라져 있었다.  
조금 더 차갑고, 조금 더 선명했다.  
길가의 나무들이 서서히 색을 바꾸기 시작했고,  
나는 그 변화를 가만히 바라보았다.
        </p>
        <a href="#" class="back-link">← 목록으로 돌아가기</a>
      </div>

      <div class="post-content" id="post2">
        <h2>조용한 카페의 오후</h2>
        <span class="date">2025.10.09</span>
        <p>
작은 골목 끝에 있는 카페,  
오늘은 유난히 사람이 없었다.  
잔잔한 음악과 커피 향 사이에서,  
잠시 모든 생각이 멈췄다.
        </p>
        <a href="#" class="back-link">← 목록으로 돌아가기</a>
      </div>

      <div class="post-content" id="post3">
        <h2>비 오는 거리에서</h2>
        <span class="date">2025.10.03</span>
        <p>
비가 내리면 도시의 소리가 달라진다.  
차분해지고, 묘하게 따뜻해진다.  
우산을 든 사람들 사이로, 나만의 리듬으로 걷는다.
        </p>
        <a href="#" class="back-link">← 목록으로 돌아가기</a>
      </div>
    </section>

    <!-- 사진 모음집 -->
    <section id="photos">
      <ul class="post-list">
        <li><span class="date">2025.09.20</span> - 하늘을 담은 창문</li>
        <li><span class="date">2025.08.14</span> - 여름밤 불빛</li>
      </ul>
      <div class="photo-gallery">
        <img src="https://via.placeholder.com/220x160?text=사진1" alt="사진1">
        <img src="https://via.placeholder.com/220x160?text=사진2" alt="사진2">
        <img src="https://via.placeholder.com/220x160?text=사진3" alt="사진3">
      </div>
    </section>
  </main>

  <footer>
    © 2025 나의 블로그. All rights reserved.
  </footer>

  <script>
    // 탭 전환
    const diaryLink = document.getElementById('diaryLink');
    const photoLink = document.getElementById('photoLink');
    const diarySection = document.getElementById('diary');
    const photoSection = document.getElementById('photos');

    diaryLink.addEventListener('click', (e) => {
      e.preventDefault();
      diarySection.classList.add('active');
      photoSection.classList.remove('active');
      diaryLink.classList.add('active');
      photoLink.classList.remove('active');
    });

    photoLink.addEventListener('click', (e) => {
      e.preventDefault();
      photoSection.classList.add('active');
      diarySection.classList.remove('active');
      photoLink.classList.add('active');
      diaryLink.classList.remove('active');
    });

    // 글 상세보기 기능
    const postItems = document.querySelectorAll('.post-list li');
    const postContents = document.querySelectorAll('.post-content');
    const backLinks = document.querySelectorAll('.back-link');

    postItems.forEach(item => {
      item.addEventListener('click', () => {
        const id = item.dataset.id;
        document.querySelector('.post-list').style.display = 'none';
        document.getElementById(`post${id}`).classList.add('active');
      });
    });

    // 📸 사진 모음집 상세보기
    document.querySelectorAll('#photos .post-list li').forEach(item => {
      item.addEventListener('click', () => {
        const id = item.dataset.id;
        document.querySelector('#photos .post-list').style.display = 'none';
        document.querySelector(`#${id}`).classList.add('active');
      });
    });

    backLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.post-content').forEach(c => c.classList.remove('active'));
        document.querySelector('.post-list').style.display = 'block';
      });
    });
  </script>

