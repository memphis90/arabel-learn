<template>
  <svg viewBox="0 0 48 48" width="36" height="36" fill="none">
    <circle cx="24" cy="24" r="22" :fill="`rgba(${rgb},0.15)`" :stroke="`rgba(${rgb},0.4)`" stroke-width="1.5"/>
    <text x="24" y="30" text-anchor="middle" :font-size="label.length > 1 ? 13 : 16" font-weight="700" :fill="`rgb(${rgb})`" font-family="monospace">{{ label }}</text>
  </svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({ courseId: { type: String, required: true } })

const MAP = {
  nodejs:     { rgb: '34,197,94',  label: 'N'  },
  express:    { rgb: '245,158,11', label: 'E'  },
  'vue-nuxt': { rgb: '6,182,212',  label: 'V'  },
  typescript: { rgb: '59,130,246', label: 'TS' },
}

const rgb   = computed(() => MAP[props.courseId]?.rgb   || '99,102,241')
const label = computed(() => MAP[props.courseId]?.label || props.courseId[0].toUpperCase())
</script>
