import { state, dom, videos } from '../state.js';
import { fadeInContainer, fadeOutContainer, fadeAudioIn, hideAllContainersExcept, isContainerVisible } from '../utils.js';
import { ensurePartLoaded, preloadPart, releasePartVideos } from '../loader.js';

export async function playPart6() {
    // 1. Pengecekan guard ketat (Disamakan dengan struktur Part sebelumnya)
    if (state.isPlaying || !state.part5Finished || (state.currentPart !== 5 && state.currentPart !== 6) || state.isTransitioning) {
        console.log('⏹️ [Part 6] Dibatalkan: Sedang play, Part 5 belum, atau bukan urutannya.');
        return;
    }
    
    // Pastikan aset Part 6 siap & prefetch Part 7
    ensurePartLoaded(6);
    preloadPart(7);

    state.isMarkerLocked = true;
    state.lockedMarker = 6;
    state.isTransitioning = true;
    console.log('🔒 [Part 6] Marker LOCKED');
    
    hideAllContainersExcept(dom.containerPart6);
    
    // 2. Transisi mulus dari layar sebelumnya
    const allContainers = [dom.containerPart1, dom.containerPart2, dom.containerPart3, dom.containerPart4, dom.containerPart5, dom.containerPart7];
    const previousContainer = allContainers.find(c => c && c.getAttribute('visible') === 'true');
    
    if (previousContainer) {
        console.log('🔄 [Part 6] Memudarkan adegan sebelumnya...');
        fadeOutContainer(previousContainer, 400, async () => { 
            await startPart6Videos(); 
        });
    } else {
        await startPart6Videos();
    }
}

async function startPart6Videos() {
    console.log('🎬 [Part 6] Memulai pemutaran video...');
    const wasVisible = isContainerVisible(dom.containerPart6);
    state.currentPart = 6;
    state.isPlaying = true;
    
    dom.statusBar.textContent = 'Part 6 diputar';
    dom.statusBar.classList.add('tracking');
    dom.statusBar.classList.remove('finished');
    
    console.log(`📋 [Part 6] Memeriksa daftar video (Total: ${videos.part6.length} video):`);
    videos.part6.forEach((v, idx) => { 
        if (v) {
            v.pause(); 
            v.currentTime = 0; 
            console.log(`   [${idx + 1}/${videos.part6.length}] Resetting: #${v.id}`);
        } else {
            console.warn(`   ⚠️ [${idx + 1}/${videos.part6.length}] Elemen video bernilai NULL! Cek ID di HTML.`);
        }
    });
    
    const playPromises = videos.part6.map(async (v) => {
        if (!v) return;
        try {
            await v.play();
            console.log(`   ▶️ [Part 6 Video OK] #${v.id} sedang berjalan (durasi: ${v.duration ? v.duration.toFixed(2) + 's' : 'loading...'})`);
        } catch (e) {
            console.error(`   ❌ [Part 6 Video ERROR] Gagal memutar #${v.id}:`, e);
        }
    });
    await Promise.all(playPromises);
    
    // 3. TEKNIK FREEZE FRAME
    videos.part6.forEach(v => {
        if (!v) return;
        v.addEventListener('timeupdate', function preventBlackScreen() {
            if (this.duration && (this.duration - this.currentTime <= 0.5)) {
                this.pause(); 
                this.removeEventListener('timeupdate', preventBlackScreen); 
                console.log(`🧊 [Part 6] Video #${this.id} dibekukan sebelum tamat!`);
            }
        });
    });
    
    await new Promise(r => setTimeout(r, 150));
    if (dom.containerPart6 && !wasVisible) fadeInContainer(dom.containerPart6, 400);
    else if (dom.containerPart6) dom.containerPart6.setAttribute('visible', true);
    await new Promise(r => setTimeout(r, 50));
    
    try {
        if (dom.soundV6) {
            dom.soundV6.pause();
            dom.soundV6.currentTime = 0;
            dom.soundV6.muted = false;
            dom.soundV6.volume = 1.0;
            const p = dom.soundV6.play();
            if (p !== undefined) {
                p.catch((err) => {
                    console.warn('⚠️ [Part 6] Audio play deferred:', err);
                    const resumeAudio = () => {
                        if (state.currentPart === 6 && !state.part6Finished) {
                            dom.soundV6.muted = false;
                            dom.soundV6.volume = 1.0;
                            dom.soundV6.play().catch(() => {});
                        }
                        window.removeEventListener('click', resumeAudio, true);
                        window.removeEventListener('touchend', resumeAudio, true);
                    };
                    window.addEventListener('click', resumeAudio, { once: true, capture: true });
                    window.addEventListener('touchend', resumeAudio, { once: true, capture: true });
                });
            }
        } else {
            console.warn('⚠️ [Part 6] Audio tidak ditemukan.');
        }
    } catch (e) { 
        console.error('❌ [Part 6] Audio error:', e); 
    }
    
    state.isTransitioning = false;
    
    let hasFinished = false;
    const finishPart6 = () => {
        if (hasFinished) return;
        hasFinished = true;
        clearTimeout(safetyTimer);

        console.log('✅ [Part 6] Selesai! Video dibersihkan.');
        state.isPlaying = false;
        state.part6Finished = true;
        
        // Bersihkan decoder Part 6 & pastikan Part 7 di-prefetch
        releasePartVideos(6);
        preloadPart(7);

        if (dom.containerPart6) {
            fadeOutContainer(dom.containerPart6, 250, () => {
                releasePartVideos(6);
                console.log('🧹 Layar dibersihkan dan video dimatikan.');
            });
        }
        
        state.isMarkerLocked = false;
        state.lockedMarker = null;
        
        dom.statusBar.textContent = 'Tap untuk ulang, atau scan Marker 7';
        dom.statusBar.classList.remove('tracking');
        dom.statusBar.classList.add('finished');
    };

    if (dom.soundV6) {
        dom.soundV6.onended = finishPart6;
    }

    const fallbackDur = Math.max((dom.soundV6 && dom.soundV6.duration) || 0, ...videos.part6.map(v => (v && v.duration) || 0), 12);
    const safetyTimer = setTimeout(finishPart6, (fallbackDur + 0.5) * 1000);
}

