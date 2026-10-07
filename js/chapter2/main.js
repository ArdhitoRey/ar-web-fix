import { state, dom, allVideos, videos } from "./state.js";
import { preloadPart, ensurePartLoaded, releasePartVideos } from "./loader.js";

// AREA IMPORT FUNGSI PART
import { playPart1, initPart1 } from './parts/part1.js';
import { playPart2, initPart2 } from './parts/part2.js';
import { playPart3, initPart3 } from './parts/part3.js';
import { playPart4, initPart4 } from "./parts/part4.js";
import { playPart5, initPart5 } from "./parts/part5.js";
import { playPart6, initPart6 } from "./parts/part6.js";
import { playPart7, initPart7 } from "./parts/part7.js";
import { playPart8, initPart8 } from "./parts/part8.js";
import './quiz.js';

// -----------------------------------------------------------------------------
// 1. PRIORITAS BUFFERING: MUAT HANYA PART 1 DI AWAL (LAZY LOADING)
// -----------------------------------------------------------------------------
console.log("🚀 [Chapter 2] Memulai pemuatan prioritas Part 1 (HTTP Disk Caching Aktif)...");
preloadPart(1);

// -----------------------------------------------------------------------------
// Kamera Streaming Helper (Cegah Black Screen & Suara Memulai Duluan)
// -----------------------------------------------------------------------------
function isCameraStreaming() {
    const video = document.querySelector('body > video') || document.querySelector('video:not([id])');
    if (!video) return false;
    return video.readyState >= 2 && video.videoWidth > 0 && video.videoHeight > 0 && !video.paused;
}

// -----------------------------------------------------------------------------
// Browser Page & Scene Readiness Tracking
// -----------------------------------------------------------------------------
let isWindowLoaded = (document.readyState === 'complete');
if (!isWindowLoaded) {
    window.addEventListener('load', () => {
        isWindowLoaded = true;
        checkAndUnlockIfReady();
    }, { once: true });
}

let isSceneLoaded = false;
if (dom.arScene) {
    if (dom.arScene.hasLoaded) {
        isSceneLoaded = true;
    } else {
        dom.arScene.addEventListener('loaded', () => {
            isSceneLoaded = true;
            checkAndUnlockIfReady();
        }, { once: true });
    }
}

// -----------------------------------------------------------------------------
// MindAR Camera Readiness Tracking
// -----------------------------------------------------------------------------
let isArReady = false;

if (dom.arScene) {
    dom.arScene.addEventListener('arReady', () => {
        console.log('📷 [Chapter 2] MindAR Camera stream & AR Scene telah siap!');
        isArReady = true;
        checkAndUnlockIfReady();
    });
    dom.arScene.addEventListener('arError', (err) => {
        console.warn('⚠️ [Chapter 2] MindAR Camera error:', err);
        isArReady = true;
        checkAndUnlockIfReady();
    });
}

// -----------------------------------------------------------------------------
// 2. LOADING SCREEN SYSTEM
// Selesaikan seluruh pemuatan SEBELUM tombol Mulai dapat ditekan:
// - Pemuatan halaman browser tuntas (window load)
// - A-Frame scene & shaders siap (scene loaded)
// - Target MindAR telah ter-compile & siap (arReady)
// - Kamera aktif & streaming frame nyata (isCameraStreaming)
// - Seluruh video Part 1 ter-buffer nyata di HP (videos.part1 readyState >= 3)
// -----------------------------------------------------------------------------
let part1BufferedCount = 0;
let isStartUnlocked = false;

function checkAndUnlockIfReady() {
    if (isStartUnlocked) return;

    const cameraStreaming = isCameraStreaming();
    const totalPart1 = videos.part1.length;
    const videosReady = (part1BufferedCount >= totalPart1);

    // Hitung progress gabungan:
    // - Browser Load: 15%
    // - Scene Load: 15%
    // - Video Part 1 Buffering: 35%
    // - Kamera & MindAR: 35%
    let totalPct = 0;
    if (isWindowLoaded) totalPct += 15;
    if (isSceneLoaded) totalPct += 15;
    if (totalPart1 > 0) totalPct += Math.min(35, Math.round((part1BufferedCount / totalPart1) * 35));
    if (isArReady && cameraStreaming) totalPct += 35;
    else if (cameraStreaming) totalPct += 20;
    else if (isArReady) totalPct += 15;

    totalPct = Math.min(100, totalPct);
    const barFill = document.getElementById('loadingBarFill');
    if (barFill) barFill.style.width = `${Math.max(15, totalPct)}%`;
    if (dom.loadingProgress) dom.loadingProgress.textContent = `${totalPct}%`;

    // Tombol Mulai HANYA terbuka jika browser, AR, kamera, dan SELURUH video Part 1 siap!
    if (isWindowLoaded && isSceneLoaded && isArReady && cameraStreaming && videosReady) {
        unlockStartButton();
    }
}

