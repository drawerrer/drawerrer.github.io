
import { db } from './firebase-config.js';
import { collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

export function initMusicPlayer() {
    console.log("Initializing Music Player...");
    // 1. Inject Styles
    const style = document.createElement('style');
    style.textContent = `
        /* Music Player Container */
        #musicPlayerContainer {
            position: fixed;
            bottom: calc(20px + env(safe-area-inset-bottom));
            right: 20px;
            z-index: 2147483647;
            font-family: 'Inter', sans-serif;
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        @media (max-width: 768px) {
            .music-fab {
                width: 60px !important;
                height: 60px !important;
            }
            .music-fab span {
                font-size: 32px !important;
            }
        }

        /* Minimized State (Fab) */
        .music-fab {
            width: 50px;
            height: 50px;
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border-radius: 50%;
            box-shadow: 0 4px 10px rgba(0,0,0,0.2), inset 0 0 0 1px rgba(255,255,255,0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: transform 0.2s;
        }
        .music-fab:hover { transform: scale(1.1); }
        .music-fab span { font-size: 24px; color: #fff; text-shadow: 0 1px 2px rgba(0,0,0,0.3); }

        /* Expanded State (iPod Glass) */
        .ipod-body {
            width: 200px;
            height: 320px;
            border-radius: 24px;
            background: linear-gradient(148deg, rgba(224, 224, 224, 0.20) 0%, rgba(189, 189, 189, 0.20) 50%, rgba(158, 158, 158, 0.20) 100%);
            box-shadow: 0 1px 1px 0 rgba(255, 255, 255, 0.80) inset, 0 10px 30px 0 rgba(0, 0, 0, 0.30);
            backdrop-filter: blur(15px);
            -webkit-backdrop-filter: blur(15px);
            display: flex;
            flex-direction: column;
            padding: 20px;
            gap: 20px;
            transform-origin: bottom right;
        }

        .hidden-player { display: none !important; }

        /* Screen */
        .ipod-screen {
            background: rgba(255, 255, 255, 0.5);
            border-radius: 6px;
            height: 110px;
            overflow: hidden;
            position: relative;
            display: flex;
            flex-direction: column;
            box-shadow: inset 0 1px 3px rgba(0,0,0,0.1);
        }
        
        .screen-header {
            padding: 4px 8px;
            font-size: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-weight: 600;
            color: #555;
            border-bottom: 1px solid rgba(0,0,0,0.05);
        }

        .screen-content {
            flex: 1;
            padding: 10px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
        }

        .track-title { font-size: 13px; font-weight: 700; color: #222; margin-bottom: 4px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; line-height: 1.2;}
        .track-artist { font-size: 11px; color: #555; font-weight: 500; }
        
        /* Playlist Overlay within Screen */
        .screen-playlist {
            position: absolute;
            inset: 0;
            background: rgba(255,255,255,0.95);
            z-index: 10;
            overflow-y: auto;
            font-size: 11px;
            display: none;
        }
        .screen-playlist.show { display: block; }
        .playlist-item {
            padding: 6px 10px;
            border-bottom: 1px solid rgba(0,0,0,0.05);
            cursor: pointer;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            color: #444;
        }
        .playlist-item:hover { background: rgba(0,0,0,0.05); }
        .playlist-item.active { background: #555; color: white; font-weight: bold; }

        /* Controls (Click Wheel) */
        .click-wheel-area {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .click-wheel {
            width: 140px;
            height: 140px;
            border-radius: 9999px;
            background: radial-gradient(70.71% 70.71% at 50% 50%, rgba(255, 255, 255, 0.20) 0%, rgba(245, 245, 245, 0.20) 100%);
            box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.10) inset, 0 2px 2px 0 rgba(255, 255, 255, 0.50);
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .wheel-btn {
            position: absolute;
            color: #f5f5f5; /* Light icon color for glass look */
            text-shadow: 0 1px 2px rgba(0,0,0,0.2);
            font-size: 10px;
            font-weight: 700;
            cursor: pointer;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: opacity 0.2s;
        }
        .wheel-btn:hover { opacity: 0.8; }
        
        .btn-menu { top: 15px; font-size: 9px; letter-spacing: 1px; }
        .btn-prev { left: 15px; }
        .btn-next { right: 15px; }
        .btn-play { bottom: 15px; }

        .center-btn {
            width: 48px;
            height: 48px;
            border-radius: 9999px;
            background: linear-gradient(135deg, rgba(209, 209, 209, 0.80) 0%, rgba(176, 176, 176, 0.80) 100%);
            box-shadow: 0 1px 2px 0 rgba(255, 255, 255, 0.50) inset, 0 1px 2px 0 rgba(0, 0, 0, 0.20);
            cursor: pointer;
        }
        .center-btn:active { transform: scale(0.98); box-shadow: inset 0 2px 4px rgba(0,0,0,0.2); }

        /* YouTube Hidden */
        #ytPlayerFrame { position: absolute; top: -9999px; left: -9999px; width: 0; height: 0; opacity: 0; pointer-events: none; }
    `;
    document.head.appendChild(style);

    // 2. Inject HTML
    const container = document.createElement('div');
    container.id = 'musicPlayerContainer';
    container.innerHTML = `
        <!-- Minimized -->
        <div id="musicFab" class="music-fab">
            <span class="material-symbols-outlined">music_note</span>
        </div>

        <!-- Expanded -->
        <div id="ipodBody" class="ipod-body hidden-player">
            <div class="ipod-screen">
                <div class="screen-header">
                    <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[10px]">lock</span></span>
                    <span id="playerStateIcon" class="material-symbols-outlined text-[12px]">stop</span>
                    <span id="batteryIcon" class="material-symbols-outlined text-[12px] rotate-90">battery_full</span>
                </div>
                <!-- Main View -->
                <div class="screen-content" id="screenMain">
                    <div id="trackTitle" class="track-title">Not Playing</div>
                    <div id="trackArtist" class="track-artist">Select a Song</div>
                    <div class="mt-3 w-3/4 h-1 bg-gray-300/50 rounded-full overflow-hidden">
                        <div id="progressBar" class="h-full bg-blue-500 w-0"></div>
                    </div>
                </div>
                <!-- Playlist View -->
                <div class="screen-playlist scrollbar-hide" id="screenPlaylist">
                    <div class="p-2 text-center text-gray-500 italic">Empty</div>
                </div>
            </div>

            <div class="click-wheel-area">
                <div class="click-wheel">
                    <div class="wheel-btn btn-menu" id="btnMenu">MENU</div>
                    <div class="wheel-btn btn-prev" id="btnPrev"><span class="material-symbols-outlined text-[20px]">skip_previous</span></div>
                    <div class="wheel-btn btn-next" id="btnNext"><span class="material-symbols-outlined text-[20px]">skip_next</span></div>
                    <div class="wheel-btn btn-play" id="btnPlayPause"><span class="material-symbols-outlined text-[20px]">play_arrow</span></div> <!-- Label shows Play/Pause -->
                    
                    <div class="center-btn" id="btnCenter"></div>
                </div>
            </div>
        </div>
        
        <!-- YouTube API Placeholder -->
        <div id="ytPlayerPlaceholder"></div>
    `;
    document.body.appendChild(container);

    // 3. Logic
    let player;
    let playlist = [];
    let currentIndex = 0;
    let isPlaying = false;
    let isPlaylistView = false;

    const fab = document.getElementById('musicFab');
    const body = document.getElementById('ipodBody');
    const screenMain = document.getElementById('screenMain');
    const screenPlaylist = document.getElementById('screenPlaylist');

    // Elements
    const elTitle = document.getElementById('trackTitle');
    const elArtist = document.getElementById('trackArtist');
    const elProgress = document.getElementById('progressBar');
    const elStateIcon = document.getElementById('playerStateIcon');
    const btnPlayPauseIcon = document.querySelector('#btnPlayPause span');

    // UI Toggles
    fab.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent immediate closing
        fab.classList.add('hidden-player');
        body.classList.remove('hidden-player');
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!body.classList.contains('hidden-player') && !container.contains(e.target)) {
            body.classList.add('hidden-player');
            fab.classList.remove('hidden-player');
        }
    });

    // Minmize when clicking outside? Or maybe a close button?
    // Let's make "MENU" toggle playlist, and long press MENU minimize? 
    // For now, let's add a simple close logic on "MENU" if playlist is NOT open, or click outside.
    // Simplest: Click MENU to toggle playlist. 
    // Let's add a minimize button in code for UX safety or just use MENU to toggle between Playlist/Main/Minimize?
    // Let's make MENU: Main -> Playlist -> Minimized -> Main

    document.getElementById('btnMenu').addEventListener('click', () => {
        if (!isPlaylistView && !body.classList.contains('hidden-player')) {
            // Go to Playlist
            isPlaylistView = true;
            screenPlaylist.classList.add('show');
        } else if (isPlaylistView) {
            // Verify if we want to minimize or go back
            // Let's go back to Main
            isPlaylistView = false;
            screenPlaylist.classList.remove('show');
        } else {
            // Already in main, minimize
            body.classList.add('hidden-player');
            fab.classList.remove('hidden-player');
        }
    });

    // Load Playlist
    async function loadPlaylist() {
        console.log("Loading playlist...");
        try {
            const q = query(collection(db, "music"), orderBy("createdAt", "desc"));
            const snapshot = await getDocs(q);
            console.log(`Snapshot size: ${snapshot.size}`);
            playlist = [];
            snapshot.forEach(doc => {
                const data = doc.data();
                console.log("Track found:", data.title);
                playlist.push({ id: doc.id, ...data });
            });

            renderPlaylist();

            if (playlist.length > 0) {
                console.log("Playlist loaded, loading first track.");
                loadTrack(0, false); // Load first track but don't autoplay initially
            } else {
                console.warn("Playlist is empty.");
                screenPlaylist.innerHTML = '<div class="p-2 text-center text-gray-500 italic">No songs found</div>';
            }
        } catch (e) {
            console.error("Music Load Error", e);
            elTitle.textContent = "Error Loading";
        }
    }

    function renderPlaylist() {
        screenPlaylist.innerHTML = '';
        playlist.forEach((track, index) => {
            const div = document.createElement('div');
            div.className = `playlist-item ${index === currentIndex ? 'active' : ''}`;
            div.textContent = track.title;
            div.onclick = () => {
                loadTrack(index, true);
                isPlaylistView = false;
                screenPlaylist.classList.remove('show');
            };
            screenPlaylist.appendChild(div);
        });
    }

    function loadTrack(index, autoplay = true) {
        if (index < 0 || index >= playlist.length) return;
        currentIndex = index;
        const track = playlist[index];

        elTitle.textContent = track.title;
        elArtist.textContent = track.artist;

        if (player && typeof player.loadVideoById === 'function') {
            if (autoplay) {
                player.loadVideoById(track.videoId);
                isPlaying = true;
            } else {
                player.cueVideoById(track.videoId);
                isPlaying = false;
            }
            updateUIState();
        }
        renderPlaylist(); // Update active state
    }

    // YouTube API Setup
    window.onYouTubeIframeAPIReady = function () {
        player = new YT.Player('ytPlayerPlaceholder', {
            height: '0',
            width: '0',
            playerVars: {
                'playsinline': 1,
                'controls': 0,
                'disablekb': 1
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    };

    function onPlayerReady(event) {
        // Player ready
        if (playlist.length > 0) {
            loadTrack(currentIndex, false);
        }
        // Set Volume
        player.setVolume(50);
    }

    function onPlayerStateChange(event) {
        if (event.data === YT.PlayerState.PLAYING) {
            isPlaying = true;
            elStateIcon.textContent = 'play_arrow';
            btnPlayPauseIcon.textContent = 'pause';
            startProgressLoop();
        } else if (event.data === YT.PlayerState.PAUSED) {
            isPlaying = false;
            elStateIcon.textContent = 'pause';
            btnPlayPauseIcon.textContent = 'play_arrow';
            stopProgressLoop();
        } else if (event.data === YT.PlayerState.ENDED) {
            // Auto next
            nextTrack();
        }
    }

    function togglePlay() {
        if (!player) return;
        if (isPlaying) {
            player.pauseVideo();
        } else {
            player.playVideo();
        }
    }

    function prevTrack() {
        let newIndex = currentIndex - 1;
        if (newIndex < 0) newIndex = playlist.length - 1;
        loadTrack(newIndex, true);
    }

    function nextTrack() {
        let newIndex = currentIndex + 1;
        if (newIndex >= playlist.length) newIndex = 0;
        loadTrack(newIndex, true);
    }

    // Controls
    document.getElementById('btnCenter').addEventListener('click', togglePlay);
    document.getElementById('btnPlayPause').addEventListener('click', togglePlay); // Bottom button also toggles play
    document.getElementById('btnPrev').addEventListener('click', prevTrack);
    document.getElementById('btnNext').addEventListener('click', nextTrack);



    // Load Youtube Script
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Initial Load
    loadPlaylist();

    // Progress Loop
    let progressInterval;
    function startProgressLoop() {
        clearInterval(progressInterval);
        progressInterval = setInterval(() => {
            if (player && player.getCurrentTime && player.getDuration) {
                const current = player.getCurrentTime();
                const total = player.getDuration();
                if (total > 0) {
                    const pct = (current / total) * 100;
                    elProgress.style.width = `${pct}%`;
                }
            }
        }, 1000);
    }
    function stopProgressLoop() {
        clearInterval(progressInterval);
    }
}
