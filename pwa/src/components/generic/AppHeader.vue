<template>
  <header class="bg-neutral-100 px-6 py-6">
    <nav class="mx-auto flex max-w-6xl items-center justify-between">
      <router-link to="/" class="rounded-md outline-none focus-visible:ring-2">
        <Logo class="h-12 w-12 justify-start" />
      </router-link>
      <AppNav class="hidden sm:flex" />
    </nav>
  </header>
</template>

<script lang="ts">
import Logo from './Logo.vue'
import AppNav from './AppNav.vue'

export default {
  setup() {},
  components: { Logo, AppNav },
}
</script>
