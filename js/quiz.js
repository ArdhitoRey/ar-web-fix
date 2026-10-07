import { CDN_BASE } from "./cdnConfig.js";

// Quiz AR Logic - Marker 8 MindAR Experience
// Mendukung Quiz 1, 2, 3, 4, 5 dan Final Score secara Seamless (Single-Page Experience):
// - Preload seluruh 11 video dan 16 audio di awal tanpa reload halaman antar kuis
// - Transisi in-place 3D AR: Kuis lama slide-out ke kiri (fade-out), kuis baru slide-in dari kanan (fade-in & spring bounce)
// - Marker 8 tracking tetap aktif dan terkunci stabil di kamera sepanjang perpindahan
// - Sinkronisasi video ganda (Benar & Salah) dan jeda presisi di detik 9.25s
// - Touch target 3D screen-space & raycasting akurat untuk pilihan jawaban, Next button, dan Home pearl button
// - Navigasi dinamis via 3D Next Button serta Pill Navigator atas tanpa jeda loading

export const QUIZ_CONFIG = {
    1: {
        id: 1,
        title: "Kuis 1: Menjaga Kesehatan Gigi",
        questionText: "MANA CARA YANG BAIK MENJAGA KESEHATAN GIGI?",
        bannerImg: `${CDN_BASE}/compressed_ultra-videos/chapter1/quiz/quiz1/pertanyaan.PNG`,
        videoBenar: `${CDN_BASE}/compressed_ultra-videos/chapter1/quiz/quiz1/video/benar.mp4`,
        videoSalah: `${CDN_BASE}/compressed_ultra-videos/chapter1/quiz/quiz1/video/salah.mp4`,
        shaderBenar: "chromakey-magenta",
        shaderSalah: "chromakey-advanced",
        soundPertanyaan: `${CDN_BASE}/compressed_ultra-videos/chapter1/quiz/quiz1/sound/pertanyaan.mp3`,
        soundBenar: `${CDN_BASE}/compressed_ultra-videos/chapter1/quiz/quiz1/sound/benar.mp3`,
        soundSalah: `${CDN_BASE}/compressed_ultra-videos/chapter1/quiz/quiz1/sound/salah.mp3`,
        leftChoice: "benar",
        rightChoice: "salah",
        labelLeft: "Sikat Gigi Pagi & Malam",
        labelRight: "Tidak Mau Sikat Gigi",
        promptStatusText: "Ketuk jawabanmu: SIKAT GIGI PAGI & MALAM atau TIDAK MAU SIKAT GIGI!",
        statusBenar: "Hebat! Pilihanmu benar: Sikat Gigi Pagi dan Malam!",
        statusSalah: "Kurang tepat! Dengarkan penjelasannya...",
        descBenar: "Jawabanmu benar! Kita harus menyikat gigi di pagi hari setelah sarapan dan malam hari sebelum tidur agar gigi tetap bersih dan sehat.",
        descSalah: "Jangan malas menyikat gigi ya! Tidak mau sikat gigi bisa membuat kuman berkembang biak dan merusak gigi hingga berlubang."
    },
    2: {
        id: 2,
        title: "Kuis 2: Cara Sikat Gigi yang Benar",
        questionText: "MANA CARA SIKAT GIGI YANG BENAR?",
        bannerImg: `${CDN_BASE}/compressed_ultra-videos/chapter1/quiz/quiz2/pertanyaan.PNG`,
        videoBenar: `${CDN_BASE}/compressed_ultra-videos/chapter1/quiz/quiz2/video/benar.mp4`,
        videoSalah: `${CDN_BASE}/compressed_ultra-videos/chapter1/quiz/quiz2/video/salah.mp4`,
        shaderBenar: "chromakey-magenta",
        shaderSalah: "chromakey-advanced",
        soundPertanyaan: `${CDN_BASE}/compressed_ultra-videos/chapter1/quiz/quiz2/sound/pertanyaan.mp3`,
        soundBenar: `${CDN_BASE}/compressed_ultra-videos/chapter1/quiz/quiz2/sound/benar.mp3`,
        soundSalah: `${CDN_BASE}/compressed_ultra-videos/chapter1/quiz/quiz2/sound/salah.mp3`,
        // Pada Kuis 2: Kartu kiri adalah Salah, Kartu kanan adalah Benar
        leftChoice: "salah",
        rightChoice: "benar",
        labelLeft: "Sikat Bagian Depan Saja",
        labelRight: "Sikat Semua Bagian Gigi",
        promptStatusText: "Ketuk jawabanmu: SIKAT BAGIAN DEPAN SAJA atau SIKAT SEMUA BAGIAN GIGI!",
        statusBenar: "Hebat! Pilihanmu benar: Sikat Semua Bagian Gigi!",
        statusSalah: "Kurang tepat! Dengarkan penjelasannya...",
        descBenar: "Jawabanmu benar! Sikat seluruh permukaan gigi mulai dari depan, samping, hingga bagian dalam dan permukaan kunyah agar bersih menyeluruh.",
        descSalah: "Menyikat bagian depan saja tidak cukup! Kuman dan sisa makanan bisa bersembunyi di sela-sela serta permukaan gigi bagian samping dan belakang."
    },
    3: {
        id: 3,
        title: "Kuis 3: Jadwal ke Dokter Gigi",
        questionText: "KAPAN KITA HARUS KE DOKTER GIGI?",
        bannerImg: `${CDN_BASE}/compressed_ultra-videos/chapter1/quiz/quiz3/pertanyaan.PNG`,
        videoBenar: `${CDN_BASE}/compressed_ultra-videos/chapter1/quiz/quiz3/video/benar.mp4`,
        videoSalah: `${CDN_BASE}/compressed_ultra-videos/chapter1/quiz/quiz3/video/salah.mp4`,
        shaderBenar: "chromakey-magenta",
        shaderSalah: "chromakey-magenta", // Kuis 3 video salah berlatar magenta
        soundPertanyaan: `${CDN_BASE}/compressed_ultra-videos/chapter1/quiz/quiz3/sound/pertanyaan.mp3`,
        soundBenar: `${CDN_BASE}/compressed_ultra-videos/chapter1/quiz/quiz3/sound/benar.mp3`,
        soundSalah: `${CDN_BASE}/compressed_ultra-videos/chapter1/quiz/quiz3/sound/salah.mp3`,
        leftChoice: "benar",
        rightChoice: "salah",
        labelLeft: "Setiap Enam Bulan Sekali",
        labelRight: "Tidak Pernah Karena Takut",
        promptStatusText: "Ketuk jawabanmu: SETIAP ENAM BULAN SEKALI atau TIDAK PERNAH KARENA TAKUT!",
        statusBenar: "Hebat! Pilihanmu benar: Setiap Enam Bulan Sekali!",
        statusSalah: "Kurang tepat! Dengarkan penjelasannya...",
        descBenar: "Jawabanmu benar! Kita harus rutin memeriksakan gigi ke dokter gigi setiap 6 bulan sekali agar gigi selalu terawat dan sehat.",
        descSalah: "Jangan takut ke dokter gigi ya! Dokter gigi adalah sahabat yang membantu kita merawat gigi agar terhindar dari sakit gigi."
    },
    4: {
        id: 4,
        title: "Kuis 4: Kebiasaan Setelah Makan",
        questionText: "SETELAH MAKAN KITA SEBAIKNYA?",
        bannerImg: `${CDN_BASE}/compressed_ultra-videos/chapter1/quiz/quiz4/pertanyaan.PNG`,
        videoBenar: `${CDN_BASE}/compressed_ultra-videos/chapter1/quiz/quiz4/video/benar.mp4`,
        videoSalah: `${CDN_BASE}/compressed_ultra-videos/chapter1/quiz/quiz4/video/salah.mp4`,
        shaderBenar: "chromakey-magenta",
        shaderSalah: "chromakey-advanced",
        soundPertanyaan: `${CDN_BASE}/compressed_ultra-videos/chapter1/quiz/quiz4/sound/pertanyaan.mp3`,
        soundBenar: `${CDN_BASE}/compressed_ultra-videos/chapter1/quiz/quiz4/sound/benar.mp3`,
        soundSalah: `${CDN_BASE}/compressed_ultra-videos/chapter1/quiz/quiz4/sound/salah.mp3`,
        leftChoice: "benar",
        rightChoice: "salah",
        labelLeft: "Berkumur",
        labelRight: "Langsung Tidur",
        promptStatusText: "Ketuk jawabanmu: BERKUMUR atau LANGSUNG TIDUR!",
        statusBenar: "Hebat! Pilihanmu benar: Berkumur!",
        statusSalah: "Kurang tepat! Dengarkan penjelasannya...",
        descBenar: "Jawabanmu benar! Berkumur setelah makan membantu membersihkan sisa-sisa makanan yang menempel di sela gigi.",
        descSalah: "Jangan langsung tidur setelah makan ya! Sisa makanan yang tertinggal akan menjadi makanan bagi kuman perusak gigi."
    },
    5: {
        id: 5,
        title: "Kuis 5: Teman Baik Gigi",
        questionText: "SIAPA YANG JADI TEMAN BAIK GIGI KITA?",
        bannerImg: `${CDN_BASE}/compressed_ultra-videos/chapter1/quiz/quiz5/pertanyaan.PNG`,
        videoBenar: `${CDN_BASE}/compressed_ultra-videos/chapter1/quiz/quiz5/video/benar.mp4`,
        videoSalah: `${CDN_BASE}/compressed_ultra-videos/chapter1/quiz/quiz5/video/salah.mp4`,
        shaderBenar: "chromakey-magenta",
        shaderSalah: "chromakey-magenta", // Kuis 5 video salah berlatar magenta
        soundPertanyaan: `${CDN_BASE}/compressed_ultra-videos/chapter1/quiz/quiz5/sound/pertanyaan.mp3`,
        soundBenar: `${CDN_BASE}/compressed_ultra-videos/chapter1/quiz/quiz5/sound/benar.mp3`,
        soundSalah: `${CDN_BASE}/compressed_ultra-videos/chapter1/quiz/quiz5/sound/salah.mp3`,
        leftChoice: "benar",
        rightChoice: "salah",
        labelLeft: "Bakteri Baik",
        labelRight: "Bakteri Jahat",
        promptStatusText: "Ketuk jawabanmu: BAKTERI BAIK atau BAKTERI JAHAT!",
        statusBenar: "Hebat! Pilihanmu benar: Bakteri Baik!",
        statusSalah: "Kurang tepat! Dengarkan penjelasannya...",
        descBenar: "Jawabanmu benar! Bakteri baik di dalam mulut membantu menjaga keseimbangan dan melindungi gigi dari kuman jahat.",
        descSalah: "Bakteri jahat adalah musuh gigi kita! Mereka menghasilkan asam dari sisa gula yang bisa membuat gigi berlubang."
    },
    'score': {
        id: 'score',
        isFinalScore: true,
        title: "Skor Akhir: Petualangan Kuis AR",
        questionText: "SELAMAT! KAMU TELAH MENYELESAIKAN SEMUA KUIS!",
        bannerImg: "",
        videoScore: `${CDN_BASE}/compressed_ultra-videos/chapter1/quiz/final-scores/video/score.mp4`,
        soundScore: `${CDN_BASE}/compressed_ultra-videos/chapter1/quiz/final-scores/sound/sound.mp3`,
        shaderScore: "chromakey-score",
        promptStatusText: "Selamat! Simak pesan akhir dari Profesor Gurita...",
        statusScore: "Selamat! Kamu telah menyelesaikan semua petualangan kuis!",
        descScore: "Luar biasa! Kamu telah mempelajari semua cara menjaga kesehatan gigi dan berhasil menyelesaikan seluruh tantangan kuis!"
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

// Standalone check: apakah berjalan mandiri di quiz.html atau seamless di chapter2.html
const isStandalone = !!document.getElementById('targetQuiz');
let quizActiveSeamless = isStandalone;

// DOM Elements
const loadingOverlay = document.getElementById('loadingOverlay');
const loadingTitle = document.getElementById('loadingTitle');
const loadingProgress = document.getElementById('loadingProgress');
const loadingBarFill = document.getElementById('loadingBarFill');
const startButton = document.getElementById('startButton');

const statusBar = document.getElementById('statusBar');
const arScene = document.getElementById('arScene');
const targetQuiz = document.getElementById('targetQuiz') || document.getElementById('target8');
const quizSceneWrapper = document.getElementById('quiz-scene-wrapper');

// Active A-Frame 3D Entities (dinamis per kuis)
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

// 3D Home Button Elements for Final Score (Tracking on clam pearl in score.mp4)
const btnHomeScore3D = document.getElementById('btn-home-score-3d');
const btnHomeScorePlane = document.getElementById('btn-home-score-plane');

// Modal Elements (Fallback)
const resultModal = document.getElementById('resultModal');
const resultCard = document.getElementById('resultCard');
const resultIcon = document.getElementById('resultIcon');
const resultTitle = document.getElementById('resultTitle');
const resultDesc = document.getElementById('resultDesc');
const btnReplayQuiz = document.getElementById('btnReplayQuiz');
const btnNextQuiz = document.getElementById('btnNextQuiz');

// Preloaded HTML Media Elements Collection
const allVideoElements = Array.from(document.querySelectorAll('a-assets video'));
const allSoundElements = Array.from(document.querySelectorAll('a-assets audio'));

// Active media references (dynamically switched per quiz)
let activeVidBenar = null;
let activeVidSalah = null;
let activeVidScore = null;

let activeSoundPertanyaan = null;
let activeSoundBenar = null;
let activeSoundSalah = null;
let activeSoundScore = null;

// State Machine
// States: 'LOADING' | 'READY_WAIT_START' | 'WAIT_MARKER' | 'INTRO_PLAYING' | 'WAITING_CHOICE' | 'RESULT_PLAYING' | 'FINAL_SCORE_PLAYING' | 'FINISHED'
let quizState = isStandalone ? 'LOADING' : 'WAIT_MARKER';
let isTargetFound = false;
let choiceHandled = false;
let isTransitioningQuiz = false;
let isNextButtonActive = false;
let isNavigatingNext = false;
let isHomeButtonActive = false;
let isNavigatingHome = false;
let audioCtx = null;
let introStartTime = 0;
let monitorRaf = null;

// Update UI info jika di standalone quiz
if (isStandalone && loadingTitle) loadingTitle.textContent = currentQuiz.title;

// Web Audio API tactile feedback
function playChime(isCorrect) {
    try {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        const now = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);

        if (isCorrect) {
            // Sweet ascending chime: C5 (523Hz) -> G5 (784Hz)
            osc.type = 'sine';
            osc.frequency.setValueAtTime(523.25, now);
            osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.15);
            gain.gain.setValueAtTime(0.15, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
            osc.start(now);
            osc.stop(now + 0.35);
        } else {
            // Soft double low tone: G4 (392Hz) -> Eb4 (311Hz)
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(392.00, now);
            osc.frequency.setValueAtTime(311.13, now + 0.12);
            gain.gain.setValueAtTime(0.12, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
            osc.start(now);
            osc.stop(now + 0.3);
        }
    } catch (e) {
        console.warn('⚠️ Web Audio feedback unavailable:', e);
    }
}

// -----------------------------------------------------------------------------
// Kamera Streaming Helper (Cegah Black Screen & Suara Memulai Duluan)
// -----------------------------------------------------------------------------
function isCameraActive() {
    const video = document.querySelector('body > video') || document.querySelector('video:not([id])');
    if (!video) return false;
    return video.readyState >= 2 && video.videoWidth > 0 && !video.paused;
}

function waitForCameraActive(callback) {
    if (isCameraActive()) {
        callback();
        return;
    }
    const checkInterval = setInterval(() => {
        if (isCameraActive()) {
            clearInterval(checkInterval);
            callback();
        }
    }, 100);

    const video = document.querySelector('body > video') || document.querySelector('video:not([id])');
    if (video) {
        video.addEventListener('playing', () => {
            clearInterval(checkInterval);
            callback();
        }, { once: true });
    }

    setTimeout(() => {
        clearInterval(checkInterval);
        callback();
    }, 3500);
}

// -----------------------------------------------------------------------------
// Pre-buffering All Media Assets & Start Activation (Hanya untuk quiz.html standalone)
// -----------------------------------------------------------------------------
if (isStandalone) {
    let bufferedCount = 0;
    const totalAssetsToBuffer = allVideoElements.length + allSoundElements.length;

    function unlockStartButton() {
        if (quizState !== 'LOADING') return;
        quizState = 'READY_WAIT_START';
        if (loadingBarFill) loadingBarFill.style.width = '100%';
        if (loadingProgress) loadingProgress.textContent = '100%';
        if (startButton) {
            startButton.disabled = false;
            startButton.textContent = isFinalScore ? 'Buka Skor Akhir' : 'Mulai';
            startButton.classList.add('ready');
        }
    }

    function registerBufferProgress() {
        bufferedCount++;
        const pct = Math.round((bufferedCount / Math.max(1, totalAssetsToBuffer)) * 100);
        if (loadingBarFill) loadingBarFill.style.width = `${Math.max(12, pct)}%`;
        if (loadingProgress) loadingProgress.textContent = `${pct}%`;
        if (bufferedCount >= totalAssetsToBuffer) {
            unlockStartButton();
        }
    }

    allVideoElements.forEach(v => {
        if (v.readyState >= 3) {
            registerBufferProgress();
        } else {
            v.addEventListener('canplaythrough', registerBufferProgress, { once: true });
            v.addEventListener('error', registerBufferProgress, { once: true });
        }
    });

    allSoundElements.forEach(s => {
        if (s.readyState >= 3) {
            registerBufferProgress();
        } else {
            s.addEventListener('canplaythrough', registerBufferProgress, { once: true });
            s.addEventListener('error', registerBufferProgress, { once: true });
        }
    });

    // Fallback timeout (1.8s) agar cepat terbuka
    setTimeout(() => {
        if (quizState === 'LOADING') {
            console.log('⏱️ [Quiz AR] Fast-start fallback: Mulai diaktifkan.');
            unlockStartButton();
        }
    }, 1800);

    if (startButton) {
        const handleStartQuiz = (e) => {
            if (startButton.disabled || quizState === 'LOADING') {
                if (e) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                return;
            }
            // Segera buka kamera tanpa delay black screen
            if (loadingOverlay) {
                loadingOverlay.classList.add('hidden');
                setTimeout(() => { loadingOverlay.style.display = 'none'; }, 250);
            }
            if (arScene) arScene.classList.add('ready');
            if (statusBar) {
                statusBar.textContent = 'Membuka kamera...';
                statusBar.classList.remove('tracking', 'finished');
            }

            executeStartQuiz();
        };
        startButton.addEventListener('click', handleStartQuiz);
        startButton.addEventListener('touchend', handleStartQuiz);
    }
}

// -----------------------------------------------------------------------------
// Seamless Quiz Integration for Chapter 2
// -----------------------------------------------------------------------------
window.__startQuizSeamless = function (targetQuizId = 1) {
    console.log(`🚀 [Quiz AR Seamless] Memulai kuis ${targetQuizId} langsung pada Marker 8 di Bab 1...`);
    window.__quizActiveSeamless = true;
    quizActiveSeamless = true;
    const quizTopBar = document.getElementById('quizTopBar');
    if (quizTopBar) quizTopBar.style.display = 'flex';

    isTransitioningQuiz = false;
    isNavigatingNext = false;

    // Pastikan audio narasi Part 8 Bab 1 berhenti total
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
    console.log('🔄 [Quiz AR Seamless] Kembali dari Kuis ke Bab 1...');
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

const btnBackToChapter = document.getElementById('btnBackToChapter1') || document.getElementById('btnBackToChapter2');
if (btnBackToChapter) {
    btnBackToChapter.addEventListener('click', (e) => {
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

    // Update document title and URL without reload (hanya jika di standalone quiz.html)
    if (isStandalone) {
        document.title = isFinalScore ? 'Kuis Petualangan AR - Skor Akhir (Marker 8)' : `Kuis Petualangan AR - Babak ${currentQuizId} (Marker 8)`;
        try {
            window.history.replaceState(null, '', `./quiz.html?quiz=${currentQuizId}`);
        } catch (e) {}
    }

    // Highlight active navigation pill
    document.querySelectorAll('.quiz-pill').forEach(pill => {
        if (pill.dataset.quiz == currentQuizId) {
            pill.classList.add('active');
        } else {
            pill.classList.remove('active');
        }
    });

    // Aktifkan / sembunyikan entity group kuis (quiz-group-1 .. 5 dan quiz-group-score)
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

    // Update active media references and A-Frame entity properties
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

// Stop all media playback immediately (optional exception for pre-warming videos)
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

    // Sembunyikan tombol interaktif saat transisi
    if (btnChoiceLeft3D) btnChoiceLeft3D.setAttribute('visible', false);
    if (btnChoiceRight3D) btnChoiceRight3D.setAttribute('visible', false);
    hideNextButton();
    hideHomeScoreButton();

    if (statusBar) {
        statusBar.textContent = (normalizedTarget === 'score') ? 'Membuka Skor Akhir...' : `Membuka Kuis ${normalizedTarget}...`;
        statusBar.classList.remove('finished');
        statusBar.classList.add('tracking');
    }

    // Pastikan tidak ada kebocoran suara Part 8 saat berganti kuis
    const soundV8 = document.getElementById('sound-v8');
    if (soundV8) {
        soundV8.pause();
        soundV8.currentTime = 0;
        soundV8.onended = null;
    }

    // Identifikasi target videos yang akan di-warm up
    const targetBenar = (normalizedTarget !== 'score') ? document.getElementById(`vid-quiz${normalizedTarget}-benar`) : null;
    const targetSalah = (normalizedTarget !== 'score') ? document.getElementById(`vid-quiz${normalizedTarget}-salah`) : null;
    const targetScore = (normalizedTarget === 'score') ? document.getElementById('vid-quiz-score') : null;
    const warmingUpVideos = [targetBenar, targetSalah, targetScore].filter(Boolean);

    // Stop current media (kecuali target videos yang sedang di-warm up)
    stopAllMedia(warmingUpVideos);

    // WARM UP TARGET VIDEOS IMMEDIATELY at millisecond 0 of slide-out:
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
        // 1. Emit slide-out animation to the left
        quizSceneWrapper.emit('trigger-slide-out', null, false);

        setTimeout(() => {
            // 2. Ganti konten kuis setelah animasi slide-out selesai (380ms)
            setupQuizScene(normalizedTarget);

            // 3. Posisikan ke kanan (1.4 0 0) lalu trigger slide-in ke tengah (0 0 0)
            quizSceneWrapper.setAttribute('position', '1.4 0 0');
            quizSceneWrapper.setAttribute('scale', '0.7 0.7 0.7');
            quizSceneWrapper.setAttribute('visible', true);

            setTimeout(() => {
                quizSceneWrapper.emit('trigger-slide-in', null, false);
            }, 20);

            // 4. Mulai pemutaran kuis baru jika Marker 8 terdeteksi
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
// Start AR Session from Loading Screen
// -----------------------------------------------------------------------------
async function executeStartQuiz() {
    console.log(`🚀 [Quiz AR] Membuka AR Session untuk ${currentQuiz.title}...`);

    // Prime Web Audio Context
    try {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === 'suspended') await audioCtx.resume();
    } catch (e) {
        console.warn('⚠️ Audio context unlock warning:', e);
    }

    // Prime all sound elements (reset dan pause agar tidak berbunyi bersamaan)
    allSoundElements.forEach((s) => {
        try {
            s.pause();
            s.currentTime = 0;
        } catch (e) {}
    });

    // Prime all video elements
    allVideoElements.forEach(async (v) => {
        try {
            v.muted = true;
            const p = v.play();
            if (p !== undefined) await p;
            v.pause();
            v.currentTime = 0;
        } catch (e) {}
    });

    // Hide loading overlay smoothly
    if (loadingOverlay) loadingOverlay.classList.add('hidden');
    if (arScene) arScene.classList.add('ready');

    waitForCameraActive(() => {
        // Inisialisasi scene kuis aktif
        setupQuizScene(currentQuizId);

        quizState = 'WAIT_MARKER';
        if (statusBar) {
            statusBar.textContent = 'Arahkan kamera ke Marker 8...';
            statusBar.classList.remove('tracking', 'finished');
        }

        if (quizSceneWrapper) {
            quizSceneWrapper.setAttribute('position', '0 0 0');
            quizSceneWrapper.setAttribute('scale', '1 1 1');
            quizSceneWrapper.setAttribute('visible', true);
        }

        // Jika marker sudah tertangkap sebelum tombol start diklik
        if (isTargetFound) {
            startQuizPlayback();
        }
    });
}

// -----------------------------------------------------------------------------
// Marker 8 Tracking Listeners
// -----------------------------------------------------------------------------
if (targetQuiz) {
    targetQuiz.addEventListener('targetFound', () => {
        if (!isStandalone && !quizActiveSeamless) return;
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
        if (!isStandalone && !quizActiveSeamless) return;
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

    // Reset video kuis aktif
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

    // Reset audio feedback
    if (activeSoundBenar) {
        activeSoundBenar.pause();
        activeSoundBenar.currentTime = 0;
    }
    if (activeSoundSalah) {
        activeSoundSalah.pause();
        activeSoundSalah.currentTime = 0;
    }

    // Putar audio pertanyaan
    if (activeSoundPertanyaan) {
        activeSoundPertanyaan.pause();
        activeSoundPertanyaan.currentTime = 0;
        activeSoundPertanyaan.muted = false;
        activeSoundPertanyaan.play().catch(e => console.warn('⚠️ Gagal memutar audio pertanyaan:', e));
    }

    // Putar kedua video bersamaan
    const currentVideos = [activeVidBenar, activeVidSalah].filter(Boolean);
    const playPromises = currentVideos.map(v => {
        return v.play().catch(e => {
            console.warn('⚠️ Play retry:', v.id, e);
            return v.play().catch(err => console.error('❌ Play error:', v.id, err));
        });
    });
    await Promise.all(playPromises);

    // Preload ronde kuis berikutnya di background sehingga saat user klik Selanjutnya sudah siap
    const nextQuizId = (currentQuizId < 5) ? (currentQuizId + 1) : 'score';
    preloadUpcomingQuiz(nextQuizId);

    // Monitor waktu hingga mencapai 9.25s
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

// Dipanggil tepat pada detik 9.25
function reachDecisionPoint() {
    if (quizState !== 'INTRO_PLAYING') return;
    console.log(`⏸️ [Quiz AR] Kuis ${currentQuizId}: Mencapai detik 9.25! Menjeda video dan audio pertanyaan...`);
    quizState = 'WAITING_CHOICE';

    if (monitorRaf) {
        cancelAnimationFrame(monitorRaf);
        monitorRaf = null;
    }

    // Jeda kedua video di 9.25s
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

    // Hentikan pertanyaan.mp3
    if (activeSoundPertanyaan) {
        activeSoundPertanyaan.pause();
        activeSoundPertanyaan.currentTime = 9.25;
    }

    // AKTIFKAN TOMBOL PILIHAN 3D PADA MARKER 8
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

    // Refresh Raycaster
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
// Choice Handling: Benar vs Salah & Next Button Display
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

// Dipanggil saat tombol 3D Next diklik
function handleNextQuizNavigation() {
    if (isNavigatingNext || isTransitioningQuiz) return;
    isNavigatingNext = true;

    // Haptic / chime sound feedback
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
// Home Button Display & Navigation for Final Score
// -----------------------------------------------------------------------------
function showHomeScoreButton() {
    if (isHomeButtonActive) return;
    console.log('✨ [Quiz AR] Memunculkan 3D Home Button di kerang pada video score.mp4...');
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
                // Pastikan skala berada di 1 1 1 penuh sebelum animasi denyut aktif
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

// -----------------------------------------------------------------------------
// Monitor Final Score Video & Audio Completion
// -----------------------------------------------------------------------------
function waitForFinalScoreCompletion(videoEl, soundEl) {
    let hasEnded = false;
    let videoDone = false;
    let soundDone = false;

    const onAllDone = () => {
        if (hasEnded) return;
        hasEnded = true;

        console.log('🏁 [Quiz AR] Final Score selesai diputar! Frame dibekukan dan tombol Home mutiara aktif...');
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
            console.log('✨ [Quiz AR] Detik 4.3s: Mutiara kerang merekah! Memunculkan tombol Home 3D...');
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
// Multi-Layer Click & Touch Detection for 3D Quiz Choices (Tracking on Marker 8)
// -----------------------------------------------------------------------------
function checkChoiceInteraction(clientX, clientY) {
    if (quizState !== 'WAITING_CHOICE' || !isTargetFound || isTransitioningQuiz) return false;
    if (!btnChoiceLeft3D || !btnChoiceRight3D || !arScene) return false;

    const camera = arScene.camera;
    if (!camera) return false;

    // 1. Screen-Space Projection Distance Check
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

    // 2. Direct Three.js Raycaster Check
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

window.__triggerQuizChoiceLeft = () => {
    if (quizState === 'WAITING_CHOICE' && !isTransitioningQuiz) {
        selectChoice(currentQuiz.leftChoice);
    }
};

window.__triggerQuizChoiceRight = () => {
    if (quizState === 'WAITING_CHOICE' && !isTransitioningQuiz) {
        selectChoice(currentQuiz.rightChoice);
    }
};

// -----------------------------------------------------------------------------
// Multi-Layer Click & Touch Detection for 3D Next Button
// -----------------------------------------------------------------------------
function checkNextButtonInteraction(clientX, clientY) {
    if (!isNextButtonActive || isNavigatingNext || isTransitioningQuiz) return false;
    if (!btnNextQuiz3D || !arScene) return false;

    const camera = arScene.camera;
    if (!camera) return false;

    // 1. Screen-Space Projection Distance Check
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

    // 2. Direct Three.js Raycaster Check
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
        console.warn('Raycaster check warning:', err);
    }

    return false;
}

// -----------------------------------------------------------------------------
// Multi-Layer Click & Touch Detection for 3D Home Button (Final Score)
// -----------------------------------------------------------------------------
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

    // Pastikan sound-v8 Part 8 Bab 1 tidak memicu suara di kuis
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

// Monitor penyelesaian penjelasan kuis
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
// Top Navigation Pills Click Interceptors (Seamless in-place switching)
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

// Replay button listener
if (btnReplayQuiz) {
    btnReplayQuiz.addEventListener('click', () => {
        if (resultModal) resultModal.classList.remove('active');
        transitionToQuiz(currentQuizId, false);
    });
}
