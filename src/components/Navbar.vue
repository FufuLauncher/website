<template>
  <header
    class="fixed top-0 w-full z-50 transition-[padding,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
    :class="isScrolled ? 'py-2' : 'py-4'"
  >
    <div
      class="max-w-6xl mx-auto px-6 h-12 flex items-center justify-between rounded-full transition-[background-color,box-shadow,backdrop-filter] duration-700"
      :class="isScrolled && !props.cinemaMode ? 'bg-[var(--color-glass-bg)] backdrop-blur-xl shadow-sm' : ''"
    >
      <a href="#" class="flex items-center gap-2.5 font-semibold text-sm tracking-tight text-[var(--color-text)] transition-opacity duration-700" :class="props.cinemaMode ? 'opacity-0 pointer-events-none' : ''">
        <img src="https://fu1.fun/logo.png" alt="Logo" class="w-7 h-7 object-contain" />
        <span class="hidden sm:inline">FufuLauncher</span>
      </a>

      <nav class="hidden md:flex items-center gap-8 text-[13px] font-medium text-[var(--color-text-secondary)] transition-opacity duration-700" :class="props.cinemaMode ? 'opacity-0 pointer-events-none' : ''">
        <a href="#preview" class="hover:text-[var(--color-text)] transition-colors duration-300">{{ $t('nav.preview') }}</a>
        <a href="#features" class="hover:text-[var(--color-text)] transition-colors duration-300">{{ $t('nav.features') }}</a>
        <a href="#contributors" class="hover:text-[var(--color-text)] transition-colors duration-300">{{ $t('nav.contributors') }}</a>
        <a href="#support" class="hover:text-[var(--color-text)] transition-colors duration-300">{{ $t('nav.support') }}</a>
        <a href="https://fu1.fun/docs" target="_blank" rel="noopener" class="hover:text-[var(--color-text)] transition-colors duration-300">{{ $t('nav.docs') }}</a>
      </nav>

      <div class="flex items-center gap-3">
        <button
          v-show="!props.cinemaMode"
          @click="emit('toggle-cinema')"
          class="px-3 py-1.5 rounded-full text-xs font-medium border border-[var(--color-glass-border)] bg-[var(--color-glass-bg)] backdrop-blur-md hover:opacity-80 transition-opacity duration-300"
        >
          {{ $t('nav.cinema') }}
        </button>
        <button
          @click="toggleLocale"
          class="px-3 py-1.5 rounded-full text-xs font-medium border border-[var(--color-glass-border)] bg-[var(--color-glass-bg)] backdrop-blur-md hover:opacity-80 transition-opacity duration-300 transition-[opacity] duration-700"
          :class="props.cinemaMode ? 'opacity-0 pointer-events-none' : ''"
        >
          {{ locale === 'zh-CN' ? 'EN' : '中文' }}
        </button>
        <a href="https://github.com/FufuLauncher/FufuLauncher/" target="_blank" rel="noopener"
          class="px-4 py-1.5 rounded-full text-xs font-bold bg-[var(--color-text)] text-[var(--color-bg)] hover:opacity-80 transition-opacity duration-300 transition-[opacity] duration-700"
          :class="props.cinemaMode ? 'opacity-0 pointer-events-none' : ''">
          GitHub
        </a>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  cinemaMode: { type: Boolean, default: false }
})
const emit = defineEmits(['toggle-cinema'])

const { locale } = useI18n()

const isScrolled = ref(false)

function toggleLocale() {
  const next = locale.value === 'zh-CN' ? 'en' : 'zh-CN'
  locale.value = next
  localStorage.setItem('locale', next)
}

function onScroll() {
  isScrolled.value = window.scrollY > 60
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>
