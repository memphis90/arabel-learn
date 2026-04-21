<template>
  <div style="position:fixed;top:24px;right:24px;z-index:1000;padding:12px 20px;border-radius:12px;background:rgba(12,12,28,0.95);border:1px solid rgba(99,102,241,0.4);box-shadow:0 8px 32px rgba(99,102,241,0.2);display:flex;align-items:center;gap:10px;animation:slideIn 0.3s ease">
    <div style="width:32px;height:32px;border-radius:50%;background:rgba(99,102,241,0.15);display:flex;align-items:center;justify-content:center;font-size:1rem">⚡</div>
    <div>
      <div style="font-size:0.72rem;color:rgba(228,230,244,0.45);margin-bottom:1px">XP guadagnati</div>
      <div style="font-size:1rem;font-weight:700;color:#818cf8">+{{ xp }} XP</div>
    </div>
    <div v-if="newBadges?.length" style="margin-left:4px">
      <div v-for="b in newBadges" :key="b" style="font-size:0.72rem;color:#c084fc">🏅 Badge: {{ b }}</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

const props = defineProps({
  xp:        { type: Number, required: true },
  newBadges: { type: Array, default: () => [] },
})
const emit = defineEmits(['done'])

onMounted(() => setTimeout(() => emit('done'), 2800))
</script>
