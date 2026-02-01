document.addEventListener("DOMContentLoaded", function () {
    // --- Existing Tab Logic ---
    const tabs = {
        diary: {
            link: document.getElementById('diaryLink'),
            section: document.getElementById('diary')
        },
        photos: {
            link: document.getElementById('photoLink'),
            section: document.getElementById('photoTravel')
        }
    };

    const header = document.querySelector('header');

    // Scroll Effect for Header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Tab Switching Logic
    function switchTab(activeKey) {
        Object.keys(tabs).forEach(key => {
            const { link, section } = tabs[key];
            if (key === activeKey) {
                link.classList.add('active');
                section.classList.add('active');
            } else {
                link.classList.remove('active');
                section.classList.remove('active');
            }
        });

        // Reset view to list when switching main tabs
        if (activeKey === 'diary') {
            resetDiaryView();
        } else if (activeKey === 'photos') {
            // Initialize Space View if needed
            if (!spaceInitialized) {
                initSpaceView();
            }
        }
    }

    Object.keys(tabs).forEach(key => {
        tabs[key].link.addEventListener('click', (e) => {
            e.preventDefault();
            switchTab(key);
        });
    });

    // --- Diary Logic ---
    const diaryList = document.querySelector('#diary .post-list');
    const diaryContentDivs = document.querySelectorAll('.post-content');
    const diaryItems = document.querySelectorAll('#diary .post-list li');

    diaryItems.forEach(item => {
        item.addEventListener('click', () => {
            const id = item.dataset.id;
            const targetContent = document.querySelector(`#post${id}`);

            if (targetContent) {
                diaryList.style.display = 'none';
                diaryContentDivs.forEach(c => c.classList.remove('active'));
                targetContent.classList.add('active');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });

    document.querySelectorAll('.back-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            resetDiaryView();
        });
    });

    function resetDiaryView() {
        diaryContentDivs.forEach(c => c.classList.remove('active'));
        setTimeout(() => {
            diaryList.style.display = 'block';
        }, 50);
    }


    // --- Floating Space Logic ---
    let spaceInitialized = false;
    let animationFrameId;
    const items = []; // Stores physics objects
    const spaceContainer = document.getElementById('photoSpace');
    const gridContainer = document.getElementById('photoGrid');
    const btnSpace = document.getElementById('btnSpace');
    const btnGrid = document.getElementById('btnGrid');

    // Toggle Buttons
    if (btnSpace && btnGrid) {
        btnSpace.addEventListener('click', () => {
            setPhotoView('space');
        });

        btnGrid.addEventListener('click', () => {
            setPhotoView('grid');
        });
    }

    function setPhotoView(mode) {
        if (mode === 'space') {
            spaceContainer.classList.add('active');
            gridContainer.classList.remove('active');
            btnSpace.classList.add('active');
            btnGrid.classList.remove('active');
            initSpaceView(); // Ensure fresh state or resume
        } else {
            spaceContainer.classList.remove('active');
            gridContainer.classList.add('active');
            btnSpace.classList.remove('active');
            btnGrid.classList.add('active');
            stopSpaceAnimation();
        }
    }

    function initSpaceView() {
        if (spaceInitialized && items.length > 0) {
            startSpaceAnimation();
            return;
        }

        // Gather images from the grid to populate space
        const sourceImages = gridContainer.querySelectorAll('img');
        spaceContainer.innerHTML = ''; // Clear previous
        items.length = 0; // Clear physics array

        const containerRect = spaceContainer.getBoundingClientRect();
        const containerW = containerRect.width || window.innerWidth;
        const containerH = containerRect.height || window.innerHeight * 0.8;

        sourceImages.forEach((img, index) => {
            // limit to first 15 images to avoid chaos if too many
            if (index > 20) return;

            const div = document.createElement('div');
            div.className = 'floating-item';

            const newImg = img.cloneNode();
            newImg.loading = "eager"; // Load immediately for space
            div.appendChild(newImg);
            spaceContainer.appendChild(div);

            // Random initial position
            const x = Math.random() * (containerW - 150);
            const y = Math.random() * (containerH - 150);

            // Random velocity profile (drifting)
            const dx = (Math.random() - 0.5) * 0.3; // Slow drift
            const dy = (Math.random() - 0.5) * 0.3;

            items.push({
                element: div,
                x: x,
                y: y,
                dx: dx,
                dy: dy,
                isDragging: false,
                width: 150,
                height: 150 // estimated, will adjust if needed
            });

            // Set initial pos
            div.style.transform = `translate(${x}px, ${y}px)`;

            // Drag Events
            initDrag(div, index);
        });

        spaceInitialized = true;
        startSpaceAnimation();
    }

    function startSpaceAnimation() {
        if (!animationFrameId) {
            animate();
        }
    }

    function stopSpaceAnimation() {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
    }

    function animate() {
        const containerRect = spaceContainer.getBoundingClientRect();
        const containerW = containerRect.width;
        const containerH = containerRect.height;

        items.forEach(item => {
            if (item.isDragging) return;

            item.x += item.dx;
            item.y += item.dy;

            // Bounce off walls
            if (item.x < 0 || item.x > containerW - item.width) {
                item.dx *= -1;
                item.x = Math.max(0, Math.min(item.x, containerW - item.width));
            }
            if (item.y < 0 || item.y > containerH - item.height) {
                item.dy *= -1;
                item.y = Math.max(0, Math.min(item.y, containerH - item.height));
            }

            item.element.style.transform = `translate(${item.x}px, ${item.y}px)`;
        });

        animationFrameId = requestAnimationFrame(animate);
    }

    // Drag Interaction
    function initDrag(element, index) {
        let startX, startY;

        const onMouseDown = (e) => {
            e.preventDefault(); // Prevent default drag behavior
            const item = items[index];
            item.isDragging = true;

            // Bring to front
            items.forEach(i => i.element.style.zIndex = 1);
            element.style.zIndex = 100;

            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;

            startX = clientX - item.x;
            startY = clientY - item.y;

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('touchmove', onMouseMove, { passive: false });
            document.addEventListener('mouseup', onMouseUp);
            document.addEventListener('touchend', onMouseUp);
        };

        const onMouseMove = (e) => {
            e.preventDefault();
            const item = items[index];
            if (!item.isDragging) return;

            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;

            item.x = clientX - startX;
            item.y = clientY - startY;

            element.style.transform = `translate(${item.x}px, ${item.y}px)`;
        };

        const onMouseUp = () => {
            const item = items[index];
            item.isDragging = false;

            // Give a little push after let go? (optional polish)
            // For now just resume drifting logic

            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('touchmove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('touchend', onMouseUp);
        };

        element.addEventListener('mousedown', onMouseDown);
        element.addEventListener('touchstart', onMouseDown, { passive: false });
    }
});
