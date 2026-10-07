import { dom, videos } from './state.js';
import { getMediaUrl } from '../cdnConfig.js';

// Konfigurasi URL Bersih via Supabase CDN
export const PART_CONFIG = {
    1: {
        videos: [
            { id: 'vid-laut', src: getMediaUrl('./compressed_ultra-videos/chapter1/part1/LAUT-v1.mp4') },
            { id: 'vid-kapal', src: getMediaUrl('./compressed_ultra-videos/chapter1/part1/KAPAL SELAM-v1.mp4') },
            { id: 'vid-batu', src: getMediaUrl('./compressed_ultra-videos/chapter1/part1/BATU SEAWEED-v1.mp4') },
            { id: 'vid-gelembung', src: getMediaUrl('./compressed_ultra-videos/chapter1/part1/GELEMBUNG-v1.mp4') },
            { id: 'vid-mascot', src: getMediaUrl('./compressed_ultra-videos/chapter1/part1/MASCOT-v1.mp4') }
        ],
        audio: { id: 'sound-v1', src: getMediaUrl('./sounds/chapter1/output-sounds/sound-v1.MP3') }
    },
    2: {
        videos: [
            { id: 'vid-batu2', src: getMediaUrl('./compressed_ultra-videos/chapter1/part2/BATU SEAWEED-v2.mp4') },
            { id: 'vid-gelembung2', src: getMediaUrl('./compressed_ultra-videos/chapter1/part2/GELEMBUNG-v2.mp4') },
            { id: 'vid-mascot2', src: getMediaUrl('./compressed_ultra-videos/chapter1/part2/MASCOT-v2.mp4') },
            { id: 'vid-gosok', src: getMediaUrl('./compressed_ultra-videos/chapter1/part2/GOSOK GIGI-v2.mp4') },
            { id: 'vid-orang', src: getMediaUrl('./compressed_ultra-videos/chapter1/part2/ORANG-v2.mp4') },
            { id: 'vid-text2', src: getMediaUrl('./compressed_ultra-videos/chapter1/part2/TEXT_v2.mp4') }
        ],
        audio: { id: 'sound-v2', src: getMediaUrl('./sounds/chapter1/output-sounds/sound-v2.MP3') }
    },
    3: {
        videos: [
            { id: 'vid-kapal3', src: getMediaUrl('./compressed_ultra-videos/chapter1/part3/KAPAL SELAM-v3.mp4') },
            { id: 'vid-mascot3', src: getMediaUrl('./compressed_ultra-videos/chapter1/part3/MASCOT-v3.mp4') },
            { id: 'vid-sikat', src: getMediaUrl('./compressed_ultra-videos/chapter1/part3/SIKAT GIGI-v3.mp4') },
            { id: 'vid-teks-part3', src: getMediaUrl('./compressed_ultra-videos/chapter1/part3/teks-part3.mp4') }
        ],
        audio: { id: 'sound-v3', src: getMediaUrl('./sounds/chapter1/output-sounds/sound-v3.MP3') }
    },
    4: {
        videos: [
            { id: 'vid-kapal4', src: getMediaUrl('./compressed_ultra-videos/chapter1/part4/KAPAL SELAM-v4.mp4') },
            { id: 'vid-mascot4', src: getMediaUrl('./compressed_ultra-videos/chapter1/part4/MASCOT-v4.mp4') },
            { id: 'vid-sikat4', src: getMediaUrl('./compressed_ultra-videos/chapter1/part4/SIKAT GIGI-v4.mp4') },
            { id: 'vid-teks-part4', src: getMediaUrl('./compressed_ultra-videos/chapter1/part4/teks-part4.mp4') }
        ],
        audio: { id: 'sound-v4', src: getMediaUrl('./sounds/chapter1/output-sounds/sound-v4.MP3') }
    },
    5: {
        videos: [
            { id: 'vid-orang5', src: getMediaUrl('./compressed_ultra-videos/chapter1/part5/ORANG-v5.mp4') },
            { id: 'vid-tangan', src: getMediaUrl('./compressed_ultra-videos/chapter1/part5/TANGAN-v5.mp4') },
            { id: 'vid-teks-part5', src: getMediaUrl('./compressed_ultra-videos/chapter1/part5/teks-part5.mp4') }
        ],
        audio: { id: 'sound-v5', src: getMediaUrl('./sounds/chapter1/output-sounds/sound-v5.MP3') }
    },
    6: {
        videos: [
            { id: 'vid-kapal6', src: getMediaUrl('./compressed_ultra-videos/chapter1/part6/KAPAL SELAM-v6.mp4') },
            { id: 'vid-mascot2-6', src: getMediaUrl('./compressed_ultra-videos/chapter1/part6/mascot2.mp4') },
            { id: 'vid-mascot6', src: getMediaUrl('./compressed_ultra-videos/chapter1/part6/ORANG MASCOT-v6.mp4') }
        ],
        audio: { id: 'sound-v6', src: getMediaUrl('./sounds/chapter1/output-sounds/sound-v6.MP3') }
    },
    7: {
        videos: [
            { id: 'vid-coral7', src: getMediaUrl('./compressed_ultra-videos/chapter1/part7/CORAL-v7.mp4') },
            { id: 'vid-laut7', src: getMediaUrl('./compressed_ultra-videos/chapter1/part7/LAUT-v7.mp4') },
            { id: 'vid-mascot7', src: getMediaUrl('./compressed_ultra-videos/chapter1/part7/MASCOT-v7.mp4') },
            { id: 'vid-orang7', src: getMediaUrl('./compressed_ultra-videos/chapter1/part7/ORANG-v7.mp4') },
            { id: 'vid-teks-part7', src: getMediaUrl('./compressed_ultra-videos/chapter1/part7/teks-part7.mp4') }
        ],
        audio: { id: 'sound-v7', src: getMediaUrl('./sounds/chapter1/output-sounds/sound-v7.MP3') }
    },
    8: {
        videos: [
            { id: 'vid-air-part8-v1', src: getMediaUrl('./compressed_ultra-videos/chapter1/part8/air.mp4') },
            { id: 'vid-rumput-part8-v1', src: getMediaUrl('./compressed_ultra-videos/chapter1/part8/rumput.mp4') },
            { id: 'vid-kerang-part8-v1', src: getMediaUrl('./compressed_ultra-videos/chapter1/part8/kerang.mp4') },
            { id: 'vid-kapal-part8-v1', src: getMediaUrl('./compressed_ultra-videos/chapter1/part8/kapal.mp4') },
            { id: 'vid-teks-quiz-part8-v1', src: getMediaUrl('./compressed_ultra-videos/chapter1/part8/teks-quiz.mp4') }
        ],
        audio: { id: 'sound-v8', src: getMediaUrl('./sounds/chapter1/output-sounds/sound-v8.mp3') }
    }
};