function unlockStartButton() {
    if (isStartUnlocked) return;
    isStartUnlocked = true;
    state.allFullyBuffered = true;
    state.allReady = true;
    state.cameraReady = isCameraStreaming();

    const barFill = document.getElementById('loadingBarFill');
    if (barFill) barFill.style.width = '100%';
    if (dom.loadingProgress) dom.loadingProgress.textContent = "100%";
    if (dom.startButton) {
        dom.startButton.disabled = false;
        dom.startButton.textContent = "Mulai";
        dom.startButton.classList.add("ready");
    }
}

// Pantau buffering nyata pada keenam video Part 1 (readyState >= 3)
videos.part1.forEach((video) => {
    if (!video) return;
    const onPart1Ready = () => {
        part1BufferedCount++;
        checkAndUnlockIfReady();
    };

    if (video.readyState >= 3) {
        onPart1Ready();
    } else {
        const canPlayHandler = () => {
            if (video.readyState >= 3) {
                video.removeEventListener("canplaythrough", canPlayHandler);
                video.removeEventListener("canplay", canPlayHandler);
                onPart1Ready();
            }
        };
        video.addEventListener("canplaythrough", canPlayHandler);
        video.addEventListener("canplay", canPlayHandler);
        video.addEventListener("error", () => {
            console.warn("⚠️ [Chapter 2] Video Part 1 error:", video.id);
            onPart1Ready();
        }, { once: true });
    }
});

// Polling reguler untuk mendeteksi stream kamera dan kesiapan browser secara real-time
const cameraCheckInterval = setInterval(() => {
    if (isStartUnlocked) {
        clearInterval(cameraCheckInterval);
        return;
    }
    if (!isWindowLoaded && document.readyState === 'complete') {
        isWindowLoaded = true;
    }
    if (!isSceneLoaded && dom.arScene && dom.arScene.hasLoaded) {
        isSceneLoaded = true;
    }
    checkAndUnlockIfReady();
}, 150);

// Safety fallback maksimum (12 detik)
setTimeout(() => {
    if (!isStartUnlocked) {
        console.log("⏱️ [Chapter 2] Timeout safety check (12s)...");
        isWindowLoaded = true;
        isSceneLoaded = true;
        if (isCameraStreaming()) {
            unlockStartButton();
        }
    }
}, 12000);

// Inisialisasi seluruh listener marker sejak awal
initPart1();
initPart2();
initPart3();
initPart4();
initPart5();
initPart6();
initPart7();
initPart8();

// -----------------------------------------------------------------------------
// 3. EXECUTE START CHAPTER 2
// -----------------------------------------------------------------------------
function executeStartChapter2() {
    state.hasStarted = true;
    state.audioEnabled = true;
    state.cameraReady = true;

    // Background prefetch Part 2 segera setelah pengguna menekan Mulai
    preloadPart(2);

    // Pastikan background body transparan dan elemen kamera terlihat jelas tanpa black screen
    document.body.style.backgroundColor = 'transparent';
    document.documentElement.style.backgroundColor = 'transparent';
    const camVideo = document.querySelector('body > video') || document.querySelector('video:not([id])');
    if (camVideo) {
        camVideo.style.display = 'block';
        camVideo.style.visibility = 'visible';
        camVideo.style.opacity = '1';
    }

    // Tutup loading overlay seketika agar kamera langsung terlihat tanpa jeda
    if (dom.loadingOverlay) {
        dom.loadingOverlay.classList.add("hidden");
        setTimeout(() => {
            dom.loadingOverlay.style.display = "none";
        }, 200);
    }
    if (dom.arScene) dom.arScene.classList.add("ready");

    if (dom.statusBar && !state.isPlaying) {
        dom.statusBar.textContent = "Arahkan kamera ke Marker 1";
        dom.statusBar.classList.remove("tracking", "finished");
    }

    // Buka kunci WebAudio context secara senyap jika didukung browser
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
            if (!window.__globalAudioCtx) window.__globalAudioCtx = new AudioCtx();
            if (window.__globalAudioCtx.state === 'suspended') window.__globalAudioCtx.resume();
        }
    } catch (e) {}

    // Prime audio Part 1
    if (dom.soundV1) {
        try {
            dom.soundV1.muted = true;
            dom.soundV1.volume = 0;
            const p = dom.soundV1.play();
            if (p !== undefined) {
                p.then(() => {
                    if (!state.isPlaying) {
                        dom.soundV1.pause();
                        dom.soundV1.currentTime = 0;
                    }
                    dom.soundV1.muted = false;
                    dom.soundV1.volume = 1.0;
                }).catch(() => {});
            }
        } catch (e) {}
    }

    // Jika Marker 1 memang sudah terdeteksi nyata oleh kamera sebelum/saat tombol Mulai ditekan
    const isMarker1Detected = (state.pendingPart === 1) || (state.isTargetInView && state.isTargetInView[1]) || (dom.target1 && dom.target1.object3D && dom.target1.object3D.visible);

    if (isMarker1Detected) {
        state.pendingPart = null;
        if (!state.part1Finished && !state.isPlaying && !state.isTransitioning) {
            playPart1();
        }
    }

    // Watcher: jika Marker 1 terdeteksi dalam jangkauan kamera sesaat setelah tombol Mulai ditekan
    const marker1Watcher = setInterval(() => {
        if (state.part1Finished || state.isPlaying || state.currentPart > 0) {
            clearInterval(marker1Watcher);
            return;
        }
        if ((dom.target1 && dom.target1.object3D && dom.target1.object3D.visible) || (state.isTargetInView && state.isTargetInView[1])) {
            clearInterval(marker1Watcher);
            if (!state.part1Finished && !state.isPlaying && !state.isTransitioning) {
                console.log("🎯 [Chapter 2] Marker 1 terdeteksi langsung oleh kamera!");
                playPart1();
            }
        }
    }, 150);
    setTimeout(() => clearInterval(marker1Watcher), 8000);
}

