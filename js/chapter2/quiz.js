import { CDN_BASE } from "../cdnConfig.js";

// Quiz AR Logic - Marker 8 MindAR Experience untuk Chapter 2
// Mendukung Quiz 1, 2, 3, 4, 5 dan Final Score secara Seamless (Single-Page Experience):
// - Preload seluruh media kuis Chapter 2 di awal
// - Transisi in-place 3D AR: Kuis lama slide-out ke kiri (fade-out), kuis baru slide-in dari kanan (fade-in & spring bounce)
// - Marker 8 tracking tetap aktif dan terkunci stabil di kamera sepanjang perpindahan
// - Sinkronisasi video ganda (Benar & Salah) dan jeda presisi di detik 9.25s
// - Touch target 3D screen-space & raycasting akurat untuk pilihan jawaban, Next button, dan Home pearl button
// - Navigasi dinamis via 3D Next Button serta Pill Navigator atas tanpa jeda loading

export const QUIZ_CONFIG = {
    1: {
        id: 1,
        title: "Kuis 1: Sisa Makanan di Gigi",
        questionText: "APA YANG TERJADI JIKA SISA MAKANAN TIDAK DIBERSIHKAN?",
        bannerImg: `${CDN_BASE}/compressed_ultra-videos/chapter2/quiz/quiz1/pertanyaan.PNG`,
        videoBenar: `${CDN_BASE}/compressed_ultra-videos/chapter2/quiz/quiz1/video/benar.mp4`,
        videoSalah: `${CDN_BASE}/compressed_ultra-videos/chapter2/quiz/quiz1/video/salah.mp4`,
        shaderBenar: "chromakey-magenta",
        shaderSalah: "chromakey-advanced",
        soundPertanyaan: `${CDN_BASE}/compressed_ultra-videos/chapter2/quiz/quiz1/sound/pertanyaan.mp3`,
        soundBenar: `${CDN_BASE}/compressed_ultra-videos/chapter2/quiz/quiz1/sound/benar.mp3`,
        soundSalah: `${CDN_BASE}/compressed_ultra-videos/chapter2/quiz/quiz1/sound/salah.mp3`,
        leftChoice: "salah",
        rightChoice: "benar",
        labelLeft: "Bakteri Tidak Menyerang Gigi",
        labelRight: "Bakteri Makan Sisa Makanan",
        promptStatusText: "Ketuk jawabanmu: BAKTERI MAKAN SISA MAKANAN atau BAKTERI TIDAK MENYERANG GIGI!",
        statusBenar: "Hebat! Pilihanmu benar: Bakteri Makan Sisa Makanan!",
        statusSalah: "Kurang tepat! Dengarkan penjelasannya...",
        descBenar: "Jawabanmu benar! Sisa makanan yang tertinggal akan menjadi santapan bagi bakteri di dalam mulut.",
        descSalah: "Bakteri justru sangat suka sisa makanan manis! Jika tidak dibersihkan, bakteri akan memakannya dan merusak gigi."
    },
    2: {
        id: 2,
        title: "Kuis 2: Asam dari Bakteri",
        questionText: "APA YANG DIBUAT BAKTERI SAAT MEMAKAN SISA MAKANAN?",
        bannerImg: `${CDN_BASE}/compressed_ultra-videos/chapter2/quiz/quiz2/pertanyaan.PNG`,
        videoBenar: `${CDN_BASE}/compressed_ultra-videos/chapter2/quiz/quiz2/video/benar.mp4`,
        videoSalah: `${CDN_BASE}/compressed_ultra-videos/chapter2/quiz/quiz2/video/salah.mp4`,
        shaderBenar: "chromakey-magenta",
        shaderSalah: "chromakey-advanced",
        soundPertanyaan: `${CDN_BASE}/compressed_ultra-videos/chapter2/quiz/quiz2/sound/pertanyaan.mp3`,
        soundBenar: `${CDN_BASE}/compressed_ultra-videos/chapter2/quiz/quiz2/sound/benar.mp3`,
        soundSalah: `${CDN_BASE}/compressed_ultra-videos/chapter2/quiz/quiz2/sound/salah.mp3`,
        leftChoice: "salah",
        rightChoice: "benar",
        labelLeft: "Air Liur",
        labelRight: "Asam",
        promptStatusText: "Ketuk jawabanmu: AIR LIUR atau ASAM!",
        statusBenar: "Hebat! Pilihanmu benar: Asam!",
        statusSalah: "Kurang tepat! Dengarkan penjelasannya...",
        descBenar: "Jawabanmu benar! Saat memakan sisa makanan, bakteri membuat zat asam yang bisa melarutkan lapisan gigi.",
        descSalah: "Bukan air liur ya! Bakteri menghasilkan zat asam yang mengikis pelindung gigi."
    },
    3: {
        id: 3,
        title: "Kuis 3: Tanda Awal Kerusakan Gigi",
        questionText: "APA YANG MUNCUL SAAT GIGI MULAI RUSAK?",
        bannerImg: `${CDN_BASE}/compressed_ultra-videos/chapter2/quiz/quiz3/pertanyaan.PNG`,
        videoBenar: `${CDN_BASE}/compressed_ultra-videos/chapter2/quiz/quiz3/video/benar.mp4`,
        videoSalah: `${CDN_BASE}/compressed_ultra-videos/chapter2/quiz/quiz3/video/salah.mp4`,
        shaderBenar: "chromakey-magenta",
        shaderSalah: "chromakey-advanced",
        soundPertanyaan: `${CDN_BASE}/compressed_ultra-videos/chapter2/quiz/quiz3/sound/pertanyaan.mp3`,
        soundBenar: `${CDN_BASE}/compressed_ultra-videos/chapter2/quiz/quiz3/sound/benar.mp3`,
        soundSalah: `${CDN_BASE}/compressed_ultra-videos/chapter2/quiz/quiz3/sound/salah.mp3`,
        leftChoice: "salah",
        rightChoice: "benar",
        labelLeft: "Gigi Kuning",
        labelRight: "Titik Hitam",
        promptStatusText: "Ketuk jawabanmu: GIGI KUNING atau TITIK HITAM!",
        statusBenar: "Hebat! Pilihanmu benar: Titik Hitam!",
        statusSalah: "Kurang tepat! Dengarkan penjelasannya...",
        descBenar: "Jawabanmu benar! Titik hitam atau bercak kecil adalah tanda awal lapisan gigi mulai berlubang.",
        descSalah: "Titik hitam kecil di permukaan gigilah yang menandakan gigi mulai rusak dan berlubang."
    },
    4: {
        id: 4,
        title: "Kuis 4: Proses Gigi Berlubang",
        questionText: "APA TERJADI JIKA GIGI TERUS RUSAK?",
        bannerImg: `${CDN_BASE}/compressed_ultra-videos/chapter2/quiz/quiz4/pertanyaan.PNG`,
        videoBenar: `${CDN_BASE}/compressed_ultra-videos/chapter2/quiz/quiz4/video/benar.mp4`,
        videoSalah: `${CDN_BASE}/compressed_ultra-videos/chapter2/quiz/quiz4/video/salah.mp4`,
        shaderBenar: "chromakey-magenta",
        shaderSalah: "chromakey-advanced",
        soundPertanyaan: `${CDN_BASE}/compressed_ultra-videos/chapter2/quiz/quiz4/sound/pertanyaan.mp3`,
        soundBenar: `${CDN_BASE}/compressed_ultra-videos/chapter2/quiz/quiz4/sound/benar.mp3`,
        soundSalah: `${CDN_BASE}/compressed_ultra-videos/chapter2/quiz/quiz4/sound/salah.mp3`,
        leftChoice: "benar",
        rightChoice: "salah",
        labelLeft: "Lubang Gigi Semakin Dalam",
        labelRight: "Gigi Terlindungi Semakin Kuat",
        promptStatusText: "Ketuk jawabanmu: LUBANG GIGI SEMAKIN DALAM atau GIGI TERLINDUNGI SEMAKIN KUAT!",
        statusBenar: "Hebat! Pilihanmu benar: Lubang Gigi Semakin Dalam!",
        statusSalah: "Kurang tepat! Dengarkan penjelasannya...",
        descBenar: "Jawabanmu benar! Jika asam terus mengikis gigi, lubang gigi akan semakin besar dan dalam.",
        descSalah: "Gigi tidak akan semakin kuat jika dibiarkan! Justru lubangnya akan bertambah besar dan dalam."
    },
    5: {
        id: 5,
        title: "Kuis 5: Lubang Mencapai Saraf",
        questionText: "APA TERJADI KALAU LUBANG MENCAPAI SARAF?",
        bannerImg: `${CDN_BASE}/compressed_ultra-videos/chapter2/quiz/quiz5/pertanyaan.PNG`,
        videoBenar: `${CDN_BASE}/compressed_ultra-videos/chapter2/quiz/quiz5/video/benar.mp4`,
        videoSalah: `${CDN_BASE}/compressed_ultra-videos/chapter2/quiz/quiz5/video/salah.mp4`,
        shaderBenar: "chromakey-magenta",
        shaderSalah: "chromakey-advanced",
        soundPertanyaan: `${CDN_BASE}/compressed_ultra-videos/chapter2/quiz/quiz5/sound/pertanyaan.mp3`,
        soundBenar: `${CDN_BASE}/compressed_ultra-videos/chapter2/quiz/quiz5/sound/benar.mp3`,
        soundSalah: `${CDN_BASE}/compressed_ultra-videos/chapter2/quiz/quiz5/sound/salah.mp3`,
        leftChoice: "benar",
        rightChoice: "salah",
        labelLeft: "Gigi Bisa Terasa Sakit",
        labelRight: "Makan Tanpa Rasa Sakit",
        promptStatusText: "Ketuk jawabanmu: GIGI BISA TERASA SAKIT atau MAKAN TANPA RASA SAKIT!",
        statusBenar: "Hebat! Pilihanmu benar: Gigi Bisa Terasa Sakit!",
        statusSalah: "Kurang tepat! Dengarkan penjelasannya...",
        descBenar: "Jawabanmu benar! Saat lubang mencapai saraf gigi yang peka, gigi akan terasa ngilu dan sangat sakit!",
        descSalah: "Jika lubang sudah mencapai saraf, makan justru akan terasa sangat ngilu dan sakit!"
    },
    'score': {
        id: 'score',
        isFinalScore: true,
        title: "Skor Akhir: Petualangan Kuis AR Bab 2",
        questionText: "SELAMAT! KAMU TELAH MENYELESAIKAN SEMUA KUIS!",
        bannerImg: "",
        videoScore: `${CDN_BASE}/compressed_ultra-videos/chapter1/quiz/final-scores/video/score.mp4`,
        soundScore: `${CDN_BASE}/compressed_ultra-videos/chapter1/quiz/final-scores/sound/sound.mp3`,
        shaderScore: "chromakey-score",
        promptStatusText: "Selamat! Kamu telah menyelesaikan semua petualangan kuis Bab 2!",
        statusScore: "Selamat! Kamu telah menyelesaikan semua petualangan kuis!",
        descScore: "Luar biasa! Kamu telah mempelajari bagaimana karies terbentuk dan berhasil menyelesaikan seluruh tantangan kuis!"
    }
};

