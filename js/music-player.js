
import { db } from '../firebase-config.js';
import { collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

export function initMusicPlayer() {
    // 1. Inject Styles
    const style = document.createElement('style');
    style.textContent = `
        /* Music Player Container */
        #musicPlayerContainer {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 9999;
            font-family: 'Inter', sans-serif;
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        /* Minimized State (Fab) */
        .music-fab {
            width: 50px;
            height: 50px;
            background: #e5e5e5;
            border-radius: 50%;
            box-shadow: 0 4px 10px rgba(0,0,0,0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            border: 1px solid #d4d4d4;
            transition: transform 0.2s;
        }
        .music-fab:hover { transform: scale(1.1); }
        .music-fab span { font-size: 24px; color: #555; }

        /* Expanded State (iPod) */
        .ipod-body {
            width: 200px;
            height: 320px;
            background: #fdfdfd;
            border-radius: 20px;
            box-shadow: 
                inset 0 0 10px rgba(0,0,0,0.05),
                0 20px 40px rgba(0,0,0,0.2);
            border: 1px solid #e0e0e0;
            display: flex;
            flex-direction: column;
            padding: 15px;
            gap: 15px;
            transform-origin: bottom right;
        }

        .hidden-player { display: none !important; }

        /* Screen */
        .ipod-screen {
            background: #fff;
            border: 2px solid #555;
            border-radius: 6px;
            height: 120px;
            overflow: hidden;
            position: relative;
            display: flex;
            flex-direction: column;
        }
        
        .screen-header {
            background: #eee;
            border-bottom: 1px solid #ccc;
            padding: 2px 5px;
            font-size: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-weight: bold;
            color: #555;
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

        .track-title { font-size: 12px; font-weight: bold; color: #333; margin-bottom: 4px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;}
        .track-artist { font-size: 10px; color: #666; }
        
        /* Playlist Overlay within Screen */
        .screen-playlist {
            position: absolute;
            inset: 0;
            background: #fff;
            z-index: 10;
            overflow-y: auto;
            font-size: 10px;
            display: none;
        }
        .screen-playlist.show { display: block; }
        .playlist-item {
            padding: 4px 8px;
            border-bottom: 1px solid #eee;
            cursor: pointer;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .playlist-item:hover { background: #3b82f6; color: white; }
        .playlist-item.active { background: #3b82f6; color: white; font-weight: bold; }

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
            background: #f0f0f0;
            border-radius: 50%;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }

        .wheel-btn {
            position: absolute;
            color: #999;
            font-size: 10px;
            font-weight: bold;
            cursor: pointer;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: color 0.2s;
        }
        .wheel-btn:hover { color: #555; }
        
        .btn-menu { top: 10px; }
        .btn-prev { left: 10px; }
        .btn-next { right: 10px; }
        .btn-play { bottom: 10px; }

        .center-btn {
            width: 50px;
            height: 50px;
            background: #ddd;
            border-radius: 50%;
            cursor: pointer;
            transition: background 0.2s;
        }
        .center-btn:active { background: #ccc; }

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
                    <span id="playerStateIcon" class="material-symbols-outlined text-[10px]">stop</span>
                    <span id="batteryIcon" class="material-symbols-outlined text-[10px] rotate-90">battery_full</span>
                </div>
                <!-- Main View -->
                <div class="screen-content" id="screenMain">
                    <div id="trackTitle" class="track-title">Not Playing</div>
                    <div id="trackArtist" class="track-artist">Select a Song</div>
                    <div class="mt-2 w-full h-1 bg-gray-200 rounded overflow-hidden">
                        <div id="progressBar" class="h-full bg-blue-500 w-0"></div>
                    </div>
                </div>
                <!-- Playlist View -->
                <div class="screen-playlist scrollbar-hide" id="screenPlaylist">
                    <div class="p-2 text-center text-gray-400 italic">Empty</div>
                </div>
            </div>

            <div class="click-wheel-area">
                <div class="click-wheel">
                    <div class="wheel-btn btn-menu" id="btnMenu">MENU</div>
                    <div class="wheel-btn btn-prev" id="btnPrev"><span class="material-symbols-outlined text-lg">skip_previous</span></div>
                    <div class="wheel-btn btn-next" id="btnNext"><span class="material-symbols-outlined text-lg">skip_next</span></div>
                    <div class="wheel-btn btn-play" id="btnPlayPause"><span class="material-symbols-outlined text-lg">play_arrow</span></div> <!-- Label shows Play/Pause -->
                    
                    <div class="center-btn" id="btnCenter"></div>
                </div>
            </div>
            
            <div class="text-center">
                 <input type="range" id="volumeSlider" min="0" max="100" value="50" class="w-3/4 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer">
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
    fab.addEventListener('click', () => {
        fab.classList.add('hidden-player');
        body.classList.remove('hidden-player');
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
        try {
            const q = query(collection(db, "music"), orderBy("createdAt", "desc"));
            const snapshot = await getDocs(q);
            playlist = [];
            snapshot.forEach(doc => playlist.push({ id: doc.id, ...doc.data() }));

            renderPlaylist();
            if (playlist.length > 0) {
                loadTrack(0, false); // Load first track but don't autoplay initially
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
        if(event.data === YT.PlayerState.PLAYING) {
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

    document.getElementById('volumeSlider').addEventListener('input', (e) => {
        if (player) player.setVolume(e.target.value);
    });

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
