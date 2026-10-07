import { dom, videos } from './state.js';
import { getMediaUrl } from '../cdnConfig.js';

// Konfigurasi URL Bersih via Supabase CDN
export const PART_CONFIG = {
    1: {
        videos: [
            { id: 'vid-bakteri-part1-v1', src: getMediaUrl('./compressed_ultra-videos/chapter2/part1/bakteri.mp4') },
            { id: 'vid-balon-bebek-part1-v1', src: getMediaUrl('./compressed_ultra-videos/chapter2/part1/balon bebek.mp4') },
            { id: 'vid-kolam-renang-part1-v1', src: getMediaUrl('./compressed_ultra-videos/chapter2/part1/kolam renang.mp4') },
            { id: 'vid-mascot-part1-v1', src: getMediaUrl('./compressed_ultra-videos/chapter2/part1/mascot.mp4') },
            { id: 'vid-muntah-part1-v1', src: getMediaUrl('./compressed_ultra-videos/chapter2/part1/muntah.mp4') },
            { id: 'vid-orang-gigi-part1-v1', src: getMediaUrl('./compressed_ultra-videos/chapter2/part1/orang gigi.mp4') }
        ],
        audio: { id: 'sound-v1', src: getMediaUrl('./sounds/chapter2/output-sounds/sound-v1.MP3') }
    },
    2: {
        videos: [
            { id: 'vid-muntah-part2-v1', src: getMediaUrl('./compressed_ultra-videos/chapter2/part2/muntah.mp4') },
            { id: 'vid-orang-makan-part2-v1', src: getMediaUrl('./compressed_ultra-videos/chapter2/part2/orang makan.mp4') },
            { id: 'vid-kue-part2-v1', src: getMediaUrl('./compressed_ultra-videos/chapter2/part2/kue.mp4') },
            { id: 'vid-mascot-part2-v1', src: getMediaUrl('./compressed_ultra-videos/chapter2/part2/mascot.mp4') },
            { id: 'vid-mascot-part2-v2', src: getMediaUrl('./compressed_ultra-videos/chapter2/part2/mascot 2.mp4') }
        ],
        audio: { id: 'sound-v2', src: getMediaUrl('./sounds/chapter2/output-sounds/sound-v2.MP3') }
    },
    3: {
        videos: [
            { id: 'vid-balon-bebek-part3-v1', src: getMediaUrl('./compressed_ultra-videos/chapter2/part3/balon bebek.mp4') },
            { id: 'vid-badan-orang-part3-v1', src: getMediaUrl('./compressed_ultra-videos/chapter2/part3/badan orang.mp4') },
            { id: 'vid-gigi-orang-part3-v1', src: getMediaUrl('./compressed_ultra-videos/chapter2/part3/gigi orang.mp4') },
            { id: 'vid-tangan-part3-v1', src: getMediaUrl('./compressed_ultra-videos/chapter2/part3/tangan.mp4') },
            { id: 'vid-kertas-biru-part3-v1', src: getMediaUrl('./compressed_ultra-videos/chapter2/part3/kertas biru.mp4') },
            { id: 'vid-mascot-part3-v1', src: getMediaUrl('./compressed_ultra-videos/chapter2/part3/mascot.mp4') },
            { id: 'vid-teks-part3', src: getMediaUrl('./compressed_ultra-videos/chapter2/part3/teks-part3.mp4') }
        ],
        audio: { id: 'sound-v3', src: getMediaUrl('./sounds/chapter2/output-sounds/sound-v3.MP3') }
    },
    4: {
        videos: [
            { id: 'vid-gigi-orang-part4-v1', src: getMediaUrl('./compressed_ultra-videos/chapter2/part4/gigi orang.mp4') },
            { id: 'vid-bakteri-part4-v1', src: getMediaUrl('./compressed_ultra-videos/chapter2/part4/bakteri.mp4') },
            { id: 'vid-bakteri-part4-v2', src: getMediaUrl('./compressed_ultra-videos/chapter2/part4/bakteri2.mp4') },
            { id: 'vid-teks-part4', src: getMediaUrl('./compressed_ultra-videos/chapter2/part4/teks-part4.mp4') }
        ],
        audio: { id: 'sound-v4', src: getMediaUrl('./sounds/chapter2/output-sounds/sound-v4.MP3') }
    },
    5: {
        videos: [
            { id: 'vid-air-part5-v1', src: getMediaUrl('./compressed_ultra-videos/chapter2/part5/air.mp4') },
            { id: 'vid-mascot-part5-v1', src: getMediaUrl('./compressed_ultra-videos/chapter2/part5/mascot.mp4') },
            { id: 'vid-bola-part5-v1', src: getMediaUrl('./compressed_ultra-videos/chapter2/part5/bola.mp4') },
            { id: 'vid-orang-naik-balon-part5-v1', src: getMediaUrl('./compressed_ultra-videos/chapter2/part5/orang naik balon.mp4') },
            { id: 'vid-teks-part5', src: getMediaUrl('./compressed_ultra-videos/chapter2/part5/teks-part5.mp4') }
        ],
        audio: { id: 'sound-v5', src: getMediaUrl('./sounds/chapter2/output-sounds/sound-v5.MP3') }
    },
    6: {
        videos: [
            { id: 'vid-air-part6-v1', src: getMediaUrl('./compressed_ultra-videos/chapter2/part6/air.mp4') },
            { id: 'vid-gigi-part6-v1', src: getMediaUrl('./compressed_ultra-videos/chapter2/part6/gigi.mp4') },
            { id: 'vid-mascot-dan-orang-part6-v1', src: getMediaUrl('./compressed_ultra-videos/chapter2/part6/mascot dan orang.mp4') },
            { id: 'vid-teks-part6', src: getMediaUrl('./compressed_ultra-videos/chapter2/part6/teks-part6.mp4') }
        ],
        audio: { id: 'sound-v6', src: getMediaUrl('./sounds/chapter2/output-sounds/sound-v6.MP3') }
    },
    7: {
        videos: [
            { id: 'vid-air-part7-v1', src: getMediaUrl('./compressed_ultra-videos/chapter2/part7/air.mp4') },
            { id: 'vid-bebek-part7-v1', src: getMediaUrl('./compressed_ultra-videos/chapter2/part7/bebek.mp4') },
            { id: 'vid-mascot-part7-v1', src: getMediaUrl('./compressed_ultra-videos/chapter2/part7/mascot.mp4') },
            { id: 'vid-orang-part7-v1', src: getMediaUrl('./compressed_ultra-videos/chapter2/part7/orang.mp4') }
        ],
        audio: { id: 'sound-v7', src: getMediaUrl('./sounds/chapter2/output-sounds/sound-v7.MP3') }
    },
    8: {
        videos: [
            { id: 'vid-kolam-part8', src: getMediaUrl('./compressed_ultra-videos/chapter2/part8/kolam.mp4') },
            { id: 'vid-anak-kecil-part8', src: getMediaUrl('./compressed_ultra-videos/chapter2/part8/anakkecil.mp4') },
            { id: 'vid-mascot-part8', src: getMediaUrl('./compressed_ultra-videos/chapter2/part8/mascot.mp4') },
            { id: 'vid-teks-part8', src: getMediaUrl('./compressed_ultra-videos/chapter2/part8/teks-part8.mp4') }
        ],
        audio: { id: 'sound-v8', src: getMediaUrl('./sounds/chapter2/output-sounds/sound-v8.MP3') }
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

    console.log(`📥 [Chapter 2 Prefetch] Memulai background download Part ${partNum}...`);

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
