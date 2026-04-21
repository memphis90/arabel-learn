<template>
  <div style="display:flex;height:100vh;background:#05050f;position:relative;overflow:hidden">
    <StarBackground />
    <AppSidebar />
    <div style="flex:1;display:flex;flex-direction:column;overflow:hidden;position:relative;z-index:1">
      <AppHeader :breadcrumbs="[{ label: 'Classifiche' }]" />
      <div style="flex:1;overflow-y:auto;padding:28px 32px">
        <div style="max-width:720px;margin:0 auto">

          <!-- TODO: implement leaderboard -->
          <!-- Features needed:
            - Weekly / All-time toggle
            - Rank by XP or lessons completed
            - Fetch from GET /api/learn/leaderboard (to be created)
            - Backend: query UserLearnStats JOIN users ORDER BY xp DESC LIMIT 50
            - Highlight current user row
            - Podium (top 3) with special styling
            - Pagination or infinite scroll for rest
          -->

          <div style="text-align:center;padding:80px 20px">
            <div style="font-size:3rem;margin-bottom:16px">🏆</div>
            <h2 style="margin:0 0 8px;font-size:1.4rem;font-weight:700;color:#e4e6f4">Classifiche</h2>
            <p style="margin:0 0 24px;font-size:0.9rem;color:rgba(228,230,244,0.4)">
              Prossimamente — compete con gli altri studenti per scalare la classifica
            </p>
            <div style="display:inline-flex;align-items:center;gap:8px;padding:8px 16px;border-radius:99px;background:rgba(99,102,241,0.08);border:1px solid rgba(99,102,241,0.2);font-size:0.78rem;color:#818cf8;font-weight:600">
              🚧 In sviluppo
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import StarBackground from '@/components/StarBackground.vue'
import AppSidebar     from '@/components/AppSidebar.vue'
import AppHeader      from '@/components/AppHeader.vue'
</script>
