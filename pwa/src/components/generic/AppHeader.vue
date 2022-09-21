<template>
  <header class=" bg-neutral-100 px-6 py-6">
    <nav class="max-w-6xl mx-auto flex items-center justify-between">
      <router-link to="/" class="focus-visible:ring-2 outline-none rounded-md">
        <Logo class="h-12 w-12 justify-start " />
      </router-link>
      <AppNav class="hidden sm:flex"/>
    </nav>
  </header>
</template>

<script lang="ts">
import Logo from './Logo.vue'
import AppNav from './AppNav.vue';

export default {
  setup() {
  },
  components: { Logo, AppNav },
}
</script>
