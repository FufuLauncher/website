<template>
  <div
    ref="carouselRef"
    class="carousel"
    @mouseenter="pause"
    @mouseleave="resume"
  >
    <div
      class="carousel-stage"
      @touchstart.passive="onTouchStart"
      @touchend.passive="onTouchEnd"
    >
      <div class="carousel-track">
        <div
          v-for="(slide, i) in slides"
          :key="i"
          class="carousel-item"
          :class="{ 'is-active': i === active, 'is-side': getPos(i) === '1' || getPos(i) === '-1', 'is-out': getPos(i) === 'out' }"
          :data-pos="getPos(i)"
          @click="onItemClick(i)"
        >
          <img
            :src="slide.src"
            :alt="slide.title"
            draggable="false"
            loading="eager"
            decoding="async"
            :style="{ visibility: imagesReady[i] ? 'visible' : 'hidden' }"
          />
          <div v-if="!imagesReady[i]" class="carousel-item-placeholder"></div>
        </div>
      </div>

      <button class="carousel-arrow carousel-arrow-prev" @click="throttledPrev" :aria-label="$t('features.preview.prev')">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <button class="carousel-arrow carousel-arrow-next" @click="throttledNext" :aria-label="$t('features.preview.next')">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    </div>

    <div class="carousel-info">
      <div class="carousel-title">{{ current.title }}</div>
      <div class="carousel-progress">{{ active + 1 }} / {{ slides.length }}</div>
    </div>

    <div class="carousel-dots">
      <button
        v-for="(slide, i) in slides"
        :key="i"
        class="carousel-dot"
        :class="{ on: i === active }"
        @click="throttledGoTo(i)"
        :aria-label="$t('features.preview.goto', { n: i + 1 })"
      ></button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const slides = computed(() => [
  { src: 'https://github.com/user-attachments/assets/1cdfa755-e088-4735-8c45-4c0151e8ca03', title: t('features.preview.slide1') },
  { src: 'https://github.com/user-attachments/assets/988a2716-dc03-4eec-add8-b305e7d97e3d', title: t('features.preview.slide2') },
  { src: 'https://github.com/user-attachments/assets/e50e50ec-6245-497a-a59d-b31f9c0eb8e3', title: t('features.preview.slide3') },
  { src: 'https://github.com/user-attachments/assets/de613a76-8aee-4d0f-bd7e-53d3c95580cc', title: t('features.preview.slide4') },
  { src: 'https://github.com/user-attachments/assets/d2acb506-df07-414b-8294-8d686e8305c6', title: t('features.preview.slide5') },
])

const active = ref(0)
const n = computed(() => slides.value.length)
const current = computed(() => slides.value[active.value])

const imagesReady = reactive(slides.value.map(() => false))

function preloadAll() {
  slides.value.forEach((slide, i) => {
    const img = new Image()
    img.decoding = 'async'
    img.onload = () => {
      if (img.decode) {
        img.decode().then(() => { imagesReady[i] = true }).catch(() => { imagesReady[i] = true })
      } else {
        imagesReady[i] = true
      }
    }
    img.onerror = () => { imagesReady[i] = true }
    img.src = slide.src
  })
}

function getPos(i) {
  const total = n.value
  let diff = i - active.value
  if (diff > total / 2) diff -= total
  if (diff < -total / 2) diff += total
  if (diff === 0) return '0'
  if (diff === 1) return '1'
  if (diff === -1) return '-1'
  return 'out'
}

const SWITCH_COOLDOWN = 380
let lastSwitchTime = 0

function canSwitch() {
  const now = performance.now()
  if (now - lastSwitchTime < SWITCH_COOLDOWN) return false
  lastSwitchTime = now
  return true
}

function next() { if (canSwitch()) active.value = (active.value + 1) % n.value }
function prev() { if (canSwitch()) active.value = (active.value - 1 + n.value) % n.value }
function goTo(i) { if (canSwitch()) active.value = i }

function throttledNext() { next() }
function throttledPrev() { prev() }
function throttledGoTo(i) { goTo(i) }

