<template>
  <div :class="{ dark: theme === 'dark' }" class="relative">
    <div v-if="showIntro" ref="introScreen" class="fixed inset-0 z-[100] flex flex-col items-center justify-center intro-screen" :style="introScreenStyle">
      <div class="absolute inset-0 bg-cover bg-center bg-no-repeat" :style="{ backgroundImage: `url('${introBgImage}')` }"></div>
      <div class="absolute inset-0 bg-black/50 backdrop-blur-md"></div>
      <div class="intro-content relative z-10 flex flex-col items-center gap-6" :class="{ 'intro-content-hide': introExpanding }">
        <div class="intro-logo">
          <img src="https://fu1.fun/logo.png" alt="FufuLauncher" class="w-20 h-20 object-contain" />
        </div>
        <div class="intro-text text-center">
          <h1 class="text-2xl font-bold tracking-tight text-white/90 mb-2">FufuLauncher</h1>
          <p class="text-sm text-white/40 tracking-wide">{{ $t('intro.subtitle') }}</p>
        </div>

        <div class="intro-spinner mt-6">
          <svg class="w-6 h-6 animate-spin text-white/30" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" opacity="0.2"/>
            <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
      </div>
    </div>

    <div class="fixed inset-0 z-0">
      <video
        ref="videoEl"
        autoplay muted playsinline loop preload="metadata"
        class="w-full h-full object-cover transition-opacity duration-[2000ms]"
        :class="cinemaMode ? 'opacity-100' : (videoReady ? 'opacity-40 dark:opacity-30' : 'opacity-0')"
      >
        <source src="https://fastcdn.mihoyo.com/content-v2/hkrpg/160743/cb5f8aa92adc45ac2300a328a15453b1_4468579145965178971.mp4" type="video/mp4">
      </video>
      <div class="absolute inset-0 bg-gradient-to-b from-[var(--color-bg)]/30 via-[var(--color-bg)]/10 to-[var(--color-bg)]/60 transition-opacity duration-1000" :class="cinemaMode ? 'opacity-0' : 'opacity-100'"></div>
    </div>

    <div class="relative z-10 transition-opacity duration-1000" :class="cinemaMode ? 'opacity-0 pointer-events-none' : 'opacity-100'">
      <HeroSection />
      <main ref="mainEl" class="relative">
        <div ref="blurLayer" class="absolute inset-0 backdrop-blur-md z-[1]"></div>
        <div class="relative z-10">
          <div class="h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent"></div>
          <FeaturesSection />
          <StatsSection />
          <StorySection />
          <ContributorsSection />
          <SupportSection />
          <CommunitySection />
          <FooterSection />
        </div>
      </main>
    </div>

    <div class="relative z-50">
      <Navbar :cinema-mode="cinemaMode" @toggle-cinema="toggleCinema" />
    </div>

    <Transition name="fade-up">
      <button
        v-show="showBackTop && !cinemaMode"
        @click="scrollToTop"
        class="fixed bottom-8 right-8 z-50 w-11 h-11 rounded-full flex items-center justify-center bg-[var(--color-glass-bg)] backdrop-blur-xl border border-[var(--color-glass-border)] shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group"
        :aria-label="$t('backToTop')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-[var(--color-text)] transition-transform duration-300 group-hover:-translate-y-0.5"><polyline points="18 15 12 9 6 15"/></svg>
      </button>
    </Transition>

    <button
      @click="toggleCinema"
      class="fixed z-[60] px-3 py-1.5 rounded-full text-xs font-medium border border-[var(--color-glass-border)] bg-[var(--color-glass-bg)] backdrop-blur-md hover:opacity-80 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
      :class="cinemaMode ? 'bottom-8 right-8 opacity-100' : 'top-5 right-8 opacity-0 pointer-events-none'"
    >
      {{ $t('nav.exitCinema') }}
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useTheme } from './composables/useTheme'
import Navbar from './components/Navbar.vue'
import HeroSection from './components/HeroSection.vue'
import FeaturesSection from './components/FeaturesSection.vue'
import StatsSection from './components/StatsSection.vue'
import StorySection from './components/StorySection.vue'
import ContributorsSection from './components/ContributorsSection.vue'
import SupportSection from './components/SupportSection.vue'
import CommunitySection from './components/CommunitySection.vue'
import FooterSection from './components/FooterSection.vue'

