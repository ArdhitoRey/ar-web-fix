import { state, dom, videos } from '../state.js';
import { fadeInContainer, fadeOutContainer, fadeAudioIn, hideAllContainersExcept, isContainerVisible } from '../utils.js';
import { preloadPart, releasePartVideos } from '../loader.js';

export async function playPart1() {
    // Pengecekan guard yang ketat
    if (state.isPlaying || (state.currentPart !== 0 && state.currentPart !== 1) || state.isTransitioning) {
        console.log('⏹️ [Part 1] Dibatalkan: Sedang memutar part lain atau bukan urutannya.');
        return;
    }
    
    // Background prefetch Part 2 saat Part 1 mulai berputar
    preloadPart(2);

    state.isMarkerLocked = true;
    state.lockedMarker = 1;
    state.isTransitioning = true;
    console.log('🔒 [Part 1] Marker LOCKED - Hanya Marker 1 yang aktif');
    
    hideAllContainersExcept(dom.containerPart1);
    
    // Cari layar mana yang mungkin masih menyala secara aman
    const allContainers = [dom.containerPart2, dom.containerPart3]; 
    const previousContainer = allContainers.find(c => c && c.getAttribute('visible') === 'true');
    
    if (previousContainer) {
        console.log('🔄 [Part 1] Memudarkan adegan sebelumnya...');
        fadeOutContainer(previousContainer, 400, async () => { 
            await startPart1Videos(); 
        });
    } else {
        await startPart1Videos();
    }
}

