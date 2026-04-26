<template>
  <router-view />
  <XPToast v-if="xpToast" :xp="xpToast.xp" :new-badges="xpToast.newBadges" @done="learn.clearToast()" />
  <CookieBanner />
</template>

<script setup>
import { computed } from 'vue'
import XPToast     from '@/components/XPToast.vue'
import CookieBanner from '@/components/CookieBanner.vue'
import { useLearnStore } from '@/stores/learn'

const learn   = useLearnStore()
const xpToast = computed(() => learn.xpToast)
</script>
