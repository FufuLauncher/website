<template>
  <section class="relative min-h-screen flex flex-col justify-center overflow-hidden">
    <div class="hero-decorations">
      <div class="deco-orb deco-orb-1"></div>
      <div class="deco-orb deco-orb-2"></div>
      <div class="deco-orb deco-orb-3"></div>
      <div class="deco-grid"></div>
      <div class="deco-ring deco-ring-1"></div>
      <div class="deco-ring deco-ring-2"></div>
    </div>

    <div class="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-16 w-full">
      <div class="max-w-2xl mb-16">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6 hero-title" v-html="$t('hero.title', { br: '<br>' })">
        </h1>

        <p class="text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed mb-10 max-w-lg hero-desc">
          {{ $t('hero.desc') }}
        </p>

        <div class="flex flex-wrap items-center gap-4 hero-buttons">
          <a href="https://github.com/FufuLauncher/FufuLauncher/releases" target="_blank" rel="noopener"
            class="group inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-semibold text-sm bg-[var(--color-text)] text-[var(--color-bg)] hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-white/5 transition-all duration-500 hover:-translate-y-0.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform duration-300 group-hover:translate-y-0.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            {{ $t('hero.download') }}
          </a>
          <a href="https://fu1.fun/docs" target="_blank" rel="noopener"
            class="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-semibold text-sm border border-[var(--color-border)] hover:border-[var(--color-text-muted)] bg-[var(--color-glass-bg)] backdrop-blur-md transition-all duration-500 hover:-translate-y-0.5">
            {{ $t('hero.viewDocs') }}
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
          </a>
        </div>
      </div>

      <div class="hero-preview">
        <div ref="previewContainer" class="preview-window">
          <iframe
            :data-src="iframeSrc"
            :src="iframeLoaded ? iframeSrc : ''"
            class="preview-iframe border-none"
            :style="{ transform: `scale(${iframeScale})` }"
            loading="lazy"
            title="FufuLauncher UI Preview"
          ></iframe>
        </div>
      </div>
    </div>

    <div class="relative z-10 pb-8 flex justify-center hero-scroll">
      <div class="flex flex-col items-center gap-2 text-[var(--color-text-muted)]">
        <div class="w-px h-8 bg-gradient-to-b from-transparent to-current opacity-40"></div>
        <span class="text-[10px] tracking-widest uppercase">Scroll</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const previewContainer = ref(null)
const iframeScale = ref(1)
const iframeSrc = '/launcher-preview.html'
const iframeLoaded = ref(false)

function updateScale() {
  if (previewContainer.value) {
    iframeScale.value = previewContainer.value.clientWidth / 1360
  }
}

let ro = null
let lazyObserver = null
onMounted(() => {
  updateScale()
  ro = new ResizeObserver(updateScale)
  if (previewContainer.value) ro.observe(previewContainer.value)

  if (previewContainer.value && 'IntersectionObserver' in window) {
    lazyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          iframeLoaded.value = true
          lazyObserver.disconnect()
          lazyObserver = null
        }
      })
    }, { rootMargin: '200px 0px' })
    lazyObserver.observe(previewContainer.value)
  } else {
    iframeLoaded.value = true
  }
})
onBeforeUnmount(() => {
  if (ro) ro.disconnect()
  if (lazyObserver) lazyObserver.disconnect()
})
</script>

<style>
.hero-decorations {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  overflow: hidden;
}

.deco-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0;
  animation: decoFadeIn 2s ease 0.5s forwards;
}

.deco-orb-1 {
  width: 500px;
  height: 500px;
  top: -10%;
  right: -5%;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.15), transparent 70%);
}

.deco-orb-2 {
  width: 400px;
  height: 400px;
  bottom: 10%;
  left: -8%;
  background: radial-gradient(circle, rgba(168, 85, 247, 0.12), transparent 70%);
  animation-delay: 0.8s;
}

.deco-orb-3 {
  width: 300px;
  height: 300px;
  top: 40%;
  right: 20%;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.1), transparent 70%);
  animation-delay: 1.2s;
}

:root .deco-orb-1 {
  background: radial-gradient(circle, rgba(99, 102, 241, 0.08), transparent 70%);
}
:root .deco-orb-2 {
  background: radial-gradient(circle, rgba(168, 85, 247, 0.06), transparent 70%);
}
:root .deco-orb-3 {
  background: radial-gradient(circle, rgba(59, 130, 246, 0.06), transparent 70%);
}
.dark .deco-orb-1 {
  background: radial-gradient(circle, rgba(99, 102, 241, 0.15), transparent 70%);
}
.dark .deco-orb-2 {
  background: radial-gradient(circle, rgba(168, 85, 247, 0.12), transparent 70%);
}
.dark .deco-orb-3 {
  background: radial-gradient(circle, rgba(59, 130, 246, 0.1), transparent 70%);
}

