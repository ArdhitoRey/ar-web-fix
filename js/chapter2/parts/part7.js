import { state, dom, videos } from '../state.js';
import { fadeInContainer, fadeOutContainer, fadeAudioIn, hideAllContainersExcept, isContainerVisible } from '../utils.js';
import { ensurePartLoaded, preloadPart, releasePartVideos } from '../loader.js';
import { playPart8 } from './part8.js';

export async function playPart7() {
    // Pengecekan guard
    if (state.isPlaying || !state.part6Finished || (state.currentPart !== 6 && state.currentPart !== 7) || state.isTransitioning) {
        console.log('⏹️ [Part 7] Dibatalkan: Sedang play, Part 6 belum selesai, atau urutan salah.');
        return;
    }
    
    // Pastikan aset Part 7 siap & prefetch Part 8 di background
    ensurePartLoaded(7);
    preloadPart(8);

    state.isMarkerLocked = true;
    state.lockedMarker = 7;
    state.isTransitioning = true;
    console.log('🔒 [Part 7] Marker LOCKED');
    
    hideAllContainersExcept(dom.containerPart7);
    
    // Cari layar sebelumnya yang mungkin masih menyala secara aman
    const allContainers = [dom.containerPart1, dom.containerPart2, dom.containerPart3, dom.containerPart4, dom.containerPart5, dom.containerPart6, dom.containerPart8]; 
    const previousContainer = allContainers.find(c => c && c.getAttribute('visible') === 'true');
    
    if (previousContainer) {
        console.log('🔄 [Part 7] Memudarkan adegan sebelumnya...');
        fadeOutContainer(previousContainer, 400, async () => { 
            await startPart7Videos(); 
        });
    } else {
        await startPart7Videos();
    }
}

async function startPart7Videos() {
    console.log('🎬 [Part 7] Memulai pemutaran video...');
    const wasVisible = isContainerVisible(dom.containerPart7);
    state.currentPart = 7;
    state.isPlaying = true;
    
    dom.statusBar.textContent = 'Part 7 diputar';
    dom.statusBar.classList.add('tracking');
    dom.statusBar.classList.remove('finished');
    
    // Reset video ke awal
    videos.part7.forEach(v => { v.pause(); v.currentTime = 0; });
    
    const playPromises = videos.part7.map(v => v.play().catch(e => console.error('❌ [Part 7] Video play error:', e)));
    await Promise.all(playPromises);
    console.log('📹 [Part 7] Semua video berjalan.');
    
    // FREEZE FRAME
    videos.part7.forEach(v => {
        v.addEventListener('timeupdate', function preventBlackScreen() {
            if (this.duration && (this.duration - this.currentTime <= 0.5)) {
                this.pause();
                this.removeEventListener('timeupdate', preventBlackScreen);
            }
        });
    });
    
    await new Promise(r => setTimeout(r, 150));
    if (dom.containerPart7 && !wasVisible) fadeInContainer(dom.containerPart7, 400);
    else if (dom.containerPart7) dom.containerPart7.setAttribute('visible', true);
    
    try {
        if (dom.soundV7) {
            dom.soundV7.pause();
            dom.soundV7.currentTime = 0;
            dom.soundV7.muted = false;
            dom.soundV7.volume = 1.0;
            const p = dom.soundV7.play();
            if (p !== undefined) {
                p.catch((err) => {
                    console.warn('⚠️ [Part 7] Audio play deferred:', err);
                    const resumeAudio = () => {
                        if (state.currentPart === 7 && !state.part7Finished) {
                            dom.soundV7.muted = false;
                            dom.soundV7.volume = 1.0;
                            dom.soundV7.play().catch(() => {});
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
        console.error('❌ [Part 7] Audio error:', e); 
    }
    
    state.isTransitioning = false;
    
    let hasFinished = false;
    const finishPart7 = () => {
        if (hasFinished) return;
        hasFinished = true;
        clearTimeout(safetyTimer);

        console.log('✅ [Part 7] Selesai! Video dibersihkan.');
        state.isPlaying = false;
        state.part7Finished = true;
        
        // Bersihkan decoder Part 7 & pastikan Part 8 sudah di-prefetch
        releasePartVideos(7);
        preloadPart(8);

        if (dom.containerPart7) {
            fadeOutContainer(dom.containerPart7, 250, () => {
                releasePartVideos(7);
                console.log('🧹 Layar dibersihkan dan video dimatikan.');
            });
        }
        
        state.isMarkerLocked = false;
        state.lockedMarker = null;
        console.log('🔓 [Part 7] Marker UNLOCKED');
        
        if (state.isTargetInView && state.isTargetInView[8] && !state.part8Finished && !state.isPlaying) {
            console.log('🎯 [Part 7] Part 7 selesai dan Marker 8 sudah terlihat, langsung putar Part 8!');
            playPart8();
        } else {
            dom.statusBar.textContent = 'Part 7 selesai! Arahkan kamera ke Marker 8';
            dom.statusBar.classList.remove('tracking');
            dom.statusBar.classList.add('finished');
        }
    };

    if (dom.soundV7) {
        dom.soundV7.onended = finishPart7;
    }

    const fallbackDur = Math.max((dom.soundV7 && dom.soundV7.duration) || 0, ...videos.part7.map(v => (v && v.duration) || 0), 12);
    const safetyTimer = setTimeout(finishPart7, (fallbackDur + 0.5) * 1000);
}

export function initPart7() {
    if (!dom.target7) return; // Sabuk pengaman

    dom.target7.addEventListener('targetFound', () => {
        state.isTargetInView[7] = true;
        const now = Date.now();
        if (now < state.markerIgnoreUntil && state.activeMarkerDetection !== 7) return;
        
        if (state.isMarkerLocked && state.lockedMarker !== 7) {
            dom.statusBar.textContent = `Tunggu Part ${state.lockedMarker} selesai dulu`;
            return;
        }
        
        if (state.currentPart > 7) {
            dom.statusBar.textContent = 'Tidak bisa kembali ke Part sebelumnya. Tekan tombol Ulangi jika perlu.';
            if (dom.containerPart7) dom.containerPart7.setAttribute('visible', false);
            return;
        }
        
        if (state.part6Finished && !state.part7Finished && !state.isPlaying && !state.isTransitioning) {
            console.log('🎯 [Part 7] Marker 7 Terdeteksi!');
            state.activeMarkerDetection = 7;
            state.markerIgnoreUntil = now + state.MARKER_IGNORE_DURATION;
            
            playPart7();
            
            setTimeout(() => {
                if (!state.isPlaying) {
                    state.activeMarkerDetection = null;
                }
            }, state.MARKER_IGNORE_DURATION);
            
        } else if (!state.part6Finished) {
            dom.statusBar.textContent = 'Selesaikan Part 6 dulu';
        } else if (state.part7Finished && !state.part8Finished) {
            dom.statusBar.textContent = 'Part 7 selesai! Arahkan kamera ke Marker 8';
            state.lastScannedMarker = 7;
        }
    });

    dom.target7.addEventListener('targetLost', () => {
        state.isTargetInView[7] = false;
    });
}