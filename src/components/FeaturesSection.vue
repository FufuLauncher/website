<template>
  <section id="features" class="relative features-section">
    <div class="max-w-6xl mx-auto px-6 pt-32 pb-16">
      <div data-reveal>
        <div class="flex items-center gap-3 mb-4">
          <div class="w-8 h-px bg-[var(--color-text-muted)]"></div>
          <span class="text-[11px] font-bold tracking-[0.15em] text-[var(--color-text-muted)] uppercase">Features</span>
        </div>
        <h2 class="text-3xl md:text-4xl font-bold tracking-tight mb-4">{{ $t('features.title') }}</h2>
        <p class="text-[var(--color-text-secondary)] max-w-lg">{{ $t('features.desc') }}</p>
      </div>
    </div>

    <div class="feature-block feature-block-1">
      <div class="max-w-6xl mx-auto px-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div class="feature-desc-card max-w-md relative rounded-2xl bg-black/30 backdrop-blur-sm p-6" data-reveal-left>
            <div class="text-[10px] font-bold tracking-[0.2em] text-[var(--color-text-muted)] uppercase mb-4">Account</div>
            <h3 class="text-2xl md:text-3xl font-bold mb-4 tracking-tight">{{ $t('features.account.title') }}</h3>
            <p class="text-[var(--color-text-secondary)] leading-relaxed mb-8">{{ $t('features.account.desc') }}</p>
            <div class="space-y-3 text-sm text-[var(--color-text-secondary)]">
              <div class="flex items-center gap-3"><div class="w-1 h-1 rounded-full bg-[var(--color-text-muted)]"></div>{{ $t('features.account.item1') }}</div>
              <div class="flex items-center gap-3"><div class="w-1 h-1 rounded-full bg-[var(--color-text-muted)]"></div>{{ $t('features.account.item2') }}</div>
              <div class="flex items-center gap-3"><div class="w-1 h-1 rounded-full bg-[var(--color-text-muted)]"></div>{{ $t('features.account.item3') }}</div>
            </div>
          </div>
          <SpotlightCard data-card-hole data-reveal-right class-name="border-transparent bg-black/30 backdrop-blur-sm" spotlight-color="rgba(255, 255, 255, 0.04)">
            <div class="flex items-center justify-between mb-4">
              <span class="text-[11px] font-semibold text-white/50 uppercase tracking-wider">{{ $t('features.account.current') }}</span>
              <button class="text-[10px] px-2 py-1 rounded-md bg-white/[0.06] text-white/60 cursor-pointer hover:bg-white/[0.1] transition-colors">{{ $t('features.account.switch') }}</button>
            </div>
            <div class="space-y-2">
              <div v-for="(acc, i) in accounts" :key="i"
                class="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300"
                :class="activeAccount === i ? 'bg-white/[0.06] ring-1 ring-white/[0.1]' : 'hover:bg-white/[0.03]'"
                @click="activeAccount = i"
              >
                <img :src="acc.avatar" :alt="acc.name" class="w-10 h-10 rounded-full object-cover ring-2" :class="activeAccount === i ? 'ring-blue-400/50' : 'ring-white/[0.06]'" />
                <div class="flex-1 min-w-0">
                  <div class="text-[13px] font-medium flex items-center gap-2">
                    {{ acc.name }}
                    <span v-if="activeAccount === i" class="text-[9px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400">{{ $t('features.account.active') }}</span>
                  </div>
                  <div class="text-[11px] text-[var(--color-text-muted)]">{{ acc.detail }}</div>
                </div>
                <div class="text-right">
                  <div class="text-[11px] font-medium">AR {{ acc.ar }}</div>
                  <div class="w-1.5 h-1.5 rounded-full ml-auto mt-1" :class="acc.online ? 'bg-blue-400/80' : 'bg-white/10'"></div>
                </div>
              </div>
            </div>
            <div class="mt-4 pt-4 border-t border-white/[0.06] grid grid-cols-3 gap-2">
              <div class="text-center p-2 rounded-lg bg-white/[0.03]">
                <div class="text-[9px] text-white/40 mb-0.5">{{ $t('features.account.signIn') }}</div>
                <div class="text-[12px] font-semibold text-blue-400">{{ $t('features.account.signedIn') }}</div>
              </div>
              <div class="text-center p-2 rounded-lg bg-white/[0.03]">
                <div class="text-[9px] text-white/40 mb-0.5">{{ $t('features.account.resin') }}</div>
                <div class="text-[12px] font-semibold">160/200</div>
              </div>
              <div class="text-center p-2 rounded-lg bg-white/[0.03]">
                <div class="text-[9px] text-white/40 mb-0.5">{{ $t('features.account.commissions') }}</div>
                <div class="text-[12px] font-semibold">4/4</div>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>
      <span class="feature-bg-note">{{ $t('features.bgNote') }}</span>
    </div>

    <div class="feature-block feature-block-2">
      <div class="max-w-6xl mx-auto px-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <SpotlightCard data-card-hole data-reveal-left class-name="order-2 lg:order-1 border-white/[0.08] bg-black/30 backdrop-blur-sm" spotlight-color="rgba(255, 255, 255, 0.04)">
            <div class="flex items-center justify-between mb-5">
              <span class="text-[11px] font-semibold text-white/50 uppercase tracking-wider">{{ $t('features.performance.monitor') }}</span>
              <div class="flex gap-1">
                <button v-for="game in games" :key="game.id"
                  class="text-[10px] px-2.5 py-1 rounded-md cursor-pointer transition-all duration-300"
                  :class="activeGame === game.id ? 'bg-white/[0.1] text-white' : 'text-white/40 hover:text-white/60'"
                  @click="activeGame = game.id"
                >{{ game.name }}</button>
              </div>
            </div>
            <div class="space-y-5">
              <div>
                <div class="flex justify-between items-baseline mb-2">
                  <span class="text-[11px] text-[var(--color-text-muted)]">{{ $t('features.performance.fps') }}</span>
                  <span class="text-2xl font-bold tabular-nums">{{ activeGameData.fps }}<span class="text-[11px] font-normal text-[var(--color-text-muted)] ml-1">FPS</span></span>
                </div>
                <div class="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                  <div class="h-full rounded-full bg-gradient-to-r from-white/10 to-white/30 transition-all duration-700" :style="{ width: activeGameData.fpsBar }"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between items-baseline mb-2">
                  <span class="text-[11px] text-[var(--color-text-muted)]">{{ $t('features.performance.fov') }}</span>
                  <span class="text-2xl font-bold tabular-nums">{{ activeGameData.fov }}°</span>
                </div>
                <div class="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                  <div class="h-full rounded-full bg-gradient-to-r from-white/10 to-white/30 transition-all duration-700" :style="{ width: activeGameData.fovBar }"></div>
                </div>
              </div>
              <div class="grid grid-cols-4 gap-2 pt-2">
                <div v-for="s in activeGameData.stats" :key="s.label" class="text-center p-2.5 rounded-xl bg-white/[0.03] ring-1 ring-white/[0.04]">
                  <div class="text-[8px] text-[var(--color-text-muted)] mb-0.5 uppercase tracking-wider">{{ s.label }}</div>
                  <div class="text-[11px] font-semibold" :class="s.active ? 'text-blue-400' : ''">{{ s.value }}</div>
                </div>
              </div>
            </div>
          </SpotlightCard>
          <div class="feature-desc-card order-1 lg:order-2 max-w-md relative rounded-2xl bg-black/30 backdrop-blur-sm p-6" data-reveal-right>
            <div class="text-[10px] font-bold tracking-[0.2em] text-[var(--color-text-muted)] uppercase mb-4">Performance</div>
            <h3 class="text-2xl md:text-3xl font-bold mb-4 tracking-tight">{{ $t('features.performance.title') }}</h3>
            <p class="text-[var(--color-text-secondary)] leading-relaxed mb-8">{{ $t('features.performance.desc') }}</p>
            <div class="space-y-3 text-sm text-[var(--color-text-secondary)]">
              <div class="flex items-center gap-3"><div class="w-1 h-1 rounded-full bg-[var(--color-text-muted)]"></div>{{ $t('features.performance.item1') }}</div>
              <div class="flex items-center gap-3"><div class="w-1 h-1 rounded-full bg-[var(--color-text-muted)]"></div>{{ $t('features.performance.item2') }}</div>
              <div class="flex items-center gap-3"><div class="w-1 h-1 rounded-full bg-[var(--color-text-muted)]"></div>{{ $t('features.performance.item3') }}</div>
            </div>
          </div>
        </div>
      </div>
      <span class="feature-bg-note">{{ $t('features.bgNote') }}</span>
    </div>

    <div class="feature-block feature-block-3">
      <div class="max-w-6xl mx-auto px-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div class="feature-desc-card max-w-md relative rounded-2xl bg-black/30 backdrop-blur-sm p-6" data-reveal-left>
            <div class="text-[10px] font-bold tracking-[0.2em] text-[var(--color-text-muted)] uppercase mb-4">Analytics</div>
            <h3 class="text-2xl md:text-3xl font-bold mb-4 tracking-tight">{{ $t('features.analytics.title') }}</h3>
            <p class="text-[var(--color-text-secondary)] leading-relaxed mb-8">{{ $t('features.analytics.desc') }}</p>
            <div class="space-y-3 text-sm text-[var(--color-text-secondary)]">
              <div class="flex items-center gap-3"><div class="w-1 h-1 rounded-full bg-[var(--color-text-muted)]"></div>{{ $t('features.analytics.item1') }}</div>
              <div class="flex items-center gap-3"><div class="w-1 h-1 rounded-full bg-[var(--color-text-muted)]"></div>{{ $t('features.analytics.item2') }}</div>
              <div class="flex items-center gap-3"><div class="w-1 h-1 rounded-full bg-[var(--color-text-muted)]"></div>{{ $t('features.analytics.item3') }}</div>
            </div>
          </div>
          <SpotlightCard data-card-hole data-reveal-right class-name="border-white/[0.08] bg-black/30 backdrop-blur-sm" spotlight-color="rgba(255, 255, 255, 0.04)">
            <div class="flex items-center gap-1 mb-5">
              <button v-for="tab in wishTabs" :key="tab.id"
                class="text-[10px] px-3 py-1.5 rounded-lg cursor-pointer transition-all duration-300"
                :class="activeWishTab === tab.id ? 'bg-white/[0.08] text-white' : 'text-white/40 hover:text-white/60'"
                @click="activeWishTab = tab.id"
              >{{ tab.name }}</button>
            </div>
            <div class="flex items-center gap-6 mb-5">
              <div class="relative w-20 h-20 flex-shrink-0">
                <svg class="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15.5" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="2.5"/>
                  <circle cx="18" cy="18" r="15.5" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2.5" stroke-linecap="round" :stroke-dasharray="`${activeWishData.progress} 100`" class="transition-all duration-700"/>
                </svg>
                <div class="absolute inset-0 flex items-center justify-center">
                  <span class="text-[14px] font-bold tabular-nums">{{ activeWishData.pity }}</span>
                </div>
              </div>
              <div>
                <div class="text-[11px] text-white/40 mb-1">{{ $t('features.analytics.untilPity') }}</div>
                <div class="text-xl font-bold">{{ activeWishData.remaining }} <span class="text-[11px] font-normal text-white/40">{{ $t('features.analytics.pulls') }}</span></div>
                <div class="text-[10px] text-white/30 mt-1">{{ activeWishData.guarantee }}</div>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <div class="p-3 rounded-xl bg-white/[0.03] ring-1 ring-white/[0.04]">
                <div class="text-[9px] text-white/40 mb-0.5">{{ $t('features.analytics.totalPulls') }}</div>
                <div class="text-[14px] font-bold tabular-nums">1,847</div>
              </div>
              <div class="p-3 rounded-xl bg-white/[0.03] ring-1 ring-white/[0.04]">
                <div class="text-[9px] text-white/40 mb-0.5">{{ $t('features.analytics.fiveStarCount') }}</div>
                <div class="text-[14px] font-bold tabular-nums">29</div>
              </div>
              <div class="p-3 rounded-xl bg-white/[0.03] ring-1 ring-white/[0.04]">
                <div class="text-[9px] text-white/40 mb-0.5">{{ $t('features.analytics.fiveStarRate') }}</div>
                <div class="text-[14px] font-bold tabular-nums">1.57%</div>
              </div>
              <div class="p-3 rounded-xl bg-white/[0.03] ring-1 ring-white/[0.04]">
                <div class="text-[9px] text-white/40 mb-0.5">{{ $t('features.analytics.avgPity') }}</div>
                <div class="text-[14px] font-bold tabular-nums">63.7</div>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>
      <span class="feature-bg-note">{{ $t('features.bgNote') }}</span>
    </div>

    <div class="feature-block feature-block-4">
      <div class="max-w-6xl mx-auto px-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <SpotlightCard data-card-hole data-reveal-left class-name="order-2 lg:order-1 border-white/[0.08] bg-black/30 backdrop-blur-sm" spotlight-color="rgba(255, 255, 255, 0.04)">
            <div class="flex items-center gap-2 mb-4 p-2.5 rounded-xl bg-white/[0.03] ring-1 ring-white/[0.04]">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-white/30"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <span class="text-[11px] text-white/30">{{ $t('features.plugins.search') }}</span>
            </div>
            <div class="space-y-1.5">
              <div v-for="(plugin, i) in plugins" :key="i"
                class="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300"
                :class="activePlugin === i ? 'bg-white/[0.05] ring-1 ring-white/[0.08]' : 'hover:bg-white/[0.03]'"
                @click="activePlugin = i"
              >
                <div class="w-9 h-9 rounded-lg overflow-hidden ring-1 ring-white/[0.06]">
                  <img :src="plugin.icon" :alt="plugin.name" class="w-full h-full object-cover" />
                </div>
                <div class="flex-1 min-w-0">
                  <div class="text-[12px] font-medium flex items-center gap-2">
                    {{ plugin.name }}
                    <span v-if="plugin.verified" class="text-[8px] px-1 py-0.5 rounded bg-blue-500/20 text-blue-300">{{ $t('features.plugins.official') }}</span>
                  </div>
                  <div class="text-[10px] text-[var(--color-text-muted)]">{{ plugin.desc }}</div>
                </div>
                <button
                  class="text-[10px] px-2.5 py-1 rounded-lg cursor-pointer transition-all duration-300"
                  :class="plugin.installed ? 'bg-white/[0.04] text-white/40' : 'bg-white/[0.08] text-white/80 hover:bg-white/[0.12]'"
                >{{ plugin.installed ? $t('features.plugins.installed') : $t('features.plugins.install') }}</button>
              </div>
            </div>
          </SpotlightCard>
          <div class="feature-desc-card order-1 lg:order-2 max-w-md relative rounded-2xl bg-black/30 backdrop-blur-sm p-6" data-reveal-right>
            <div class="text-[10px] font-bold tracking-[0.2em] text-[var(--color-text-muted)] uppercase mb-4">Plugins</div>
            <h3 class="text-2xl md:text-3xl font-bold mb-4 tracking-tight">{{ $t('features.plugins.title') }}</h3>
            <p class="text-[var(--color-text-secondary)] leading-relaxed mb-8">{{ $t('features.plugins.desc') }}</p>
            <div class="space-y-3 text-sm text-[var(--color-text-secondary)]">
              <div class="flex items-center gap-3"><div class="w-1 h-1 rounded-full bg-[var(--color-text-muted)]"></div>{{ $t('features.plugins.item1') }}</div>
              <div class="flex items-center gap-3"><div class="w-1 h-1 rounded-full bg-[var(--color-text-muted)]"></div>{{ $t('features.plugins.item2') }}</div>
              <div class="flex items-center gap-3"><div class="w-1 h-1 rounded-full bg-[var(--color-text-muted)]"></div>{{ $t('features.plugins.item3') }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="feature-block feature-block-preview" id="preview">
      <div class="max-w-6xl mx-auto px-6">
        <div class="flex flex-col items-center text-center mb-12" data-reveal>
          <div class="text-[10px] font-bold tracking-[0.2em] text-[var(--color-text-muted)] uppercase mb-4">Preview</div>
          <h3 class="text-2xl md:text-3xl font-bold mb-3 tracking-tight">{{ $t('features.preview.title') }}</h3>
          <p class="text-[var(--color-text-secondary)] max-w-lg leading-relaxed">{{ $t('features.preview.desc') }}</p>
        </div>
        <div data-reveal-scale>
          <ScreenshotCarousel />
        </div>
      </div>
      <span class="feature-bg-note">{{ $t('features.bgNote') }}</span>
    </div>

    <div class="feature-block feature-block-5">
      <div class="max-w-6xl mx-auto px-6">
        <div class="flex flex-col items-center justify-center text-center py-12">
          <div class="max-w-lg" data-reveal>
            <div class="text-[10px] font-bold tracking-[0.2em] text-[var(--color-text-muted)] uppercase mb-4">Explore</div>
            <h3 class="text-2xl md:text-3xl font-bold mb-4 tracking-tight">{{ $t('features.explore.title') }}</h3>
            <p class="text-[var(--color-text-secondary)] leading-relaxed mb-8">{{ $t('features.explore.desc') }}</p>
            <a href="https://github.com/FufuLauncher/FufuLauncher/releases" target="_blank" rel="noopener"
              class="group inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-semibold text-sm bg-[var(--color-text)] text-[var(--color-bg)] hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-white/5 transition-all duration-500 hover:-translate-y-0.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              {{ $t('features.explore.download') }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import SpotlightCard from '../component/SpotlightCard.vue'
import ScreenshotCarousel from './ScreenshotCarousel.vue'

const { t } = useI18n()

const BG_IMAGES = [
  'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1920&q=80',
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1920&q=80',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&q=80',
  'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=1920&q=80',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80',
]

onMounted(() => {
  BG_IMAGES.forEach((src) => {
    const img = new Image()
    img.decoding = 'async'
    img.src = src
  })
})

const activeAccount = ref(0)
const accounts = computed(() => [
  { name: t('accounts.traveler'), avatar: 'https://act-upload.mihoyo.com/wiki-user-upload/2025/06/19/50494840/f394baeb5099e1ac12db23e16445c82e_6757723224935154347.png?x-oss-process=image/format,webp/quality,Q_75/resize,w_120,h_120', detail: t('accounts.signedCN'), ar: 58, online: true },
  { name: '莉奈娅', avatar: 'https://act-upload.mihoyo.com/wiki-user-upload/2026/04/03/50494840/ceddfe12403e65f74d5b186d6b9a66e0_9135708170886925992.png?x-oss-process=image/format,webp/quality,Q_75/resize,w_120,h_120', detail: t('accounts.unsignedAsia'), ar: 60, online: false },
  { name: '玛薇卡', avatar: 'https://act-upload.mihoyo.com/wiki-user-upload/2024/12/25/4328207/dc36c2dc0fc1bcd418a17fe907e7bb33_5872605765675589334.png?x-oss-process=image/format,webp/quality,Q_75/resize,w_120,h_120', detail: t('accounts.signedTW'), ar: 45, online: true },
])

const activeGame = ref('genshin')
const games = computed(() => [
  { id: 'genshin', name: t('gamePresets.preset1') },
  { id: 'starrail', name: t('gamePresets.preset2') },
  { id: 'zzz', name: t('gamePresets.preset3') },
])
const gameData = computed(() => ({
  genshin: { fps: 120, fpsBar: '100%', fov: 75, fovBar: '75%', stats: [{ label: t('gameStats.hdr'), value: t('gameStats.on'), active: true }, { label: t('gameStats.vsync'), value: t('gameStats.off'), active: false }, { label: t('gameStats.window'), value: t('gameStats.borderless'), active: false }, { label: t('gameStats.paimon'), value: t('gameStats.hidden'), active: true }] },
  starrail: { fps: 120, fpsBar: '100%', fov: 90, fovBar: '90%', stats: [{ label: t('gameStats.hdr'), value: t('gameStats.on'), active: true }, { label: t('gameStats.vsync'), value: t('gameStats.off'), active: false }, { label: t('gameStats.window'), value: t('gameStats.fullscreen'), active: false }, { label: t('gameStats.loadBar'), value: t('gameStats.removed'), active: true }] },
  zzz: { fps: 144, fpsBar: '100%', fov: 80, fovBar: '80%', stats: [{ label: t('gameStats.hdr'), value: t('gameStats.off'), active: false }, { label: t('gameStats.vsync'), value: t('gameStats.off'), active: false }, { label: t('gameStats.window'), value: t('gameStats.borderless'), active: false }, { label: t('gameStats.fov'), value: t('gameStats.custom'), active: true }] },
}))
const activeGameData = computed(() => gameData.value[activeGame.value])

const activeWishTab = ref('char')
const wishTabs = computed(() => [
  { id: 'char', name: t('wishTabs.char') },
  { id: 'weapon', name: t('wishTabs.weapon') },
  { id: 'permanent', name: t('wishTabs.permanent') },
])
const wishData = computed(() => ({
  char: { pity: 67, remaining: 23, progress: 74, guarantee: t('wishGuarantee.hardPity') },
  weapon: { pity: 45, remaining: 35, progress: 56, guarantee: t('wishGuarantee.fatePoints') },
  permanent: { pity: 12, remaining: 78, progress: 13, guarantee: t('wishGuarantee.softPity') },
}))
const activeWishData = computed(() => wishData.value[activeWishTab.value])

const activePlugin = ref(0)
const plugins = [
  { name: 'FufuLauncher-Plugin', desc: '6月25号构建版本', icon: 'https://fu1.fun/logo.png', installed: true, verified: true },
  { name: 'FPS-Plugin', desc: '实时显示帧率', icon: 'https://fu1.fun/logo.png', installed: true, verified: true },
]
</script>

<style scoped>
.feature-block {
  position: sticky;
  top: 0;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 4rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 24px;
  margin-top: -24px;
  z-index: var(--stack-z);
  overflow: hidden;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  scroll-snap-align: start;
}

.feature-block::before {
  content: '';
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 1;
  z-index: 0;
  filter: blur(8px);
  -webkit-filter: blur(8px);
}

.feature-block::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 0;
}

