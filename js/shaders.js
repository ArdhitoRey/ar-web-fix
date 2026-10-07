// CHROMAKEY Shaders - Ultra Clean
AFRAME.registerShader('chromakey-advanced', {
    schema: { src: {type: 'map'} },
    init: function(data) {
        let el = data.src;
        if (typeof el === 'string') {
            el = document.querySelector(el) || document.getElementById(el.replace('#', ''));
        }
        const videoTexture = new THREE.VideoTexture(el || data.src);
        videoTexture.minFilter = THREE.LinearFilter;
        videoTexture.magFilter = THREE.LinearFilter;
        videoTexture.format = THREE.RGBAFormat;
        videoTexture.generateMipmaps = false;
        videoTexture.wrapS = THREE.ClampToEdgeWrapping;
        videoTexture.wrapT = THREE.ClampToEdgeWrapping;
        this.material = new THREE.ShaderMaterial({
            uniforms: { tex: {value: videoTexture} },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform sampler2D tex;
                varying vec2 vUv;
                void main() {
                    vec4 color = texture2D(tex, vUv);
                    
                    // Dominasi warna hijau terhadap merah dan biru
                    float maxRB = max(color.r, color.b);
                    float greenDiff = color.g - maxRB;
                    
                    // Transisi halus feathered (tidak ekstrem, tepi lembut & anti-aliased):
                    float isGreen = smoothstep(0.04, 0.28, greenDiff) * smoothstep(0.30, 0.60, color.g);
                    
                    // Perlindungan mutlak area gelap / mata / pupil / garis hitam
                    float darkProtection = smoothstep(0.02, 0.10, max(color.g, maxRB));
                    isGreen *= darkProtection;
                    
                    float alpha = 1.0 - isGreen;
                    
                    // Despill halus menghilangkan sisa border/halo hijau di tepian objek
                    vec3 finalColor = color.rgb;
                    if (alpha < 0.98 && finalColor.g > maxRB) {
                        float despillWeight = 1.0 - smoothstep(0.70, 0.98, alpha);
                        finalColor.g = mix(finalColor.g, maxRB, despillWeight);
                    }
                    
                    gl_FragColor = vec4(finalColor, alpha);
                }
            `,
            transparent: true,
            side: THREE.DoubleSide,
            depthWrite: false
        });
        this.material.map = videoTexture;
    },
    update: function(data) {
        if (data.src) {
            let el = data.src;
            if (typeof el === 'string') el = document.querySelector(el);
            if (el) {
                const videoTexture = new THREE.VideoTexture(el);
                videoTexture.minFilter = THREE.LinearFilter;
                videoTexture.magFilter = THREE.LinearFilter;
                videoTexture.format = THREE.RGBAFormat;
                videoTexture.generateMipmaps = false;
                videoTexture.wrapS = THREE.ClampToEdgeWrapping;
                videoTexture.wrapT = THREE.ClampToEdgeWrapping;
                if (this.material && this.material.uniforms && this.material.uniforms.tex) {
                    this.material.uniforms.tex.value = videoTexture;
                    this.material.map = videoTexture;
                    this.material.needsUpdate = true;
                }
            }
        }
    },
    tick: function() {
        if (this.material && this.material.uniforms && this.material.uniforms.tex && this.material.uniforms.tex.value) {
            const t = this.material.uniforms.tex.value;
            if (t.image && t.image.readyState >= 2 && !t.image.paused) {
                t.needsUpdate = true;
            }
        }
    }
});

AFRAME.registerShader('chromakey-gentle', {
    schema: { src: {type: 'map'} },
    init: function(data) {
        let el = data.src;
        if (typeof el === 'string') {
            el = document.querySelector(el) || document.getElementById(el.replace('#', ''));
        }
        const videoTexture = new THREE.VideoTexture(el || data.src);
        videoTexture.minFilter = THREE.LinearFilter;
        videoTexture.magFilter = THREE.LinearFilter;
        videoTexture.format = THREE.RGBAFormat;
        videoTexture.generateMipmaps = false;
        videoTexture.wrapS = THREE.ClampToEdgeWrapping;
        videoTexture.wrapT = THREE.ClampToEdgeWrapping;
        this.material = new THREE.ShaderMaterial({
            uniforms: { tex: {value: videoTexture} },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform sampler2D tex;
                varying vec2 vUv;
                void main() {
                    vec4 color = texture2D(tex, vUv);
                    float maxRB = max(color.r, color.b);
                    float greenDiff = color.g - maxRB;
                    
                    float isGreen = smoothstep(0.05, 0.32, greenDiff) * smoothstep(0.35, 0.65, color.g);
                    
                    float darkProtection = smoothstep(0.02, 0.10, max(color.g, maxRB));
                    isGreen *= darkProtection;
                    
                    float alpha = 1.0 - isGreen;
                    
                    vec3 finalColor = color.rgb;
                    if (alpha < 0.98 && finalColor.g > maxRB) {
                        float despillWeight = 1.0 - smoothstep(0.70, 0.98, alpha);
                        finalColor.g = mix(finalColor.g, maxRB, despillWeight);
                    }
                    
                    gl_FragColor = vec4(finalColor, alpha);
                }
            `,
            transparent: true,
            side: THREE.DoubleSide,
            depthWrite: false
        });
        this.material.map = videoTexture;
    },
    update: function(data) {
        if (data.src) {
            let el = data.src;
            if (typeof el === 'string') el = document.querySelector(el);
            if (el) {
                const videoTexture = new THREE.VideoTexture(el);
                videoTexture.minFilter = THREE.LinearFilter;
                videoTexture.magFilter = THREE.LinearFilter;
                videoTexture.format = THREE.RGBAFormat;
                videoTexture.generateMipmaps = false;
                videoTexture.wrapS = THREE.ClampToEdgeWrapping;
                videoTexture.wrapT = THREE.ClampToEdgeWrapping;
                if (this.material && this.material.uniforms && this.material.uniforms.tex) {
                    this.material.uniforms.tex.value = videoTexture;
                    this.material.map = videoTexture;
                    this.material.needsUpdate = true;
                }
            }
        }
    },
    tick: function() {
        if (this.material && this.material.uniforms && this.material.uniforms.tex && this.material.uniforms.tex.value) {
            const t = this.material.uniforms.tex.value;
            if (t.image && t.image.readyState >= 2 && !t.image.paused) {
                t.needsUpdate = true;
            }
        }
    }
});

