// Konfigurasi Cloud Storage CDN (Supabase) untuk Media Web AR
export const CDN_BASE = "https://wwlishzxhmshagfuywyd.supabase.co/storage/v1/object/public/ar-assets";

/**
 * Mengubah path relatif lokal menjadi URL publik CDN Supabase.
 * Contoh: './compressed_ultra-videos/chapter1/part1/LAUT-v1.mp4'
 *      -> 'https://wwlishzxhmshagfuywyd.supabase.co/storage/v1/object/public/ar-assets/compressed_ultra-videos/chapter1/part1/LAUT-v1.mp4'
 */
export function getMediaUrl(path) {
    if (!path) return path;
    if (path.startsWith("http://") || path.startsWith("https://")) return path;
    const cleanPath = path.replace(/^\.\//, "").replace(/^\//, "");
    return `${CDN_BASE}/${cleanPath}`;
}

if (typeof window !== "undefined") {
    window.CDN_BASE = CDN_BASE;
    window.getMediaUrl = getMediaUrl;
}
