import { supabase } from './supabase-config.js';
import { writingsData, photographyData } from './data.js';

// Project Data Array
const projectsData = [
    {
        id: "allo",
        title: "알로 (영양제 섭취 관리 서비스) MVP",
        tags: ["앱 기획", "MVP", "Healthcare"],
        span: "card-span-8",
        desc: "개개인의 건강 상태에 맞춘 영양제 추천 및 꾸준한 섭취를 돕기 위한 알림 기능을 제공하는 헬스케어 서비스 MVP 기획입니다.",
        content: `
            <h3>프로젝트 개요</h3>
            <p>알로는 바쁜 현대인들이 자신의 건강 상태에 맞춰 영양제를 올바르게 섭취할 수 있도록 돕는 헬스케어 MVP 서비스입니다.</p>
            <br>
            <h4>주요 핵심 기능</h4>
            <ul>
                <li>맞춤 영양성분 분석 및 영양제 조합 추천</li>
                <li>섭취 시간대별 맞춤 푸시 알림 및 스케줄링</li>
                <li>꾸준한 복용 습관 형성을 위한 데일리 챌린지 및 달성률 트래킹</li>
            </ul>
        `
    },
    {
        id: "tiktok",
        title: "틱톡 (TikTok) 리디자인 프로젝트",
        tags: ["UI/UX", "리디자인", "Micro-interaction"],
        span: "card-span-4",
        desc: "사용자 경험(UX) 개선에 초점을 맞춰, 틱톡의 핵심 기능과 인터페이스를 보다 직관적이고 매력적으로 재설계한 프로젝트입니다.",
        content: `
            <h3>프로젝트 개요</h3>
            <p>기존 틱톡 인터페이스의 복잡함을 덜어내고, 숏폼 콘텐츠 탐색과 시청 몰입도를 극대화할 수 있는 깔끔한 UX 레이아웃을 제안했습니다.</p>
            <br>
            <h4>개선 포인트</h4>
            <ul>
                <li>하단 네비게이션 및 커뮤니티 탭 동선 단순화</li>
                <li>콘텐츠 정보 레이어와 댓글 뷰어의 시각적 위계 정돈</li>
            </ul>
        `
    },
    {
        id: "waterring",
        title: "물 링 던지기 (Water Ring Toss)",
        tags: ["인터랙티브 웹", "JavaScript", "Physics"],
        span: "card-span-6",
        desc: "어릴 적 추억의 장난감 '물 속 링 던지기'를 브라우저 상에서 물리 엔진을 활용해 실감나게 구현한 핑거 미니 게임입니다.",
        content: `
            <h3>프로젝트 개요</h3>
            <p>웹 브라우저 상에서 수중 물리학 효과와 버튼 클릭에 따른 수압 표현을 직접 코딩하여 레트로 감성을 선사합니다.</p>
            <br>
            <a href="ringinwater.html" class="btn-primary-pill" style="margin-top: 16px;">🎮 직접 플레이해보기</a>
        `
    },
    {
        id: "tarot",
        title: "타로카드 (Tarot Card) 운세 드로우",
        tags: ["웹 서비스", "API Integration", "Interactive"],
        span: "card-span-6",
        desc: "오늘의 운세나 고민거리에 대한 해답을 직관적으로 드로우하고 카드 해설을 제공하는 서비스입니다.",
        content: `
            <h3>프로젝트 개요</h3>
            <p>랜덤 카드 조작 애니메이션과 인터랙티브한 카드 뒤집기 이펙트를 결합하여 몰입감 있는 힐링 드로우 경험을 선사합니다.</p>
        `
    },
    {
        id: "magazines",
        title: "에디토리얼 & 매거진 기획 프로젝트 모음",
        tags: ["매거진 미러", "월간 SPACE", "플라토 매거진", "Tür 튜어"],
        span: "card-span-12",
        desc: "건축/디자인 전문지 월간 SPACE 학생기자, 매거진 미러 에디터, 플라토 매거진 에디터, Tür 브랜드 초기 아이덴티티 기획자로서의 아카이브입니다.",
        content: `
            <h3>에디토리얼 스토리텔링 아카이브</h3>
            <p>공간, 브랜드, 사람들의 사유를 글로 담아내고 미디어로 엮어낸 다채로운 기획 기사 및 아티클 모음입니다.</p>
            <br>
            <ul>
                <li><strong>월간 SPACE 학생기자</strong>: 한국 대표 건축 전문지 기사 작성</li>
                <li><strong>매거진 미러 에디터</strong>: 트렌드 및 라이프스타일 콘텐츠 기획</li>
                <li><strong>플라토 매거진 에디터</strong>: 문화 예술 아티클 취재 및 에디팅</li>
                <li><strong>Tür(튜어) 브랜드 기획</strong>: 초기 브랜드 아이덴티티 및 마케팅 가이드 작성</li>
            </ul>
        `
    }
];

// DOM Elements & App Logic
document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    renderProjects();
    renderWritings();
    renderPhotos();
    initModal();
    initGuestbook();
});

