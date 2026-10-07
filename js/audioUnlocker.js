// js/audioUnlocker.js - Comprehensive Mobile Browser Audio Unlocker
// Mengatasi kebijakan Autoplay iOS Safari dan Android Chrome dengan melakukan
// priming unmuted pada seluruh elemen <audio> dan Web Audio API pada gestur interaksi pertama.

let isAudioUnlocked = false;

/**
 * Membuka kunci hardware audio session dan seluruh elemen HTML5 <audio> pada halaman.
 * Harus dipanggil di dalam atau sebagai respons langsung dari gestur pengguna (touch/click).
 */
export function unlockAudioSession() {
    window.__isUnlockingAudio = true;

    // 1. Inisialisasi dan resume Web Audio API Context
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
            if (!window.__globalAudioCtx) {
                window.__globalAudioCtx = new AudioCtx();
            }
            if (window.__globalAudioCtx.state === 'suspended') {
                window.__globalAudioCtx.resume();
            }
            // Putar 1-sampel silent buffer untuk mengaktifkan output hardware audio pada iOS/Android
            const buffer = window.__globalAudioCtx.createBuffer(1, 1, 22050);
            const source = window.__globalAudioCtx.createBufferSource();
            source.buffer = buffer;
            source.connect(window.__globalAudioCtx.destination);
            source.start(0);
        }
    } catch (e) {
        console.warn('⚠️ [AudioUnlocker] WebAudio unlock warning:', e);
    }

    // 2. Priming seluruh elemen HTML5 <audio> di DOM secara unmuted (volume 0.001)
    const audioElements = document.querySelectorAll('audio');
    let unlockedCount = 0;

    audioElements.forEach((audio) => {
        if (!audio) return;
        try {
            audio.muted = false;
            audio.volume = 0.001; // Tetap unmuted agar WebKit iOS memberikan izin pemutaran bersuara
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    audio.pause();
                    audio.currentTime = 0;
                    audio.volume = 1.0;
                    audio.muted = false;
                }).catch(() => {
                    audio.volume = 1.0;
                    audio.muted = false;
                });
            }
            unlockedCount++;
        } catch (e) {
            // Ignore priming error if audio src is not yet loaded
        }
    });

    isAudioUnlocked = true;
    setTimeout(() => {
        window.__isUnlockingAudio = false;
    }, 250);

    console.log(`🔊 [AudioUnlocker] Audio session aktif! (${unlockedCount} elemen audio dibuka kuncinya)`);
}

/**
 * Pasang listener global pada gestur sentuh / klik pertama kali untuk membuka audio otomatis
 */
export function initGlobalAudioUnlock() {
    const handleFirstGesture = (e) => {
        unlockAudioSession();
    };

    const gestureEvents = ['touchstart', 'touchend', 'pointerdown', 'click', 'mousedown'];
    gestureEvents.forEach((evtName) => {
        window.addEventListener(evtName, handleFirstGesture, { capture: true, passive: true });
        document.addEventListener(evtName, handleFirstGesture, { capture: true, passive: true });
    });
}

// Inisialisasi listener global secara otomatis saat modul di-load
if (typeof window !== 'undefined') {
    initGlobalAudioUnlock();
}
