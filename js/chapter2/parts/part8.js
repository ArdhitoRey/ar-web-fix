import { state, dom, videos } from '../state.js';
import { fadeInContainer, fadeOutContainer, fadeAudioIn, hideAllContainersExcept, isContainerVisible } from '../utils.js';
import { ensurePartLoaded } from '../loader.js';

let isPlayButtonActive = false;
let isNavigatingQuiz = false;
let part8SafetyTimer = null;

// Guard permanen agar soundV8 TIDAK BISA diputar jika bukan Part 8 aktif (cegah kebocoran di awal loading & kuis)
if (dom.soundV8 && !dom.soundV8._guardInstalled) {
    dom.soundV8._guardInstalled = true;
    const origPlay8 = dom.soundV8.play;
    dom.soundV8.play = function () {
        // Izinkan pemanggilan senyap untuk unlocking gesture pada mobile browser
        if (this.muted && this.volume === 0) {
            return origPlay8.apply(this, arguments);
        }
        if (state.currentPart !== 8 || !state.hasStarted || window.__quizActiveSeamless || state.currentPart === 'quiz') {
            console.warn('🔇 [Part 8 Guard] sound-v8 dicegah (currentPart: ' + state.currentPart + ', hasStarted: ' + state.hasStarted + ')');
            try {
                this.pause();
                this.currentTime = 0;
                this.muted = true;
            } catch (e) {}
            return Promise.resolve();
        }
        return origPlay8.apply(this, arguments);
    };
}

