<template>
    <router-view class="min-h-screen bg-neutral-50"></router-view>
  </template>
  
  <script lang="ts">
  import { provide } from '@vue/runtime-core'
  import { DefaultApolloClient } from '@vue/apollo-composable'
  import useFirebase from './composable/useFirebase'
  import useGraphQL from './composable/useGraphQL'
  export default {
    setup() {
      const { app } = useFirebase()
      const { apolloClient } = useGraphQL()
      provide(DefaultApolloClient, apolloClient)
      return {}
    },
  }
  </script>
