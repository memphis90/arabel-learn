<template>
  <Transition name="cookie-banner">
    <div v-if="visible" class="cookie-banner">
      <div class="cookie-banner__inner">
        <p class="cookie-banner__text">
          Utilizziamo cookie tecnici per garantire il funzionamento del sito e, con il tuo consenso,
          cookie analitici per migliorare la tua esperienza.
          <a href="#" class="cookie-banner__link" @click.prevent>Informativa sui cookie</a>
        </p>
        <div class="cookie-banner__actions">
          <button class="cookie-banner__btn cookie-banner__btn--secondary" @click="choose('essential')">
            Solo essenziali
          </button>
          <button class="cookie-banner__btn cookie-banner__btn--primary" @click="choose('full')">
            Accetta tutti
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const STORAGE_KEY = 'arabel-learn-consent'
const visible = ref(false)

onMounted(() => {
  if (!localStorage.getItem(STORAGE_KEY)) visible.value = true
})

function choose(consent) {
  localStorage.setItem(STORAGE_KEY, consent)
  visible.value = false
}
</script>

<style scoped>
.cookie-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  padding: 16px 24px;
  background: rgba(15, 12, 40, 0.97);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.85);
}

.cookie-banner__inner {
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
}

.cookie-banner__text {
  flex: 1;
  min-width: 240px;
  font-size: 0.85rem;
  line-height: 1.55;
  margin: 0;
}

.cookie-banner__link { color: #a5b4fc; }
.cookie-banner__link:hover { text-decoration: underline; }

.cookie-banner__actions {
  display: flex;
  gap: 10px;
  flex-shrink: 0;
}

.cookie-banner__btn {
  padding: 8px 18px;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: background 0.15s, opacity 0.15s;
}

.cookie-banner__btn--secondary {
  background: transparent;
  border: 1px solid currentColor;
  opacity: 0.65;
}
.cookie-banner__btn--secondary:hover { opacity: 1; }

.cookie-banner__btn--primary { background: #6366f1; color: #fff; }
.cookie-banner__btn--primary:hover { background: #4f46e5; }

.cookie-banner-enter-active { transition: transform 0.25s ease, opacity 0.25s ease; }
.cookie-banner-leave-active { transition: transform 0.2s ease, opacity 0.2s ease; }
.cookie-banner-enter-from, .cookie-banner-leave-to { transform: translateY(100%); opacity: 0; }
</style>
