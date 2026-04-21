<template>
  <div style="display:flex;align-items:center;gap:5px;padding:5px 10px;border-radius:99px;background:rgba(99,102,241,0.12);border:1px solid rgba(99,102,241,0.25)">
    <span style="font-size:0.72rem;color:rgba(99,102,241,0.8)">LV</span>
    <span style="font-size:0.85rem;font-weight:700;color:#818cf8">{{ level }}</span>
  </div>
</template>

<script setup>
defineProps({ level: { type: Number, required: true } })
</script>
