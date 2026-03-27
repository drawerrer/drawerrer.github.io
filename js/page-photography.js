
import { supabase } from './supabase-config.js';

let cleanupFunc = null;

export function initPhotography(container) {
    const grid = container.querySelector('#photoGrid');
    const refreshBtn = container.querySelector('#refreshBtn'); // This might be outside the container if nav is separate? 
    // In photography.html, nav is outside main but inside body. Router should replace body content or specific app container.
    // We will assume 'container' includes the nav if we mark it so in blog.html structure later.
    // OR we re-query document if elements are fixed. 
    // For now, let's query document for fixed elements like nav if they are not in the dynamic container.
    // However, in the SPA plan, we want to swap #app-content. 
    // If the nav is specific to photography, it should be inside #app-content.

    // In photography.html, the nav is: <nav class="fixed top-8 right-8 z-50 flex flex-col items-end gap-3">
    // This should be part of the swapped content.

    const photoModal = container.querySelector('#photoModal');
    const modalContent = container.querySelector('#modalContent');

    // Elements might be null if not found (e.g. if structure changed).

    let currentPhotoId = null;
    let allPhotos = [];
    // Functions

    async function openPhotoModal(photoId, url, title, content, date) {
        currentPhotoId = photoId;
        const img = container.querySelector('#modalImage');
        const tit = container.querySelector('#modalTitle');
        const desc = container.querySelector('#modalDescription');
        const dat = container.querySelector('#modalDate');

        if (img) img.src = url;
        if (tit) tit.textContent = title || "Untitled Memory";
        if (desc) desc.textContent = content || "No story available.";
        if (dat) dat.textContent = date || "Unknown Date";

        if (photoModal) photoModal.classList.remove('hidden');

        setTimeout(() => {
            if (modalContent) {
                modalContent.classList.remove('scale-95', 'opacity-0');
                modalContent.classList.add('scale-100', 'opacity-100');
            }
        }, 10);
    }

    function closePhotoModal() {
        if (modalContent) {
            modalContent.classList.remove('scale-100', 'opacity-100');
            modalContent.classList.add('scale-95', 'opacity-0');
        }
        setTimeout(() => {
            if (photoModal) photoModal.classList.add('hidden');
            currentPhotoId = null;
        }, 300);
    }

    async function loadPhotos() {
        if (!grid) return;
        try {
            const { data: photos, error } = await supabase
                .from('photos')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            allPhotos = photos || [];

            renderGrid(true);
        } catch (error) {
            console.error("Error loading specific photos:", error);
            grid.innerHTML = '<div class="col-span-full text-center text-stone-500 italic pt-20">Loading memories failed.</div>';
        }
    }

    function shuffleArray(array) {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    function renderGrid(animate = false) {
        if (!grid) return;
        grid.innerHTML = '';

        if (allPhotos.length === 0) {
            grid.innerHTML = '<div class="col-span-full text-center text-stone-500 italic pt-20">No photos uploaded yet.</div>';
            return;
        }

        const shuffled = shuffleArray(allPhotos);
        const selectedImages = shuffled.slice(0, 15);

        selectedImages.forEach((photo, index) => {
            const containerDiv = document.createElement('div');
            const polaroidRotation = Math.random() * 6 - 3;

            containerDiv.className = "polaroid-frame group relative aspect-[4/5] bg-white p-3 md:p-2 shadow-lg hover:shadow-2xl hover:scale-[1.02] hover:z-10 transition-all duration-300 cursor-pointer overflow-hidden transform-gpu";
            containerDiv.style.transform = `rotate(${polaroidRotation}deg)`;

            const dateStr = photo.created_at ? new Date(photo.created_at).toLocaleDateString() : '';
            const displayTitle = photo.title || photo.caption || 'Untitled';
            const displayContent = photo.content || '';

            containerDiv.onclick = () => openPhotoModal(photo.id, photo.url, displayTitle, displayContent, dateStr);

            const img = document.createElement('img');
            img.src = photo.url;
            img.className = "w-full h-[85%] object-cover block bg-gray-100";
            img.loading = "lazy";
            img.alt = displayTitle;

            const caption = document.createElement('div');
            caption.className = "h-[15%] flex items-center justify-center";
            const captionText = displayTitle ? displayTitle : `#${index + 1}`;
            caption.innerHTML = `<span class="font-elegant text-stone-400 text-lg md:text-sm truncate px-2">${captionText}</span>`;

            containerDiv.appendChild(img);
            containerDiv.appendChild(caption);
            grid.appendChild(containerDiv);

            if (animate) {
                containerDiv.style.opacity = '0';
                containerDiv.style.transform += ' translateY(20px)';
                setTimeout(() => {
                    containerDiv.style.transition = 'all 0.6s ease';
                    containerDiv.style.opacity = '1';
                    containerDiv.style.transform = `rotate(${polaroidRotation}deg)`;
                }, index * 50);
            }
        });
    }

    function triggerShuffle() {
        const frames = container.querySelectorAll('.polaroid-frame');
        frames.forEach(frame => {
            const isGhost = Math.random() > 0.5;
            const isBur = Math.random() > 0.3;
            if (isGhost) frame.classList.add('ghosting-effect');
            if (isBur) frame.classList.add('motion-blur-sm');
        });

        if (grid) grid.classList.add('shaking');

        setTimeout(() => {
            renderGrid(true);
            const newFrames = container.querySelectorAll('.polaroid-frame');
            newFrames.forEach(frame => {
                frame.classList.add('motion-blur-sm');
            });

            setTimeout(() => {
                if (grid) grid.classList.remove('shaking');
                newFrames.forEach(frame => {
                    frame.classList.remove('motion-blur-sm');
                    frame.classList.remove('ghosting-effect');
                });
            }, 300);

        }, 250);
    }

    // Attach functionality
    loadPhotos();

    if (refreshBtn) refreshBtn.addEventListener('click', triggerShuffle);

    // Global Bindings (for onclicks in HTML string)
    window.openPhotoModal = openPhotoModal;
    window.closePhotoModal = closePhotoModal;

    cleanupFunc = () => {
        if (refreshBtn) refreshBtn.removeEventListener('click', triggerShuffle);

        delete window.openPhotoModal;
        delete window.closePhotoModal;
    };
}

export function cleanupPhotography() {
    if (cleanupFunc) cleanupFunc();
}