AFRAME.registerShader('chromakey-bubble', {
    schema: { src: {type: 'map'} },
    init: function(data) {
        let el = data.src;
        if (typeof el === 'string') {
            el = document.querySelector(el) || document.getElementById(el.replace('#', ''));
        }
        const videoTexture = new THREE.VideoTexture(el || data.src);
        videoTexture.minFilter = THREE.LinearFilter;
        videoTexture.magFilter = THREE.LinearFilter;
        videoTexture.format = THREE.RGBAFormat;
        videoTexture.generateMipmaps = false;
        videoTexture.wrapS = THREE.ClampToEdgeWrapping;
        videoTexture.wrapT = THREE.ClampToEdgeWrapping;
        this.material = new THREE.ShaderMaterial({
            uniforms: { 
                tex: {value: videoTexture},
                brightness: {value: 1.3}
            },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform sampler2D tex;
                uniform float brightness;
                varying vec2 vUv;
                void main() {
                    vec4 color = texture2D(tex, vUv);
                    float maxRB = max(color.r, color.b);
                    float greenDominance = color.g - maxRB;
                    
                    float isGreen = smoothstep(0.25, 0.45, greenDominance) * smoothstep(0.55, 0.75, color.g);
                    if (color.g > 0.75 && greenDominance > 0.35) isGreen = 1.0;
                    
                    float darkProtection = smoothstep(0.04, 0.16, max(color.g, maxRB));
                    isGreen *= darkProtection;
                    
                    float alpha = 1.0 - isGreen;
                    
                    vec3 finalColor = color.rgb;
                    if (alpha > 0.1) {
                        finalColor *= brightness;
                        finalColor = clamp(finalColor, 0.0, 1.0);
                    }
                    if (alpha > 0.01 && alpha < 0.99 && greenDominance > 0.02) {
                        float despillStrength = (1.0 - alpha) * 0.8;
                        finalColor.g = min(finalColor.g, mix(finalColor.g, maxRB, despillStrength));
                    }
                    
                    gl_FragColor = vec4(finalColor, alpha);
                }
            `,
            transparent: true,
            side: THREE.DoubleSide,
            depthWrite: false,
            blending: THREE.NormalBlending
        });
        this.material.map = videoTexture;
    },
    update: function(data) {
        if (data.src) {
            let el = data.src;
            if (typeof el === 'string') el = document.querySelector(el);
            if (el) {
                const videoTexture = new THREE.VideoTexture(el);
                videoTexture.minFilter = THREE.LinearFilter;
                videoTexture.magFilter = THREE.LinearFilter;
                videoTexture.format = THREE.RGBAFormat;
                videoTexture.generateMipmaps = false;
                videoTexture.wrapS = THREE.ClampToEdgeWrapping;
                videoTexture.wrapT = THREE.ClampToEdgeWrapping;
                if (this.material && this.material.uniforms && this.material.uniforms.tex) {
                    this.material.uniforms.tex.value = videoTexture;
                    this.material.map = videoTexture;
                    this.material.needsUpdate = true;
                }
            }
        }
    },
    tick: function() {
        if (this.material && this.material.uniforms && this.material.uniforms.tex && this.material.uniforms.tex.value) {
            const t = this.material.uniforms.tex.value;
            if (t.image && t.image.readyState >= 2 && !t.image.paused) {
                t.needsUpdate = true;
            }
        }
    }
});

// CHROMAKEY Shader - Khusus Blue Screen
AFRAME.registerShader('chromakey-blue', {
    schema: { src: {type: 'map'} },
    init: function(data) {
        let el = data.src;
        if (typeof el === 'string') {
            el = document.querySelector(el) || document.getElementById(el.replace('#', ''));
        }
        const videoTexture = new THREE.VideoTexture(el || data.src);
        videoTexture.minFilter = THREE.LinearFilter;
        videoTexture.magFilter = THREE.LinearFilter;
        videoTexture.format = THREE.RGBAFormat;
        videoTexture.generateMipmaps = false;
        videoTexture.wrapS = THREE.ClampToEdgeWrapping;
        videoTexture.wrapT = THREE.ClampToEdgeWrapping;
        this.material = new THREE.ShaderMaterial({
            uniforms: { tex: {value: videoTexture} },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform sampler2D tex;
                varying vec2 vUv;
                void main() {
                    vec4 color = texture2D(tex, vUv);
                    
                    // Dominasi warna biru terhadap merah dan hijau
                    float maxRG = max(color.r, color.g);
                    float blueDiff = color.b - maxRG;
                    
                    // Transisi halus feathered (lembut, tidak bergerigi, anti-aliased):
                    float isBlue = smoothstep(0.03, 0.25, blueDiff) * smoothstep(0.30, 0.60, color.b);
                    
                    // Perlindungan mutlak area gelap / pupil / outline hitam
                    float darkProtection = smoothstep(0.02, 0.10, max(color.b, maxRG));
                    isBlue *= darkProtection;
                    
                    float alpha = 1.0 - isBlue;
                    
                    // Despill lembut menghilangkan sisa border/halo biru di tepian objek
                    vec3 finalColor = color.rgb;
                    if (alpha < 0.98 && finalColor.b > maxRG) {
                        float despillWeight = 1.0 - smoothstep(0.70, 0.98, alpha);
                        finalColor.b = mix(finalColor.b, maxRG, despillWeight);
                    }
                    
                    gl_FragColor = vec4(finalColor, alpha);
                }
            `,
            transparent: true,
            side: THREE.DoubleSide,
            depthWrite: false
        });
        this.material.map = videoTexture;
    },
    update: function(data) {
        if (data.src) {
            let el = data.src;
            if (typeof el === 'string') el = document.querySelector(el);
            if (el) {
                const videoTexture = new THREE.VideoTexture(el);
                videoTexture.minFilter = THREE.LinearFilter;
                videoTexture.magFilter = THREE.LinearFilter;
                videoTexture.format = THREE.RGBAFormat;
                videoTexture.generateMipmaps = false;
                videoTexture.wrapS = THREE.ClampToEdgeWrapping;
                videoTexture.wrapT = THREE.ClampToEdgeWrapping;
                if (this.material && this.material.uniforms && this.material.uniforms.tex) {
                    this.material.uniforms.tex.value = videoTexture;
                    this.material.map = videoTexture;
                    this.material.needsUpdate = true;
                }
            }
        }
    },
    tick: function() {
        if (this.material && this.material.uniforms && this.material.uniforms.tex && this.material.uniforms.tex.value) {
            const t = this.material.uniforms.tex.value;
            if (t.image && t.image.readyState >= 2 && !t.image.paused) {
                t.needsUpdate = true;
            }
        }
    }
});

