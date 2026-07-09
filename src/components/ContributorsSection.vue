<template>
  <section id="contributors" class="py-20 overflow-hidden">
    <div class="max-w-6xl mx-auto px-6">
      <div data-reveal>
        <div class="flex items-center gap-3 mb-4">
          <div class="w-8 h-px bg-[var(--color-text-muted)]"></div>
          <span class="text-[11px] font-bold tracking-[0.15em] text-[var(--color-text-muted)] uppercase">Contributors</span>
        </div>
        <h2 class="text-2xl md:text-3xl font-bold tracking-tight mb-3">{{ $t('contributors.title') }}</h2>
        <p class="text-[var(--color-text-secondary)] text-sm mb-10">{{ $t('contributors.desc') }}</p>
      </div>

      <div
        ref="containerRef"
        class="relative min-h-[320px] md:min-h-[400px]"
        @mousemove="onMouseMove"
        @mouseleave="onMouseLeave"
      >
        <div
          v-for="(contributor, index) in contributors"
          :key="contributor.login"
          :ref="el => setItemRef(el, index)"
          class="contributor-item absolute"
          :style="{ left: positions[index]?.x + '%', top: positions[index]?.y + '%' }"
        >
          <a
            :href="contributor.url"
            target="_blank"
            rel="noopener"
            class="group flex flex-col items-center gap-1.5 p-3 transition-colors duration-300 cursor-pointer"
            @mouseenter="onItemEnter(index)"
            @mouseleave="onItemLeave(index)"
          >
            <img
              :src="contributor.avatar"
              :alt="contributor.login"
              class="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover ring-2 ring-transparent group-hover:ring-white/20 transition-all duration-300"
            />
            <span class="text-[10px] md:text-xs font-medium text-[var(--color-text-muted)] group-hover:text-[var(--color-text)] transition-colors duration-300 max-w-[70px] truncate text-center">
              {{ contributor.login }}
            </span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import gsap from 'gsap'

const contributors = ref([])
const containerRef = ref(null)
const itemRefs = ref([])
const positions = ref([])
const floatAnimations = ref([])

function setItemRef(el, index) {
  if (el) itemRefs.value[index] = el
}

function generatePositions(count) {
  const cols = Math.ceil(Math.sqrt(count * 1.5))
  const rows = Math.ceil(count / cols)
  const cellW = 100 / cols
  const cellH = 100 / rows
  const result = []

  for (let i = 0; i < count; i++) {
    const col = i % cols
    const row = Math.floor(i / cols)
    const x = col * cellW + (Math.random() * 0.5 + 0.15) * cellW
    const y = row * cellH + (Math.random() * 0.5 + 0.15) * cellH
    result.push({ x: Math.min(x, 88), y: Math.min(y, 85) })
  }
  return result
}

function startFloating() {
  itemRefs.value.forEach((el, i) => {
    if (!el) return
    const duration = 3 + Math.random() * 2
    const xRange = 8 + Math.random() * 12
    const yRange = 6 + Math.random() * 10
    const delay = Math.random() * 2

    const tl = gsap.timeline({ repeat: -1, yoyo: true, delay })
    tl.to(el, {
      x: `+=${xRange * (Math.random() > 0.5 ? 1 : -1)}`,
      y: `+=${yRange * (Math.random() > 0.5 ? 1 : -1)}`,
      rotation: (Math.random() - 0.5) * 6,
      duration,
      ease: 'sine.inOut',
    })

    floatAnimations.value.push(tl)
  })
}

function animateEntrance() {
  itemRefs.value.forEach((el, i) => {
    if (!el) return
    gsap.fromTo(el,
      { opacity: 0, scale: 0, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        delay: i * 0.05,
        ease: 'back.out(1.7)',
        onComplete: () => {
          if (i === itemRefs.value.length - 1) {
            startFloating()
          }
        }
      }
    )
  })
}

function onMouseMove(e) {
  if (!containerRef.value) return
  const rect = containerRef.value.getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width - 0.5
  const y = (e.clientY - rect.top) / rect.height - 0.5

  itemRefs.value.forEach((el, i) => {
    if (!el) return
    const depth = 0.5 + (i % 3) * 0.3
    gsap.to(el, {
      x: `+=${x * 15 * depth}`,
      y: `+=${y * 10 * depth}`,
      duration: 0.8,
      ease: 'power2.out',
      overwrite: 'auto',
    })
  })
}

function onMouseLeave() {
  itemRefs.value.forEach((el) => {
    if (!el) return
    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 1,
      ease: 'elastic.out(1, 0.5)',
      overwrite: 'auto',
    })
  })
}

function onItemEnter(index) {
  const el = itemRefs.value[index]
  if (!el) return
  if (floatAnimations.value[index]) floatAnimations.value[index].pause()
  gsap.to(el, {
    scale: 1.25,
    zIndex: 10,
    duration: 0.3,
    ease: 'back.out(2)',
  })
}

function onItemLeave(index) {
  const el = itemRefs.value[index]
  if (!el) return
  gsap.to(el, {
    scale: 1,
    zIndex: 0,
    duration: 0.4,
    ease: 'power2.out',
  })
  if (floatAnimations.value[index]) floatAnimations.value[index].resume()
}

onMounted(async () => {
  try {
    const [mainRes, subRes] = await Promise.all([
      fetch('https://api.github.com/repos/FufuLauncher/FufuLauncher/contributors?per_page=30'),
      fetch('https://api.github.com/repos/FufuLauncher/FufuLauncher.UnlockerIsland/contributors?per_page=30'),
    ])
    const mainData = mainRes.ok ? await mainRes.json() : []
    const subData = subRes.ok ? await subRes.json() : []
    const allData = [...(Array.isArray(mainData) ? mainData : []), ...(Array.isArray(subData) ? subData : [])]
    const seen = new Set()
    const unique = []
    for (const c of allData) {
      if (!seen.has(c.login)) {
        seen.add(c.login)
        unique.push({ login: c.login, avatar: c.avatar_url, url: c.html_url })
      }
    }
    contributors.value = unique
    positions.value = generatePositions(contributors.value.length)
    await nextTick()
    animateEntrance()
  } catch {
  }
})

onUnmounted(() => {
  floatAnimations.value.forEach(tl => tl.kill())
})
</script>

<style scoped>
.contributor-item {
  transform-origin: center center;
  will-change: transform, opacity;
}
</style>
