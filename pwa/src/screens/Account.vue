<template>
  <div class="flex flex-col items-center justify-center w-full">
    <h1 class="font-theme text-3xl font-regular mb-3">Hi, {{ user?.displayName }}</h1>
    <button class="shadow px-6 py-1 font-theme font-thin" @click="handleLogOut">Log out</button>
  </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
import useAuthentication from '../composable/useAuthentication'

export default {
  setup() {
    const { user, logout } = useAuthentication()
    const { replace } = useRouter()

    const handleLogOut = () => {
      logout().then(() => {
        replace('/auth/login')
      })
    }

    return {
      user,
      handleLogOut,
    }
  },
}
</script>
