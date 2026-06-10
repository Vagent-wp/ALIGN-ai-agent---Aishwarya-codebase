import { useEffect, useRef, type ReactNode } from 'react';
import * as THREE from 'three';
import { cn } from '@/lib/utils';

// --- TYPE DEFINITIONS ---
export interface NavLink {
  label: string;
  href: string;
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  imageContent?: ReactNode;
}

export interface Stat {
  value: string;
  label: string;
}

export interface PortfolioPageProps {
  logo?: { initials: ReactNode; name: ReactNode };
  navLinks?: NavLink[];
  resume?: { label: string; onClick?: () => void };
  hero?: {
    titleLine1: ReactNode;
    titleLine2Gradient: ReactNode;
    subtitle: ReactNode;
  };
  ctaButtons?: {
    primary: { label: string; onClick?: () => void };
    secondary: { label: string; onClick?: () => void };
  };
  projects?: Project[];
  stats?: Stat[];
  showAnimatedBackground?: boolean;
  className?: string;
}

export interface SketchStarfallBackgroundProps {
  className?: string;
  /** When true, sizes to parent container (hero). When false, covers viewport. */
  contained?: boolean;
  opacity?: number;
  /** `hero` = vivid aurora on light graph paper; `subtle` = softer blend for full-page layouts */
  variant?: 'hero' | 'subtle';
}

/** Aurora shader — rich cobalt / lime / violet wisps, tuned for light sketch canvas */
const SKETCH_FRAGMENT_SHADER = `
uniform float iTime;
uniform vec2 iResolution;
uniform float uBoost;
uniform float uAlpha;
#define NUM_OCTAVES 3

float rand(vec2 n) { return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453); }
float noise(vec2 p){
  vec2 ip=floor(p); vec2 u=fract(p);
  u=u*u*(3.0-2.0*u);
  float res=mix(mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
                mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
  return res*res;
}
float fbm(vec2 x) {
  float v=0.0; float a=0.3; vec2 shift=vec2(100.0);
  mat2 rot=mat2(cos(0.5),sin(0.5),-sin(0.5),cos(0.50));
  for(int i=0;i<NUM_OCTAVES;++i){ v+=a*noise(x); x=rot*x*2.0+shift; a*=0.4; }
  return v;
}

void main() {
  vec2 p=((gl_FragCoord.xy)-iResolution.xy*0.5)/iResolution.y*mat2(6.0,-4.0,4.0,6.0);
  vec4 o=vec4(0.0);
  float f=2.0+fbm(p+vec2(iTime*5.0,0.0))*0.5;

  for(float i=0.0;i<35.0;i++){
    vec2 v=p+cos(i*i+(iTime+p.x*0.08)*0.025+i*vec2(13.0,11.0))*3.5;
    float tailNoise=fbm(v+vec2(iTime*0.5,i))*0.3*(1.0-(i/35.0));
    vec4 auroraColors=vec4(
      0.12+0.35*sin(i*0.2+iTime*0.4),
      0.38+0.55*cos(i*0.28+iTime*0.48),
      0.78+0.35*sin(i*0.36+iTime*0.32),
      1.0
    );
    vec4 currentContribution=auroraColors*exp(sin(i*i+iTime*0.8))/length(max(v,vec2(v.x*f*0.014,v.y*1.45)));
    float thinnessFactor=smoothstep(0.0,1.0,i/35.0)*0.68;
    o+=currentContribution*(1.0+tailNoise*0.75)*thinnessFactor;
  }

  o=tanh(pow(o/95.0,vec4(1.55)));
  vec3 sketchBlue=vec3(0.05,0.46,0.98);
  vec3 sketchLime=vec3(0.86,0.96,0.56);
  vec3 sketchViolet=vec3(0.55,0.42,0.98);
  vec3 sketchPeach=vec3(0.98,0.55,0.28);
  float intensity=clamp(length(o.rgb)*1.85,0.0,1.0);
  vec3 vivid=mix(o.rgb,sketchBlue,0.35);
  vivid=mix(vivid,sketchLime,0.25+0.25*sin(iTime*0.3+p.y));
  vivid=mix(vivid,sketchViolet,0.12+0.08*sin(iTime*0.22));
  vivid=mix(vivid,sketchPeach,o.r*0.18);
  gl_FragColor=vec4(vivid*intensity*uBoost,intensity*uAlpha);
}
`;

