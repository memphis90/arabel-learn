<template>
  <header style="display:flex;align-items:center;justify-content:space-between;padding:18px 32px;flex-shrink:0;border-bottom:1px solid rgba(var(--rgb-border),0.04)">
    <div style="display:flex;align-items:center;gap:8px;font-size:0.875rem">
      <template v-for="(b, i) in breadcrumbs" :key="i">
        <span v-if="i > 0" style="color:rgba(var(--rgb-text),0.14)">/</span>
        <button v-if="b.onClick" @click="b.onClick()" style="background:none;border:none;cursor:pointer;padding:0;font-size:inherit;color:rgba(var(--rgb-text),0.32);transition:color 0.15s"
          @mouseover="e => e.target.style.color='var(--text-1)'" @mouseout="e => e.target.style.color='rgba(var(--rgb-text),0.32)'">
          {{ b.label }}
        </button>
        <span v-else style="color:var(--text-1);font-weight:400">{{ b.label }}</span>
      </template>
    </div>
    <div style="display:flex;align-items:center;gap:8px">
      <slot name="actions" />
      <ThemeToggle />
      <LangToggle />
    </div>
  </header>
</template>

<script setup>
import LangToggle   from '@/components/LangToggle.vue'
import ThemeToggle  from '@/components/ThemeToggle.vue'
defineProps({
  breadcrumbs: { type: Array, default: () => [] },
})
</script>
