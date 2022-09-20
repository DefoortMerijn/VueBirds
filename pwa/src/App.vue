<template>
    <router-view></router-view>
    <!-- bij Angular routes achter, Vue tussen-->
</template>

<script lang="ts">
import useFirebase from './composable/useFirebase'

export default {
        setup() {
            const { app } = useFirebase()

            console.log(app)
            return{}
        },
    }
</script>