QUIZ_CONFIG[6] = QUIZ_CONFIG['score'];
QUIZ_CONFIG['final'] = QUIZ_CONFIG['score'];

// Deteksi kuis aktif dari URL parameter (?quiz=1..5 atau ?quiz=score)
const urlParams = new URLSearchParams(window.location.search);
const rawQuizParam = (urlParams.get('quiz') || urlParams.get('id') || '1').toLowerCase();
let currentQuizId;
if (rawQuizParam === 'score' || rawQuizParam === 'final' || rawQuizParam === '6') {
    currentQuizId = 'score';
} else {
    currentQuizId = parseInt(rawQuizParam, 10);
    if (isNaN(currentQuizId) || currentQuizId < 1 || currentQuizId > 5) {
        currentQuizId = 1;
    }
}

let currentQuiz = QUIZ_CONFIG[currentQuizId];
let isFinalScore = !!currentQuiz.isFinalScore;

let quizActiveSeamless = false;

// DOM Elements
const statusBar = document.getElementById('statusBar');
const arScene = document.getElementById('arScene');
const targetQuiz = document.getElementById('target8');
const quizSceneWrapper = document.getElementById('quiz-scene-wrapper');

// Active A-Frame 3D Entities
let activeAframePertanyaan = null;
let activeAframeVidBenar = null;
let activeAframeVidSalah = null;
let activeAframeVidScore = null;

// 3D Clickable Planes (Left & Right choice on Marker 8)
const btnChoiceLeft3D = document.getElementById('btn-choice-left-3d');
const btnChoiceRight3D = document.getElementById('btn-choice-right-3d');

// 3D Next Button Elements (Tracking on Marker 8)
const btnNextQuiz3D = document.getElementById('btn-next-quiz-3d');
const btnNextPlane3D = document.getElementById('btn-next-plane-3d');

// 3D Home Button Elements for Final Score
const btnHomeScore3D = document.getElementById('btn-home-score-3d');
const btnHomeScorePlane = document.getElementById('btn-home-score-plane');

// Preloaded HTML Media Elements Collection
const allVideoElements = Array.from(document.querySelectorAll('a-assets video'));
const allSoundElements = Array.from(document.querySelectorAll('a-assets audio'));

// Active Media Pointers
let activeVidBenar = null;
let activeVidSalah = null;
let activeVidScore = null;

let activeSoundPertanyaan = null;
let activeSoundBenar = null;
let activeSoundSalah = null;
let activeSoundScore = null;

// Audio Context WebAudio API
let audioCtx = null;

// Quiz State Machine
let quizState = 'WAIT_MARKER';
let isTargetFound = false;
let isTransitioningQuiz = false;
let choiceHandled = false;
let isNextButtonActive = false;
let isNavigatingNext = false;
let isHomeButtonActive = false;
let isNavigatingHome = false;

let monitorRaf = null;
let introStartTime = 0;

// WebAudio Sound Effects
function playChime(isCorrect) {
    try {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === 'suspended') audioCtx.resume();

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);

        const now = audioCtx.currentTime;
        if (isCorrect) {
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(523.25, now);
            osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.12);
            osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.25);
            gain.gain.setValueAtTime(0.28, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
            osc.start(now);
            osc.stop(now + 0.45);
        } else {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(329.63, now);
            osc.frequency.exponentialRampToValueAtTime(261.63, now + 0.22);
            gain.gain.setValueAtTime(0.25, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
            osc.start(now);
            osc.stop(now + 0.35);
        }
    } catch (e) {}
}

// -----------------------------------------------------------------------------
// Seamless Quiz Integration for Chapter 2
// -----------------------------------------------------------------------------
window.__startQuizSeamless = function (targetQuizId = 1) {
    console.log(`🚀 [Quiz AR Seamless] Memulai kuis ${targetQuizId} langsung pada Marker 8 di Bab 2...`);
    window.__quizActiveSeamless = true;
    quizActiveSeamless = true;
    const quizTopBar = document.getElementById('quizTopBar');
    if (quizTopBar) quizTopBar.style.display = 'flex';

    isTransitioningQuiz = false;
    isNavigatingNext = false;

    // Pastikan audio narasi Part 8 Bab 2 berhenti total
    const soundV8 = document.getElementById('sound-v8');
    if (soundV8) {
        soundV8.pause();
        soundV8.currentTime = 0;
        soundV8.onended = null;
    }
    const part8Videos = document.querySelectorAll('video[id*="part8"]');
    part8Videos.forEach(v => {
        try { v.pause(); v.currentTime = 0; } catch (e) {}
    });

    try {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === 'suspended') audioCtx.resume();
    } catch (e) {}

    setupQuizScene(targetQuizId);

    if (quizSceneWrapper) {
        quizSceneWrapper.setAttribute('position', '1.4 0 0');
        quizSceneWrapper.setAttribute('scale', '0.7 0.7 0.7');
        quizSceneWrapper.setAttribute('visible', true);
        if (quizSceneWrapper.object3D) quizSceneWrapper.object3D.visible = true;

        setTimeout(() => {
            quizSceneWrapper.emit('trigger-slide-in', null, false);
        }, 30);
    }

    isTargetFound = true;
    startQuizPlayback();
};

