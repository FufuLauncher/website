<template>
  <section class="py-28">
    <div class="max-w-6xl mx-auto px-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center" data-reveal>
        <div>
          <div class="flex items-center gap-3 mb-6">
            <div class="w-8 h-px bg-[var(--color-text-muted)]"></div>
            <span class="text-[11px] font-bold tracking-[0.15em] text-[var(--color-text-muted)] uppercase">Behind the Code</span>
          </div>
          <h2 class="text-3xl md:text-4xl font-bold mb-6 leading-tight tracking-tight">
            {{ $t('story.title') }}<br><span class="text-[var(--color-text-muted)]">{{ $t('story.titleHighlight') }}</span>
          </h2>
          <div class="space-y-5 text-[var(--color-text-secondary)] leading-relaxed">
            <p>{{ $t('story.p1') }}<strong class="text-[var(--color-text)] font-semibold">{{ $t('story.p1Bold') }}</strong></p>
            <p>{{ $t('story.p2') }}</p>
          </div>
        </div>
        <div class="glass-card p-8 md:p-10">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" class="text-[var(--color-text-muted)] mb-6 opacity-40"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg>
          <p class="text-base italic leading-relaxed mb-8 opacity-90">
            {{ $t('story.quote') }}
          </p>
          <div class="flex items-center gap-3 pt-6 border-t border-[var(--color-border)]">
            <img src="https://fu1.fun/logo.png" alt="Team" class="w-9 h-9 rounded-lg object-contain" />
            <div>
              <div class="text-sm font-bold">FufuLauncher Dev Team</div>
              <div class="text-xs text-[var(--color-text-muted)]">Open Source Community</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
