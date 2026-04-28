<template>
  <div style="display:flex;align-items:center;gap:8px">
    <span v-if="showLabel" style="font-size:0.72rem;color:rgba(var(--rgb-text),0.5);min-width:60px">{{ current }} / {{ total }} XP</span>
    <div style="flex:1;height:5px;border-radius:99px;background:rgba(var(--rgb-border),0.1);overflow:hidden">
      <div :style="{
        height: '100%',
        width: pct + '%',
        borderRadius: '99px',
        background: `linear-gradient(90deg, ${color}, ${color}cc)`,
        transition: 'width 0.6s ease',
        boxShadow: `0 0 8px ${color}66`,
      }" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  current:   { type: Number, required: true },
  total:     { type: Number, required: true },
  color:     { type: String, default: '#6366f1' },
  showLabel: { type: Boolean, default: true },
})

const pct = computed(() => Math.min(100, (props.current / props.total) * 100))
</script>