window.__stopQuizSeamless = function () {
    console.log('🔄 [Quiz AR Seamless] Kembali dari Kuis ke Bab 2...');
    window.__quizActiveSeamless = false;
    quizActiveSeamless = false;
    stopAllMedia();
    const quizTopBar = document.getElementById('quizTopBar');
    if (quizTopBar) quizTopBar.style.display = 'none';

    if (quizSceneWrapper) {
        quizSceneWrapper.emit('trigger-slide-out', null, false);
        setTimeout(() => {
            quizSceneWrapper.setAttribute('visible', false);
            if (quizSceneWrapper.object3D) quizSceneWrapper.object3D.visible = false;
        }, 380);
    }

    if (window.__restorePart8FromQuiz) {
        window.__restorePart8FromQuiz();
    }
};

const btnBackToChapter2 = document.getElementById('btnBackToChapter2');
if (btnBackToChapter2) {
    btnBackToChapter2.addEventListener('click', (e) => {
        e.preventDefault();
        window.__stopQuizSeamless();
    });
}

window.__triggerQuizChoiceLeft = () => {
    if (quizState === 'WAITING_CHOICE' || quizState === 'RESULT_PLAYING') {
        selectChoice(currentQuiz.leftChoice);
    }
};
window.__triggerQuizChoiceRight = () => {
    if (quizState === 'WAITING_CHOICE' || quizState === 'RESULT_PLAYING') {
        selectChoice(currentQuiz.rightChoice);
    }
};

// -----------------------------------------------------------------------------
// Setup Quiz Scene & Media Pointers
// -----------------------------------------------------------------------------
function setupQuizScene(targetId) {
    currentQuizId = (targetId === 'score' || targetId === 6 || targetId === 'final') ? 'score' : parseInt(targetId, 10);
    currentQuiz = QUIZ_CONFIG[currentQuizId];
    isFinalScore = !!currentQuiz.isFinalScore;

    console.log(`🎯 [Quiz AR] Setup Quiz Scene: ${currentQuiz.title}`);

    // Highlight active navigation pill
    document.querySelectorAll('.quiz-pill').forEach(pill => {
        if (pill.dataset.quiz == currentQuizId) {
            pill.classList.add('active');
        } else {
            pill.classList.remove('active');
        }
    });

    // Aktifkan / sembunyikan entity group kuis
    for (let i = 1; i <= 5; i++) {
        const groupEl = document.getElementById(`quiz-group-${i}`);
        if (groupEl) {
            const isMatch = (!isFinalScore && currentQuizId === i);
            groupEl.setAttribute('visible', isMatch);
            if (groupEl.object3D) groupEl.object3D.visible = isMatch;
        }
    }
    const groupScoreEl = document.getElementById('quiz-group-score');
    if (groupScoreEl) {
        groupScoreEl.setAttribute('visible', isFinalScore);
        if (groupScoreEl.object3D) groupScoreEl.object3D.visible = isFinalScore;
    }

    // Update active media references
    if (!isFinalScore) {
        activeVidBenar = document.getElementById(`vid-quiz${currentQuizId}-benar`);
        activeVidSalah = document.getElementById(`vid-quiz${currentQuizId}-salah`);
        activeVidScore = null;

        activeSoundPertanyaan = document.getElementById(`sound-quiz${currentQuizId}-pertanyaan`);
        activeSoundBenar = document.getElementById(`sound-quiz${currentQuizId}-benar`);
        activeSoundSalah = document.getElementById(`sound-quiz${currentQuizId}-salah`);
        activeSoundScore = null;

        activeAframePertanyaan = document.getElementById(`quiz-pertanyaan-${currentQuizId}`);
        activeAframeVidBenar = document.getElementById(`video-quiz-${currentQuizId}-benar`);
        activeAframeVidSalah = document.getElementById(`video-quiz-${currentQuizId}-salah`);
        activeAframeVidScore = null;

        if (activeAframePertanyaan) activeAframePertanyaan.setAttribute('visible', true);
        if (activeAframeVidBenar) activeAframeVidBenar.setAttribute('visible', true);
        if (activeAframeVidSalah) activeAframeVidSalah.setAttribute('visible', true);
    } else {
        activeVidBenar = null;
        activeVidSalah = null;
        activeVidScore = document.getElementById('vid-quiz-score');

        activeSoundPertanyaan = null;
        activeSoundBenar = null;
        activeSoundSalah = null;
        activeSoundScore = document.getElementById('sound-quiz-score');

        activeAframePertanyaan = null;
        activeAframeVidBenar = null;
        activeAframeVidSalah = null;
        activeAframeVidScore = document.getElementById('video-quiz-score');

        if (activeAframeVidScore) activeAframeVidScore.setAttribute('visible', true);
    }
}

// Preload upcoming quiz media elements in background
function preloadUpcomingQuiz(nextId) {
    if (!nextId) return;
    try {
        if (nextId === 'score' || nextId === 6 || nextId === 'final') {
            const vScore = document.getElementById('vid-quiz-score');
            const sScore = document.getElementById('sound-quiz-score');
            if (vScore) { vScore.preload = 'auto'; vScore.load(); }
            if (sScore) { sScore.preload = 'auto'; sScore.load(); }
            return;
        }
        const vBenar = document.getElementById(`vid-quiz${nextId}-benar`);
        const vSalah = document.getElementById(`vid-quiz${nextId}-salah`);
        const sPertanyaan = document.getElementById(`sound-quiz${nextId}-pertanyaan`);
        const sBenar = document.getElementById(`sound-quiz${nextId}-benar`);
        const sSalah = document.getElementById(`sound-quiz${nextId}-salah`);

        if (vBenar) { vBenar.preload = 'auto'; vBenar.load(); }
        if (vSalah) { vSalah.preload = 'auto'; vSalah.load(); }
        if (sPertanyaan) { sPertanyaan.preload = 'auto'; sPertanyaan.load(); }
        if (sBenar) { sBenar.preload = 'auto'; sBenar.load(); }
        if (sSalah) { sSalah.preload = 'auto'; sSalah.load(); }
    } catch (e) {
        console.warn('⚠️ Preload next quiz warning:', e);
    }
}

function stopAllMedia(exceptVideos = []) {
    if (monitorRaf) {
        cancelAnimationFrame(monitorRaf);
        monitorRaf = null;
    }
    allVideoElements.forEach(v => {
        if (exceptVideos && exceptVideos.includes(v)) return;
        try {
            v.pause();
        } catch (e) {}
    });
    allSoundElements.forEach(s => {
        try {
            s.pause();
        } catch (e) {}
    });
}

