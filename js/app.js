// Supabase는 방명록에서만 필요하므로, 최상단 import 제거하고 동적으로 로드
// import { supabase } from './supabase-config.js'; // <- 이게 전체 모듈을 block하는 원인

import { writingsData, photographyData } from './data.js';

// ============================================================
// Section 2: Work Projects Array
// ============================================================
const projectsData = [
    {
        id: "allo",
        title: "알로 (Allo) MVP",
        tags: ["앱 기획", "MVP", "Healthcare"],
        desc: "개개인의 건강 상태에 맞춘 영양제 추천 및 꾸준한 섭취를 돕기 위한 알림 서비스를 제공하는 헬스케어 MVP 기획입니다.",
        content: `<h3>알로 (Allo) 영양제 섭취 관리 MVP</h3><p>바쁜 현대인들이 자신의 건강 상태에 맞춰 영양제를 올바르게 섭취할 수 있도록 돕는 헬스케어 서비스 기획 및 프론트엔드 프로토타입입니다.</p><br><h4>주요 기능</h4><ul><li>개인별 맞춤 영양성분 조합 추천 및 알림</li><li>데일리 섭취 달성률 트래킹 및 습관 형성 챌린지 UX</li></ul>`
    },
    {
        id: "tiktok",
        title: "틱톡 (TikTok) 리디자인",
        tags: ["UI/UX", "리디자인", "Micro-interaction"],
        desc: "사용자 경험(UX) 개선에 초점을 맞춰 틱톡의 핵심 기능과 인터페이스를 직관적이고 매력적으로 재설계한 프로젝트입니다.",
        content: `<h3>틱톡 UX/UI 리디자인 프로젝트</h3><p>기존 틱톡 인터페이스의 정보 과부하를 정돈하고, 숏폼 콘텐츠 시청 몰입도를 극대화할 수 있는 인터랙티브 레이아웃을 제안했습니다.</p>`
    },
    {
        id: "kagong",
        title: "카공지도 (Kagong Jido)",
        tags: ["신규 프로젝트 🚧", "서비스 기획", "Map API"],
        desc: "카공족(카페에서 공부/일하는 사람)을 위해 콘센트, 조용함, 좌석 타입을 직관적으로 검색할 수 있는 맞춤 지도 서비스입니다.",
        content: `<h3>카공지도 (Kagong Jido) — 준비 중 🚧</h3><p>공부하기 좋은 카페를 찾는 대학생 및 프리랜서를 위한 카공 맞춤형 지도 플랫폼입니다. 사용자 제보 기반 데이터와 필터링 시스템을 연동 중입니다.</p>`
    },
    {
        id: "waterring",
        title: "물 링 던지기 (Water Ring Toss)",
        tags: ["인터랙티브 웹", "JavaScript", "Physics"],
        desc: "어릴 적 추억의 장난감 '물 속 링 던지기'를 브라우저 상에서 물리 엔진을 활용해 실감나게 구현한 미니 게임입니다.",
        content: `<h3>물 링 던지기 (Water Ring Toss)</h3><p>웹 브라우저 상에서 수중 물리학 효과를 직접 코딩하여 레트로 감성을 선사하는 미니게임입니다.</p><br><a href="ringinwater.html" class="btn-primary-pill">🎮 직접 플레이해보기</a>`
    }
];

// ============================================================
// Section 3: Editorial & Magazine 3X2 Array
// ============================================================
const editorialData = [
    {
        title: "월간 SPACE 학생기자 기사 모음",
        date: "2025.10",
        keywords: ["건축", "공간 기획", "학생기자"],
        img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop",
        content: "한국 대표 건축 전문지 월간 SPACE 학생기자로 활동하며 작성한 건축 공간 분석 및 인터뷰 아티클 모음입니다."
    },
    {
        title: "매거진 미러 : 도시 속 숨은 사유의 공간",
        date: "2025.11",
        keywords: ["매거진 미러", "트렌드", "라이프스타일"],
        img: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=600&auto=format&fit=crop",
        content: "다양한 라이프스타일과 시선을 비추는 매거진 미러 에디터로서 기획하고 에디팅한 문화 칼럼입니다."
    },
    {
        title: "플라토 매거진 : 예술과 일상의 경계",
        date: "2025.11",
        keywords: ["플라토 매거진", "문화 예술", "에디토리얼"],
        img: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=600&auto=format&fit=crop",
        content: "깊이 있는 문화 예술 아티클을 기획하고 창작자들의 이야기를 담아낸 아카이브 기사입니다."
    },
    {
        title: "Tür(튜어) 브랜드 기획 & 스토리텔링",
        date: "2025.11",
        keywords: ["Tür 튜어", "브랜드 기획", "아이덴티티"],
        img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=600&auto=format&fit=crop",
        content: "새로운 문을 연다는 의미의 브랜드 'Tür(튜어)' 초기 아이덴티티 구축 및 마케팅 가이드북입니다."
    },
    {
        title: "에디토리얼 텍스트의 시각적 위계 설계",
        date: "2025.12",
        keywords: ["UX Writing", "Editorial", "Design"],
        img: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=600&auto=format&fit=crop",
        content: "글의 읽기 경험을 극대화하는 모던 텍스트 레이아웃과 폰트 시스템 디자인에 관한 사유입니다."
    },
    {
        title: "공간이 브랜드에게 전하는 이야기",
        date: "2026.01",
        keywords: ["Space Design", "Branding", "Story"],
        img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600&auto=format&fit=crop",
        content: "오프라인 공간 경험이 브랜드 충성도에 미치는 영향과 공간 디자인 큐레이션 기획안입니다."
    }
];