// 4. START BUTTON LISTENER
if (dom.startButton) {
    const handleStartChapter2 = (e) => {
        if (!isStartUnlocked || dom.startButton.disabled || state.hasStarted) {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            console.log("⏳ [Chapter 2] Tombol Mulai belum aktif: Menunggu loading 100%...");
            return;
        }
        executeStartChapter2();
    };
    dom.startButton.addEventListener("click", handleStartChapter2);
    dom.startButton.addEventListener("touchend", handleStartChapter2);
}

// -----------------------------------------------------------------------------
// 5. GLOBAL CONTROL LOGIC
// -----------------------------------------------------------------------------
export function replayPart(partNumber) {
    if (partNumber !== state.currentPart) {
        dom.statusBar.textContent = "Tidak bisa kembali ke Part sebelumnya";
        state.lastScannedMarker = 0;
        return;
    }

    state.lastScannedMarker = 0;
    const playActions = { 1: playPart1, 2: playPart2, 3: playPart3, 4: playPart4, 5: playPart5, 6: playPart6, 7: playPart7, 8: playPart8 };
    const stateKeys = { 1: 'part1Finished', 2: 'part2Finished', 3: 'part3Finished', 4: 'part4Finished', 5: 'part5Finished', 6: 'part6Finished', 7: 'part7Finished', 8: 'part8Finished' };

    const stateKey = stateKeys[partNumber];
    const wasFinished = state[stateKey];
    state[stateKey] = false;

    if (partNumber === 1) state.currentPart = 0;

    ensurePartLoaded(partNumber);
    if (playActions[partNumber]) {
        playActions[partNumber]();
    }

    setTimeout(() => {
        if (!state.isPlaying) {
            state[stateKey] = wasFinished;
            if (partNumber === 1) state.currentPart = 1;
        }
    }, 100);
}

export function restartFromBeginning() {
    const allContainers = [
        dom.containerPart1, dom.containerPart2, dom.containerPart3,
        dom.containerPart4, dom.containerPart5, dom.containerPart6,
        dom.containerPart7, dom.containerPart8
    ];
    allContainers.forEach((c) => { if (c) c.setAttribute("visible", false); });

    allVideos.forEach((v) => { if (v) { v.pause(); v.currentTime = 0; } });

    state.currentPart = 0;

    state.part1Finished = false; state.part2Finished = false; state.part3Finished = false;
    state.part4Finished = false; state.part5Finished = false; state.part6Finished = false;
    state.part7Finished = false; state.part8Finished = false;

    state.isPlaying = false;
    state.lastScannedMarker = 0;

    dom.statusBar.classList.remove("finished");
    dom.statusBar.textContent = "Arahkan kamera ke Marker 1";
}