// -----------------------------------------------------------------------------
// In-Place 3D Slide Transition between Quizzes (Quiz A -> Quiz B)
// -----------------------------------------------------------------------------
export function transitionToQuiz(targetQuizId, animate = true) {
    if (isTransitioningQuiz) return;
    const normalizedTarget = (targetQuizId === 'score' || targetQuizId === 6 || targetQuizId === 'final') ? 'score' : parseInt(targetQuizId, 10);
    if (normalizedTarget === currentQuizId && quizState !== 'LOADING') return;

    isTransitioningQuiz = true;
    console.log(`🔄 [Quiz AR Transition] Berpindah dari Kuis ${currentQuizId} ke ${normalizedTarget}...`);

    if (btnChoiceLeft3D) btnChoiceLeft3D.setAttribute('visible', false);
    if (btnChoiceRight3D) btnChoiceRight3D.setAttribute('visible', false);
    hideNextButton();
    hideHomeScoreButton();

    if (statusBar) {
        statusBar.textContent = (normalizedTarget === 'score') ? 'Membuka Skor Akhir...' : `Membuka Kuis ${normalizedTarget}...`;
        statusBar.classList.remove('finished');
        statusBar.classList.add('tracking');
    }

    const soundV8 = document.getElementById('sound-v8');
    if (soundV8) {
        soundV8.pause();
        soundV8.currentTime = 0;
        soundV8.onended = null;
    }

    const targetBenar = (normalizedTarget !== 'score') ? document.getElementById(`vid-quiz${normalizedTarget}-benar`) : null;
    const targetSalah = (normalizedTarget !== 'score') ? document.getElementById(`vid-quiz${normalizedTarget}-salah`) : null;
    const targetScore = (normalizedTarget === 'score') ? document.getElementById('vid-quiz-score') : null;
    const warmingUpVideos = [targetBenar, targetSalah, targetScore].filter(Boolean);

    stopAllMedia(warmingUpVideos);

    if (targetBenar) {
        targetBenar.muted = true;
        try { targetBenar.currentTime = 0; } catch (e) {}
        targetBenar.play().catch(() => {});
    }
    if (targetSalah) {
        targetSalah.muted = true;
        try { targetSalah.currentTime = 0; } catch (e) {}
        targetSalah.play().catch(() => {});
    }
    if (targetScore) {
        targetScore.muted = true;
        try { targetScore.currentTime = 0; } catch (e) {}
        targetScore.play().catch(() => {});
    }

    if (animate && quizSceneWrapper) {
        quizSceneWrapper.emit('trigger-slide-out', null, false);

        setTimeout(() => {
            setupQuizScene(normalizedTarget);

            quizSceneWrapper.setAttribute('position', '1.4 0 0');
            quizSceneWrapper.setAttribute('scale', '0.7 0.7 0.7');
            quizSceneWrapper.setAttribute('visible', true);

            setTimeout(() => {
                quizSceneWrapper.emit('trigger-slide-in', null, false);
            }, 20);

            if (isTargetFound) {
                startQuizPlayback();
            } else {
                quizState = 'WAIT_MARKER';
                if (statusBar) {
                    statusBar.textContent = 'Arahkan kamera ke Marker 8...';
                    statusBar.classList.remove('tracking', 'finished');
                }
            }

            setTimeout(() => {
                isTransitioningQuiz = false;
            }, 540);
        }, 380);
    } else {
        setupQuizScene(normalizedTarget);
        if (quizSceneWrapper) {
            quizSceneWrapper.setAttribute('position', '0 0 0');
            quizSceneWrapper.setAttribute('scale', '1 1 1');
            quizSceneWrapper.setAttribute('visible', true);
        }
        if (isTargetFound) {
            startQuizPlayback();
        } else {
            quizState = 'WAIT_MARKER';
            if (statusBar) {
                statusBar.textContent = 'Arahkan kamera ke Marker 8...';
                statusBar.classList.remove('tracking', 'finished');
            }
        }
        isTransitioningQuiz = false;
    }
}

window.__navigateToQuiz = transitionToQuiz;

// -----------------------------------------------------------------------------
// Marker 8 Tracking Listeners
// -----------------------------------------------------------------------------
if (targetQuiz) {
    targetQuiz.addEventListener('targetFound', () => {
        if (!quizActiveSeamless) return;
        console.log(`🎯 [Quiz AR] Marker 8 Terdeteksi untuk ${isFinalScore ? 'Skor Akhir' : 'Kuis ' + currentQuizId}!`);
        isTargetFound = true;

        if (quizState === 'WAIT_MARKER') {
            startQuizPlayback();
        } else if (quizState === 'INTRO_PLAYING') {
            if (statusBar) statusBar.textContent = `Kuis ${currentQuizId} dimulai! Simak pertanyaannya...`;
        } else if (quizState === 'FINAL_SCORE_PLAYING') {
            if (statusBar) statusBar.textContent = currentQuiz.promptStatusText;
        } else if (quizState === 'WAITING_CHOICE') {
            if (statusBar) statusBar.textContent = currentQuiz.promptStatusText;
        }
    });

    targetQuiz.addEventListener('targetLost', () => {
        if (!quizActiveSeamless) return;
        console.log('⏹️ [Quiz AR] Marker 8 Hilang dari pandangan kamera.');
        isTargetFound = false;
        if (quizState === 'WAIT_MARKER' && statusBar) {
            statusBar.textContent = 'Arahkan kamera ke Marker 8...';
        }
    });
}

// -----------------------------------------------------------------------------
// Start Quiz Playback (0s to 9.25s atau Final Score)
// -----------------------------------------------------------------------------
async function startQuizPlayback() {
    choiceHandled = false;
    introStartTime = performance.now();

    // Mode Final Score
    if (isFinalScore) {
        quizState = 'FINAL_SCORE_PLAYING';
        console.log('🏆 [Quiz AR] Memulai pemutaran Final Score pada Marker 8...');
        if (statusBar) {
            statusBar.textContent = currentQuiz.promptStatusText;
            statusBar.classList.add('tracking');
            statusBar.classList.remove('finished');
        }

        if (quizSceneWrapper) quizSceneWrapper.setAttribute('visible', true);
        if (activeAframePertanyaan) activeAframePertanyaan.setAttribute('visible', false);
        if (activeAframeVidBenar) activeAframeVidBenar.setAttribute('visible', false);
        if (activeAframeVidSalah) activeAframeVidSalah.setAttribute('visible', false);
        if (activeAframeVidScore) activeAframeVidScore.setAttribute('visible', true);

        if (btnChoiceLeft3D) btnChoiceLeft3D.setAttribute('visible', false);
        if (btnChoiceRight3D) btnChoiceRight3D.setAttribute('visible', false);
        hideNextButton();
        hideHomeScoreButton();

        if (activeVidScore) {
            activeVidScore.muted = true;
            try { activeVidScore.currentTime = 0; } catch (e) {}
            const p = activeVidScore.play();
            if (p !== undefined) {
                p.catch(e => {
                    console.warn('⚠️ Play vidScore retry:', e);
                    setTimeout(() => activeVidScore && activeVidScore.play().catch(err => console.error('❌ Play vidScore error:', err)), 100);
                });
            }
        }

        if (activeSoundScore) {
            activeSoundScore.pause();
            activeSoundScore.currentTime = 0;
            activeSoundScore.muted = false;
            activeSoundScore.play().catch(e => console.error('Play soundScore error:', e));
        }

        waitForFinalScoreCompletion(activeVidScore, activeSoundScore);
        return;
    }

    // Mode Kuis 1..5
    quizState = 'INTRO_PLAYING';
    console.log(`🎬 [Quiz AR] Memulai pemutaran kuis ${currentQuizId} & audio pertanyaan...`);
    if (statusBar) {
        statusBar.textContent = `Kuis ${currentQuizId} dimulai! Simak pertanyaannya...`;
        statusBar.classList.add('tracking');
        statusBar.classList.remove('finished');
    }

    if (quizSceneWrapper) quizSceneWrapper.setAttribute('visible', true);
    if (activeAframeVidScore) activeAframeVidScore.setAttribute('visible', false);
    if (activeAframeVidBenar) activeAframeVidBenar.setAttribute('visible', true);
    if (activeAframeVidSalah) activeAframeVidSalah.setAttribute('visible', true);
    if (activeAframePertanyaan) activeAframePertanyaan.setAttribute('visible', true);

    if (btnChoiceLeft3D) btnChoiceLeft3D.setAttribute('visible', false);
    if (btnChoiceRight3D) btnChoiceRight3D.setAttribute('visible', false);
    hideNextButton();
    hideHomeScoreButton();

    if (activeVidBenar) {
        activeVidBenar.muted = true;
        if (activeVidBenar.paused || activeVidBenar.currentTime > 0.5) {
            try { activeVidBenar.currentTime = 0; } catch (e) {}
        }
    }
    if (activeVidSalah) {
        activeVidSalah.muted = true;
        if (activeVidSalah.paused || activeVidSalah.currentTime > 0.5) {
            try { activeVidSalah.currentTime = 0; } catch (e) {}
        }
    }

    if (activeSoundBenar) {
        activeSoundBenar.pause();
        activeSoundBenar.currentTime = 0;
    }
    if (activeSoundSalah) {
        activeSoundSalah.pause();
        activeSoundSalah.currentTime = 0;
    }

    if (activeSoundPertanyaan) {
        activeSoundPertanyaan.pause();
        activeSoundPertanyaan.currentTime = 0;
        activeSoundPertanyaan.muted = false;
        activeSoundPertanyaan.play().catch(e => console.warn('⚠️ Gagal memutar audio pertanyaan:', e));
    }

    const currentVideos = [activeVidBenar, activeVidSalah].filter(Boolean);
    currentVideos.forEach(v => {
        v.crossOrigin = "anonymous";
        v.muted = true;
        v.playsInline = true;
    });
    const playPromises = currentVideos.map(v => {
        return v.play().catch(e => {
            console.warn('⚠️ Play retry:', v.id, e);
            return v.play().catch(err => console.error('❌ Play error:', v.id, err));
        });
    });
    await Promise.all(playPromises);

    // Refresh texture material agar GPU langsung mengikat frame video aktif tanpa black screen
    [
        { av: activeAframeVidBenar, vid: activeVidBenar },
        { av: activeAframeVidSalah, vid: activeVidSalah },
        { av: activeAframeVidScore, vid: activeVidScore }
    ].forEach(({ av, vid }) => {
        if (av && av.components && av.components.material && av.components.material.material) {
            const m = av.components.material.material;
            if (vid && m.uniforms && m.uniforms.tex) {
                if (!m.uniforms.tex.value || !(m.uniforms.tex.value.image instanceof HTMLVideoElement)) {
                    const vt = new THREE.VideoTexture(vid);
                    vt.minFilter = THREE.LinearFilter;
                    vt.magFilter = THREE.LinearFilter;
                    vt.format = THREE.RGBAFormat;
                    vt.generateMipmaps = false;
                    m.uniforms.tex.value = vt;
                    m.map = vt;
                }
                m.uniforms.tex.value.needsUpdate = true;
            }
            if (m.map) m.map.needsUpdate = true;
        }
    });

    const nextQuizId = (currentQuizId < 5) ? (currentQuizId + 1) : 'score';
    preloadUpcomingQuiz(nextQuizId);

    startTimelineMonitor();
}