function showPlayPart8Button() {
    if (isPlayButtonActive) return;
    console.log('✨ [Part 8] Memunculkan tombol Play 3D tersinkronisasi...');
    isPlayButtonActive = true;
    isNavigatingQuiz = false;

    if (dom.btnPlayPart8_3D) {
        dom.btnPlayPart8_3D.setAttribute('visible', true);
        dom.btnPlayPart8_3D.setAttribute('scale', '0.15 0.15 0.15');

        // Reset opacity to 0 before starting fade-in
        const mesh = dom.btnPlayPart8_3D.getObject3D('mesh');
        if (mesh) {
            mesh.visible = true;
            if (mesh.material) {
                mesh.material.depthWrite = false;
                mesh.material.transparent = true;
                mesh.material.opacity = 0;
            }
        }

        setTimeout(() => {
            if (isPlayButtonActive && !isNavigatingQuiz) {
                dom.btnPlayPart8_3D.emit('play-fade-in', null, false);
            }
        }, 50);

        setTimeout(() => {
            if (isPlayButtonActive && !isNavigatingQuiz) {
                dom.btnPlayPart8_3D.setAttribute('scale', '1 1 1');
                dom.btnPlayPart8_3D.emit('play-pulse-start', null, false);
            }
        }, 650);
    }

    if (dom.btnPlayPart8_Plane) {
        dom.btnPlayPart8_Plane.setAttribute('visible', true);
        const mesh = dom.btnPlayPart8_Plane.getObject3D('mesh');
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

function hidePlayPart8Button() {
    isPlayButtonActive = false;
    if (dom.btnPlayPart8_3D) {
        dom.btnPlayPart8_3D.setAttribute('visible', false);
        const mesh = dom.btnPlayPart8_3D.getObject3D('mesh');
        if (mesh) {
            mesh.visible = false;
            if (mesh.material) {
                mesh.material.opacity = 0;
            }
        }
    }
    if (dom.btnPlayPart8_Plane) {
        dom.btnPlayPart8_Plane.setAttribute('visible', false);
        const mesh = dom.btnPlayPart8_Plane.getObject3D('mesh');
        if (mesh) mesh.visible = false;
    }
}

export function handleNavigateToQuiz() {
    if (isNavigatingQuiz || window.__quizActiveSeamless) return;
    isNavigatingQuiz = true;
    window.__quizActiveSeamless = true;
    state.currentPart = 'quiz';
    state.isPlaying = false;
    state.part8Finished = true;
    isPlayButtonActive = false;

    if (part8SafetyTimer) {
        clearTimeout(part8SafetyTimer);
        part8SafetyTimer = null;
    }

    console.log('🐚 [Part 8] Tombol Play ditekan! Transisi slide ke kuis...');

    if (dom.btnPlayPart8_3D) {
        dom.btnPlayPart8_3D.setAttribute('scale', '1.25 1.25 1.25');
    }

    hidePlayPart8Button();

    if (dom.soundV8) {
        dom.soundV8.pause();
        dom.soundV8.currentTime = 0;
        dom.soundV8.muted = true;
        dom.soundV8.onended = null;
    }
    videos.part8.forEach(v => {
        if (v) {
            v.pause();
            v.currentTime = 0;
        }
    });

    state.isMarkerLocked = false;
    state.lockedMarker = null;

    if (dom.statusBar) {
        dom.statusBar.textContent = 'Membuka Kuis 1...';
        dom.statusBar.classList.add('finished');
        dom.statusBar.onclick = null;
    }

    // Warm up Quiz 1 video & audio decoding IMMEDIATELY so textures are ready during slide-out
    try {
        const q1Benar = document.getElementById('vid-quiz1-benar');
        const q1Salah = document.getElementById('vid-quiz1-salah');
        const q1Sound = document.getElementById('sound-quiz1-pertanyaan');
        if (q1Benar) {
            q1Benar.muted = true;
            try { q1Benar.currentTime = 0; } catch (e) {}
            q1Benar.play().catch(() => {});
        }
        if (q1Salah) {
            q1Salah.muted = true;
            try { q1Salah.currentTime = 0; } catch (e) {}
            q1Salah.play().catch(() => {});
        }
        if (q1Sound) {
            try { q1Sound.load(); } catch (e) {}
        }
    } catch (err) {
        console.warn('⚠️ Quiz 1 warm up warning:', err);
    }

    // Trigger animasi slide-out ke kiri pada container Part 8
    if (dom.containerPart8) {
        dom.containerPart8.emit('trigger-slide-out', null, false);
    }

    setTimeout(() => {
        if (dom.containerPart8) {
            dom.containerPart8.setAttribute('visible', false);
        }
        if (window.__startQuizSeamless) {
            window.__startQuizSeamless(1);
        }
    }, 380);
}

// Handler pemulihan saat pengguna kembali dari Kuis ke Bab 2
window.__restorePart8FromQuiz = function () {
    isNavigatingQuiz = false;
    window.__quizActiveSeamless = false;
    state.currentPart = 8;
    state.part8Finished = true;
    if (dom.soundV8) {
        dom.soundV8.muted = false;
    }
    if (dom.containerPart8) {
        dom.containerPart8.setAttribute('position', '0 0 0');
        dom.containerPart8.setAttribute('scale', '1 1 1');
        dom.containerPart8.setAttribute('visible', true);
    }
    showPlayPart8Button();
    if (dom.statusBar) {
        dom.statusBar.textContent = 'Tap untuk ulang, atau mulai Kuis';
        dom.statusBar.classList.remove('tracking');
        dom.statusBar.classList.add('finished');
    }
};

function checkPlayButtonInteraction(clientX, clientY) {
    if (!isPlayButtonActive || isNavigatingQuiz) return false;
    if (!dom.btnPlayPart8_3D || !dom.arScene) return false;

    const camera = dom.arScene.camera;
    if (!camera) return false;

    // 1. Direct Three.js Raycaster Check (paling presisi menguji bidang geometri 3D tombol)
    try {
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2(
            (clientX / window.innerWidth) * 2 - 1,
            -(clientY / window.innerHeight) * 2 + 1
        );
        raycaster.setFromCamera(mouse, camera);

        const targetObjects = [];
        if (dom.btnPlayPart8_3D && dom.btnPlayPart8_3D.object3D) targetObjects.push(dom.btnPlayPart8_3D.object3D);
        if (dom.btnPlayPart8_Plane && dom.btnPlayPart8_Plane.object3D) targetObjects.push(dom.btnPlayPart8_Plane.object3D);

        const intersects = raycaster.intersectObjects(targetObjects, true);
        if (intersects && intersects.length > 0) {
            console.log('🎯 [Three.js Raycaster Match] Intersected Part 8 Play Button object!');
            handleNavigateToQuiz();
            return true;
        }
    } catch (err) {
        console.warn('Play button raycaster check warning:', err);
    }

    // 2. Screen-Space Projection Check (radius ketat yang dinamis mengikuti proyeksi ukuran tombol di layar)
    try {
        const btnWorldPos = new THREE.Vector3();
        dom.btnPlayPart8_3D.object3D.getWorldPosition(btnWorldPos);

        const screenPos = btnWorldPos.clone().project(camera);
        if (screenPos.z < 1) {
            const screenX = (screenPos.x * 0.5 + 0.5) * window.innerWidth;
            const screenY = (-screenPos.y * 0.5 + 0.5) * window.innerHeight;
            const dist = Math.hypot(clientX - screenX, clientY - screenY);

            // Hitung radius proyeksi tombol (lebar 0.097 3D unit)
            const edgePos = btnWorldPos.clone().add(new THREE.Vector3(0.0485, 0, 0));
            const screenEdge = edgePos.project(camera);
            const projectedRadius = Math.abs((screenEdge.x - screenPos.x) * 0.5 * window.innerWidth);
            const hitRadius = Math.max(18, Math.min(45, projectedRadius * 1.15));

            if (dist <= hitRadius) {
                console.log(`🎯 [Touch Target Match] Screen-space tap on Part 8 Play Button! dist=${dist.toFixed(1)}px <= ${hitRadius.toFixed(1)}px`);
                handleNavigateToQuiz();
                return true;
            }
        }
    } catch (err) {
        console.warn('Play button screen projection check warning:', err);
    }

    return false;
}

export async function playPart8() {
    // Pengecekan guard
    if (window.__quizActiveSeamless || state.isPlaying || !state.part7Finished || (state.currentPart !== 7 && state.currentPart !== 8) || state.isTransitioning) {
        console.log('⏹️ [Part 8] Dibatalkan: Sedang kuis, sedang play, Part 7 belum selesai, atau urutan salah.');
        return;
    }
    
    // Pastikan aset Part 8 siap
    ensurePartLoaded(8);

    state.isMarkerLocked = true;
    state.lockedMarker = 8;
    state.isTransitioning = true;
    console.log('🔒 [Part 8] Marker LOCKED');
    
    hideAllContainersExcept(dom.containerPart8);
    hidePlayPart8Button();
    
    // Cari layar sebelumnya yang mungkin masih menyala secara aman
    const allContainers = [
        dom.containerPart1, dom.containerPart2, dom.containerPart3,
        dom.containerPart4, dom.containerPart5, dom.containerPart6, dom.containerPart7
    ];
    const previousContainer = allContainers.find(c => c && c.getAttribute('visible') === 'true');
    
    if (previousContainer) {
        console.log('🔄 [Part 8] Memudarkan adegan sebelumnya...');
        fadeOutContainer(previousContainer, 400, async () => { 
            await startPart8Videos(); 
        });
    } else {
        await startPart8Videos();
    }
}

async function startPart8Videos() {
    console.log('🎬 [Part 8] Memulai pemutaran video...');
    const wasVisible = isContainerVisible(dom.containerPart8);
    state.currentPart = 8;
    state.isPlaying = true;
    
    dom.statusBar.textContent = 'Part 8 diputar';
    dom.statusBar.classList.add('tracking');
    dom.statusBar.classList.remove('finished');
    
    console.log(`📋 [Part 8] Memeriksa daftar video (Total: ${videos.part8.length} video):`);
    
    // Reset video ke awal & sembunyikan tombol play 3D
    hidePlayPart8Button();

    videos.part8.forEach((v, idx) => { 
        if (v) {
            v.pause(); 
            v.currentTime = 0; 
            console.log(`   [${idx + 1}/${videos.part8.length}] Resetting: #${v.id} (src: ${v.src})`);
        } else {
            console.warn(`   ⚠️ [${idx + 1}/${videos.part8.length}] Elemen video bernilai NULL! Cek ID di HTML.`);
        }
    });
    
    const playPromises = videos.part8.map(async (v, idx) => {
        if (!v) return;
        try {
            await v.play();
            console.log(`   ▶️ [Part 8 Video OK] #${v.id} sedang berjalan (durasi: ${v.duration ? v.duration.toFixed(2) + 's' : 'loading...'})`);
        } catch (e) {
            console.error(`   ❌ [Part 8 Video ERROR] Gagal memutar #${v.id}:`, e);
        }
    });
    await Promise.all(playPromises);
    console.log('📹 [Part 8] Seluruh video Part 8 telah dimulai.');

    // Preload Quiz 1 media di background saat Part 8 sedang ditonton
    setTimeout(() => {
        try {
            const q1Benar = document.getElementById('vid-quiz1-benar');
            const q1Salah = document.getElementById('vid-quiz1-salah');
            const q1Sound = document.getElementById('sound-quiz1-pertanyaan');
            if (q1Benar) { q1Benar.preload = 'auto'; q1Benar.load(); }
            if (q1Salah) { q1Salah.preload = 'auto'; q1Salah.load(); }
            if (q1Sound) { q1Sound.preload = 'auto'; q1Sound.load(); }
            console.log('📦 [Part 8] Preloaded Quiz 1 assets in background.');
        } catch (e) {}
    }, 200);
    
    // FREEZE FRAME PADA FRAME TERAKHIR
    videos.part8.forEach(v => {
        if (!v) return;
        
        v.addEventListener('timeupdate', function preventBlackScreen() {
            if (this.duration && (this.duration - this.currentTime <= 0.5)) {
                this.pause();
                console.log(`⏸️ [Part 8 Freeze Frame] #${this.id} di-freeze pada detik ${this.currentTime.toFixed(2)}s`);
                this.removeEventListener('timeupdate', preventBlackScreen);
            }
        });
    });

    // SINKRONISASI TOMBOL PLAY SAAT MUNCUL DI DETIK KE-4.0 VIDEO ANAK KECIL (PERSIS SEPERTI POP-IN DI VIDEO)
    const vidAnak = document.getElementById('vid-anak-kecil-part8');
    if (vidAnak) {
        const syncButtonOnAppear = function () {
            if (vidAnak.currentTime >= 4.0 && !isPlayButtonActive && state.currentPart === 8 && state.isPlaying) {
                console.log(`🎬 [Part 8] Tombol Play mulai muncul di video anakkecil.mp4 (detik ${vidAnak.currentTime.toFixed(2)}s) -> Memicu scale pop-in & fade-in tombol play 3D!`);
                showPlayPart8Button();
                vidAnak.removeEventListener('timeupdate', syncButtonOnAppear);
            }
        };
        vidAnak.addEventListener('timeupdate', syncButtonOnAppear);
    }
    
    await new Promise(r => setTimeout(r, 150));
    if (dom.containerPart8 && !wasVisible) fadeInContainer(dom.containerPart8, 400);
    else if (dom.containerPart8) dom.containerPart8.setAttribute('visible', true);
    
    state.isTransitioning = false;

    let hasFinished = false;
    const finishPart8 = () => {
        if (hasFinished || window.__quizActiveSeamless || state.currentPart === 'quiz') return;
        hasFinished = true;
        if (part8SafetyTimer) {
            clearTimeout(part8SafetyTimer);
            part8SafetyTimer = null;
        }

        console.log('✅ [Part 8] Selesai! Video frozen di frame terakhir.');
        state.isPlaying = false;
        state.part8Finished = true;
        
        if (dom.containerPart8) {
            dom.containerPart8.setAttribute('visible', true);
        }
        
        // Munculkan tombol Play 3D
        showPlayPart8Button();

        state.isMarkerLocked = false;
        state.lockedMarker = null;
        console.log('🔓 [Part 8] Marker UNLOCKED');
        
        dom.statusBar.textContent = 'Tap untuk ulang, atau mulai Kuis';
        dom.statusBar.classList.remove('tracking');
        dom.statusBar.classList.add('finished');
        dom.statusBar.style.cursor = 'pointer';
        dom.statusBar.onclick = () => {
            handleNavigateToQuiz();
        };
    };

    if (dom.soundV8) {
        dom.soundV8.onended = finishPart8;
    }
    
    try {
        if (dom.soundV8) {
            dom.soundV8.pause();
            dom.soundV8.currentTime = 0;
            dom.soundV8.muted = false;
            dom.soundV8.volume = 1.0;
            const playPromise = dom.soundV8.play();
            if (playPromise !== undefined) {
                playPromise.catch((err) => {
                    console.warn('⚠️ [Part 8] Audio play deferred:', err);
                    const resumeAudio = () => {
                        if (state.currentPart === 8 && !state.part8Finished) {
                            dom.soundV8.muted = false;
                            dom.soundV8.volume = 1.0;
                            dom.soundV8.play().catch(() => {});
                        }
                        window.removeEventListener('click', resumeAudio, true);
                        window.removeEventListener('touchend', resumeAudio, true);
                    };
                    window.addEventListener('click', resumeAudio, { once: true, capture: true });
                    window.addEventListener('touchend', resumeAudio, { once: true, capture: true });
                });
            }
        }
    } catch (e) { 
        console.warn('⚠️ [Part 8] Audio error:', e); 
    }

    const fallbackDuration = Math.max((dom.soundV8 && dom.soundV8.duration) || 0, ...videos.part8.map(v => (v && v.duration) || 0), 13.8);
    part8SafetyTimer = setTimeout(finishPart8, (fallbackDuration + 0.5) * 1000);
}

export function initPart8() {
    if (!dom.target8) return; // Sabuk pengaman

    // Navigasi ke kuis saat tombol 3D / hit plane ditekan
    const onTouchOrClick = (e) => {
        if (e) {
            e.stopPropagation();
            if (e.preventDefault) e.preventDefault();
        }
        handleNavigateToQuiz();
    };

    if (dom.btnPlayPart8_3D) {
        dom.btnPlayPart8_3D.addEventListener('click', onTouchOrClick);
        dom.btnPlayPart8_3D.addEventListener('touchend', onTouchOrClick);
    }
    if (dom.btnPlayPart8_Plane) {
        dom.btnPlayPart8_Plane.addEventListener('click', onTouchOrClick);
        dom.btnPlayPart8_Plane.addEventListener('touchend', onTouchOrClick);
    }

    // Global touch/click interaction on window when in Part 8
    window.addEventListener('click', (e) => {
        if (!window.__quizActiveSeamless && state.currentPart === 8 && isPlayButtonActive && !isNavigatingQuiz) {
            checkPlayButtonInteraction(e.clientX, e.clientY);
        }
    }, true);

    window.addEventListener('touchend', (e) => {
        if (!window.__quizActiveSeamless && state.currentPart === 8 && isPlayButtonActive && !isNavigatingQuiz && e.changedTouches && e.changedTouches.length > 0) {
            const t = e.changedTouches[0];
            const handled = checkPlayButtonInteraction(t.clientX, t.clientY);
            if (handled) {
                e.preventDefault();
            }
        }
    }, { passive: false, capture: true });



    dom.target8.addEventListener('targetFound', () => {
        state.isTargetInView[8] = true;
        if (window.__quizActiveSeamless) return;
        if (!state.hasStarted || !state.cameraReady) return;
        const now = Date.now();
        if (now < state.markerIgnoreUntil && state.activeMarkerDetection !== 8) return;
        
        if (state.isMarkerLocked && state.lockedMarker !== 8) {
            dom.statusBar.textContent = `Tunggu Part ${state.lockedMarker} selesai dulu`;
            return;
        }
        
        if (state.part7Finished && !state.part8Finished && !state.isPlaying && !state.isTransitioning) {
            console.log('🎯 [Part 8] Marker 8 Terdeteksi!');
            state.activeMarkerDetection = 8;
            state.markerIgnoreUntil = now + state.MARKER_IGNORE_DURATION;
            
            playPart8();
            
            setTimeout(() => {
                if (!state.isPlaying) {
                    state.activeMarkerDetection = null;
                }
            }, state.MARKER_IGNORE_DURATION);
        } else if (!state.part7Finished) {
            dom.statusBar.textContent = 'Selesaikan Part 7 terlebih dahulu sebelum Part 8.';
        }
    });

    dom.target8.addEventListener('targetLost', () => {
        state.isTargetInView[8] = false;
        console.log('💨 [Part 8] Marker 8 Hilang dari pandangan kamera');
    });
}