// 1. Tab Switching Logic
function initTabs() {
    const tabBtns = document.querySelectorAll('.nav-tab-btn');
    const sections = {
        '#work': document.getElementById('work-section'),
        '#thoughts': document.getElementById('thoughts-section'),
        '#visuals': document.getElementById('visuals-section'),
        '#guestbook': document.getElementById('guestbook-section')
    };

    tabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const target = btn.getAttribute('data-target');
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            if (sections[target]) {
                sections[target].scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// 2. Render Projects
function renderProjects() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    grid.innerHTML = projectsData.map(p => `
        <div class="card-item ${p.span}" data-project-id="${p.id}">
            <div class="card-tag-list">
                ${p.tags.map(t => `<span class="card-tag">${t}</span>`).join('')}
            </div>
            <h3 class="card-title">${p.title}</h3>
            <p class="card-body">${p.desc}</p>
            <div class="card-action-link">
                자세히 보기 <span class="material-symbols-outlined" style="font-size:18px">arrow_forward</span>
            </div>
        </div>
    `).join('');

    grid.querySelectorAll('.card-item').forEach(card => {
        card.addEventListener('click', () => {
            const id = card.getAttribute('data-project-id');
            const project = projectsData.find(p => p.id === id);
            if (project) {
                openModal(project.title, project.content);
            }
        });
    });
}

// 3. Render Writings
function renderWritings() {
    const list = document.getElementById('writings-list');
    if (!list) return;

    list.innerHTML = writingsData.map((w, idx) => `
        <div class="writing-row" data-writing-idx="${idx}">
            <div class="writing-info">
                <span class="writing-date">${w.date}</span>
                <span class="writing-title-text">${w.title}</span>
            </div>
            <span class="material-symbols-outlined" style="color:var(--color-ink-muted-48)">chevron_right</span>
        </div>
    `).join('');

    list.querySelectorAll('.writing-row').forEach(row => {
        row.addEventListener('click', () => {
            const idx = row.getAttribute('data-writing-idx');
            const writing = writingsData[idx];
            if (writing) {
                const formattedContent = writing.content
                    .replace(/<\/p>\\n/g, '<br><br>')
                    .replace(/<\/p>\n/g, '<br><br>')
                    .replace(/\n/g, '<br>');
                openModal(
                    writing.title,
                    `<div style="color:var(--color-ink-muted-48);margin-bottom:16px">${writing.date}</div><div>${formattedContent}</div>`
                );
            }
        });
    });
}

// 4. Render Photos
function renderPhotos() {
    const grid = document.getElementById('photos-grid');
    if (!grid) return;

    grid.innerHTML = photographyData.map((p) => {
        const title = p.caption || p.title || 'Moment';
        return `
            <div class="photo-card" data-img-url="${p.url}" data-title="${title}">
                <img src="${p.url}" alt="${title}" loading="lazy" />
                <div class="photo-card-info">
                    <div class="photo-card-title">${title}</div>
                </div>
            </div>
        `;
    }).join('');

    grid.querySelectorAll('.photo-card').forEach(card => {
        card.addEventListener('click', () => {
            const url = card.getAttribute('data-img-url');
            const title = card.getAttribute('data-title');
            openModal(
                title,
                `<img src="${url}" style="width:100%;border-radius:18px;margin-top:12px;" />`
            );
        });
    });
}

// 5. Modal Controller
function initModal() {
    const overlay = document.getElementById('app-modal');
    const closeBtn = document.getElementById('modal-close');
    
    if (closeBtn && overlay) {
        closeBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeModal();
        });
    }
}

function openModal(title, bodyHtml) {
    const overlay = document.getElementById('app-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');

    if (overlay && modalTitle && modalBody) {
        modalTitle.innerText = title;
        modalBody.innerHTML = bodyHtml;
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const overlay = document.getElementById('app-modal');
    if (overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// 6. Supabase Guestbook Controller
function initGuestbook() {
    const form = document.getElementById('guestbook-form');
    if (!form) return;

    loadGuestbookNotes();

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const authorInput = document.getElementById('guest-name');
        const contentInput = document.getElementById('guest-message');
        
        const name = authorInput.value.trim();
        const content = contentInput.value.trim();

        if (!name || !content) return;

        try {
            const { data, error } = await supabase
                .from('guestbook')
                .insert([{ author: name, content: content }]);

            if (error) throw error;

            authorInput.value = '';
            contentInput.value = '';
            loadGuestbookNotes();
        } catch (err) {
            console.error('Guestbook post error:', err);
            alert('메시지 등록 중 오류가 발생했습니다.');
        }
    });
}

async function loadGuestbookNotes() {
    const container = document.getElementById('guestbook-list');
    if (!container) return;

    try {
        const { data, error } = await supabase
            .from('guestbook')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        if (!data || data.length === 0) {
            container.innerHTML = `<div style="grid-column: span 12; text-align:center; color: var(--color-ink-muted-48); padding: 20px;">첫 번째 메시지를 남겨보세요! ✨</div>`;
            return;
        }

        container.innerHTML = data.map(item => `
            <div class="guest-note">
                <div class="guest-note-header">
                    <span>${item.author || '익명'}</span>
                    <span class="guest-note-date">${new Date(item.created_at).toLocaleDateString('ko-KR')}</span>
                </div>
                <div style="font-size: 15px; color: var(--color-ink); line-height: 1.5;">
                    ${item.content}
                </div>
            </div>
        `).join('');
    } catch (err) {
        console.error('Guestbook load error:', err);
    }
}