// -----------------------------------------------------------------------------
// Timeline Monitor: Deteksi 9.25s secara presisi
// -----------------------------------------------------------------------------
function startTimelineMonitor() {
    if (monitorRaf) cancelAnimationFrame(monitorRaf);

    const checkTime = () => {
        if (quizState !== 'INTRO_PLAYING') return;

        const tBenar = (activeVidBenar && !isNaN(activeVidBenar.currentTime)) ? activeVidBenar.currentTime : 0;
        const tSalah = (activeVidSalah && !isNaN(activeVidSalah.currentTime)) ? activeVidSalah.currentTime : 0;
        const maxVidT = Math.max(tBenar, tSalah);
        const currentSoundT = (activeSoundPertanyaan && !isNaN(activeSoundPertanyaan.currentTime)) ? activeSoundPertanyaan.currentTime : 0;

        const elapsedSinceStart = (performance.now() - introStartTime) / 1000;

        if (elapsedSinceStart >= 1.5 && (maxVidT >= 9.25 || currentSoundT >= 9.25)) {
            reachDecisionPoint();
            return;
        }

        monitorRaf = requestAnimationFrame(checkTime);
    };

    monitorRaf = requestAnimationFrame(checkTime);
}

function reachDecisionPoint() {
    if (quizState !== 'INTRO_PLAYING') return;
    console.log(`⏸️ [Quiz AR] Kuis ${currentQuizId}: Mencapai detik 9.25! Menjeda video dan audio pertanyaan...`);
    quizState = 'WAITING_CHOICE';

    if (monitorRaf) {
        cancelAnimationFrame(monitorRaf);
        monitorRaf = null;
    }

    if (activeVidBenar) {
        activeVidBenar.pause();
        if (Math.abs(activeVidBenar.currentTime - 9.25) > 0.8) {
            try { activeVidBenar.currentTime = 9.25; } catch (e) {}
        }
    }
    if (activeVidSalah) {
        activeVidSalah.pause();
        if (Math.abs(activeVidSalah.currentTime - 9.25) > 0.8) {
            try { activeVidSalah.currentTime = 9.25; } catch (e) {}
        }
    }

    if (activeSoundPertanyaan) {
        activeSoundPertanyaan.pause();
        activeSoundPertanyaan.currentTime = 9.25;
    }

    requestAnimationFrame(() => {
        [activeAframeVidBenar, activeAframeVidSalah, activeAframeVidScore].filter(Boolean).forEach(av => {
            if (av && av.components && av.components.material && av.components.material.material) {
                const m = av.components.material.material;
                if (m.uniforms && m.uniforms.tex && m.uniforms.tex.value) m.uniforms.tex.value.needsUpdate = true;
                if (m.map) m.map.needsUpdate = true;
            }
        });
    });

    // Aktifkan tombol pilihan 3D pada Marker 8
    if (btnChoiceLeft3D) {
        btnChoiceLeft3D.setAttribute('visible', true);
        const mesh = btnChoiceLeft3D.getObject3D('mesh');
        if (mesh) {
            mesh.visible = true;
            if (mesh.material) {
                mesh.material.depthWrite = false;
                mesh.material.transparent = true;
                mesh.material.opacity = 0.001;
            }
        }
    }
    if (btnChoiceRight3D) {
        btnChoiceRight3D.setAttribute('visible', true);
        const mesh = btnChoiceRight3D.getObject3D('mesh');
        if (mesh) {
            mesh.visible = true;
            if (mesh.material) {
                mesh.material.depthWrite = false;
                mesh.material.transparent = true;
                mesh.material.opacity = 0.001;
            }
        }
    }

    const cameraEl = document.querySelector('a-camera');
    if (cameraEl && cameraEl.components && cameraEl.components.raycaster) {
        cameraEl.components.raycaster.refreshObjects();
    }

    if (statusBar) {
        statusBar.textContent = currentQuiz.promptStatusText;
        statusBar.classList.remove('tracking');
        statusBar.classList.add('finished');
    }
}

// -----------------------------------------------------------------------------
// Next Button Display
// -----------------------------------------------------------------------------
function showNextButton() {
    console.log(`✨ [Quiz AR] Penjelasan selesai! Memunculkan tombol 3D Next pada Marker 8...`);
    isNextButtonActive = true;
    isNavigatingNext = false;

    if (btnNextQuiz3D) {
        btnNextQuiz3D.setAttribute('visible', true);
        btnNextQuiz3D.setAttribute('scale', '0.2 0.2 0.2');

        const mesh = btnNextQuiz3D.getObject3D('mesh');
        if (mesh) {
            mesh.visible = true;
            if (mesh.material) {
                mesh.material.depthWrite = false;
                mesh.material.transparent = true;
                mesh.material.opacity = 0;
            }
        }

        setTimeout(() => {
            if (isNextButtonActive && !isNavigatingNext) {
                btnNextQuiz3D.emit('trigger-fade-in', null, false);
            }
        }, 50);

        setTimeout(() => {
            if (isNextButtonActive && !isNavigatingNext) {
                btnNextQuiz3D.emit('trigger-pulse-start', null, false);
            }
        }, 700);
    }

    if (btnNextPlane3D) {
        btnNextPlane3D.setAttribute('visible', true);
        const mesh = btnNextPlane3D.getObject3D('mesh');
        if (mesh) {
            mesh.visible = true;
            if (mesh.material) {
                mesh.material.depthWrite = false;
                mesh.material.transparent = true;
                mesh.material.opacity = 0.001;
            }
        }
    }

    const cameraEl = document.querySelector('a-camera');
    if (cameraEl && cameraEl.components && cameraEl.components.raycaster) {
        cameraEl.components.raycaster.refreshObjects();
    }
}

