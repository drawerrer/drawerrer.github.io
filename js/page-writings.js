
import { db } from './firebase-config.js';
import { collection, getDocs, addDoc, query, orderBy, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

let cleanupFunc = null;

export function initWritings(container) {
    // Inject HTML Content if not present (handled by router, but we can verify)
    // For now, we assume container has the HTML structure of writings.html's body content

    const folderView = container.querySelector('#folderView');
    const stampListContainer = container.querySelector('#stampListContainer');
    const readingView = container.querySelector('#readingView');
    const docTitle = container.querySelector('#docTitle');
    const docDateDisplay = container.querySelector('#docDateDisplay');

    const docContent = container.querySelector('#docContent');

    let currentDocId = '';
    let cachedEssays = {};

    // Palette
    const palette = [
        '#CCA43B', '#A4B8E0', '#E8E0D0', '#F0EAD6', '#A4C639', '#E97451', '#4B3621'
    ];

    // Functions
    async function loadFolders() {
        if (!stampListContainer) return;
        stampListContainer.innerHTML = '<div class="text-center pt-10 text-stone-500 italic">Loading archive...</div>';

        try {
            const q = query(collection(db, "essays"), orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);

            cachedEssays = {};
            const sortedEssays = [];

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                cachedEssays[doc.id] = data;
                sortedEssays.push({ id: doc.id, ...data });
            });

            stampListContainer.innerHTML = '';

            if (sortedEssays.length === 0) {
                stampListContainer.innerHTML = '<div class="text-center pt-10 text-stone-500 italic">No essays found.</div>';
                return;
            }

            sortedEssays.forEach((essay, index) => {
                const color = palette[index % palette.length];
                const strip = document.createElement('div');

                strip.className = "ticket-strip w-full h-16 flex items-center justify-between px-6 md:px-12 cursor-pointer hover:brightness-110 transition-all -mt-[2px] relative z-0 hover:z-10";
                strip.style.backgroundColor = color;
                strip.onclick = () => openReadingView(essay.id);

                const stageText = `ARCHIVE ${String(sortedEssays.length - index).padStart(2, '0')}`;

                strip.innerHTML = `
                    <div class="flex items-center gap-8 w-full">
                        <span class="font-mono text-[10px] uppercase tracking-widest opacity-60 w-20 shrink-0 border-b border-black/10 pb-1">${stageText}</span>
                        <span class="font-bold text-sm md:text-base uppercase tracking-wider text-stone-800/90 truncate flex-1 block text-center">${essay.title}</span>
                         <span class="font-mono text-[10px] uppercase tracking-widest opacity-60 w-20 shrink-0 text-right border-b border-black/10 pb-1">${essay.date}</span>
                    </div>
                `;

                stampListContainer.appendChild(strip);
            });
        } catch (error) {
            console.error("Error loading essays:", error);
            stampListContainer.innerHTML = '<div class="text-center pt-10 text-red-500 italic">Failed to load archive.</div>';
        }
    }

    function openReadingView(id) {
        folderView.classList.add('opacity-0');
        setTimeout(() => {
            folderView.classList.add('hidden');
            readingView.classList.remove('hidden');
            readingView.querySelector('div').scrollTop = 0;

            setTimeout(() => {
                readingView.classList.remove('opacity-0');
                loadEssayContent(id);
            }, 50);
        }, 500);
    }

    function closeReadingView() {
        readingView.classList.add('opacity-0');
        setTimeout(() => {
            readingView.classList.add('hidden');
            folderView.classList.remove('hidden');
            setTimeout(() => {
                folderView.classList.remove('opacity-0');
            }, 50);
        }, 500);
    }

    async function loadEssayContent(id) {
        const essay = cachedEssays[id];
        if (essay) {
            currentDocId = id;
            docTitle.textContent = essay.title;
            docDateDisplay.textContent = essay.date;
            docContent.innerHTML = essay.content;

        }
    }



    // Initialize
    loadFolders();



    // Expose close/open for global interaction if needed, or bind to elements
    // Since we are module based, we should bind clicks to elements inside container if possible
    // But specific buttons usually call global functions in the current HTML. 
    // We will attach global handlers for now to match HTML onclicks
    window.openReadingView = openReadingView;
    window.closeReadingView = closeReadingView;

    cleanupFunc = () => {

        delete window.openReadingView;
        delete window.closeReadingView;
    };
}

export function cleanupWritings() {
    if (cleanupFunc) cleanupFunc();
}
