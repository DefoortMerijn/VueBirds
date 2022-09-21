<template>
    <h1>Hi, {{user?.displayName}} </h1>   
    <button @click="handleLogOut"> Log out</button>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
import useAuthentication from '../composable/useAuthentication'
    
export default {
    setup(){
const {user, logout} = useAuthentication()
    const { replace } = useRouter()

    const handleLogOut = () => {
        logout().then(() => {
            replace('/auth/login')
        })
    }

    return {
        user, handleLogOut
    }
}
}
</script>