.feature-block > *:not(.feature-bg-note) {
  position: relative;
  z-index: 1;
}

.feature-block-1::before {
  background-image: url('https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1920&q=80');
}

.feature-block-2::before {
  background-image: url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1920&q=80');
}

.feature-block-3::before {
  background-image: url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&q=80');
}

.feature-block-4::before {
  background-image: url('https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=1920&q=80');
}

.feature-block-preview::before {
  background-image: url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80');
}

.feature-block-5::before {
  background: rgba(0, 0, 0, 0.6);
  filter: none;
  -webkit-filter: none;
}

.feature-block:first-child {
  margin-top: 0;
}

.feature-block:nth-child(2) { --stack-z: 2; }
.feature-block:nth-child(3) { --stack-z: 3; }
.feature-block:nth-child(4) { --stack-z: 4; }
.feature-block:nth-child(5) { --stack-z: 5; }
.feature-block:nth-child(6) { --stack-z: 6; }
.feature-block:nth-child(7) { --stack-z: 7; }

.feature-bg-note {
  position: absolute;
  bottom: 16px;
  right: 24px;
  z-index: 2;
  font-size: 9px;
  color: rgba(255, 255, 255, 0.2);
  letter-spacing: 0.02em;
  pointer-events: none;
}

.features-section [data-card-hole][data-reveal-left] {
  transform: perspective(1200px) rotateY(-14deg) translateX(-60px) translateY(20px);
}
.features-section [data-card-hole][data-reveal-left].revealed {
  transform: perspective(1200px) rotateY(0deg) translateX(0) translateY(0);
}
.features-section [data-card-hole][data-reveal-right] {
  transform: perspective(1200px) rotateY(14deg) translateX(60px) translateY(20px);
}
.features-section [data-card-hole][data-reveal-right].revealed {
  transform: perspective(1200px) rotateY(0deg) translateX(0) translateY(0);
}

</style>