const loadedParts = new Set();

/**
 * Memuat video dan audio untuk part tertentu secara on-demand / background prefetch
 * @param {number} partNum - Nomor part (1 s/d 8)
 */
export function preloadPart(partNum) {
    if (loadedParts.has(partNum)) return;
    const config = PART_CONFIG[partNum];
    if (!config) return;
    loadedParts.add(partNum);

    console.log(`📥 [Chapter 1 Prefetch] Memulai background download Part ${partNum}...`);

    if (config.audio) {
        const aEl = document.getElementById(config.audio.id);
        if (aEl && (!aEl.src || aEl.src === '' || aEl.src.endsWith('#'))) {
            aEl.src = config.audio.src;
            aEl.preload = 'auto';
            aEl.load();
        }
    }

    if (config.videos) {
        config.videos.forEach(v => {
            const vEl = document.getElementById(v.id);
            if (vEl && (!vEl.src || vEl.src === '' || vEl.src.endsWith('#'))) {
                vEl.src = v.src;
                vEl.preload = 'auto';
                vEl.load();
            }
        });
    }
}

/**
 * Memastikan part yang akan diputar sudah memiliki src
 */
export function ensurePartLoaded(partNum) {
    preloadPart(partNum);
}

/**
 * Menghentikan dan mengosongkan decoder video dari part yang sudah selesai
 */
export function releasePartVideos(partNum) {
    if (videos['part' + partNum]) {
        videos['part' + partNum].forEach(v => {
            if (v) {
                try {
                    v.pause();
                    v.currentTime = 0;
                } catch(e) {}
            }
        });
    }
}