function onItemClick(i) {
  const p = getPos(i)
  if (p === '1') next()
  else if (p === '-1') prev()
  else if (p === 'out') goTo(i)
}

let touchStartX = 0
function onTouchStart(e) {
  touchStartX = e.touches[0].clientX
  pause()
}
function onTouchEnd(e) {
  const dx = e.changedTouches[0].clientX - touchStartX
  if (Math.abs(dx) > 40) {
    dx < 0 ? next() : prev()
  }
  resume()
}

const carouselRef = ref(null)
let timer = null
let visibilityObserver = null
let isOnscreen = true

function start() {
  if (timer || !isOnscreen) return
  timer = setInterval(next, 4500)
}
function pause() {
  if (timer) { clearInterval(timer); timer = null }
}
function resume() { start() }

onMounted(() => {
  preloadAll()

  if (carouselRef.value && 'IntersectionObserver' in window) {
    visibilityObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isOnscreen = entry.isIntersecting
        if (isOnscreen) start()
        else pause()
      })
    }, { threshold: 0.2 })
    visibilityObserver.observe(carouselRef.value)
  }

  start()
})
onBeforeUnmount(() => {
  pause()
  if (visibilityObserver) { visibilityObserver.disconnect(); visibilityObserver = null }
})
</script>

<style scoped>
.carousel {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  user-select: none;
}

.carousel-stage {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
}

.carousel-track {
  position: absolute;
  inset: 0;
}

.carousel-item {
  position: absolute;
  inset: 0;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(135deg, rgba(40, 44, 52, 0.6), rgba(20, 22, 28, 0.7));
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1),
              opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.carousel-item.is-active {
  will-change: transform, opacity;
}

.carousel-item-placeholder {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(40, 44, 52, 0.9), rgba(20, 22, 28, 0.95));
}

.carousel-item img {
  width: calc(100% + 2px);
  height: 100%;
  margin-left: -1px;
  object-fit: cover;
  display: block;
  pointer-events: none;
  image-rendering: auto;
}

.carousel-item[data-pos="0"] {
  opacity: 1;
  transform: translateX(0) scale(1);
  z-index: 3;
  cursor: default;
}
.carousel-item[data-pos="1"] {
  opacity: 1;
  transform: translateX(46%) scale(0.78);
  z-index: 2;
}
.carousel-item[data-pos="-1"] {
  opacity: 1;
  transform: translateX(-46%) scale(0.78);
  z-index: 2;
}
.carousel-item[data-pos="out"] {
  opacity: 0;
  transform: translateX(0) scale(0.55);
  z-index: 1;
  pointer-events: none;
  box-shadow: none;
}

.carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #fff;
  cursor: pointer;
  z-index: 10;
  transition: background 0.3s ease, transform 0.3s ease, opacity 0.3s ease;
}
.carousel-arrow:hover {
  background: rgba(0, 0, 0, 0.65);
  transform: translateY(-50%) scale(1.08);
}
.carousel-arrow-prev { left: 12px; }
.carousel-arrow-next { right: 12px; }

.carousel-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 22px;
  padding: 0 6px;
}
.carousel-title {
  font-size: 14px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.92);
  letter-spacing: 0.01em;
}
.carousel-progress {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.4);
  font-variant-numeric: tabular-nums;
}

.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 14px;
}
.carousel-dot {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  cursor: pointer;
  padding: 0;
  transition: width 0.45s cubic-bezier(0.16, 1, 0.3, 1),
              background 0.3s ease;
}
.carousel-dot.on {
  width: 24px;
  background: rgba(255, 255, 255, 0.9);
}

@media (max-width: 640px) {
  .carousel-item[data-pos="1"] {
    transform: translateX(38%) scale(0.72);
    opacity: 0.35;
  }
  .carousel-item[data-pos="-1"] {
    transform: translateX(-38%) scale(0.72);
    opacity: 0.35;
  }
  .carousel-arrow { width: 34px; height: 34px; }
}

@media (prefers-reduced-motion: reduce) {
  .carousel-item {
    transition: opacity 0.3s ease;
  }
}
</style>