/** Hero — flowing pastel aurora. Ribbon intensity mask × light blue/yellow/orange only (no black crush). */
const HERO_FRAGMENT_SHADER = `
uniform float iTime;
uniform vec2 iResolution;
uniform float uBoost;
uniform float uAlpha;
#define NUM_OCTAVES 3

float rand(vec2 n) { return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453); }
float noise(vec2 p){
  vec2 ip=floor(p); vec2 u=fract(p);
  u=u*u*(3.0-2.0*u);
  float res=mix(mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
                mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
  return res*res;
}
float fbm(vec2 x) {
  float v=0.0; float a=0.3; vec2 shift=vec2(100.0);
  mat2 rot=mat2(cos(0.5),sin(0.5),-sin(0.5),cos(0.50));
  for(int i=0;i<NUM_OCTAVES;++i){ v+=a*noise(x); x=rot*x*2.0+shift; a*=0.4; }
  return v;
}

void main() {
  vec2 p=((gl_FragCoord.xy)-iResolution.xy*0.5)/iResolution.y*mat2(5.5,-3.5,3.5,5.5);
  vec3 softBlue   = vec3(0.72, 0.88, 1.00);
  vec3 softYellow = vec3(1.00, 0.96, 0.78);
  vec3 softOrange = vec3(1.00, 0.86, 0.68);

  float mask = 0.0;
  float f = 2.0 + fbm(p + vec2(iTime * 4.0, 0.0)) * 0.45;

  for(float i=0.0; i<30.0; i++){
    vec2 v = p + cos(i*i + (iTime + p.x*0.07)*0.024 + i*vec2(12.0,10.0)) * 3.2;
    float tail = fbm(v + vec2(iTime*0.45, i)) * 0.22 * (1.0 - i/30.0);
    float beam = exp(sin(i*i + iTime*0.75)) / (1.0 + length(v) * (1.1 + v.x*f*0.012));
    float thin = smoothstep(0.0, 1.0, i/30.0) * 0.62;
    mask += beam * (1.0 + tail) * thin;
  }

  mask = mask / 75.0;
  mask = mask / (mask + 0.55);
  float intensity = clamp(mask * 1.35, 0.0, 1.0);

  vec3 tint = mix(softBlue, softYellow, 0.5 + 0.5*sin(iTime*0.28 + p.y*0.8));
  tint = mix(tint, softOrange, 0.38 + 0.22*sin(iTime*0.22 + p.x*0.6));
  vec3 color = tint * intensity;

  float alpha = intensity * 0.62;
  gl_FragColor = vec4(color * uBoost, alpha * uAlpha);
}
`;

const SKETCH_VERTEX_SHADER = `void main() { gl_Position = vec4(position, 1.0); }`;

export function SketchStarfallBackground({
  className,
  contained = true,
  opacity = 1,
  variant = 'subtle',
}: SketchStarfallBackgroundProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const isHero = variant === 'hero';
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const renderScale = isHero
      ? isMobile
        ? 0.75
        : 0.92
      : contained
        ? isMobile
          ? 0.55
          : 0.72
        : 0.85;
    const maxDpr = isMobile ? 1.25 : isHero ? 1.75 : 1.35;
    const targetFps = isMobile ? 24 : isHero ? 36 : 30;
    const frameInterval = 1000 / targetFps;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: isMobile ? 'low-power' : 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, maxDpr));

    const material = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector2(1, 1) },
        uBoost: { value: isHero ? 1.28 : 1.0 },
        uAlpha: { value: isHero ? 0.88 : 0.52 },
      },
      vertexShader: SKETCH_VERTEX_SHADER,
      fragmentShader: isHero ? HERO_FRAGMENT_SHADER : SKETCH_FRAGMENT_SHADER,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const canvas = renderer.domElement;
    canvas.className = cn('pointer-events-none block', contained ? 'absolute inset-0 h-full w-full' : 'fixed inset-0');
    canvas.style.zIndex = '0';
    mount.appendChild(canvas);

    const setSize = (width: number, height: number) => {
      if (width <= 0 || height <= 0) return;
      const rw = Math.max(1, Math.floor(width * renderScale));
      const rh = Math.max(1, Math.floor(height * renderScale));
      renderer.setSize(rw, rh, false);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      material.uniforms.iResolution.value.set(rw, rh);
    };

    let animationFrameId = 0;
    let resizeObserver: ResizeObserver | undefined;
    let onWindowResize: (() => void) | undefined;
    let isVisible = true;
    let isTabActive = !document.hidden;
    let lastFrame = 0;

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry?.isIntersecting ?? true;
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(mount);

    const onVisibilityChange = () => {
      isTabActive = !document.hidden;
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    if (contained) {
      setSize(mount.clientWidth, mount.clientHeight);
      resizeObserver = new ResizeObserver((entries) => {
        const entry = entries[0];
        if (!entry) return;
        setSize(entry.contentRect.width, entry.contentRect.height);
      });
      resizeObserver.observe(mount);
    } else {
      onWindowResize = () => setSize(window.innerWidth, window.innerHeight);
      onWindowResize();
      window.addEventListener('resize', onWindowResize);
    }

    const animate = (timestamp: number) => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible || !isTabActive) return;
      if (timestamp - lastFrame < frameInterval) return;
      lastFrame = timestamp;

      material.uniforms.iTime.value += 0.016;
      renderer.render(scene, camera);
    };
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      resizeObserver?.disconnect();
      if (onWindowResize) window.removeEventListener('resize', onWindowResize);
      if (mount.contains(canvas)) mount.removeChild(canvas);
      renderer.dispose();
      material.dispose();
      geometry.dispose();
    };
  }, [contained, variant]);

  return (
    <div
      ref={mountRef}
      aria-hidden
      className={cn(
        'inv-starfall-bg pointer-events-none overflow-hidden',
        variant === 'hero' && 'inv-starfall-bg--hero',
        className
      )}
      style={{ opacity }}
    />
  );
}