function hideNextButton() {
    isNextButtonActive = false;
    if (btnNextQuiz3D) {
        btnNextQuiz3D.setAttribute('visible', false);
        const mesh = btnNextQuiz3D.getObject3D('mesh');
        if (mesh) mesh.visible = false;
    }
    if (btnNextPlane3D) {
        btnNextPlane3D.setAttribute('visible', false);
        const mesh = btnNextPlane3D.getObject3D('mesh');
        if (mesh) mesh.visible = false;
    }
}

function handleNextQuizNavigation() {
    if (isNavigatingNext || isTransitioningQuiz) return;
    isNavigatingNext = true;

    playChime(true);

    if (btnNextQuiz3D) {
        btnNextQuiz3D.setAttribute('scale', '1.25 1.25 1.25');
    }

    if (currentQuizId < 5) {
        const nextQuizId = currentQuizId + 1;
        console.log(`➡️ [Quiz AR] Seamless transition ke Kuis ${nextQuizId}...`);
        transitionToQuiz(nextQuizId, true);
    } else if (currentQuizId === 5) {
        console.log(`🏆 [Quiz AR] Kuis 5 Selesai! Seamless transition ke Final Score...`);
        transitionToQuiz('score', true);
    } else {
        console.log('🏆 [Quiz AR] Semua Kuis Selesai! Kembali ke Menu Utama...');
        if (statusBar) {
            statusBar.textContent = `Hebat! Semua Kuis Selesai! Kembali ke Halaman Utama...`;
            statusBar.classList.add('finished');
        }
        setTimeout(() => {
            window.location.href = './index.html';
        }, 350);
    }
}

window.__triggerNextQuiz = handleNextQuizNavigation;

// -----------------------------------------------------------------------------
// Home Button Display for Final Score
// -----------------------------------------------------------------------------
function showHomeScoreButton() {
    if (isHomeButtonActive) return;
    console.log('✨ [Quiz AR] Memunculkan 3D Home Button pada video score.mp4...');
    isHomeButtonActive = true;
    isNavigatingHome = false;

    if (btnHomeScore3D) {
        btnHomeScore3D.setAttribute('visible', true);
        btnHomeScore3D.setAttribute('scale', '0.2 0.2 0.2');

        const mesh = btnHomeScore3D.getObject3D('mesh');
        if (mesh) {
            mesh.visible = true;
            if (mesh.material) {
                mesh.material.depthWrite = false;
                mesh.material.transparent = true;
                mesh.material.opacity = 0;
            }
        }

        setTimeout(() => {
            if (isHomeButtonActive && !isNavigatingHome) {
                btnHomeScore3D.emit('home-fade-in', null, false);
            }
        }, 50);

        setTimeout(() => {
            if (isHomeButtonActive && !isNavigatingHome) {
                btnHomeScore3D.setAttribute('scale', '1 1 1');
                btnHomeScore3D.emit('home-pulse-start', null, false);
            }
        }, 650);
    }

    if (btnHomeScorePlane) {
        btnHomeScorePlane.setAttribute('visible', true);
        const mesh = btnHomeScorePlane.getObject3D('mesh');
        if (mesh) {
            mesh.visible = true;
            if (mesh.material) {
                mesh.material.depthWrite = false;
                mesh.material.transparent = true;
                mesh.material.opacity = 0.001;
            }
        }
    }

    const cameraEl = document.querySelector('a-camera');
    if (cameraEl && cameraEl.components && cameraEl.components.raycaster) {
        cameraEl.components.raycaster.refreshObjects();
    }
}

function hideHomeScoreButton() {
    isHomeButtonActive = false;
    if (btnHomeScore3D) {
        btnHomeScore3D.setAttribute('visible', false);
        const mesh = btnHomeScore3D.getObject3D('mesh');
        if (mesh) mesh.visible = false;
    }
    if (btnHomeScorePlane) {
        btnHomeScorePlane.setAttribute('visible', false);
        const mesh = btnHomeScorePlane.getObject3D('mesh');
        if (mesh) mesh.visible = false;
    }
}

function handleHomeScoreNavigation() {
    if (isNavigatingHome) return;
    isNavigatingHome = true;

    playChime(true);

    if (btnHomeScore3D) {
        btnHomeScore3D.removeAttribute('animation__pulse');
        btnHomeScore3D.setAttribute('scale', '1.25 1.25 1.25');
    }

    console.log('🏠 [Quiz AR] Tombol Home pada Final Score diklik! Kembali ke Menu Utama...');
    if (statusBar) {
        statusBar.textContent = 'Kembali ke Menu Utama...';
        statusBar.classList.add('finished');
    }

    setTimeout(() => {
        window.location.href = './index.html';
    }, 300);
}

window.__triggerHomeFromScore = handleHomeScoreNavigation;

function waitForFinalScoreCompletion(videoEl, soundEl) {
    let hasEnded = false;
    let videoDone = false;
    let soundDone = false;

    const onAllDone = () => {
        if (hasEnded) return;
        hasEnded = true;

        console.log('🏁 [Quiz AR] Final Score selesai diputar! Frame dibekukan dan tombol Home aktif...');
        if (videoEl) videoEl.pause();
        if (soundEl) soundEl.pause();
        quizState = 'FINISHED';

        if (statusBar) {
            statusBar.textContent = `Selamat! Ketuk Mutiara Rumah di kerang untuk kembali ke Menu Utama!`;
            statusBar.classList.remove('tracking');
            statusBar.classList.add('finished');
        }

        if (!isHomeButtonActive) {
            showHomeScoreButton();
        }
    };

    const tryFinish = () => {
        if (videoDone && soundDone) {
            onAllDone();
        }
    };

    const videoTimeHandler = function () {
        if (this.currentTime >= 4.3 && !isHomeButtonActive && !isNavigatingHome) {
            console.log('✨ [Quiz AR] Detik 4.3s: Memunculkan tombol Home 3D...');
            showHomeScoreButton();
        }

        if (this.duration && (this.duration - this.currentTime <= 0.4)) {
            this.removeEventListener('timeupdate', videoTimeHandler);
            this.pause();
            videoDone = true;
            tryFinish();
        }
    };

    if (videoEl) {
        videoEl.addEventListener('timeupdate', videoTimeHandler);
        videoEl.addEventListener('ended', () => {
            videoDone = true;
            tryFinish();
        }, { once: true });
    } else {
        videoDone = true;
    }

    if (soundEl) {
        soundEl.addEventListener('ended', () => {
            soundDone = true;
            tryFinish();
        }, { once: true });
    } else {
        soundDone = true;
    }

    setTimeout(() => {
        if (!hasEnded) {
            videoDone = true;
            soundDone = true;
            onAllDone();
        }
    }, 15000);
}

