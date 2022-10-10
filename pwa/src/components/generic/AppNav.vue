<template>
  <ul
    class="grid w-full grid-cols-4 items-center text-center text-xs font-medium sm:w-auto sm:space-x-3 sm:text-left sm:text-sm"
  >
    <li>
      <router-link exact-active-class="text-cyan-500" to="/" class="px-3 py-6 focus-visible:ring-2 outline-none inline-block rounded-md">      <Home class="h-5 mx-auto mb-2 sm:hidden" />
 Home </router-link>
    </li>
    <li>
      <router-link active-class="text-cyan-500" to="/birds" class="px-3 py-6 focus-visible:ring-2 outline-none inline-block rounded-md">      <Feather class="h-5 mx-auto mb-2 sm:hidden" />
 Birds </router-link>
    </li>
    <li>
      <router-link active-class="text-cyan-500" to="/observations" class="px-3 py-6 focus-visible:ring-2 outline-none inline-block rounded-md">
        <Scroll class="h-5 mx-auto mb-2 sm:hidden" />
Observations
      </router-link>
    </li>
    <li class="sm:hidden">
      

      <router-link active-class="text-cyan-500" to="/account" class="px-3 py-6 focus-visible:ring-2 outline-none inline-block rounded-md">
        <User class="h-5 mx-auto mb-2 sm:hidden" /> User </router-link>
    </li>

    <li class="pl-6 sm:block hidden">
      <router-link active-class="text-cyan-500" to="/account" class="px-3 py-6 focus-visible:ring-2 outline-none inline-block rounded-md">
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
  components: { Home,Feather, Scroll, Clipboard, User },
}
</script>
