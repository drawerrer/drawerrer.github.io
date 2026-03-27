
import { supabase } from './supabase-config.js';

let cleanupFunc = null;

export function initCommunity(container) {
    const guestbookForm = container.querySelector('#guestbookForm');
    const guestbookList = container.querySelector('#guestbookList');
    // visitorName and visitorMessage are inside the form, we can query them on submit or cache them

    // Functions
    async function renderGuestbook() {
        if (!guestbookList) return;
        guestbookList.innerHTML = '<div class="text-center py-10 opacity-50"><p class="font-serif italic text-stone-500">Loading messages...</p></div>';

        try {
            const { data: messages, error } = await supabase
                .from('guestbook')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(50);

            if (error) throw error;

            guestbookList.innerHTML = '';

            if (!messages || messages.length === 0) {
                guestbookList.innerHTML = '<div class="text-center py-10 opacity-50"><p class="font-serif italic text-stone-500">Be the first to leave a note.</p></div>';
                return;
            }

            messages.forEach((note) => {
                const date = note.created_at ? new Date(note.created_at).toLocaleDateString('en-CA').replace(/-/g, '.') : (note.date || 'Unknown');

                const card = document.createElement('div');
                const rotate = Math.random() * 2 - 1;

                card.className = `p-4 shadow-sm border border-black/5 transform transition-transform hover:scale-[1.01] ${note.color || 'bg-[#FDFCF9]'}`;
                card.style.transform = `rotate(${rotate}deg)`;

                card.innerHTML = `
                    <div class="flex justify-between items-start mb-2 opacity-60">
                            <span class="font-display text-[10px] tracking-widest uppercase">MEMO</span>
                            <span class="font-mono text-[9px]">${date}</span>
                    </div>
                    <p class="font-serif text-stone-800 text-sm leading-relaxed mb-3">${note.message}</p>
                    <div class="flex justify-end">
                        <span class="font-script text-lg text-stone-600">- ${note.name}</span>
                    </div>
                    <!-- Paper texture overlay -->
                    <div class="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none"></div>
                `;

                guestbookList.appendChild(card);
            });
        } catch (error) {
            console.error("Error loading guestbook:", error);
            guestbookList.innerHTML = '<div class="text-center py-10 opacity-50"><p class="font-serif italic text-red-500">Error loading messages.</p></div>';
        }
    }

    async function handleGuestbookSubmit(e) {
        e.preventDefault();
        const visitorName = container.querySelector('#visitorName');
        const visitorMessage = container.querySelector('#visitorMessage');

        if (!visitorName || !visitorMessage) return;

        const name = visitorName.value;
        const message = visitorMessage.value;

        const colors = ["bg-[#FDFCF9]", "bg-[#F9F7F2]", "bg-[#F0EAD6]", "bg-[#EFE6D5]"];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        try {
            const { error } = await supabase.from('guestbook').insert([{
                name,
                message,
                color: randomColor,
                date: new Date().toLocaleDateString('en-CA').replace(/-/g, '.')
            }]);

            if (error) throw error;

            visitorName.value = '';
            visitorMessage.value = '';
            renderGuestbook();
        } catch (error) {
            console.error("Error signing guestbook:", error);
            alert("Failed to sign guestbook.");
        }
    }

    // Init
    renderGuestbook();

    if (guestbookForm) guestbookForm.addEventListener('submit', handleGuestbookSubmit);

    cleanupFunc = () => {
        if (guestbookForm) guestbookForm.removeEventListener('submit', handleGuestbookSubmit);
    };
}

export function cleanupCommunity() {
    if (cleanupFunc) cleanupFunc();
}
