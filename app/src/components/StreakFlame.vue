<template>
  <div style="display:flex;align-items:center;gap:5px;padding:5px 10px;border-radius:99px;background:rgba(245,158,11,0.12);border:1px solid rgba(245,158,11,0.25)">
    <span style="font-size:0.9rem">🔥</span>
    <span style="font-size:0.82rem;font-weight:600;color:#f59e0b">{{ count }}</span>
    <span style="font-size:0.72rem;color:rgba(245,158,11,0.7)">giorni</span>
  </div>
</template>

<script setup>
defineProps({ count: { type: Number, required: true } })
</script>