const { theme } = useTheme()

const introBgImages = [
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&q=80',
  'https://images.unsplash.com/photo-1477346611705-65d1883cee1e?w=1920&q=80',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=80',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80',
  'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=1920&q=80',
  'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=1920&q=80',
]
const introBgImage = introBgImages[Math.floor(Math.random() * introBgImages.length)]

const videoEl = ref(null)
const videoReady = ref(false)
const mainEl = ref(null)
const blurLayer = ref(null)
const showBackTop = ref(false)
const showIntro = ref(true)
const introExpanding = ref(false)
const introScreen = ref(null)
const introScreenStyle = ref({})
const cinemaMode = ref(false)

function toggleCinema() {
  cinemaMode.value = !cinemaMode.value
  const v = videoEl.value
  if (!v) return
  if (cinemaMode.value) {
    v.muted = false
    let vol = 0
    v.volume = 0
    const fadeIn = setInterval(() => {
      vol = Math.min(vol + 0.05, 1)
      v.volume = vol
      if (vol >= 1) clearInterval(fadeIn)
    }, 50)
  } else {
    let vol = v.volume
    const fadeOut = setInterval(() => {
      vol = Math.max(vol - 0.05, 0)
      v.volume = vol
      if (vol <= 0) {
        clearInterval(fadeOut)
        v.muted = true
      }
    }, 50)
  }
}
function dismissIntro() {
  const cx = '50%'
  const cy = '50%'

  introExpanding.value = true

  setTimeout(() => {
    introScreenStyle.value = {
      clipPath: `circle(100% at ${cx} ${cy})`,
      transition: 'clip-path 1.2s cubic-bezier(0.65, 0, 0.35, 1)'
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        introScreenStyle.value = {
          clipPath: `circle(0% at ${cx} ${cy})`,
          transition: 'clip-path 1.2s cubic-bezier(0.65, 0, 0.35, 1)'
        }
      })
    })

    setTimeout(() => {
      showIntro.value = false
    }, 1300)
  }, 350)
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function onScrollBackTop() {
  showBackTop.value = window.scrollY > 400
}

function onPlay() { videoReady.value = true }
function onMeta() { if (videoEl.value) videoEl.value.currentTime = 14 }
function onTimeUpdate() {
  const v = videoEl.value
  if (!v) return
  if (v.currentTime >= v.duration - 7 || v.currentTime < 13) {
    v.currentTime = 14; v.play()
  }
}

let maskScheduled = false
let cachedCards = null
let lastMaskKey = ''
let lastMaskUpdateTime = 0
const MASK_THROTTLE_MS = 80

function collectCards() {
  if (!mainEl.value) return []
  if (!cachedCards) {
    cachedCards = Array.from(mainEl.value.querySelectorAll('[data-card-hole]'))
  }
  return cachedCards
}

