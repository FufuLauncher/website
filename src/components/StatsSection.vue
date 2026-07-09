<template>
  <section class="py-20">
    <div class="max-w-5xl mx-auto px-6">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16 text-center" data-reveal>
        <div ref="el0">
          <div class="text-3xl md:text-4xl font-bold tracking-tight mb-1">{{ displayValues.visitors }}</div>
          <div class="text-xs text-[var(--color-text-muted)] font-medium">{{ $t('stats.visitors') }}</div>
        </div>
        <div ref="el1">
          <div class="text-3xl md:text-4xl font-bold tracking-tight mb-1">{{ displayValues.stars }}</div>
          <div class="text-xs text-[var(--color-text-muted)] font-medium">{{ $t('stats.stars') }}</div>
        </div>
        <div ref="el2">
          <div class="text-3xl md:text-4xl font-bold tracking-tight mb-1">{{ displayValues.forks }}</div>
          <div class="text-xs text-[var(--color-text-muted)] font-medium">{{ $t('stats.forks') }}</div>
        </div>
        <div ref="el3">
          <div class="text-3xl md:text-4xl font-bold tracking-tight mb-1">{{ displayValues.contributors }}</div>
          <div class="text-xs text-[var(--color-text-muted)] font-medium">{{ $t('stats.contributors') }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { fetchAllStats } from '../composables/useStats'

const el0 = ref(null)
const el1 = ref(null)
const el2 = ref(null)
const el3 = ref(null)

const displayValues = reactive({
  visitors: '—',
  stars: '—',
  forks: '—',
  contributors: '—',
})

function easeOut(t) { return 1 - Math.pow(1 - t, 3) }

function animateValue(key, target, duration = 2000) {
  if (!target || target <= 0) { displayValues[key] = '—'; return }
  const start = performance.now()
  function update(now) {
    const progress = Math.min((now - start) / duration, 1)
    displayValues[key] = Math.round(target * easeOut(progress)).toLocaleString()
    if (progress < 1) requestAnimationFrame(update)
  }
  requestAnimationFrame(update)
}

onMounted(async () => {
  const stats = await fetchAllStats()

  const items = [
    { el: el0.value, key: 'visitors', value: stats.visitors, delay: 0 },
    { el: el1.value, key: 'stars', value: stats.stars, delay: 100 },
    { el: el2.value, key: 'forks', value: stats.forks, delay: 200 },
    { el: el3.value, key: 'contributors', value: stats.contributors, delay: 300 },
  ]

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const item = items.find(i => i.el === entry.target)
        if (item) {
          setTimeout(() => animateValue(item.key, item.value), item.delay)
        }
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.3 })

  items.forEach(({ el }) => { if (el) observer.observe(el) })
})
</script>