.deco-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(0, 0, 0, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 0, 0, 0.02) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse 60% 50% at 50% 50%, black, transparent);
  -webkit-mask-image: radial-gradient(ellipse 60% 50% at 50% 50%, black, transparent);
}

.dark .deco-grid {
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
}

.deco-ring {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.04);
  opacity: 0;
  animation: decoFadeIn 2s ease 1.5s forwards;
}

.dark .deco-ring {
  border-color: rgba(255, 255, 255, 0.04);
}

.deco-ring-1 {
  width: 600px;
  height: 600px;
  top: -15%;
  left: -10%;
  animation: decoRingSpin 40s linear infinite;
  animation-delay: 1.5s;
  will-change: transform;
}

.deco-ring-2 {
  width: 400px;
  height: 400px;
  bottom: -5%;
  right: -5%;
  animation: decoRingSpin 30s linear infinite reverse;
  animation-delay: 2s;
  will-change: transform;
}

@keyframes decoFadeIn {
  to { opacity: 1; }
}

@keyframes decoRingSpin {
  from { transform: rotate(0deg); opacity: 1; }
  to { transform: rotate(360deg); opacity: 1; }
}

/* Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  .deco-ring-1,
  .deco-ring-2,
  .preview-window::after {
    animation: none;
  }
}

.hero-title {
  opacity: 0;
  transform: translateY(30px);
  animation: heroTitleIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
}

.hero-desc {
  opacity: 0;
  transform: translateY(20px);
  animation: heroFadeBlur 1s cubic-bezier(0.16, 1, 0.3, 1) 0.7s forwards;
}

.hero-buttons {
  opacity: 0;
  transform: translateY(16px) scale(0.96);
  animation: heroButtonsIn 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) 1s forwards;
}

.hero-preview {
  opacity: 0;
  transform: translateY(60px) perspective(1200px) rotateX(4deg) scale(0.95);
  animation: heroPreviewIn 1.4s cubic-bezier(0.16, 1, 0.3, 1) 1.2s forwards;
}

.hero-scroll {
  opacity: 0;
  animation: heroScrollIn 1s ease 2.2s forwards;
}

@keyframes heroTitleIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes heroFadeBlur {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes heroButtonsIn {
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes heroPreviewIn {
  to {
    opacity: 1;
    transform: translateY(0) perspective(1200px) rotateX(0deg) scale(1);
  }
}

@keyframes heroScrollIn {
  to { opacity: 1; }
}

.preview-window {
  width: 100%;
  aspect-ratio: 1360 / 768;
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01));
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.05),
    0 20px 60px -10px rgba(0, 0, 0, 0.5),
    0 0 40px rgba(99, 102, 241, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transition: box-shadow 0.6s ease, border-color 0.4s ease;
}

.preview-window::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: 21px;
  padding: 1px;
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.3),
    rgba(168, 85, 247, 0.15),
    transparent 50%,
    rgba(59, 130, 246, 0.15),
    rgba(99, 102, 241, 0.2)
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
  opacity: 0.6;
  transition: opacity 0.4s ease;
}

.preview-window:hover::before {
  opacity: 1;
}

.preview-window::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: conic-gradient(
    from 0deg,
    transparent 0%,
    rgba(99, 102, 241, 0.03) 10%,
    transparent 20%
  );
  animation: previewShimmer 20s linear infinite;
  pointer-events: none;
  z-index: 1;
  will-change: transform;
}

@keyframes previewShimmer {
  to { transform: rotate(360deg); }
}

:root .preview-window {
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(245, 245, 247, 0.6));
  box-shadow:
    0 0 0 1px rgba(0, 0, 0, 0.03),
    0 20px 60px -10px rgba(0, 0, 0, 0.12),
    0 0 40px rgba(99, 102, 241, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
}

:root .preview-window::before {
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.2),
    rgba(168, 85, 247, 0.1),
    transparent 50%,
    rgba(59, 130, 246, 0.1),
    rgba(99, 102, 241, 0.15)
  );
  opacity: 0.4;
}

:root .preview-window::after {
  background: conic-gradient(
    from 0deg,
    transparent 0%,
    rgba(99, 102, 241, 0.02) 10%,
    transparent 20%
  );
}

.dark .preview-window {
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01));
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.05),
    0 20px 60px -10px rgba(0, 0, 0, 0.5),
    0 0 40px rgba(99, 102, 241, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.preview-iframe {
  width: 1360px;
  height: 768px;
  transform-origin: top left;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
}
</style>
