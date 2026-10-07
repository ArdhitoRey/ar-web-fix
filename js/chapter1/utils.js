import { dom } from './state.js';

function getBaseScale(container) {
    if (!container) return { x: 1, y: 1, z: 1, str: '1 1 1' };
    const s = container.getAttribute('data-base-scale') || container.getAttribute('scale');
    if (!s) return { x: 1, y: 1, z: 1, str: '1 1 1' };
    if (typeof s === 'object') {
        const x = Number(s.x) || 1;
        const y = Number(s.y) || 1;
        const z = Number(s.z) || 1;
        return { x, y, z, str: `${x} ${y} ${z}` };
    }
    const parts = s.toString().trim().split(/\s+/).map(Number);
    const x = parts[0] || 1;
    const y = parts[1] || parts[0] || 1;
    const z = parts[2] || 1;
    return { x, y, z, str: `${x} ${y} ${z}` };
}

export function fadeOutContainer(container, duration, callback) {
    if (!container) {
        if (callback) callback();
        return;
    }
    
    const base = getBaseScale(container);
    const fromStr = `${base.x} ${base.y} ${base.z}`;
    const toStr = `${(base.x * 0.8).toFixed(3)} ${(base.y * 0.8).toFixed(3)} ${(base.z * 0.8).toFixed(3)}`;
    
    container.setAttribute('animation', {
        property: 'scale',
        from: fromStr,
        to: toStr,
        dur: duration,
        easing: 'easeInQuad'
    });
    
    setTimeout(() => {
        container.setAttribute('visible', false);
        container.setAttribute('scale', fromStr);
        container.removeAttribute('animation');
        container.removeAttribute('animation__opacity');
        if (callback) callback();
    }, duration);
}

export function fadeInContainer(container, duration) {
    if (!container) return;
    const base = getBaseScale(container);
    const fromStr = `${(base.x * 0.8).toFixed(3)} ${(base.y * 0.8).toFixed(3)} ${(base.z * 0.8).toFixed(3)}`;
    const toStr = `${base.x} ${base.y} ${base.z}`;

    container.setAttribute('visible', true);
    container.setAttribute('scale', fromStr);
    
    container.setAttribute('animation', {
        property: 'scale',
        from: fromStr,
        to: toStr,
        dur: duration,
        easing: 'easeOutQuad'
    });
    
    setTimeout(() => {
        container.setAttribute('scale', toStr);
        container.removeAttribute('animation');
        container.removeAttribute('animation__opacity');
    }, duration);
}

export function fadeAudioIn(audio, duration) {
    if (!audio) return;
    try {
        audio.muted = false;
        const steps = 20;
        const stepDuration = duration / steps;
        let currentStep = 0;
        try { audio.volume = 0.2; } catch (e) {}

        const fadeInterval = setInterval(() => {
            currentStep++;
            try {
                audio.volume = Math.min(0.2 + (currentStep / steps) * 0.8, 1.0);
            } catch (e) {}

            if (currentStep >= steps) {
                clearInterval(fadeInterval);
                try { audio.volume = 1.0; } catch (e) {}
            }
        }, stepDuration);
    } catch (e) {
        try { audio.volume = 1.0; } catch (err) {}
    }
}

export function fadeAudioOut(audio, duration) {
    const steps = 20;
    const stepDuration = duration / steps;
    const volumeStep = 1.0 / steps;
    let currentStep = steps;
    
    const fadeInterval = setInterval(() => {
        currentStep--;
        audio.volume = Math.max(currentStep * volumeStep, 0);
        
        if (currentStep <= 0) {
            clearInterval(fadeInterval);
            audio.volume = 0;
            audio.pause();
        }
    }, stepDuration);
}

export function hideAllContainersExcept(exceptContainer) {
    const allContainers = [
        dom.containerPart1, dom.containerPart2, dom.containerPart3, 
        dom.containerPart4, dom.containerPart5, dom.containerPart6, dom.containerPart7,
        dom.containerPart8
    ];
    allContainers.forEach(container => {
        if (container && container !== exceptContainer) {
            container.setAttribute('visible', false);
        }
    });
}

// Helper: cek apakah container A-Frame sedang terlihat (visible attribute = true)
// A-Frame menyimpan attribute "visible" sebagai string "true"/"false" atau boolean.
export function isContainerVisible(container) {
    if (!container) return false;
    const v = container.getAttribute('visible');
    return v === true || v === 'true';
}