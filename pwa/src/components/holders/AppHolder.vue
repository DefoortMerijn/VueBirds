<template>
    <div>
        <router-view></router-view>
        <AppFooter/>
    </div>
</template>

<script lang="ts">
import AppFooter from '../generic/AppFooter.vue';
    export default {
        components: {
            AppFooter,
        },
    }
</script>