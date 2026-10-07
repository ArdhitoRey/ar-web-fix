import { state, dom, videos } from '../state.js';
import { fadeInContainer, fadeOutContainer, fadeAudioIn, hideAllContainersExcept, isContainerVisible } from '../utils.js';
import { ensurePartLoaded, preloadPart, releasePartVideos } from '../loader.js';

export async function playPart3() {
    // Pengecekan guard
    if (state.isPlaying || !state.part2Finished || (state.currentPart !== 2 && state.currentPart !== 3) || state.isTransitioning) {
        console.log('⏹️ [Part 3] Dibatalkan: Sedang play, Part 2 belum selesai, atau urutan salah.');
        return;
    }
    
    // Pastikan aset Part 3 siap & prefetch Part 4 di background
    ensurePartLoaded(3);
    preloadPart(4);

    state.isMarkerLocked = true;
    state.lockedMarker = 3;
    state.isTransitioning = true;
    console.log('🔒 [Part 3] Marker LOCKED');
    
    hideAllContainersExcept(dom.containerPart3);
    
    // Cari layar sebelumnya yang mungkin masih menyala secara aman
    const allContainers = [dom.containerPart1, dom.containerPart2]; 
    const previousContainer = allContainers.find(c => c && c.getAttribute('visible') === 'true');
    
    if (previousContainer) {
        console.log('🔄 [Part 3] Memudarkan adegan sebelumnya...');
        fadeOutContainer(previousContainer, 400, async () => { 
            await startPart3Videos(); 
        });
    } else {
        await startPart3Videos();
    }
}

async function startPart3Videos() {
    console.log('🎬 [Part 3] Memulai pemutaran video...');
    const wasVisible = isContainerVisible(dom.containerPart3);
    state.currentPart = 3;
    state.isPlaying = true;
    
    dom.statusBar.textContent = 'Part 3 diputar';
    dom.statusBar.classList.add('tracking');
    dom.statusBar.classList.remove('finished');
    
    // Reset video ke awal
    videos.part3.forEach(v => { v.pause(); v.currentTime = 0; });
    
    const playPromises = videos.part3.map(v => v.play().catch(e => console.error('❌ [Part 3] Video play error:', e)));
    await Promise.all(playPromises);
    console.log('📹 [Part 3] Semua video berjalan.');
    
    // FREEZE FRAME
    videos.part3.forEach(v => {
        v.addEventListener('timeupdate', function preventBlackScreen() {
            if (this.duration && (this.duration - this.currentTime <= 0.5)) {
                this.pause();
                this.removeEventListener('timeupdate', preventBlackScreen);
            }
        });
    });
    
    await new Promise(r => setTimeout(r, 150));
    if (dom.containerPart3 && !wasVisible) fadeInContainer(dom.containerPart3, 400);
    else if (dom.containerPart3) dom.containerPart3.setAttribute('visible', true);
    
    try {
        if (dom.soundV3) {
            dom.soundV3.pause();
            dom.soundV3.currentTime = 0;
            dom.soundV3.muted = false;
            dom.soundV3.volume = 1.0;
            const p = dom.soundV3.play();
            if (p !== undefined) {
                p.catch((err) => {
                    console.warn('⚠️ [Part 3] Audio play deferred:', err);
                    const resumeAudio = () => {
                        if (state.currentPart === 3 && !state.part3Finished) {
                            dom.soundV3.muted = false;
                            dom.soundV3.volume = 1.0;
                            dom.soundV3.play().catch(() => {});
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
        console.error('❌ [Part 3] Audio error:', e); 
    }
    
    state.isTransitioning = false;
    
    let hasFinished = false;
    const finishPart3 = () => {
        if (hasFinished) return;
        hasFinished = true;
        clearTimeout(safetyTimer);

        console.log('✅ [Part 3] Selesai! Video dibersihkan.');
        state.isPlaying = false;
        state.part3Finished = true;
        
        // Bersihkan decoder Part 3 & pastikan Part 4 sudah di-prefetch
        releasePartVideos(3);
        preloadPart(4);

        if (dom.containerPart3) {
            fadeOutContainer(dom.containerPart3, 250, () => {
                releasePartVideos(3);
                console.log('🧹 Layar dibersihkan dan video dimatikan.');
            });
        }
        
        state.isMarkerLocked = false;
        state.lockedMarker = null;
        console.log('🔓 [Part 3] Marker UNLOCKED');
        
        dom.statusBar.textContent = 'Tap untuk ulang, atau scan Marker 4';
        dom.statusBar.classList.remove('tracking');
        dom.statusBar.classList.add('finished');
    };

    if (dom.soundV3) {
        dom.soundV3.onended = finishPart3;
    }

    const fallbackDur = Math.max((dom.soundV3 && dom.soundV3.duration) || 0, ...videos.part3.map(v => (v && v.duration) || 0), 12);
    const safetyTimer = setTimeout(finishPart3, (fallbackDur + 0.5) * 1000);
}

export function initPart3() {
    if (!dom.target3) return;

    dom.target3.addEventListener('targetFound', () => {
        const now = Date.now();
        if (now < state.markerIgnoreUntil && state.activeMarkerDetection !== 3) return;
        
        if (state.isMarkerLocked && state.lockedMarker !== 3) {
            dom.statusBar.textContent = `Tunggu Part ${state.lockedMarker} selesai dulu`;
            return;
        }
        
        if (state.currentPart > 3) {
            dom.statusBar.textContent = 'Tidak bisa kembali ke Part sebelumnya. Tekan tombol Ulangi jika perlu.';
            if (dom.containerPart3) dom.containerPart3.setAttribute('visible', false);
            return;
        }
        
        if (state.part2Finished && !state.part3Finished && !state.isPlaying && !state.isTransitioning) {
            console.log('🎯 [Part 3] Marker 3 Terdeteksi!');
            state.activeMarkerDetection = 3;
            state.markerIgnoreUntil = now + state.MARKER_IGNORE_DURATION;
            
            playPart3();
            
            setTimeout(() => {
                if (!state.isPlaying) {
                    state.activeMarkerDetection = null;
                }
            }, state.MARKER_IGNORE_DURATION);
            
        } else if (!state.part2Finished) {
            dom.statusBar.textContent = 'Selesaikan Part 2 dulu';
        } else if (state.part3Finished && state.currentPart === 3 && !state.isPlaying) {
            dom.statusBar.textContent = 'Tap untuk ulang, atau scan Marker 4';
            state.lastScannedMarker = 3;
        }
    });
}