AFRAME.registerShader('blackkey-advanced', {
    schema: { src: {type: 'map'} },
    init: function(data) {
        let el = data.src;
        if (typeof el === 'string') {
            el = document.querySelector(el) || document.getElementById(el.replace('#', ''));
        }
        const videoTexture = new THREE.VideoTexture(el || data.src);
        videoTexture.minFilter = THREE.LinearFilter;
        videoTexture.magFilter = THREE.LinearFilter;
        videoTexture.format = THREE.RGBAFormat;
        videoTexture.generateMipmaps = false;
        videoTexture.wrapS = THREE.ClampToEdgeWrapping;
        videoTexture.wrapT = THREE.ClampToEdgeWrapping;
        
        this.material = new THREE.ShaderMaterial({
            uniforms: { tex: {value: videoTexture} },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform sampler2D tex;
                varying vec2 vUv;
                void main() {
                    vec4 color = texture2D(tex, vUv);
                    
                    // Cari nilai warna paling terang dari RGB (Mencari tingkat kecerahan/Luminance)
                    float brightness = max(max(color.r, color.g), color.b);
                    
                    // PENGATURAN TOLERANSI HITAM
                    // threshold: Batas di mana warna dianggap "Hitam BG" (0.05 = hampir hitam pekat)
                    // smoothing: Tingkat kehalusan pinggiran objek agar tidak bergerigi
                    float threshold = 0.06;
                    float smoothing = 0.15;
                    
                    // Smoothstep akan membuat alpha 0.0 jika brightness di bawah threshold,
                    // dan perlahan naik ke 1.0 pada area smoothing.
                    float alpha = smoothstep(threshold, threshold + smoothing, brightness);
                    
                    // Opsional: Untuk mencegah pinggiran objek terlihat kotor/gosong,
                    // kita bisa menaikkan sedikit kecerahan di area pinggiran transparan
                    vec3 finalColor = color.rgb;
                    if (alpha > 0.0 && alpha < 1.0) {
                        finalColor = finalColor + vec3(0.05); // Tambah sedikit cahaya di pinggiran
                    }

                    gl_FragColor = vec4(finalColor, alpha);
                }
            `,
            transparent: true,
            side: THREE.DoubleSide,
            depthWrite: false
        });
        this.material.map = videoTexture;
    },
    tick: function() {
        if (this.material && this.material.uniforms && this.material.uniforms.tex && this.material.uniforms.tex.value) {
            const t = this.material.uniforms.tex.value;
            if (t.image && t.image.readyState >= 2 && !t.image.paused) {
                t.needsUpdate = true;
            }
        }
    }
});

AFRAME.registerShader('chromakey-bakteri', {
    schema: { src: {type: 'map'} },
    init: function(data) {
        let el = data.src;
        if (typeof el === 'string') {
            el = document.querySelector(el) || document.getElementById(el.replace('#', ''));
        }
        const videoTexture = new THREE.VideoTexture(el || data.src);
        videoTexture.minFilter = THREE.LinearFilter;
        videoTexture.magFilter = THREE.LinearFilter;
        videoTexture.format = THREE.RGBAFormat;
        videoTexture.generateMipmaps = false;
        videoTexture.wrapS = THREE.ClampToEdgeWrapping;
        videoTexture.wrapT = THREE.ClampToEdgeWrapping;
        
        this.material = new THREE.ShaderMaterial({
            uniforms: { tex: {value: videoTexture} },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform sampler2D tex;
                varying vec2 vUv;
                
                void main() {
                    vec4 color = texture2D(tex, vUv);
                    
                    // Hitung seberapa dominan warna hijau dibanding merah dan biru
                    float maxRB = max(color.r, color.b);
                    float greenDominance = color.g - maxRB;
                    
                    // threshold 0.35 - 0.55 memastikan hanya hijau murni yang tembus pandang
                    float isGreen = smoothstep(0.35, 0.55, greenDominance);
                    
                    // Perlindungan area gelap / outline
                    float darkProtection = smoothstep(0.04, 0.16, max(color.g, maxRB));
                    isGreen *= darkProtection;
                    
                    float alpha = 1.0 - isGreen;
                    
                    vec3 finalColor = color.rgb;
                    
                    // Despill: Membersihkan sisa pantulan hijau di pinggiran bakteri
                    if (alpha > 0.01 && alpha < 0.99) {
                        finalColor.g = min(finalColor.g, (finalColor.r + finalColor.b) * 0.6);
                    }
                    
                    gl_FragColor = vec4(finalColor, alpha);
                }
            `,
            transparent: true,
            side: THREE.DoubleSide,
            depthWrite: false
        });
        this.material.map = videoTexture;
    },
    tick: function() {
        if (this.material && this.material.uniforms && this.material.uniforms.tex && this.material.uniforms.tex.value) {
            const t = this.material.uniforms.tex.value;
            if (t.image && t.image.readyState >= 2 && !t.image.paused) {
                t.needsUpdate = true;
            }
        }
    }
});