// ============================================================
// Section 4: Series Data (레퍼런스 이미지 반영)
// ============================================================
const seriesData = [
    {
        badge: "Series 01",
        title: "연애의 경제학",
        posterText: "ROMANCE",
        posterBg: "linear-gradient(135deg, #74b9ff 0%, #a29bfe 100%)",
        items: [
            { num: "01", text: "AI가 완벽한 짝을 찾아준다면, 우리는 행복해질까?", iconBg: "#6c5ce7", iconText: "AI" },
            { num: "02", text: "결혼, 사랑이라는 이름의 M&A", iconBg: "#00cec9", iconText: "💍" },
            { num: "03", text: "국제 연애에는 어떤 비용이 들까?", iconBg: "#fdcb6e", iconText: "✈️" }
        ]
    },
    {
        badge: "Series 02",
        title: "프로덕트 & 사유",
        posterText: "THOUGHTS",
        posterBg: "linear-gradient(135deg, #a8e6cf 0%, #3ab7bf 100%)",
        items: [
            { num: "01", text: "일찍 일어나야 한다는 법이라도 있어요?", iconBg: "#ff7675", iconText: "☀️" },
            { num: "02", text: "영화 <세계의 주인> : 아픔은 계속 함께가는 것", iconBg: "#fd79a8", iconText: "🎬" },
            { num: "03", text: "나를 찾기 위한 글", iconBg: "#0984e3", iconText: "✒️" }
        ]
    },
    {
        badge: "Series 03",
        title: "개발 & 일상",
        posterText: "DEV & LIFE",
        posterBg: "linear-gradient(135deg, #ff9ff3 0%, #feca57 100%)",
        items: [
            { num: "01", text: "아침 달리기를 하면서 보는 풍경들", iconBg: "#10ac84", iconText: "🏃" },
            { num: "02", text: "개인 웹사이트를 구축하며 배운 것들", iconBg: "#54a0ff", iconText: "💻" },
            { num: "03", text: "첫 인사 - 오롯한 공간을 시작하며", iconBg: "#5f27cd", iconText: "👋" }
        ]
    }
];

