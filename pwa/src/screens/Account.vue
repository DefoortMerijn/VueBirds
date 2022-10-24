<template>
  <route-holder :title="`Hi, ${user?.displayName}`">
    <template #header-actions>
      <button
        class="@dark:bg-neutral-50 @dark:text-neutral-800 mt-6 rounded-md bg-neutral-800 px-4 py-2 text-white"
        @click="handleLogOut"
      >
        Log out
      </button>
    </template>

    <div class="grid grid-cols-3 mb-12">
      <div class="">
      <h2 class="font-theme mb-3 text-2xl font-medium tracking-wide">Stats</h2>
      <p>Birds spotted: {{ customUser?.observationCount }}</p>
    </div>
    <div class="span-2">
      <h2 class="font-theme mb-3 text-2xl font-medium tracking-wide">Realtime</h2>
   <div class="flex items-center gap-3">
    <input type="checkbox" v-model="connectedToServer" id="server">
    <label for="server">Connect to server</label>
   </div>
    </div>

    </div>


    <div v-if="customUser">
      <h2 class="font-theme mb-3 text-2xl font-medium tracking-wide">
        Recent observations
      </h2>
      <observations-table :observations="customUser.observations!" />
    </div>
  </route-holder>
</template>

<script lang="ts">
import RouteHolder from '../components/holders/RouteHolder.vue'
import useAuthentication from '../composable/useAuthentication'
import { useRouter } from 'vue-router'
import useCustomUser from '../composable/useCustomUser'
import ObservationsTable from '../components/observations/ObservationsTable.vue'
import useSocket from '../composable/useSocket'
import { ref } from 'vue'
import { watch } from 'vue-demi'
import { disconnect } from 'process'


export default {
  components: {
    RouteHolder,
    ObservationsTable,
  },

  setup() {
    const { user, logout } = useAuthentication()
    const { customUser } = useCustomUser()
    const { replace } = useRouter()
    let toggleState = "on"
    const {connectToServer,disconnectFromServer, connected} = useSocket()

    const connectedToServer = ref<boolean>(connected.value)

    const handleLogOut = () => {
      logout().then(() => {
        return replace('/auth/login')
      })
    }

    const toggle = () => {

      if (toggleState == "on") {
        toggleState = "off"
        console.log(toggleState);
        
      } else {
        toggleState = "on"
        console.log(toggleState);
      }
    }

    const getToken = async () => {
      // console.log(await user.value?.getIdToken())
    }
    getToken()

    watch(connectedToServer, () => {
      if (connectedToServer.value === true) {
        connectToServer()
      } else {
        disconnectFromServer()
      }
    })


    return {
      user,
      customUser,
      toggle,
      connectedToServer,

      toggleState,
      handleLogOut,
      
    }
  },
}
</script>