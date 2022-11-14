<template>
  <ul
    class="grid w-full grid-cols-4 items-center text-center text-xs font-medium sm:w-auto sm:space-x-3 sm:text-left sm:text-sm"
  >
    <li>
      <router-link
        exact-active-class="text-cyan-500"
        to="/"
        class="inline-block rounded-md px-3 py-6 outline-none focus-visible:ring-2"
      >
        <Home class="mx-auto mb-2 h-5 sm:hidden" /> Home
      </router-link>
    </li>
    <li>
      <router-link
        active-class="text-cyan-500"
        to="/birds"
        class="inline-block rounded-md px-3 py-6 outline-none focus-visible:ring-2"
      >
        <Feather class="mx-auto mb-2 h-5 sm:hidden" /> Birds
      </router-link>
    </li>
    <li>
      <router-link
        active-class="text-cyan-500"
        to="/observations"
        class="inline-block rounded-md px-3 py-6 outline-none focus-visible:ring-2"
      >
        <Scroll class="mx-auto mb-2 h-5 sm:hidden" />
        Observations
      </router-link>
    </li>
    <li class="sm:hidden">
      <router-link
        active-class="text-cyan-500"
        to="/account"
        class="inline-block rounded-md px-3 py-6 outline-none focus-visible:ring-2"
      >
        <User class="mx-auto mb-2 h-5 sm:hidden" /> User
      </router-link>
    </li>

    <li class="hidden pl-6 sm:block">
      <router-link
        active-class="text-cyan-500"
        to="/account"
        class="inline-block rounded-md px-3 py-6 outline-none focus-visible:ring-2"
      >
        {{ user ? user?.displayName : 'Login' }}
      </router-link>
    </li>
  </ul>
</template>

<script lang="ts">
import useAuthentication from '../../composable/useAuthentication'
import { Home, Feather, Scroll, Clipboard, User } from 'lucide-vue-next'

export default {
  setup() {
    const { user } = useAuthentication()
    return {
      user,
    }
  },
  components: { Home, Feather, Scroll, Clipboard, User },
}
</script>
