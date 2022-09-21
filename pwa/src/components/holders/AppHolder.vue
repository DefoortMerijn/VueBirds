<template>
    <div>
        <WebNav/>
        <router-view></router-view>
        
        <AppFooter/>
    </div>
</template>

<script lang="ts">
import AppFooter from '../generic/AppFooter.vue';
import WebNav from '../generic/WebNav.vue';
    export default {
        components: {
    AppFooter,
    WebNav
    
},
    }
</script>