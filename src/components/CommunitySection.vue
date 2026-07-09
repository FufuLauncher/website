<template>
  <section id="community" class="py-28">
    <div class="max-w-6xl mx-auto px-6">
      <div class="flex flex-col items-start" data-reveal>
        <div class="flex items-center gap-3 mb-4">
          <div class="w-8 h-px bg-[var(--color-text-muted)]"></div>
          <span class="text-[11px] font-bold tracking-[0.15em] text-[var(--color-text-muted)] uppercase">Community</span>
        </div>
        <h2 class="text-2xl md:text-3xl font-bold tracking-tight mb-3">{{ $t('community.title') }}</h2>
        <p class="text-[var(--color-text-secondary)] text-sm mb-8 max-w-md">{{ $t('community.desc') }}</p>
        <a
          href="https://bbs.xcnahida.cn/"
          target="_blank"
          rel="noopener"
          class="group inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-semibold text-sm bg-[var(--color-text)] text-[var(--color-bg)] hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-white/5 transition-all duration-500 hover:-translate-y-0.5"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          {{ $t('community.join') }}
        </a>
        <p class="text-[10px] text-[var(--color-text-muted)] mt-6">{{ $t('community.note') }}</p>
      </div>
    </div>
  </section>
</template>
