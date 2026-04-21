<template>
  <canvas ref="canvas" style="position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:0" />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvas = ref(null)
let frame, stars = []

function resize(ctx) {
  const el = canvas.value
  el.width = el.offsetWidth
  el.height = el.offsetHeight
  stars = Array.from({ length: 180 }, () => ({
    x: Math.random() * el.width,
    y: Math.random() * el.height,
    r: Math.random() * 1.2 + 0.2,
    o: Math.random() * 0.5 + 0.1,
    speed: Math.random() * 0.3 + 0.05,
    phase: Math.random() * Math.PI * 2,
  }))
}

function draw(ctx, t) {
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)
  stars.forEach(s => {
    const opacity = s.o * (0.7 + 0.3 * Math.sin(t * 0.001 * s.speed + s.phase))
    ctx.beginPath()
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(180,182,220,${opacity})`
    ctx.fill()
  })
  frame = requestAnimationFrame(t2 => draw(ctx, t2))
}

onMounted(() => {
  const ctx = canvas.value.getContext('2d')
  const onResize = () => resize(ctx)
  resize(ctx)
  window.addEventListener('resize', onResize)
  frame = requestAnimationFrame(t => draw(ctx, t))
  onUnmounted(() => {
    cancelAnimationFrame(frame)
    window.removeEventListener('resize', onResize)
  })
})
</script>