// ============================================================
// Demo photos for marquee (나중에 실제 이미지로 교체)
// ============================================================
const demoPhotos = [
    { url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=640&auto=format&fit=crop", title: "산" },
    { url: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=640&auto=format&fit=crop", title: "숲" },
    { url: "https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?w=640&auto=format&fit=crop", title: "거리" },
    { url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=640&auto=format&fit=crop", title: "여행" },
    { url: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=640&auto=format&fit=crop", title: "꽃" },
    { url: "https://images.unsplash.com/photo-1494783367193-149034c05e8f?w=640&auto=format&fit=crop", title: "카페" },
    { url: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=640&auto=format&fit=crop", title: "도시" },
    { url: "https://images.unsplash.com/photo-1483701566194-24b6521ef766?w=640&auto=format&fit=crop", title: "밤" },
];

// ============================================================
// App Init — 각 섹션 독립적으로 실행 (에러 격리)
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    safeRun(renderProjectsCarousel);
    safeRun(renderEditorialGrid);
    safeRun(renderSeriesCarousel);
    safeRun(renderMarquee);
    safeRun(initModal);
    safeRun(initGuestbook); // Supabase는 여기서만
});

function safeRun(fn) {
    try { fn(); } catch (e) { console.error('[Portfolio Error]', fn.name, e); }
}

// ============================================================
// Render Projects Carousel (Section 2)
// ============================================================
function renderProjectsCarousel() {
    const track = document.getElementById('projects-carousel-track');
    if (!track) return;

    track.innerHTML = projectsData.map(p => `
        <div class="project-card-vertical" data-project-id="${p.id}">
            <div>
                <div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:16px;">
                    ${p.tags.map(t => `<span style="font-size:12px; font-weight:600; padding:4px 10px; border-radius:9999px; background:var(--color-canvas-parchment); color:var(--color-ink-muted-80);">${t}</span>`).join('')}
                </div>
                <h3 style="font-size:22px; font-weight:700; letter-spacing:-0.015em; margin-bottom:14px;">${p.title}</h3>
                <p style="font-size:15px; color:var(--color-ink-muted-48); line-height:1.6;">${p.desc}</p>
            </div>
            <div style="color:var(--color-primary); font-weight:600; font-size:15px; display:flex; align-items:center; gap:4px;">
                프로젝트 보기 <span class="material-symbols-outlined" style="font-size:18px">arrow_forward</span>
            </div>
        </div>
    `).join('');

    // 드래그 스크롤
    let isDown = false, startX, scrollLeft;
    track.addEventListener('mousedown', e => { isDown = true; track.style.cursor = 'grabbing'; startX = e.pageX - track.offsetLeft; scrollLeft = track.scrollLeft; });
    track.addEventListener('mouseleave', () => { isDown = false; track.style.cursor = 'grab'; });
    track.addEventListener('mouseup', () => { isDown = false; track.style.cursor = 'grab'; });
    track.addEventListener('mousemove', e => { if (!isDown) return; e.preventDefault(); const x = e.pageX - track.offsetLeft; track.scrollLeft = scrollLeft - (x - startX) * 1.5; });

    // 클릭으로 모달 열기
    track.querySelectorAll('.project-card-vertical').forEach(card => {
        card.addEventListener('click', () => {
            const id = card.getAttribute('data-project-id');
            const project = projectsData.find(p => p.id === id);
            if (project) openModal(project.title, project.content);
        });
    });
}

// ============================================================
// Render Editorial 3X2 Grid (Section 3)
// ============================================================
function renderEditorialGrid() {
    const grid = document.getElementById('editorial-grid');
    if (!grid) return;

    grid.innerHTML = editorialData.map((e, idx) => `
        <div class="editorial-card" data-edit-idx="${idx}">
            <img src="${e.img}" alt="${e.title}" class="editorial-thumb" loading="lazy" />
            <div class="editorial-body">
                <span class="editorial-date">${e.date}</span>
                <h4 class="editorial-title">${e.title}</h4>
                <div class="editorial-keywords">
                    ${e.keywords.map(k => `<span class="editorial-keyword">${k}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');

    grid.querySelectorAll('.editorial-card').forEach(card => {
        card.addEventListener('click', () => {
            const idx = card.getAttribute('data-edit-idx');
            const item = editorialData[idx];
            if (item) {
                openModal(item.title, `
                    <div style="font-size:14px; color:var(--color-ink-muted-48); margin-bottom:16px;">${item.date}</div>
                    <img src="${item.img}" style="width:100%; border-radius:16px; margin-bottom:20px;" />
                    <p style="font-size:16px; line-height:1.7;">${item.content}</p>
                `);
            }
        });
    });
}

// ============================================================
// Render Series Carousel (Section 4 — 레퍼런스 이미지 반영)
// ============================================================
function renderSeriesCarousel() {
    const track = document.getElementById('series-carousel-track');
    if (!track) return;

    track.innerHTML = seriesData.map(s => `
        <div class="series-card-split">
            <div class="series-left">
                <div>
                    <span class="series-badge">${s.badge}</span>
                    <h3 class="series-title">${s.title}</h3>
                    <div class="series-list">
                        ${s.items.map(item => `
                            <div class="series-list-item">
                                <div class="series-icon-box" style="background:${item.iconBg};">${item.iconText}</div>
                                <span style="font-size:13px; color:var(--color-ink-muted-48); font-weight:600; flex-shrink:0;">${item.num}</span>
                                <span style="flex-grow:1; font-size:15px;">${item.text}</span>
                                <span class="material-symbols-outlined" style="font-size:18px; color:var(--color-ink-muted-48); flex-shrink:0;">chevron_right</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            <div class="series-right" style="background:${s.posterBg};">
                <div class="series-right-poster-text">${s.posterText}</div>
            </div>
        </div>
    `).join('');

    // 클릭으로 글 모달 열기
    track.querySelectorAll('.series-list-item').forEach((item, i) => {
        item.addEventListener('click', () => {
            const text = item.querySelector('span:nth-child(3)').innerText;
            const found = writingsData.find(w => w.title && text && w.title.substring(0, 8) === text.substring(0, 8));
            if (found) {
                const body = found.content.replace(/\n/g, '<br>');
                openModal(found.title, `<div style="font-size:13px;color:var(--color-ink-muted-48);margin-bottom:14px;">${found.date}</div><div style="font-size:16px;line-height:1.8;">${body}</div>`);
            } else {
                openModal(text, `<p style="font-size:16px; line-height:1.7; color:var(--color-ink-muted-48);">곧 추가될 예정입니다.</p>`);
            }
        });
    });
}

// ============================================================
// Render Infinite Marquee (Section 5)
// ============================================================
function renderMarquee() {
    const track = document.getElementById('marquee-track');
    if (!track) return;

    // 실제 photographyData가 있으면 사용, 없으면 데모
    const photos = (photographyData && photographyData.length > 0)
        ? photographyData.map(p => ({ url: p.url, title: p.caption || p.title || 'Moment' }))
        : demoPhotos;

    // base64 이미지가 너무 크면 데모로 대체
    const usablePhotos = photos.filter(p => p.url && !p.url.startsWith('data:')).length > 0
        ? photos.filter(p => p.url && !p.url.startsWith('data:'))
        : demoPhotos;

    // 무한 루프를 위해 2배 복사
    const doubled = [...usablePhotos, ...usablePhotos];

    track.innerHTML = doubled.map(p => `
        <div class="marquee-card">
            <img src="${p.url}" alt="${p.title}" loading="lazy" />
            <div class="marquee-card-title">${p.title}</div>
        </div>
    `).join('');
}

// ============================================================
// Modal Controller
// ============================================================
function initModal() {
    const overlay = document.getElementById('app-modal');
    const closeBtn = document.getElementById('modal-close');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (overlay) overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
}

function openModal(title, bodyHtml) {
    const overlay = document.getElementById('app-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    if (!overlay) return;
    modalTitle.innerText = title;
    modalBody.innerHTML = bodyHtml;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const overlay = document.getElementById('app-modal');
    if (overlay) { overlay.classList.remove('active'); document.body.style.overflow = ''; }
}

// ============================================================
// Guestbook — Supabase를 동적으로 로드 (에러가 다른 섹션 안 막도록)
// ============================================================
async function initGuestbook() {
    const form = document.getElementById('guestbook-form');
    if (!form) return;

    let supabase = null;

    try {
        const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm');
        const url = 'https://khwqazhqlezfydrenljk.supabase.co';
        const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtod3FhemhxbGV6ZnlkcmVubGprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxMTA2NTEsImV4cCI6MjA4NzY4NjY1MX0.XLgNzh4WJEG5r40Zus-iNC-4ZGqqHJR2zIYSzoyP4h0';
        supabase = createClient(url, key);
    } catch (e) {
        console.warn('Supabase load failed, guestbook disabled.', e);
        return;
    }

    loadGuestbookNotes(supabase);

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('guest-name').value.trim();
        const content = document.getElementById('guest-message').value.trim();
        if (!name || !content) return;

        try {
            const { error } = await supabase.from('guestbook').insert([{ author: name, content }]);
            if (error) throw error;
            document.getElementById('guest-name').value = '';
            document.getElementById('guest-message').value = '';
            loadGuestbookNotes(supabase);
        } catch (err) {
            console.error('Guestbook post error:', err);
            alert('메시지 등록 중 오류가 발생했습니다.');
        }
    });
}

async function loadGuestbookNotes(supabase) {
    const container = document.getElementById('guestbook-list');
    if (!container || !supabase) return;

    try {
        const { data, error } = await supabase
            .from('guestbook')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        if (!data || data.length === 0) {
            container.innerHTML = `<div style="grid-column:span 12; text-align:center; color:var(--color-ink-muted-48); padding:20px;">첫 번째 메시지를 남겨보세요! ✨</div>`;
            return;
        }

        container.innerHTML = data.map(item => `
            <div class="guest-note">
                <div style="display:flex; justify-content:space-between; font-size:14px; font-weight:600;">
                    <span>${item.author || '익명'}</span>
                    <span style="font-size:12px; color:var(--color-ink-muted-48);">${new Date(item.created_at).toLocaleDateString('ko-KR')}</span>
                </div>
                <div style="font-size:15px; line-height:1.5;">${item.content}</div>
            </div>
        `).join('');
    } catch (err) {
        console.error('Guestbook load error:', err);
    }
}