const handleInteraction = (e) => {
    if (e.type === "touchend") e.preventDefault();
    if (!state.isPlaying) {
        if (state.lastScannedMarker > 0 && state.lastScannedMarker === state.currentPart) {
            replayPart(state.lastScannedMarker);
        } else if (state.currentPart >= 1 && state.currentPart <= 8 && state[`part${state.currentPart}Finished`]) {
            replayPart(state.currentPart);
        }
    }
};

dom.arScene.addEventListener("click", handleInteraction);
dom.arScene.addEventListener("touchend", handleInteraction);

const handleReset = (e) => {
    if (e.type === "touchend") e.preventDefault();
    if (confirm("Yakin ingin reset ke Part 1? Semua progress akan hilang.")) restartFromBeginning();
};

dom.resetButton.addEventListener("click", handleReset);
dom.resetButton.addEventListener("touchend", handleReset);

// Bersihkan kamera & media saat meninggalkan halaman
export function releaseCameraAndMedia() {
    try {
        document.querySelectorAll('video').forEach((v) => {
            if (v.srcObject && typeof v.srcObject.getTracks === 'function') {
                v.srcObject.getTracks().forEach((track) => track.stop());
                v.srcObject = null;
            }
            try { v.pause(); } catch (e) {}
        });
        const scene = document.querySelector('a-scene');
        if (scene && scene.systems && scene.systems['mindar-image-system']) {
            scene.systems['mindar-image-system'].stop();
        }
    } catch (e) {}
}

const homeBtn = document.getElementById('homeButton');
if (homeBtn) {
    homeBtn.addEventListener('click', () => {
        releaseCameraAndMedia();
    });
}
window.addEventListener('pagehide', releaseCameraAndMedia);
window.addEventListener('beforeunload', releaseCameraAndMedia);

// -----------------------------------------------------------------------------
// 7. TESTING & DIRECT JUMP UTILITIES
// -----------------------------------------------------------------------------
export function jumpToPart(partNumber) {
    if (partNumber < 1 || partNumber > 8) return;
    console.log(`🧪 [Test] Langsung melompat ke Chapter 2 Part ${partNumber}...`);

    ensurePartLoaded(partNumber);
    if (partNumber < 8) preloadPart(partNumber + 1);

    state.isPlaying = false;
    state.isTransitioning = false;
    state.isMarkerLocked = false;
    state.lockedMarker = null;

    for (let i = 1; i < partNumber; i++) {
        state[`part${i}Finished`] = true;
    }
    state[`part${partNumber}Finished`] = false;
    state.currentPart = partNumber - 1;

    [dom.soundV1, dom.soundV2, dom.soundV3, dom.soundV4, dom.soundV5, dom.soundV6, dom.soundV7, dom.soundV8].forEach(s => {
        if (s) { s.pause(); s.currentTime = 0; }
    });
    allVideos.forEach(v => {
        if (v) { v.pause(); v.currentTime = 0; }
    });

    const allContainers = [
        dom.containerPart1, dom.containerPart2, dom.containerPart3,
        dom.containerPart4, dom.containerPart5, dom.containerPart6,
        dom.containerPart7, dom.containerPart8
    ];
    allContainers.forEach((c, idx) => {
        if (c && idx + 1 !== partNumber) c.setAttribute("visible", false);
    });

    const playActions = {
        1: playPart1, 2: playPart2, 3: playPart3, 4: playPart4,
        5: playPart5, 6: playPart6, 7: playPart7, 8: playPart8
    };
    if (playActions[partNumber]) {
        playActions[partNumber]();
    }
}
window.jumpToPart = jumpToPart;

export function unlockAllParts() {
    console.log("🔓 [Test] Membuka semua marker Chapter 2...");
    for (let i = 1; i <= 8; i++) {
        state[`part${i}Finished`] = true;
        preloadPart(i);
    }
    state.isMarkerLocked = false;
    state.lockedMarker = null;
    dom.statusBar.textContent = "Semua marker terbuka. Anda bisa scan marker Part 1 s/d 8.";
}
window.unlockAllParts = unlockAllParts;

// Deteksi URL Query Param: ?jump=X atau ?part=X
const urlParams = new URLSearchParams(window.location.search);
const jumpTarget = parseInt(urlParams.get('jump') || urlParams.get('part'), 10);
if (jumpTarget && jumpTarget >= 1 && jumpTarget <= 8) {
    const doAutoJump = () => {
        setTimeout(() => jumpToPart(jumpTarget), 400);
    };
    if (dom.arScene && dom.arScene.classList.contains('ready')) {
        doAutoJump();
    } else if (dom.startButton) {
        dom.startButton.addEventListener('click', doAutoJump, { once: true });
    }
}