// -----------------------------------------------------------------------------
// Touch & Raycast Detection for Choices, Next, and Home Buttons
// -----------------------------------------------------------------------------
function checkChoiceInteraction(clientX, clientY) {
    if (quizState !== 'WAITING_CHOICE' || !isTargetFound || isTransitioningQuiz) return false;
    if (!btnChoiceLeft3D || !btnChoiceRight3D || !arScene) return false;

    const camera = arScene.camera;
    if (!camera) return false;

    try {
        const leftWorldPos = new THREE.Vector3();
        const rightWorldPos = new THREE.Vector3();
        btnChoiceLeft3D.object3D.getWorldPosition(leftWorldPos);
        btnChoiceRight3D.object3D.getWorldPosition(rightWorldPos);

        const screenPosLeft = leftWorldPos.clone().project(camera);
        const screenPosRight = rightWorldPos.clone().project(camera);

        if (screenPosLeft.z < 1 && screenPosRight.z < 1) {
            const screenXLeft = (screenPosLeft.x * 0.5 + 0.5) * window.innerWidth;
            const screenYLeft = (-screenPosLeft.y * 0.5 + 0.5) * window.innerHeight;

            const screenXRight = (screenPosRight.x * 0.5 + 0.5) * window.innerWidth;
            const screenYRight = (-screenPosRight.y * 0.5 + 0.5) * window.innerHeight;

            const distLeft = Math.hypot(clientX - screenXLeft, clientY - screenYLeft);
            const distRight = Math.hypot(clientX - screenXRight, clientY - screenYRight);

            const cardDistPx = Math.hypot(screenXRight - screenXLeft, screenYRight - screenYLeft);
            const hitRadius = Math.max(50, Math.min(260, cardDistPx * 0.55));

            if (distLeft <= hitRadius && distLeft < distRight) {
                console.log(`🎯 [Choice 3D Screen Match] Left choice tapped! dist=${distLeft.toFixed(1)}px`);
                selectChoice(currentQuiz.leftChoice);
                return true;
            } else if (distRight <= hitRadius && distRight < distLeft) {
                console.log(`🎯 [Choice 3D Screen Match] Right choice tapped! dist=${distRight.toFixed(1)}px`);
                selectChoice(currentQuiz.rightChoice);
                return true;
            }
        }
    } catch (err) {
        console.warn('Choice screen projection check warning:', err);
    }

    try {
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2(
            (clientX / window.innerWidth) * 2 - 1,
            -(clientY / window.innerHeight) * 2 + 1
        );
        raycaster.setFromCamera(mouse, camera);

        const leftObj = btnChoiceLeft3D.object3D;
        const rightObj = btnChoiceRight3D.object3D;

        const leftIntersects = raycaster.intersectObject(leftObj, true);
        const rightIntersects = raycaster.intersectObject(rightObj, true);

        if (leftIntersects.length > 0 && (rightIntersects.length === 0 || leftIntersects[0].distance < rightIntersects[0].distance)) {
            console.log('🎯 [Three.js Raycaster Match] Intersected Left Choice 3D Plane!');
            selectChoice(currentQuiz.leftChoice);
            return true;
        } else if (rightIntersects.length > 0) {
            console.log('🎯 [Three.js Raycaster Match] Intersected Right Choice 3D Plane!');
            selectChoice(currentQuiz.rightChoice);
            return true;
        }
    } catch (err) {
        console.warn('Choice raycaster check warning:', err);
    }

    return false;
}

function checkNextButtonInteraction(clientX, clientY) {
    if (!isNextButtonActive || isNavigatingNext || isTransitioningQuiz) return false;
    if (!btnNextQuiz3D || !arScene) return false;

    const camera = arScene.camera;
    if (!camera) return false;

    try {
        const nextWorldPos = new THREE.Vector3();
        btnNextQuiz3D.object3D.getWorldPosition(nextWorldPos);

        const screenPos = nextWorldPos.clone().project(camera);
        if (screenPos.z < 1) {
            const screenX = (screenPos.x * 0.5 + 0.5) * window.innerWidth;
            const screenY = (-screenPos.y * 0.5 + 0.5) * window.innerHeight;
            const dist = Math.hypot(clientX - screenX, clientY - screenY);

            if (dist < 110) {
                console.log(`🎯 [Touch Target Match] Screen-space tap on 3D Next Button! dist=${dist.toFixed(1)}px`);
                handleNextQuizNavigation();
                return true;
            }
        }
    } catch (err) {
        console.warn('Screen projection check warning:', err);
    }

    try {
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2(
            (clientX / window.innerWidth) * 2 - 1,
            -(clientY / window.innerHeight) * 2 + 1
        );
        raycaster.setFromCamera(mouse, camera);

        const targetObjects = [];
        if (btnNextQuiz3D && btnNextQuiz3D.object3D) targetObjects.push(btnNextQuiz3D.object3D);
        if (btnNextPlane3D && btnNextPlane3D.object3D) targetObjects.push(btnNextPlane3D.object3D);

        const intersects = raycaster.intersectObjects(targetObjects, true);
        if (intersects && intersects.length > 0) {
            console.log('🎯 [Three.js Raycaster Match] Intersected 3D Next Button object!');
            handleNextQuizNavigation();
            return true;
        }
    } catch (err) {
        console.warn('Next raycaster check warning:', err);
    }

    return false;
}

function checkHomeScoreInteraction(clientX, clientY) {
    if (!isHomeButtonActive || isNavigatingHome || isTransitioningQuiz) return false;
    if (!btnHomeScore3D || !arScene) return false;

    const camera = arScene.camera;
    if (!camera) return false;

    try {
        const homeWorldPos = new THREE.Vector3();
        btnHomeScore3D.object3D.getWorldPosition(homeWorldPos);

        const screenPos = homeWorldPos.clone().project(camera);
        if (screenPos.z < 1) {
            const screenX = (screenPos.x * 0.5 + 0.5) * window.innerWidth;
            const screenY = (-screenPos.y * 0.5 + 0.5) * window.innerHeight;
            const dist = Math.hypot(clientX - screenX, clientY - screenY);

            if (dist < 110) {
                console.log(`🎯 [Touch Target Match] Screen-space tap on 3D Home Button! dist=${dist.toFixed(1)}px`);
                handleHomeScoreNavigation();
                return true;
            }
        }
    } catch (err) {
        console.warn('Home screen projection check warning:', err);
    }

    try {
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2(
            (clientX / window.innerWidth) * 2 - 1,
            -(clientY / window.innerHeight) * 2 + 1
        );
        raycaster.setFromCamera(mouse, camera);

        const targetObjects = [];
        if (btnHomeScore3D && btnHomeScore3D.object3D) targetObjects.push(btnHomeScore3D.object3D);
        if (btnHomeScorePlane && btnHomeScorePlane.object3D) targetObjects.push(btnHomeScorePlane.object3D);

        const intersects = raycaster.intersectObjects(targetObjects, true);
        if (intersects && intersects.length > 0) {
            console.log('🎯 [Three.js Raycaster Match] Intersected 3D Home Button object!');
            handleHomeScoreNavigation();
            return true;
        }
    } catch (err) {
        console.warn('Home raycaster check warning:', err);
    }

    return false;
}

// Global Touch & Click Listeners on window
window.addEventListener('click', (e) => {
    if (quizState === 'WAITING_CHOICE') {
        const handled = checkChoiceInteraction(e.clientX, e.clientY);
        if (handled) {
            e.stopPropagation();
            if (e.stopImmediatePropagation) e.stopImmediatePropagation();
            return;
        }
    }
    if (isNextButtonActive && !isNavigatingNext) {
        const handled = checkNextButtonInteraction(e.clientX, e.clientY);
        if (handled) {
            e.stopPropagation();
            if (e.stopImmediatePropagation) e.stopImmediatePropagation();
            return;
        }
    }
    if (isHomeButtonActive && !isNavigatingHome) {
        const handled = checkHomeScoreInteraction(e.clientX, e.clientY);
        if (handled) {
            e.stopPropagation();
            if (e.stopImmediatePropagation) e.stopImmediatePropagation();
            return;
        }
    }
}, true);