function updateBlurMask() {
  if (!blurLayer.value || !mainEl.value) return
  const mainRect = mainEl.value.getBoundingClientRect()
  const cards = collectCards()

  if (cards.length === 0) {
    if (blurLayer.value.style.maskImage !== '') {
      blurLayer.value.style.maskImage = ''
      blurLayer.value.style.webkitMaskImage = ''
    }
    return
  }

  const w = mainRect.width
  const h = mainRect.height
  let rects = ''
  let signature = `${w}|${h}`
  cards.forEach(card => {
    const r = card.getBoundingClientRect()
    const x = r.left - mainRect.left
    const y = r.top - mainRect.top
    rects += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${r.width.toFixed(1)}" height="${r.height.toFixed(1)}" rx="24" fill="black"/>`
    signature += `|${x.toFixed(1)},${y.toFixed(1)},${r.width.toFixed(1)},${r.height.toFixed(1)}`
  })

  if (signature === lastMaskKey) return
  lastMaskKey = signature

  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'><rect width='${w}' height='${h}' fill='white'/>${rects}</svg>`
  const encoded = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`
  blurLayer.value.style.maskImage = encoded
  blurLayer.value.style.webkitMaskImage = encoded
}

function scheduleMaskUpdate() {
  if (maskScheduled) return
  const now = performance.now()
  const elapsed = now - lastMaskUpdateTime
  const delay = elapsed >= MASK_THROTTLE_MS ? 0 : MASK_THROTTLE_MS - elapsed
  maskScheduled = true
  setTimeout(() => {
    requestAnimationFrame(() => {
      maskScheduled = false
      lastMaskUpdateTime = performance.now()
      updateBlurMask()
    })
  }, delay)
}

onMounted(() => {
  setTimeout(() => {
    dismissIntro()
  }, 2200)

  const v = videoEl.value
  if (v) {
    v.addEventListener('loadedmetadata', onMeta)
    v.addEventListener('timeupdate', onTimeUpdate)
    v.addEventListener('play', onPlay)
    if (v.readyState >= 3) { videoReady.value = true; v.currentTime = 14 }
  }

  window.addEventListener('scroll', onScrollBackTop, { passive: true })
  window.addEventListener('scroll', scheduleMaskUpdate, { passive: true })
  window.addEventListener('resize', () => { cachedCards = null; lastMaskKey = ''; scheduleMaskUpdate() }, { passive: true })

  nextTick(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.05, rootMargin: '0px 0px -60px 0px' })
    document.querySelectorAll('[data-reveal], [data-reveal-left], [data-reveal-right], [data-reveal-scale]').forEach(el => observer.observe(el))

    updateBlurMask()
  })
})

onBeforeUnmount(() => {
  const v = videoEl.value
  if (v) {
    v.removeEventListener('loadedmetadata', onMeta)
    v.removeEventListener('timeupdate', onTimeUpdate)
    v.removeEventListener('play', onPlay)
  }
  window.removeEventListener('scroll', onScrollBackTop)
  window.removeEventListener('scroll', scheduleMaskUpdate)
  window.removeEventListener('resize', scheduleMaskUpdate)
})
</script>

<style>
[data-reveal] {
  opacity: 0;
  transform: translateY(40px) scale(0.98);
  transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
}

[data-reveal].revealed {
  opacity: 1;
  transform: translateY(0) scale(1);
}

[data-reveal].revealed > * > *:nth-child(1) { transition-delay: 0s; }
[data-reveal].revealed > * > *:nth-child(2) { transition-delay: 0.08s; }

[data-reveal-left] {
  opacity: 0;
  transform: translateX(-60px) translateY(20px);
  transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1);
}
[data-reveal-left].revealed {
  opacity: 1;
  transform: translateX(0) translateY(0);
}

[data-reveal-right] {
  opacity: 0;
  transform: translateX(60px) translateY(20px) rotate(1deg);
  transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1);
}
[data-reveal-right].revealed {
  opacity: 1;
  transform: translateX(0) translateY(0) rotate(0deg);
}

[data-reveal-scale] {
  opacity: 0;
  transform: scale(0.92) translateY(30px);
  transition: opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1), transform 1.1s cubic-bezier(0.16, 1, 0.3, 1);
}
[data-reveal-scale].revealed {
  opacity: 1;
  transform: scale(1) translateY(0);
}

[data-reveal="delay-1"] { transition-delay: 0.12s; }
[data-reveal="delay-2"] { transition-delay: 0.24s; }
[data-reveal="delay-3"] { transition-delay: 0.36s; }
[data-reveal="delay-4"] { transition-delay: 0.48s; }
[data-reveal="delay-5"] { transition-delay: 0.6s; }

.fade-up-enter-active,
.fade-up-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-up-enter-from,
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(12px);
}

.intro-screen {
  will-change: clip-path;
}

.intro-content-hide {
  opacity: 0;
  transform: scale(0.95);
  transition: opacity 0.35s ease, transform 0.35s ease;
}

.intro-logo {
  opacity: 0;
  transform: scale(0.8) translateY(10px);
  animation: introLogoIn 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
}

.intro-text {
  opacity: 0;
  transform: translateY(15px);
  animation: introFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.6s forwards;
}

.intro-spinner {
  opacity: 0;
  animation: introFadeUp 0.6s ease 1s forwards;
}

@keyframes introLogoIn {
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes introFadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