// CHROMAKEY Shader - Khusus Cyan Screen (Background biru-hijau toska seperti #2DEBE7)
// Latar cyan punya G dan B sama-sama tinggi, R rendah. Kita deteksi cyan dengan
// (min(G,B) - R) -> dominasi cyan, sekaligus memastikan G ≈ B (gbBalance).
AFRAME.registerShader('chromakey-cyan', {
    schema: { src: {type: 'map'} },
    init: function(data) {
        let el = data.src;
        if (typeof el === 'string') {
            el = document.querySelector(el) || document.getElementById(el.replace('#', ''));
        }
        const videoTexture = new THREE.VideoTexture(el || data.src);
        videoTexture.minFilter = THREE.LinearFilter;
        videoTexture.magFilter = THREE.LinearFilter;
        videoTexture.format = THREE.RGBAFormat;
        videoTexture.generateMipmaps = false;
        videoTexture.wrapS = THREE.ClampToEdgeWrapping;
        videoTexture.wrapT = THREE.ClampToEdgeWrapping;

        this.material = new THREE.ShaderMaterial({
            uniforms: { tex: {value: videoTexture} },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform sampler2D tex;
                varying vec2 vUv;

                void main() {
                    vec4 color = texture2D(tex, vUv);

                    float gb = min(color.g, color.b);
                    float cyanDominance = gb - color.r;
                    float gbBalance = 1.0 - abs(color.g - color.b);

                    // Transisi halus presisi cyan:
                    float isCyan = smoothstep(0.12, 0.35, cyanDominance) * smoothstep(0.60, 0.85, gbBalance) * smoothstep(0.35, 0.65, gb);

                    // Perlindungan area gelap
                    float darkProtection = smoothstep(0.02, 0.10, max(max(color.r, color.g), color.b));
                    isCyan *= darkProtection;

                    float alpha = 1.0 - isCyan;

                    vec3 finalColor = color.rgb;
                    if (alpha < 0.98 && finalColor.b > max(finalColor.r, finalColor.g)) {
                        float despillWeight = 1.0 - smoothstep(0.70, 0.98, alpha);
                        finalColor.b = mix(finalColor.b, max(finalColor.r, finalColor.g), despillWeight);
                    }

                    gl_FragColor = vec4(finalColor, alpha);
                }
            `,
            transparent: true,
            side: THREE.DoubleSide,
            depthWrite: false
        });
        this.material.map = videoTexture;
    },
    update: function(data) {
        if (data.src) {
            let el = data.src;
            if (typeof el === 'string') el = document.querySelector(el);
            if (el) {
                const videoTexture = new THREE.VideoTexture(el);
                videoTexture.minFilter = THREE.LinearFilter;
                videoTexture.magFilter = THREE.LinearFilter;
                videoTexture.format = THREE.RGBAFormat;
                videoTexture.generateMipmaps = false;
                videoTexture.wrapS = THREE.ClampToEdgeWrapping;
                videoTexture.wrapT = THREE.ClampToEdgeWrapping;
                if (this.material && this.material.uniforms && this.material.uniforms.tex) {
                    this.material.uniforms.tex.value = videoTexture;
                    this.material.map = videoTexture;
                    this.material.needsUpdate = true;
                }
            }
        }
    },
    tick: function() {
        if (this.material && this.material.uniforms && this.material.uniforms.tex && this.material.uniforms.tex.value) {
            const t = this.material.uniforms.tex.value;
            if (t.image && t.image.readyState >= 2 && !t.image.paused) {
                t.needsUpdate = true;
            }
        }
    }
});

// CHROMAKEY Shader - Khusus Magenta/Ungu Screen (#B200B8 & #D201D9)
AFRAME.registerShader('chromakey-magenta', {
    schema: { src: {type: 'map'} },
    init: function(data) {
        let el = data.src;
        if (typeof el === 'string') {
            el = document.querySelector(el) || document.getElementById(el.replace('#', ''));
        }
        const videoTexture = new THREE.VideoTexture(el || data.src);
        videoTexture.minFilter = THREE.LinearFilter;
        videoTexture.magFilter = THREE.LinearFilter;
        videoTexture.format = THREE.RGBAFormat;
        videoTexture.generateMipmaps = false;
        videoTexture.wrapS = THREE.ClampToEdgeWrapping;
        videoTexture.wrapT = THREE.ClampToEdgeWrapping;

        this.material = new THREE.ShaderMaterial({
            uniforms: { tex: {value: videoTexture} },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform sampler2D tex;
                varying vec2 vUv;

                void main() {
                    vec4 color = texture2D(tex, vUv);

                    // Deteksi warna Magenta/Ungu (#B200B8 & #D201D9):
                    // - Latar ungu: R tinggi, B tinggi, G mendekati 0.0, selisih |R - B| sangat kecil
                    // - Karakter / corak baju: G >= 0.22 atau R jauh lebih tinggi dari B (rbBalance rendah)
                    float rb = min(color.r, color.b);
                    float magentaDominance = rb - color.g;
                    float rbBalance = 1.0 - abs(color.r - color.b);

                    // Transisi halus presisi:
                    // 1) domFactor: dominasi magenta terhadap green (0.12 - 0.25)
                    float domFactor = smoothstep(0.12, 0.25, magentaDominance);
                    // 2) balFactor: memastikan R dan B seimbang (khas ungu murni)
                    float balFactor = smoothstep(0.68, 0.80, rbBalance);
                    // 3) rbFactor: intensitas R dan B mencukupi
                    float rbFactor  = smoothstep(0.18, 0.28, rb);

                    float isMagenta = domFactor * balFactor * rbFactor;

                    // Hard-cut pengaman untuk piksel latar belakang ungu murni & border samping gambar
                    if (magentaDominance > 0.22 && rbBalance > 0.72 && rb > 0.24) {
                        isMagenta = 1.0;
                    }
                    if (color.g < 0.08 && rb > 0.28 && rbBalance > 0.75) {
                        isMagenta = 1.0;
                    }

                    // Perlindungan area gelap / pupil / outline hitam
                    float darkProtection = smoothstep(0.04, 0.16, max(max(color.r, color.g), color.b));
                    isMagenta *= darkProtection;

                    float alpha = 1.0 - isMagenta;

                    vec3 finalColor = color.rgb;

                    // Despill lembut di tepian semi-transparan untuk hilangkan sisa halo ungu
                    if (alpha > 0.0 && alpha < 0.99 && rbBalance > 0.60) {
                        float despillStrength = (1.0 - alpha) * 0.95;
                        float maxGB = max(finalColor.g, finalColor.b);
                        finalColor.r = mix(finalColor.r, min(finalColor.r, maxGB), despillStrength);
                        float avgRG = (finalColor.r + finalColor.g) * 0.5;
                        finalColor.b = mix(finalColor.b, min(finalColor.b, avgRG), despillStrength * 0.8);
                    }

                    gl_FragColor = vec4(finalColor, alpha);
                }
            `,
            transparent: true,
            side: THREE.DoubleSide,
            depthWrite: false,
            blending: THREE.NormalBlending
        });
        this.material.map = videoTexture;
    },
    update: function(data) {
        if (data.src) {
            let el = data.src;
            if (typeof el === 'string') el = document.querySelector(el);
            if (el) {
                const videoTexture = new THREE.VideoTexture(el);
                videoTexture.minFilter = THREE.LinearFilter;
                videoTexture.magFilter = THREE.LinearFilter;
                videoTexture.format = THREE.RGBAFormat;
                videoTexture.generateMipmaps = false;
                videoTexture.wrapS = THREE.ClampToEdgeWrapping;
                videoTexture.wrapT = THREE.ClampToEdgeWrapping;
                if (this.material && this.material.uniforms && this.material.uniforms.tex) {
                    this.material.uniforms.tex.value = videoTexture;
                    this.material.map = videoTexture;
                    this.material.needsUpdate = true;
                }
            }
        }
    },
    tick: function() {
        if (this.material && this.material.uniforms && this.material.uniforms.tex && this.material.uniforms.tex.value) {
            const t = this.material.uniforms.tex.value;
            if (t.image && t.image.readyState >= 2 && !t.image.paused) {
                t.needsUpdate = true;
            }
        }
    }
});