async function startPart1Videos() {
    console.log('🎬 [Part 1] Memulai pemutaran video...');
    const wasVisible = dom.containerPart1 && (dom.containerPart1.getAttribute('visible') === true || dom.containerPart1.getAttribute('visible') === 'true');
    state.currentPart = 1;
    state.isPlaying = true;
    
    dom.statusBar.textContent = 'Part 1 diputar';
    dom.statusBar.classList.add('tracking');
    dom.statusBar.classList.remove('finished');
    
    // Pastikan video dalam kondisi muted dan reset hanya jika currentTime > 0
    videos.part1.forEach(v => {
        if (!v) return;
        v.muted = true;
        if (v.currentTime > 0) {
            v.pause();
            v.currentTime = 0;
        }
    });

    // Tampilkan container AR langsung agar output visual tidak hilang/blank
    if (dom.containerPart1 && !wasVisible) fadeInContainer(dom.containerPart1, 300);
    else if (dom.containerPart1) dom.containerPart1.setAttribute('visible', true);

    const playPromises = videos.part1.map(v => {
        if (!v) return Promise.resolve();
        v.muted = true;
        return v.play().catch(e => console.error('❌ [Part 1] Video play error:', e));
    });
    await Promise.race([Promise.all(playPromises), new Promise(r => setTimeout(r, 600))]);
    
    // Perbarui GPU texture binding
    if (dom.containerPart1) {
        const aVids = dom.containerPart1.querySelectorAll('a-video');
        aVids.forEach(av => {
            if (av && av.components && av.components.material && av.components.material.material) {
                const m = av.components.material.material;
                if (m.uniforms && m.uniforms.tex && m.uniforms.tex.value) {
                    m.uniforms.tex.value.needsUpdate = true;
                }
                if (m.map) m.map.needsUpdate = true;
            }
        });
    }

    // TEKNIK FREEZE FRAME: pause video ~0.5 detik sebelum tamat agar tidak hitam di akhir (hanya jika currentTime > 1s)
    videos.part1.forEach(v => {
        if (!v) return;
        const preventBlackScreen = function() {
            if (this.duration && this.currentTime > 1.0 && (this.duration - this.currentTime <= 0.5)) {
                this.pause();
                this.removeEventListener('timeupdate', preventBlackScreen);
            }
        };
        v.addEventListener('timeupdate', preventBlackScreen);
    });

    // Putar audio narasi Part 1
    try {
        if (dom.soundV1) {
            dom.soundV1.pause();
            dom.soundV1.currentTime = 0;
            dom.soundV1.muted = false;
            dom.soundV1.volume = 1.0;
            const p = dom.soundV1.play();
            if (p !== undefined) {
                p.catch((err) => {
                    console.warn('⚠️ [Part 1] Audio play deferred:', err);
                    const resumeAudio = () => {
                        if (state.currentPart === 1 && !state.part1Finished) {
                            dom.soundV1.muted = false;
                            dom.soundV1.volume = 1.0;
                            dom.soundV1.play().catch(() => {});
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
        console.error('❌ [Part 1] Audio error:', e);
    }
    
    state.isTransitioning = false;
    
    let hasFinished = false;
    const finishPart1 = () => {
        if (hasFinished) return;
        hasFinished = true;
        clearTimeout(safetyTimer);

        console.log('✅ [Part 1] Audio/Video selesai! Transisi ke Part 2 siap.');
        state.isPlaying = false;
        state.part1Finished = true;
        
        // Bersihkan decoder Part 1 & pastikan Part 2 sudah di-prefetch
        releasePartVideos(1);
        preloadPart(2);

        if (dom.containerPart1) {
            fadeOutContainer(dom.containerPart1, 250, () => {
                releasePartVideos(1);
                console.log('🧹 Layar dibersihkan dan video dimatikan.');
            });
        }
        
        state.isMarkerLocked = false;
        state.lockedMarker = null;
        console.log('🔓 [Part 1] Marker UNLOCKED - Lanjut ke adegan berikutnya.');
        
        dom.statusBar.textContent = 'Tap untuk ulang, atau scan Marker 2';
        dom.statusBar.classList.remove('tracking');
        dom.statusBar.classList.add('finished');
    };

    if (dom.soundV1) {
        dom.soundV1.onended = finishPart1;
    }

    const soundDur = (dom.soundV1 && Number.isFinite(dom.soundV1.duration) && dom.soundV1.duration > 0) ? dom.soundV1.duration : 10;
    const videoDurs = videos.part1.map(v => (v && Number.isFinite(v.duration) && v.duration > 0) ? v.duration : 0);
    const fallbackDur = Math.max(soundDur, ...videoDurs, 10);
    const safetyTimer = setTimeout(finishPart1, (fallbackDur + 0.5) * 1000);
}

export function initPart1() {
    if (!dom.target1) return; // Sabuk pengaman

    dom.target1.addEventListener('targetFound', () => {
        state.isTargetInView[1] = true;
        state.pendingPart = 1;
        if (!state.hasStarted) {
            return;
        }
        if (!state.cameraReady) {
            console.log('⏳ [Part 1] Marker 1 terdeteksi tapi kamera belum aktif stream.');
            return;
        }

        const now = Date.now();
        if (now < state.markerIgnoreUntil && state.activeMarkerDetection !== 1) return;
        
        if (state.isMarkerLocked && state.lockedMarker !== 1) {
            dom.statusBar.textContent = `Tunggu Part ${state.lockedMarker} selesai dulu`;
            return;
        }
        
        if (state.currentPart > 1) {
            dom.statusBar.textContent = 'Tidak bisa kembali ke Part sebelumnya. Tekan tombol Ulangi jika perlu.';
            if (dom.containerPart1) dom.containerPart1.setAttribute('visible', false);
            return;
        }

        if (!state.part1Finished && (state.currentPart === 0 || state.currentPart === 1) && !state.isPlaying && !state.isTransitioning) {
            console.log('🎯 [Part 1] Marker 1 Terdeteksi!');
            state.activeMarkerDetection = 1;
            state.markerIgnoreUntil = now + state.MARKER_IGNORE_DURATION;
            
            playPart1();
            
            setTimeout(() => {
                if (!state.isPlaying) {
                    state.activeMarkerDetection = null;
                }
            }, state.MARKER_IGNORE_DURATION);
            
        } else if (state.part1Finished && state.currentPart === 1 && !state.isPlaying) {
            dom.statusBar.textContent = 'Tap untuk ulang, atau scan Marker 2';
            state.lastScannedMarker = 1;
        }
    });

    dom.target1.addEventListener('targetLost', () => {
        state.isTargetInView[1] = false;
    });
}