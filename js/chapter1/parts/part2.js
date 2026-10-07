import { state, dom, videos } from '../state.js';
import { fadeInContainer, fadeOutContainer, fadeAudioIn, fadeAudioOut, hideAllContainersExcept, isContainerVisible } from '../utils.js';
import { ensurePartLoaded, preloadPart, releasePartVideos } from '../loader.js';

export async function playPart2() {
    // 1. Pengecekan guard yang ketat + status Transisi
    if (state.isPlaying || !state.part1Finished || (state.currentPart !== 1 && state.currentPart !== 2) || state.isTransitioning) {
        console.log('⏹️ [Part 2] Dibatalkan: Sedang play, Part 1 belum, atau bukan urutannya.');
        return;
    }
    
    // Pastikan aset Part 2 siap & prefetch Part 3
    ensurePartLoaded(2);
    preloadPart(3);

    state.isMarkerLocked = true;
    state.lockedMarker = 2;
    state.isTransitioning = true;
    console.log('🔒 [Part 2] Marker LOCKED');
    
    hideAllContainersExcept(dom.containerPart2);
    fadeAudioOut(dom.soundV1, 300);
    
    // 2. Cari layar sebelumnya (Part 1, dll) untuk ditutup secara halus
    const allContainers = [dom.containerPart1, dom.containerPart3, dom.containerPart4, dom.containerPart5, dom.containerPart6, dom.containerPart7]; 
    const previousContainer = allContainers.find(c => c && c.getAttribute('visible') === 'true');
    
    if (previousContainer) {
        console.log('🔄 [Part 2] Memudarkan adegan sebelumnya...');
        fadeOutContainer(previousContainer, 400, async () => { 
            await startPart2Videos(); 
        });
    } else {
        await startPart2Videos();
    }
}

async function startPart2Videos() {
    console.log('🎬 [Part 2] Memulai pemutaran video...');
    const wasVisible = isContainerVisible(dom.containerPart2);
    state.currentPart = 2;
    state.isPlaying = true;
    
    dom.statusBar.textContent = 'Part 2 diputar';
    dom.statusBar.classList.add('tracking');
    dom.statusBar.classList.remove('finished');
    
    videos.part2.forEach(v => { 
        v.pause(); 
        v.currentTime = 0; 
    });
    
    const playPromises = videos.part2.map(v => v.play().catch(e => console.error('❌ [Part 2] Video play error:', e)));
    await Promise.all(playPromises);
    
    // 3. TEKNIK FREEZE FRAME (Mencegah black screen di akhir video)
    videos.part2.forEach(v => {
        v.addEventListener('timeupdate', function preventBlackScreen() {
            if (this.duration && (this.duration - this.currentTime <= 0.5)) {
                this.pause(); 
                this.removeEventListener('timeupdate', preventBlackScreen); 
            }
        });
    });
    
    // Jeda sedikit agar layar tidak berkedip hitam di awal, lalu fade in
    await new Promise(r => setTimeout(r, 150));
    if (dom.containerPart2 && !wasVisible) fadeInContainer(dom.containerPart2, 400);
    else if (dom.containerPart2) dom.containerPart2.setAttribute('visible', true);
    await new Promise(r => setTimeout(r, 50));
    
    try {
        if (dom.soundV2) {
            dom.soundV2.pause();
            dom.soundV2.currentTime = 0;
            dom.soundV2.muted = false;
            dom.soundV2.volume = 1.0;
            const p = dom.soundV2.play();
            if (p !== undefined) {
                p.catch((err) => {
                    console.warn('⚠️ [Part 2] Audio play deferred:', err);
                    const resumeAudio = () => {
                        if (state.currentPart === 2 && !state.part2Finished) {
                            dom.soundV2.muted = false;
                            dom.soundV2.volume = 1.0;
                            dom.soundV2.play().catch(() => {});
                        }
                        window.removeEventListener('click', resumeAudio, true);
                        window.removeEventListener('touchend', resumeAudio, true);
                    };
                    window.addEventListener('click', resumeAudio, { once: true, capture: true });
                    window.addEventListener('touchend', resumeAudio, { once: true, capture: true });
                });
            }
        } else {
            console.warn('⚠️ [Part 2] Audio tidak ditemukan.');
        }
    } catch (e) { 
        console.error('❌ [Part 2] Audio error:', e); 
    }
    
    state.isTransitioning = false;
    
    let hasFinished = false;
    const finishPart2 = () => {
        if (hasFinished) return;
        hasFinished = true;
        clearTimeout(safetyTimer);

        console.log('✅ [Part 2] Selesai! Video dibersihkan.');
        state.isPlaying = false;
        state.part2Finished = true;
        
        // Bersihkan decoder Part 2 & pastikan Part 3 di-prefetch
        releasePartVideos(2);
        preloadPart(3);

        if (dom.containerPart2) {
            fadeOutContainer(dom.containerPart2, 250, () => {
                releasePartVideos(2);
                console.log('🧹 Layar dibersihkan dan video dimatikan.');
            });
        }
        
        state.isMarkerLocked = false;
        state.lockedMarker = null;
        
        dom.statusBar.textContent = 'Tap untuk ulang, atau scan Marker 3';
        dom.statusBar.classList.remove('tracking');
        dom.statusBar.classList.add('finished');
    };

    if (dom.soundV2) {
        dom.soundV2.onended = finishPart2;
    }

    const fallbackDur = Math.max((dom.soundV2 && dom.soundV2.duration) || 0, ...videos.part2.map(v => (v && v.duration) || 0), 12);
    const safetyTimer = setTimeout(finishPart2, (fallbackDur + 0.5) * 1000);
}

export function initPart2() {
    if (!dom.target2) return;

    dom.target2.addEventListener('targetFound', () => {
        state.isTargetInView[2] = true;
        if (!state.hasStarted) {
            state.pendingPart = 2;
            return;
        }

        const now = Date.now();
        if (now < state.markerIgnoreUntil && state.activeMarkerDetection !== 2) return;
        
        if (state.isMarkerLocked && state.lockedMarker !== 2) {
            dom.statusBar.textContent = `Tunggu Part ${state.lockedMarker} selesai dulu`;
            return;
        }
        
        if (state.currentPart > 2) {
            dom.statusBar.textContent = 'Tidak bisa kembali ke Part sebelumnya. Tekan tombol Ulangi jika perlu.';
            if (dom.containerPart2) dom.containerPart2.setAttribute('visible', false);
            return;
        }
        
        if (state.part1Finished && !state.part2Finished && !state.isPlaying && !state.isTransitioning) {
            state.activeMarkerDetection = 2;
            state.markerIgnoreUntil = now + state.MARKER_IGNORE_DURATION;
            
            playPart2();
            
            setTimeout(() => {
                if (!state.isPlaying) {
                    state.activeMarkerDetection = null;
                }
            }, state.MARKER_IGNORE_DURATION);
            
        } else if (!state.part1Finished) {
            dom.statusBar.textContent = 'Scan Marker 1 dulu untuk Part 1';
        } else if (state.part2Finished && state.currentPart === 2 && !state.isPlaying) {
            dom.statusBar.textContent = 'Tap untuk ulang, atau scan Marker 3';
            state.lastScannedMarker = 2;
        }
    });

    dom.target2.addEventListener('targetLost', () => {
        state.isTargetInView[2] = false;
        if (state.pendingPart === 2) {
            state.pendingPart = null;
        }
    });
}