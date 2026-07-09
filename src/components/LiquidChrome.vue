<template>
  <div ref="containerRef" class="w-full h-full"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'

const props = defineProps({
  baseColor: { type: Array, default: () => [0.1, 0.1, 0.1] },
  speed: { type: Number, default: 0.2 },
  amplitude: { type: Number, default: 0.5 },
  frequencyX: { type: Number, default: 3 },
  frequencyY: { type: Number, default: 2 },
  interactive: { type: Boolean, default: true }
})

const containerRef = ref(null)
let renderer, gl, mesh, program, animationId
let mouse = { x: 0.5, y: 0.5 }
let time = 0
let isVisible = true
let visibilityObserver = null

const vertexShader = `
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`

const fragmentShader = `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform vec3 uBaseColor;
  uniform float uSpeed;
  uniform float uAmplitude;
  uniform float uFrequencyX;
  uniform float uFrequencyY;

  void main() {
    vec2 uv = vUv;
    float t = uTime * uSpeed;

    vec2 distort = vec2(0.0);
    for (float i = 1.0; i <= 4.0; i++) {
      distort.x += sin(uv.y * uFrequencyX * i + t * (0.5 + i * 0.1)) * uAmplitude / i;
      distort.y += cos(uv.x * uFrequencyY * i + t * (0.3 + i * 0.15)) * uAmplitude / i;
    }

    vec2 mouseEffect = (uMouse - 0.5) * 0.15;
    float mouseDist = length(uv - uMouse);
    float mouseInfluence = smoothstep(0.5, 0.0, mouseDist) * 0.3;
    distort += mouseEffect * mouseInfluence;

    vec2 finalUv = uv + distort * 0.08;

    float n1 = sin(finalUv.x * 8.0 + t) * cos(finalUv.y * 6.0 - t * 0.7);
    float n2 = cos(finalUv.x * 5.0 - t * 0.5) * sin(finalUv.y * 9.0 + t * 0.3);
    float n3 = sin((finalUv.x + finalUv.y) * 7.0 + t * 0.6);

    float chrome = (n1 + n2 + n3) / 3.0;
    chrome = chrome * 0.5 + 0.5;
    chrome = pow(chrome, 1.5);

    float edge = pow(1.0 - abs(chrome - 0.5) * 2.0, 2.0);

    vec3 color = uBaseColor;
    color += vec3(0.15, 0.3, 0.5) * chrome;
    color += vec3(0.1, 0.2, 0.4) * edge;
    color += vec3(0.05, 0.1, 0.2) * sin(finalUv.x * 3.0 + t) * 0.5;

    float spec = pow(max(chrome, 0.0), 4.0);
    color += vec3(0.3, 0.4, 0.6) * spec;

    float vignette = 1.0 - length(uv - 0.5) * 0.8;
    color *= vignette;

    gl_FragColor = vec4(color, 1.0);
  }
`

async function init() {
  if (!containerRef.value) return
  const { Renderer, Program, Mesh, Triangle } = await import('ogl')

  renderer = new Renderer({ alpha: true, antialias: false })
  gl = renderer.gl
  containerRef.value.appendChild(gl.canvas)
  gl.canvas.style.width = '100%'
  gl.canvas.style.height = '100%'

  const geometry = new Triangle(gl)
  program = new Program(gl, {
    vertex: vertexShader,
    fragment: fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uResolution: { value: [gl.canvas.width, gl.canvas.height] },
      uMouse: { value: [0.5, 0.5] },
      uBaseColor: { value: props.baseColor },
      uSpeed: { value: props.speed },
      uAmplitude: { value: props.amplitude },
      uFrequencyX: { value: props.frequencyX },
      uFrequencyY: { value: props.frequencyY },
    }
  })

  mesh = new Mesh(gl, { geometry, program })
  resize()
  window.addEventListener('resize', resize)
  if (props.interactive) {
    containerRef.value.addEventListener('mousemove', onMouseMove)
    containerRef.value.addEventListener('touchmove', onTouchMove, { passive: true })
  }

  if ('IntersectionObserver' in window) {
    visibilityObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isVisible = entry.isIntersecting
        if (isVisible && !animationId) {
          animate()
        } else if (!isVisible && animationId) {
          cancelAnimationFrame(animationId)
          animationId = null
        }
      })
    }, { threshold: 0 })
    visibilityObserver.observe(containerRef.value)
  }

  const reducedMotionMQ = window.matchMedia('(prefers-reduced-motion: reduce)')
  if (reducedMotionMQ.matches) {
    renderer.render({ scene: mesh })
    return
  }

  if (isVisible) animate()
}

function resize() {
  if (!containerRef.value || !renderer) return
  const { clientWidth, clientHeight } = containerRef.value
  renderer.setSize(clientWidth, clientHeight)
  if (program) program.uniforms.uResolution.value = [clientWidth, clientHeight]
}

function onMouseMove(e) {
  const rect = containerRef.value.getBoundingClientRect()
  mouse.x = (e.clientX - rect.left) / rect.width
  mouse.y = 1.0 - (e.clientY - rect.top) / rect.height
}

function onTouchMove(e) {
  if (e.touches.length > 0) {
    const rect = containerRef.value.getBoundingClientRect()
    mouse.x = (e.touches[0].clientX - rect.left) / rect.width
    mouse.y = 1.0 - (e.touches[0].clientY - rect.top) / rect.height
  }
}

function animate() {
  animationId = requestAnimationFrame(animate)
  time += 0.016
  if (program) {
    program.uniforms.uTime.value = time
    program.uniforms.uMouse.value = [mouse.x, mouse.y]
  }
  renderer.render({ scene: mesh })
}

function cleanup() {
  if (animationId) cancelAnimationFrame(animationId)
  if (visibilityObserver) { visibilityObserver.disconnect(); visibilityObserver = null }
  window.removeEventListener('resize', resize)
  if (containerRef.value) {
    containerRef.value.removeEventListener('mousemove', onMouseMove)
    containerRef.value.removeEventListener('touchmove', onTouchMove)
    if (gl?.canvas && containerRef.value.contains(gl.canvas)) {
      containerRef.value.removeChild(gl.canvas)
    }
  }
  if (gl) gl.getExtension('WEBGL_lose_context')?.loseContext()
  renderer = null; gl = null; mesh = null; program = null
}

onMounted(() => init())
onBeforeUnmount(() => cleanup())

watch(() => [props.baseColor, props.speed, props.amplitude, props.frequencyX, props.frequencyY], () => {
  if (program) {
    program.uniforms.uBaseColor.value = props.baseColor
    program.uniforms.uSpeed.value = props.speed
    program.uniforms.uAmplitude.value = props.amplitude
    program.uniforms.uFrequencyX.value = props.frequencyX
    program.uniforms.uFrequencyY.value = props.frequencyY
  }
}, { deep: true })
</script>