window.addEventListener('touchend', (e) => {
    if (e.changedTouches && e.changedTouches.length > 0) {
        const t = e.changedTouches[0];
        if (quizState === 'WAITING_CHOICE') {
            const handled = checkChoiceInteraction(t.clientX, t.clientY);
            if (handled) {
                e.preventDefault();
                e.stopPropagation();
                if (e.stopImmediatePropagation) e.stopImmediatePropagation();
                return;
            }
        }
        if (isNextButtonActive && !isNavigatingNext) {
            const handled = checkNextButtonInteraction(t.clientX, t.clientY);
            if (handled) {
                e.preventDefault();
                e.stopPropagation();
                if (e.stopImmediatePropagation) e.stopImmediatePropagation();
                return;
            }
        }
        if (isHomeButtonActive && !isNavigatingHome) {
            const handled = checkHomeScoreInteraction(t.clientX, t.clientY);
            if (handled) {
                e.preventDefault();
                e.stopPropagation();
                if (e.stopImmediatePropagation) e.stopImmediatePropagation();
                return;
            }
        }
    }
}, { passive: false, capture: true });

// -----------------------------------------------------------------------------
// User Choice Selection
// -----------------------------------------------------------------------------
function selectChoice(choice) {
    if (quizState !== 'WAITING_CHOICE' && quizState !== 'RESULT_PLAYING') return;

    const soundV8 = document.getElementById('sound-v8');
    if (soundV8) {
        soundV8.pause();
        soundV8.currentTime = 0;
        soundV8.onended = null;
    }

    const isBenar = (choice === 'benar');
    console.log(`✨ [Quiz AR] Kuis ${currentQuizId}: Pengguna memilih: ${choice.toUpperCase()}`);

    if (activeSoundPertanyaan) {
        activeSoundPertanyaan.pause();
    }

    playChime(isBenar);

    // Pastikan bagian tombol pilihan TETAP ADA di layar
    if (btnChoiceLeft3D) btnChoiceLeft3D.setAttribute('visible', true);
    if (btnChoiceRight3D) btnChoiceRight3D.setAttribute('visible', true);

    hideNextButton();

    if (isBenar) {
        choiceHandled = true;
        quizState = 'RESULT_PLAYING';

        // Kedua video tetap tampil di layar (tombol/karakter tidak hilang), video salah di-pause pada frame 9.25s
        if (activeAframeVidBenar) activeAframeVidBenar.setAttribute('visible', true);
        if (activeAframeVidSalah) activeAframeVidSalah.setAttribute('visible', true);

        if (activeVidSalah) {
            activeVidSalah.pause();
            try { activeVidSalah.currentTime = 9.25; } catch (e) {}
        }
        if (activeSoundSalah) {
            activeSoundSalah.pause();
            activeSoundSalah.currentTime = 0;
        }

        if (activeVidBenar) {
            activeVidBenar.muted = true;
            if (activeVidBenar.currentTime < 8.5 || activeVidBenar.currentTime > 10.5 || activeVidBenar.ended) {
                try { activeVidBenar.currentTime = 9.25; } catch (e) {}
            }
            const p = activeVidBenar.play();
            if (p !== undefined) {
                p.catch(e => {
                    console.warn('⚠️ Play Benar retry:', e);
                    setTimeout(() => activeVidBenar && activeVidBenar.play().catch(err => console.error('❌ Play Benar error:', err)), 100);
                });
            }
        }

        if (activeSoundBenar) {
            activeSoundBenar.pause();
            activeSoundBenar.currentTime = 0;
            activeSoundBenar.muted = false;
            activeSoundBenar.play().catch(e => console.error('Play sound Benar error:', e));
        }

        if (statusBar) {
            statusBar.textContent = currentQuiz.statusBenar;
            statusBar.classList.add('tracking');
        }

        waitForQuizCompletion(activeVidBenar, activeSoundBenar, true);

    } else {
        choiceHandled = true;
        quizState = 'RESULT_PLAYING';

        // Kedua video tetap tampil di layar (tombol/karakter tidak hilang), video benar di-pause pada frame 9.25s
        if (activeAframeVidBenar) activeAframeVidBenar.setAttribute('visible', true);
        if (activeAframeVidSalah) activeAframeVidSalah.setAttribute('visible', true);

        if (activeVidBenar) {
            activeVidBenar.pause();
            try { activeVidBenar.currentTime = 9.25; } catch (e) {}
        }
        if (activeSoundBenar) {
            activeSoundBenar.pause();
            activeSoundBenar.currentTime = 0;
        }

        if (activeVidSalah) {
            activeVidSalah.muted = true;
            if (activeVidSalah.currentTime < 8.5 || activeVidSalah.currentTime > 10.5 || activeVidSalah.ended) {
                try { activeVidSalah.currentTime = 9.25; } catch (e) {}
            }
            const p = activeVidSalah.play();
            if (p !== undefined) {
                p.catch(e => {
                    console.warn('⚠️ Play Salah retry:', e);
                    setTimeout(() => activeVidSalah && activeVidSalah.play().catch(err => console.error('❌ Play Salah error:', err)), 100);
                });
            }
        }

        if (activeSoundSalah) {
            activeSoundSalah.pause();
            activeSoundSalah.currentTime = 0;
            activeSoundSalah.muted = false;
            activeSoundSalah.play().catch(e => console.error('Play sound Salah error:', e));
        }

        if (statusBar) {
            statusBar.textContent = currentQuiz.statusSalah;
            statusBar.classList.add('finished');
        }

        waitForQuizCompletion(activeVidSalah, activeSoundSalah, false);
    }
}

function waitForQuizCompletion(videoEl, soundEl, isCorrect) {
    let hasEnded = false;
    let videoDone = false;
    let soundDone = false;

    const onAllDone = () => {
        if (hasEnded) return;
        hasEnded = true;

        console.log(`🏁 [Quiz AR] Penjelasan Kuis ${currentQuizId} selesai (${isCorrect ? 'Benar' : 'Salah'}).`);
        if (videoEl) videoEl.pause();
        if (soundEl) soundEl.pause();
        quizState = 'FINISHED';

        if (isCorrect) {
            if (statusBar) {
                statusBar.textContent = `Kuis ${currentQuizId} selesai! Ketuk tombol Next di bawah untuk lanjut`;
            }
            showNextButton();
        } else {
            if (statusBar) {
                statusBar.textContent = `Dengarkan penjelasannya lalu ketuk pilihan yang Benar ya!`;
            }
            if (btnChoiceLeft3D) btnChoiceLeft3D.setAttribute('visible', true);
            if (btnChoiceRight3D) btnChoiceRight3D.setAttribute('visible', true);
            const cameraEl = document.querySelector('a-camera');
            if (cameraEl && cameraEl.components && cameraEl.components.raycaster) {
                cameraEl.components.raycaster.refreshObjects();
            }
            quizState = 'WAITING_CHOICE';
            choiceHandled = false;
        }
    };

    const tryFinish = () => {
        if (videoDone && soundDone) {
            onAllDone();
        }
    };

    const videoTimeHandler = function () {
        if (this.duration && (this.duration - this.currentTime <= 0.4)) {
            this.removeEventListener('timeupdate', videoTimeHandler);
            this.pause();
            videoDone = true;
            tryFinish();
        }
    };

    if (videoEl) {
        videoEl.addEventListener('timeupdate', videoTimeHandler);
        videoEl.addEventListener('ended', () => {
            videoDone = true;
            tryFinish();
        }, { once: true });
    } else {
        videoDone = true;
    }

    if (soundEl) {
        soundEl.addEventListener('ended', () => {
            soundDone = true;
            tryFinish();
        }, { once: true });
    } else {
        soundDone = true;
    }

    setTimeout(() => {
        if (!hasEnded) {
            videoDone = true;
            soundDone = true;
            onAllDone();
        }
    }, 13000);
}

// -----------------------------------------------------------------------------
// Top Navigation Pills Click Interceptors
// -----------------------------------------------------------------------------
document.querySelectorAll('.quiz-pill').forEach(pill => {
    pill.addEventListener('click', (e) => {
        e.preventDefault();
        const targetQ = pill.dataset.quiz;
        if (targetQ && !isTransitioningQuiz) {
            transitionToQuiz(targetQ, true);
        }
    });
});
