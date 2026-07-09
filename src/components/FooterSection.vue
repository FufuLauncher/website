<template>
  <footer class="py-16 border-t border-[var(--color-border)]">
    <div class="max-w-6xl mx-auto px-6">
      <div class="flex flex-col md:flex-row justify-between items-start gap-10 mb-16">
        <div>
          <a href="#" class="flex items-center gap-2.5 font-bold text-lg mb-3">
            <img src="https://fu1.fun/logo.png" class="w-7 h-7" alt="Logo" />
            FufuLauncher
          </a>
          <p class="text-[var(--color-text-muted)] text-sm max-w-xs leading-relaxed">{{ $t('footer.slogan') }}</p>
        </div>
        <div class="flex gap-12 text-sm">
          <div class="flex flex-col gap-2.5">
            <span class="text-[11px] font-bold tracking-wider text-[var(--color-text-muted)] uppercase mb-1">{{ $t('footer.resources') }}</span>
            <a href="https://fu1.fun/docs" target="_blank" rel="noopener" class="text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors duration-300">{{ $t('footer.docs') }}</a>
            <a href="https://github.com/FufuLauncher/FufuLauncher/releases" target="_blank" rel="noopener" class="text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors duration-300">{{ $t('footer.releases') }}</a>
          </div>
          <div class="flex flex-col gap-2.5">
            <span class="text-[11px] font-bold tracking-wider text-[var(--color-text-muted)] uppercase mb-1">{{ $t('footer.community') }}</span>
            <a href="https://github.com/FufuLauncher/FufuLauncher" target="_blank" rel="noopener" class="text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors duration-300">GitHub</a>
          </div>
        </div>
      </div>

      <div class="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-[var(--color-border)] text-xs text-[var(--color-text-muted)]">
        <span>{{ $t('footer.copyright') }}</span>
        <div class="flex items-center gap-4">
          <a href="https://philia093.cyou/" target="_blank" rel="noopener" class="hover:text-[var(--color-text)] transition-colors duration-300">{{ $t('footer.userAgreement') }}</a>
          <a href="https://github.com/FufuLauncher/FufuLauncher/" target="_blank" rel="noopener" class="hover:text-[var(--color-text)] transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </a>
        </div>
      </div>

      <div class="flex items-center gap-4 flex-wrap justify-center pt-6 mt-6 text-[10px] text-[var(--color-text-muted)]">
        <span class="flex items-center gap-1.5">
          {{ $t('footer.signPathProvided') }}
          <a href="https://about.signpath.io" target="_blank" rel="noopener" class="inline-flex items-center gap-1 hover:text-[var(--color-text)] transition-colors duration-300">
            <img src="https://avatars.githubusercontent.com/u/34448643" alt="SignPath" class="w-4 h-4 rounded-sm" />
            SignPath.io
          </a>
          {{ $t('footer.provided') }}
        </span>
        <span class="flex items-center gap-1.5">
          {{ $t('footer.signPathCert') }}
          <a href="https://signpath.org" target="_blank" rel="noopener" class="inline-flex items-center gap-1 hover:text-[var(--color-text)] transition-colors duration-300">
            <img src="https://avatars.githubusercontent.com/u/34448643" alt="SignPath Foundation" class="w-4 h-4 rounded-sm" />
            SignPath Foundation
          </a>
          {{ $t('footer.provided') }}
        </span>
        <span class="flex items-center gap-1.5">
          {{ $t('footer.webBy') }}
          <a href="https://vuejs.org" target="_blank" rel="noopener" class="inline-flex items-center gap-1 hover:text-[var(--color-text)] transition-colors duration-300">
            <svg viewBox="0 0 128 128" class="w-4 h-4"><path fill="#42b883" d="M78.8,10L64,35.4L49.2,10H0l64,110l64-110H78.8z"/><path fill="#35495e" d="M78.8,10L64,35.4L49.2,10H25.6L64,76l38.4-66H78.8z"/></svg>
            Vue
          </a>
          {{ $t('footer.provided') }}
        </span>
      </div>

      <div class="pt-6 mt-6 border-t border-[var(--color-border)] text-center text-[10px] text-[var(--color-text-muted)] leading-relaxed space-y-2">
        <p>{{ $t('footer.openSource') }}</p>
        <p>{{ $t('footer.disclaimer') }}</p>
        <p>{{ $t('footer.webDev') }}</p>
      </div>
    </div>
  </footer>
</template>
