
// Map of path -> init function module
const routes = {
    'writings.html': '/js/page-writings.js',
    'photography.html': '/js/page-photography.js',
    'community.html': '/js/page-community.js',
    'blog.html': null // Home page, might default to no script or checking script.js
};

// Store current cleanup function
let currentCleanup = null;

export function initRouter() {
    const appContainer = document.getElementById('app-content');
    if (!appContainer) {
        console.error("Router: #app-content not found. Router disabled.");
        return;
    }

    // Handle initial load
    handleLocation();

    // Intercept clicks
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link) return;

        // Skip external links, anchors, or new tabs
        if (link.origin !== window.location.origin ||
            link.target === '_blank' ||
            link.getAttribute('href').startsWith('#') ||
            link.getAttribute('download')) return;

        e.preventDefault();
        const href = link.getAttribute('href');

        // Push state
        window.history.pushState({}, "", href);
        handleLocation();
    });

    // Handle Back/Forward
    window.addEventListener('popstate', handleLocation);
}

async function handleLocation() {
    const path = window.location.pathname.split('/').pop() || 'blog.html';
    // If root '/', default to blog.html
    const file = path === '' || path === '/' ? 'blog.html' : path;

    console.log(`Router: Navigating to ${file}`);

    // Cleanup previous page
    if (currentCleanup) {
        currentCleanup();
        currentCleanup = null;
    }

    const appContainer = document.getElementById('app-content');

    // Add simple transition fade out
    appContainer.style.opacity = '0';

    // Wait for fade out
    await new Promise(r => setTimeout(r, 200));

    try {
        // Fetch new HTML
        const response = await fetch(file);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const html = await response.text();

        // Parse HTML to extract body content
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const fetchedAppContent = doc.getElementById('app-content');

        if (fetchedAppContent) {
            // If target has #app-content (like blog.html), take its inner content (preserves structure inside)
            appContainer.innerHTML = fetchedAppContent.innerHTML;
        } else {
            // Fallback for pages without #app-content (legacy pages): Try to find <main>
            const fetchedMain = doc.querySelector('main');
            if (fetchedMain) {
                // Use outerHTML to include the <main> tag and its classes
                appContainer.innerHTML = fetchedMain.outerHTML;
            } else {
                // Last resort
                appContainer.innerHTML = doc.body.innerHTML;
            }
        }

        // Re-run standard scripts if needed (like script.js logic if it's generic)
        // But better to use specific page inits.

        // Init Page Script
        const scriptPath = routes[file];
        if (scriptPath) {
            // Dynamic import
            // Adjust path if needed (relative vs absolute)
            // imports are relative to this file location usually or root
            const module = await import(getRelativePath(scriptPath));

            // Determine init function name
            let initFunc;
            if (file.includes('writings')) initFunc = module.initWritings;
            else if (file.includes('photography')) initFunc = module.initPhotography;
            else if (file.includes('community')) initFunc = module.initCommunity;

            if (initFunc) {
                initFunc(appContainer);
            }

            // Save cleanup
            if (file.includes('writings')) currentCleanup = module.cleanupWritings;
            else if (file.includes('photography')) currentCleanup = module.cleanupPhotography;
            else if (file.includes('community')) currentCleanup = module.cleanupCommunity;
        } else {
            // Maybe home page logic?
            // If it's blog.html, we might need to re-init some home-specifics if they were cleaned up.
            // For now, assume home page is static or handled by global script.js (but global script runs once).
            // We might need to refactor script.js if home page content is dynamic.

            // Re-apply Tailwind dark mode if class persistence is an issue (usually on <html> so it's fine)
        }

        // Scroll to top
        window.scrollTo(0, 0);

    } catch (e) {
        console.error("Router Error:", e);
        appContainer.innerHTML = `<div class="p-10 text-center">Failed to load content. <a href="${file}" class="underline">Try reloading</a></div>`;
    }

    // Fade in
    appContainer.style.opacity = '1';
}

function getRelativePath(path) {
    // Basic helper to handle import paths
    // If path starts with /, it's absolute from root. 
    // `import` usually works fine with relative ./ or absolute /
    return '.' + path; // assuming router.js is in /js/ and we want ./page-writings.js
}
