<template>
  <div style="display:flex;height:100vh;background:#05050f;overflow:hidden">
    <AppSidebar />
    <div style="flex:1;display:flex;flex-direction:column;overflow:hidden">
      <AppHeader :breadcrumbs="[{ label: 'Amici' }]" />
      <div style="flex:1;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:16px;color:rgba(228,230,244,0.25)">
        <div style="font-size:3rem">👥</div>
        <div style="font-size:1rem;font-weight:600;color:rgba(228,230,244,0.35)">Amici</div>
        <div style="font-size:0.82rem;text-align:center;max-width:300px;line-height:1.6">
          Sfida i tuoi amici, confronta i progressi e studia insieme.<br>
          <span style="color:rgba(99,102,241,0.5);font-weight:600">Prossimamente</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppSidebar from '@/components/AppSidebar.vue'
import AppHeader  from '@/components/AppHeader.vue'
</script>
