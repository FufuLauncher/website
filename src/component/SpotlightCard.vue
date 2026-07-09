<template>
  <div
    ref="divRef"
    @mousemove="handleMouseMove"
    @focus="handleFocus"
    @blur="handleBlur"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    :class="['relative rounded-3xl border overflow-hidden p-8 tilt-card', className]"
    :style="cardStyle"
  >
    <div
      class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out tilt-spotlight"
      :style="{
        opacity,
        background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`
      }"
    />
    <div
      class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 ease-in-out tilt-glare"
      :style="{
        opacity: glareOpacity,
        background: `radial-gradient(circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.18), transparent 60%)`
      }"
    />
    <div class="tilt-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, useTemplateRef } from 'vue';

interface Position {
  x: number;
  y: number;
}

interface SpotlightCardProps {
  className?: string;
  spotlightColor?: string;
  maxTilt?: number;
}

const { className = '', spotlightColor = 'rgba(255, 255, 255, 0.25)', maxTilt = 8 } = defineProps<SpotlightCardProps>();

const divRef = useTemplateRef<HTMLDivElement>('divRef');
const isFocused = ref<boolean>(false);
const position = ref<Position>({ x: 0, y: 0 });
const opacity = ref<number>(0);
const glareOpacity = ref<number>(0);
const cardStyle = ref<Record<string, string>>({});

const handleMouseMove = (e: MouseEvent) => {
  if (!divRef.value) return;

  const rect = divRef.value.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  position.value = { x, y };

  const px = (x / rect.width) - 0.5;
  const py = (y / rect.height) - 0.5;
  const ry = px * maxTilt * 2;
  const rx = -py * maxTilt * 2;

  cardStyle.value = {
    transform: `perspective(1000px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) scale(1.02)`,
    boxShadow: `${(ry * 0.9).toFixed(1)}px ${(-rx * 0.9).toFixed(1)}px 45px rgba(0, 0, 0, 0.45)`,
    transition: 'transform 0.18s ease-out, box-shadow 0.18s ease-out',
  };

  if (!isFocused.value) {
    opacity.value = 0.6;
    glareOpacity.value = 0.9;
  }
};

const handleFocus = () => {
  isFocused.value = true;
  opacity.value = 0.6;
};

const handleBlur = () => {
  isFocused.value = false;
  opacity.value = 0;
  glareOpacity.value = 0;
};

const handleMouseEnter = () => {
  opacity.value = 0.6;
  glareOpacity.value = 0.9;
};

const handleMouseLeave = () => {
  opacity.value = 0;
  glareOpacity.value = 0;
  cardStyle.value = {
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3)',
    transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
  };
};
</script>

<style scoped>
.tilt-card {
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1),
              opacity 1s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.tilt-content {
  position: relative;
  z-index: 1;
}

.tilt-spotlight,
.tilt-glare {
  transform: translateZ(0);
}

.tilt-glare {
  z-index: 2;
}
</style>
