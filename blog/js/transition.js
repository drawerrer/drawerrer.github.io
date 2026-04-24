document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('a');
    const container = document.querySelector('.page-container') || document.querySelector('.room-container');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Allow external links, anchor links, and pdfs to open normally
            if (!href || href.startsWith('http') || href.startsWith('#') || href.endsWith('.pdf') || link.getAttribute('target') === '_blank') {
                return;
            }

            e.preventDefault();

            // Apply exit animation
            if (container) {
                container.classList.add('fade-out');
            } else {
                document.body.style.animation = 'fadeOut 0.4s ease forwards';
            }

            // Navigate after animation
            setTimeout(() => {
                window.location.href = href;
            }, 400); // 400ms matches the fadeOut animation duration
        });
    });
});