export function initPart6() {
    if (!dom.target6) return;
    
    dom.target6.addEventListener('targetFound', () => {
        state.isTargetInView[6] = true;
        if (!state.hasStarted) {
            state.pendingPart = 6;
            return;
        }

        const now = Date.now();
        if (now < state.markerIgnoreUntil && state.activeMarkerDetection !== 6) return;
        
        if (state.isMarkerLocked && state.lockedMarker !== 6) {
            dom.statusBar.textContent = `Tunggu Part ${state.lockedMarker} selesai dulu`;
            return;
        }
        
        if (state.currentPart > 6) {
            dom.statusBar.textContent = 'Tidak bisa kembali ke Part sebelumnya. Tekan tombol Ulangi jika perlu.';
            if (dom.containerPart6) dom.containerPart6.setAttribute('visible', false);
            return;
        }
        
        if (state.part5Finished && !state.part6Finished && !state.isPlaying && !state.isTransitioning) {
            state.activeMarkerDetection = 6;
            state.markerIgnoreUntil = now + state.MARKER_IGNORE_DURATION;
            
            playPart6();
            
            setTimeout(() => {
                if (!state.isPlaying) {
                    state.activeMarkerDetection = null;
                }
            }, state.MARKER_IGNORE_DURATION);
        } else if (!state.part5Finished) {
            dom.statusBar.textContent = 'Selesaikan Part 5 dulu';
        } else if (state.part6Finished && state.currentPart === 6 && !state.isPlaying) {
            dom.statusBar.textContent = 'Tap untuk ulang, atau scan Marker 7';
            state.lastScannedMarker = 6;
        }
    });

    dom.target6.addEventListener('targetLost', () => {
        state.isTargetInView[6] = false;
        if (state.pendingPart === 6) {
            state.pendingPart = null;
        }
    });
}