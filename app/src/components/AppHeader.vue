<template>
  <header style="display:flex;align-items:center;justify-content:space-between;padding:18px 32px;flex-shrink:0;border-bottom:1px solid rgba(255,255,255,0.04)">
    <div style="display:flex;align-items:center;gap:8px;font-size:0.875rem">
      <template v-for="(b, i) in breadcrumbs" :key="i">
        <span v-if="i > 0" style="color:rgba(228,230,244,0.14)">/</span>
        <button v-if="b.onClick" @click="b.onClick()" style="background:none;border:none;cursor:pointer;padding:0;font-size:inherit;color:rgba(228,230,244,0.32);transition:color 0.15s"
          @mouseover="e => e.target.style.color='#e4e6f4'" @mouseout="e => e.target.style.color='rgba(228,230,244,0.32)'">
          {{ b.label }}
        </button>
        <span v-else style="color:#e4e6f4;font-weight:400">{{ b.label }}</span>
      </template>
    </div>
    <div style="display:flex;align-items:center;gap:8px">
      <slot name="actions" />
      <LangToggle />
    </div>
  </header>
</template>

<script setup>
import LangToggle from '@/components/LangToggle.vue'
defineProps({
  breadcrumbs: { type: Array, default: () => [] },
})
</script>
