<template>
  <section id="support" class="py-28">
    <div class="max-w-6xl mx-auto px-6">
      <div data-reveal>
        <div class="flex items-center gap-3 mb-4">
          <div class="w-8 h-px bg-[var(--color-text-muted)]"></div>
          <span class="text-[11px] font-bold tracking-[0.15em] text-[var(--color-text-muted)] uppercase">Support & Partners</span>
        </div>
        <h2 class="text-2xl md:text-3xl font-bold tracking-tight mb-3">{{ $t('support.title') }}</h2>
        <p class="text-[var(--color-text-secondary)] text-sm mb-12">{{ $t('support.desc') }}</p>
      </div>

      <div class="mb-16" data-reveal>
        <h3 class="text-lg font-semibold mb-6 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-[var(--color-text-muted)]"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          {{ $t('support.standards') }}
        </h3>
        <div class="flex flex-wrap gap-3">
          <span v-for="std in standards" :key="std" class="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm font-medium text-[var(--color-text-secondary)] hover:border-white/[0.15] hover:bg-white/[0.08] transition-colors duration-300">
            {{ std }}
          </span>
        </div>
      </div>

      <div data-reveal>
        <h3 class="text-lg font-semibold mb-6 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-[var(--color-text-muted)]"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          {{ $t('support.partners') }}
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            v-for="project in projects"
            :key="project.name"
            :href="project.url"
            target="_blank"
            rel="noopener"
            class="group flex items-center gap-4 p-5 transition-all duration-300"
          >
            <img :src="project.icon" :alt="project.name" class="w-12 h-12 rounded-xl object-contain ring-1 ring-white/[0.06] group-hover:ring-white/[0.15] transition-all duration-300" />
            <div class="flex-1 min-w-0">
              <div class="text-sm font-semibold group-hover:text-white transition-colors duration-300">{{ project.name }}</div>
              <div class="text-xs text-[var(--color-text-muted)] mt-0.5 truncate">{{ project.desc }}</div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-[var(--color-text-muted)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const standards = ['UIAF 1.1', 'UIGF 4.2', 'UIGF 4.1', 'UIGF 4.0']

const projects = computed(() => [
  {
    name: 'Snap.Hutao.Remastered',
    desc: t('support.snapHutaoDesc'),
    url: 'https://github.com/SnapHutaoRemasteringProject/Snap.Hutao.Remastered',
    icon: 'https://camo.githubusercontent.com/67d7d4bb9220ea94cee4283bfe6a2144d10a273642aacbd6d9053b89959e74b9/68747470733a2f2f736e6170687574616f72702e6f72672f6173736574732f6c6f676f2e706e67',
  },
  {
    name: 'ky3-Launcher',
    desc: t('support.ky3Desc'),
    url: 'https://github.com/ky3-studio/ky3-Launcher',
    icon: 'https://github.com/ky3-studio/ky3-Launcher/raw/main/logo.png',
  },
  {
    name: 'MiyoQian',
    desc: t('support.miyoQianDesc'),
    url: 'https://github.com/Marchen-orz/MiyoQian',
    icon: 'https://github.com/Marchen-orz/MiyoQian/blob/master/miyouqian/webui/assets/myq_logo.png?raw=true',
  },
])
</script>