// CHROMAKEY Shader - Khusus Neon Lime / Yellow-Green Screen (#C6F439 / #CFF35E / RGB: ~198-208, ~240-245, ~57-105)
AFRAME.registerShader('chromakey-neon', {
    schema: { src: {type: 'map'} },
    init: function(data) {
        let el = data.src;
        if (typeof el === 'string') {
            el = document.querySelector(el) || document.getElementById(el.replace('#', ''));
        }
        const videoTexture = new THREE.VideoTexture(el || data.src);
        videoTexture.minFilter = THREE.LinearFilter;
        videoTexture.magFilter = THREE.LinearFilter;
        videoTexture.format = THREE.RGBAFormat;
        videoTexture.generateMipmaps = false;
        videoTexture.wrapS = THREE.ClampToEdgeWrapping;
        videoTexture.wrapT = THREE.ClampToEdgeWrapping;

        this.material = new THREE.ShaderMaterial({
            uniforms: { tex: {value: videoTexture} },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform sampler2D tex;
                varying vec2 vUv;

                void main() {
                    vec4 color = texture2D(tex, vUv);

                    // Deteksi warna Neon Lime/Yellow-Green (#C6F439 / #CFF35E):
                    // - Karakteristik neon: G sangat tinggi (> 0.80), R cukup tinggi (> 0.60), B rendah (< 0.55)
                    // - G selalu lebih tinggi dari R (grDiff: 0.05 - 0.20) dan jauh lebih tinggi dari B (gbDiff: 0.35 - 0.75)
                    float gbDiff = color.g - color.b;
                    float grDiff = color.g - color.r;

                    // Transisi halus presisi & toleran terhadap variasi kompresi H.264
                    float isNeon = smoothstep(0.02, 0.06, grDiff) * smoothstep(0.25, 0.40, gbDiff) * smoothstep(0.65, 0.80, color.g);

                    // Hard-cut pengaman untuk mengeliminasi kedipan bintik sisa macroblock neon
                    if (grDiff > 0.04 && gbDiff > 0.32 && color.g > 0.75 && color.r > 0.50 && color.b < 0.55) {
                        isNeon = 1.0;
                    }

                    // Perlindungan area gelap / outline teks
                    float darkProtection = smoothstep(0.04, 0.16, max(max(color.r, color.g), color.b));
                    isNeon *= darkProtection;

                    float alpha = 1.0 - isNeon;

                    vec3 finalColor = color.rgb;

                    // Despill lembut di tepian objek agar tidak ada pantulan cahaya neon kuning-hijau
                    if (alpha > 0.0 && alpha < 0.95 && isNeon > 0.05) {
                        float despillStrength = (1.0 - alpha) * 0.9;
                        finalColor.g = mix(finalColor.g, (finalColor.r + finalColor.b) * 0.5, despillStrength);
                    }

                    gl_FragColor = vec4(finalColor, alpha);
                }
            `,
            transparent: true,
            side: THREE.DoubleSide,
            depthWrite: false,
            blending: THREE.NormalBlending
        });
        this.material.map = videoTexture;
    },
    update: function(data) {
        if (data.src) {
            let el = data.src;
            if (typeof el === 'string') el = document.querySelector(el);
            if (el) {
                const videoTexture = new THREE.VideoTexture(el);
                videoTexture.minFilter = THREE.LinearFilter;
                videoTexture.magFilter = THREE.LinearFilter;
                videoTexture.format = THREE.RGBAFormat;
                videoTexture.generateMipmaps = false;
                videoTexture.wrapS = THREE.ClampToEdgeWrapping;
                videoTexture.wrapT = THREE.ClampToEdgeWrapping;
                if (this.material && this.material.uniforms && this.material.uniforms.tex) {
                    this.material.uniforms.tex.value = videoTexture;
                    this.material.map = videoTexture;
                    this.material.needsUpdate = true;
                }
            }
        }
    },
    tick: function() {
        if (this.material && this.material.uniforms && this.material.uniforms.tex && this.material.uniforms.tex.value) {
            const t = this.material.uniforms.tex.value;
            if (t.image && t.image.readyState >= 2 && !t.image.paused) {
                t.needsUpdate = true;
            }
        }
    }
});

// CHROMAKEY Shader - Khusus Final Score Lavender/Lilac Screen (#B38BDD / RGB: ~179, ~139, ~221)
AFRAME.registerShader('chromakey-score', {
    schema: { src: {type: 'map'} },
    init: function(data) {
        let el = data.src;
        if (typeof el === 'string') {
            el = document.querySelector(el) || document.getElementById(el.replace('#', ''));
        }
        const videoTexture = new THREE.VideoTexture(el || data.src);
        videoTexture.minFilter = THREE.LinearFilter;
        videoTexture.magFilter = THREE.LinearFilter;
        videoTexture.format = THREE.RGBAFormat;
        videoTexture.generateMipmaps = false;
        videoTexture.wrapS = THREE.ClampToEdgeWrapping;
        videoTexture.wrapT = THREE.ClampToEdgeWrapping;

        this.material = new THREE.ShaderMaterial({
            uniforms: { tex: {value: videoTexture} },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform sampler2D tex;
                varying vec2 vUv;

                void main() {
                    vec4 color = texture2D(tex, vUv);

                    // Target background color lavender/lilac: #B38BDD (RGB: 179/255, 139/255, 221/255)
                    vec3 keyColor = vec3(0.70196, 0.54510, 0.86667);
                    float dist = distance(color.rgb, keyColor);

                    // Transisi halus presisi (0.05 - 0.18)
                    float alpha = smoothstep(0.05, 0.18, dist);

                    // Hard-cut pengaman untuk piksel latar belakang murni
                    if (dist < 0.05) {
                        alpha = 0.0;
                    }

                    // Perlindungan area gelap / outline
                    float darkFactor = smoothstep(0.04, 0.16, max(max(color.r, color.g), color.b));
                    alpha = mix(1.0, alpha, darkFactor);

                    vec3 finalColor = color.rgb;

                    // Despill lembut di tepian semi-transparan untuk hilangkan sisa pantulan warna ungu muda
                    if (alpha > 0.0 && alpha < 0.99) {
                        float spillFactor = 1.0 - alpha;
                        float bExcess = max(0.0, finalColor.b - max(finalColor.r * 0.9, finalColor.g * 1.15));
                        float rExcess = max(0.0, finalColor.r - max(finalColor.g * 1.1, finalColor.b * 0.85));
                        finalColor.b -= bExcess * spillFactor * 1.2;
                        finalColor.r -= rExcess * spillFactor * 0.8;
                        finalColor = clamp(finalColor, 0.0, 1.0);
                    }

                    gl_FragColor = vec4(finalColor, alpha);
                }
            `,
            transparent: true,
            side: THREE.DoubleSide,
            depthWrite: false,
            blending: THREE.NormalBlending
        });
        this.material.map = videoTexture;
    },
    update: function(data) {
        if (data.src) {
            let el = data.src;
            if (typeof el === 'string') el = document.querySelector(el);
            if (el) {
                const videoTexture = new THREE.VideoTexture(el);
                videoTexture.minFilter = THREE.LinearFilter;
                videoTexture.magFilter = THREE.LinearFilter;
                videoTexture.format = THREE.RGBAFormat;
                videoTexture.generateMipmaps = false;
                videoTexture.wrapS = THREE.ClampToEdgeWrapping;
                videoTexture.wrapT = THREE.ClampToEdgeWrapping;
                if (this.material && this.material.uniforms && this.material.uniforms.tex) {
                    this.material.uniforms.tex.value = videoTexture;
                    this.material.map = videoTexture;
                    this.material.needsUpdate = true;
                }
            }
        }
    },
    tick: function() {
        if (this.material && this.material.uniforms && this.material.uniforms.tex && this.material.uniforms.tex.value) {
            const t = this.material.uniforms.tex.value;
            if (t.image && t.image.readyState >= 2 && !t.image.paused) {
                t.needsUpdate = true;
            }
        }
    }
});