const defaultData = {
  logo: { initials: 'MT', name: 'Meng To' },
  navLinks: [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
  ],
  resume: { label: 'Resume' },
  hero: {
    titleLine1: 'Creative Developer &',
    titleLine2Gradient: 'Digital Designer',
    subtitle:
      'I craft beautiful digital experiences through code and design. Specializing in modern web development, UI/UX design, and bringing innovative ideas to life.',
  },
  ctaButtons: {
    primary: { label: 'View My Work' },
    secondary: { label: 'Get In Touch' },
  },
  projects: [
    {
      title: 'FinTech Mobile App',
      description: 'React Native app with AI-powered financial insights.',
      tags: ['React Native', 'Node.js'],
    },
    {
      title: 'Data Visualization Platform',
      description: 'Interactive dashboard for complex data analysis.',
      tags: ['D3.js', 'Python'],
    },
    {
      title: '3D Portfolio Site',
      description: 'Immersive WebGL experience with 3D elements.',
      tags: ['Three.js', 'WebGL'],
    },
  ],
  stats: [
    { value: '50+', label: 'Projects Completed' },
    { value: '5+', label: 'Years Experience' },
    { value: '15+', label: 'Happy Clients' },
  ],
};

/** Full portfolio layout — optional; uses sketch-compatible inv-* styling when className includes marketing-invisible */
export function PortfolioPage({
  logo = defaultData.logo,
  navLinks = defaultData.navLinks,
  resume = defaultData.resume,
  hero = defaultData.hero,
  ctaButtons = defaultData.ctaButtons,
  projects = defaultData.projects,
  stats = defaultData.stats,
  showAnimatedBackground = true,
  className,
}: PortfolioPageProps) {
  return (
    <div className={cn('relative bg-background text-foreground', className)}>
      {showAnimatedBackground && <SketchStarfallBackground contained={false} className="inset-0" />}
      <div className="relative z-[1]">
        <nav className="w-full px-6 py-4">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="inv-card flex h-8 w-8 items-center justify-center !p-0">
                <span className="font-mono text-sm font-bold">{logo.initials}</span>
              </div>
              <span className="inv-heading !text-lg">{logo.name}</span>
            </div>
            <div className="hidden items-center space-x-8 md:flex">
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} className="inv-link text-sm">
                  {link.label}
                </a>
              ))}
            </div>
            <button type="button" onClick={resume.onClick} className="inv-btn-ghost text-sm">
              {resume.label}
            </button>
          </div>
        </nav>
        <div className="inv-starfall-divider mx-6" />
        <main id="about" className="flex min-h-screen w-full flex-col items-center justify-center px-6 py-20">
          <div className="mx-auto max-w-6xl text-center">
            <div className="inv-starfall-float mb-8">
              <h1 className="inv-heading-lg mb-4">
                {hero.titleLine1}
                <span className="inv-accent-blue block">{hero.titleLine2Gradient}</span>
              </h1>
              <p className="inv-body mx-auto max-w-3xl">{hero.subtitle}</p>
            </div>
            <div className="mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button type="button" onClick={ctaButtons.primary.onClick} className="inv-btn-black min-w-[160px]">
                {ctaButtons.primary.label}
              </button>
              <button type="button" onClick={ctaButtons.secondary.onClick} className="inv-btn-ghost min-w-[160px]">
                {ctaButtons.secondary.label}
              </button>
            </div>
            <div className="inv-starfall-divider mb-16" />
            <div id="projects" className="mx-auto mb-16 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => (
                <div key={index} className="inv-card p-6 text-left">
                  <div className="inv-mock-stage inv-mock-stage--sky mb-4 flex h-32 items-center justify-center overflow-hidden !min-h-0 rounded-xl p-0">
                    {project.imageContent ?? (
                      <div className="h-full w-full bg-gradient-to-br from-[var(--color-align-sky)] to-[var(--color-ice-blue)]" />
                    )}
                  </div>
                  <h3 className="inv-heading mb-2 !text-lg">{project.title}</h3>
                  <p className="inv-body-sm mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="inv-pill-badge">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="inv-starfall-divider mb-16" />
            <div id="skills" className="flex flex-col items-center justify-center gap-8 text-center sm:flex-row">
              {stats.map((stat, index) => (
                <div key={stat.label} className="flex items-center gap-8">
                  <div>
                    <div className="inv-heading mb-1 !text-3xl tabular-nums md:!text-4xl">{stat.value}</div>
                    <div className="inv-body-sm">{stat.label}</div>
                  </div>
                  {index < stats.length - 1 && (
                    <div className="hidden h-12 w-px bg-gradient-to-b from-transparent via-[var(--color-ash)] to-transparent sm:block" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
