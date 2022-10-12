<template>
  <route-holder :title="`Hi, ${user?.displayName }`" class="flex flex-col items-center justify-center w-full">
    <p class="font-theme font-thin pb-6">UID: {{customUser?.uid}}</p>
    <div class="flex justify-center items-center">
    <button class="shadow px-6 py-1 font-theme font-thin mx-auto" @click="handleLogOut">Log out</button>
  </div>
  </route-holder>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
import useAuthentication from '../composable/useAuthentication'
import RouteHolder from '../components/holders/RouteHolder.vue'
import  useCustomUser from '../composable/useCustomUser'

export default {
    setup() {
      

        const { user, logout } = useAuthentication();
        const {customUser} = useCustomUser()
        const { replace } = useRouter();

        console.log( customUser);
        const handleLogOut = () => {
            logout().then(() => {
                replace("/auth/login");
            });
        };
        ;(async () => {
      console.log(await user.value?.getIdToken())
      
    })()
        return {
            user,
            handleLogOut,
            customUser

        };
    },
    components: { RouteHolder }
}
</script>