// CHROMAKEY Shader - Khusus Latar Hijau Gelap teks-part6 (RGB: ~36, ~130, ~28 / #24821c)
AFRAME.registerShader('chromakey-teks-part6', {
    schema: { src: {type: 'map'} },
    init: function(data) {
        let el = data.src;
        if (typeof el === 'string') el = document.querySelector(el);
        const videoTexture = new THREE.VideoTexture(el || data.src);
        videoTexture.minFilter = THREE.LinearFilter;
        videoTexture.magFilter = THREE.LinearFilter;
        videoTexture.format = THREE.RGBAFormat;
        videoTexture.generateMipmaps = false;
        videoTexture.wrapS = THREE.ClampToEdgeWrapping;
        videoTexture.wrapT = THREE.ClampToEdgeWrapping;

        this.material = new THREE.ShaderMaterial({
            uniforms: { tex: {value: videoTexture} },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform sampler2D tex;
                varying vec2 vUv;

                void main() {
                    vec4 color = texture2D(tex, vUv);

                    // Deteksi warna hijau gelap teks-part6 (RGB: ~36, ~130, ~28):
                    // - R ~ 0.14, G ~ 0.51, B ~ 0.11
                    // - G dominan terhadap max(R, B)
                    float greenDominance = color.g - max(color.r, color.b);

                    // Transisi halus presisi & bersih
                    float isGreen = smoothstep(0.18, 0.28, greenDominance) * smoothstep(0.32, 0.42, color.g);

                    // Hard-cut pengaman untuk piksel latar belakang murni
                    if (color.g > 0.38 && greenDominance > 0.22 && color.r < 0.25 && color.b < 0.22) {
                        isGreen = 1.0;
                    }

                    // Perlindungan area gelap / outline teks
                    float darkProtection = smoothstep(0.04, 0.16, max(max(color.r, color.g), color.b));
                    isGreen *= darkProtection;

                    float alpha = 1.0 - isGreen;

                    vec3 finalColor = color.rgb;

                    // Despill lembut di tepian teks agar tidak ada garis hijau tersisa
                    if (alpha > 0.05 && alpha < 0.95 && greenDominance > 0.05) {
                        float despillStrength = (1.0 - alpha) * 0.85;
                        finalColor.g = mix(finalColor.g, (finalColor.r + finalColor.b) * 0.5, despillStrength);
                    }

                    gl_FragColor = vec4(finalColor, alpha);
                }
            `,
            transparent: true,
            side: THREE.DoubleSide,
            depthWrite: false,
            blending: THREE.NormalBlending
        });
        this.material.map = videoTexture;
    },
    update: function(data) {
        if (data.src) {
            let el = data.src;
            if (typeof el === 'string') el = document.querySelector(el);
            if (el) {
                const videoTexture = new THREE.VideoTexture(el);
                videoTexture.minFilter = THREE.LinearFilter;
                videoTexture.magFilter = THREE.LinearFilter;
                videoTexture.format = THREE.RGBAFormat;
                videoTexture.generateMipmaps = false;
                videoTexture.wrapS = THREE.ClampToEdgeWrapping;
                videoTexture.wrapT = THREE.ClampToEdgeWrapping;
                if (this.material && this.material.uniforms && this.material.uniforms.tex) {
                    this.material.uniforms.tex.value = videoTexture;
                    this.material.map = videoTexture;
                    this.material.needsUpdate = true;
                }
            }
        }
    },
    tick: function() {
        if (this.material && this.material.uniforms && this.material.uniforms.tex && this.material.uniforms.tex.value) {
            const t = this.material.uniforms.tex.value;
            if (t.image && t.image.readyState >= 2 && !t.image.paused) {
                t.needsUpdate = true;
            }
        }
    }
});

// Alias chromakey-lavender
AFRAME.registerShader('chromakey-lavender', AFRAME.shaders['chromakey-score']);


