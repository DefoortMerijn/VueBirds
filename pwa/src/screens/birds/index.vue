<template>
    <route-holder title="Birds">

    <div class="animate-pulse grid md:grid-cols-4 sm:grid-cols-2 lg:grid-cols-5 gap-12 " v-if="loading">
        <div v-for="i of skeletons" :key="i">
            <div class="aspect-square w-full bg-neutral-200"></div>
            <p class="h-6 my-1 w-12 rounded bg-neutral-200"></p>
            <p class="h-10 w-12 my-2 rounded bg-neutral-100"></p>
        </div>
    
    </div>
    <div v-else-if="error">Error Happend</div>
    <div  class="grid md:grid-cols-4 sm:grid-cols-2 lg:grid-cols-5 gap-12 " v-else-if="result">
      <RouterLink :to="`birds/${b.id}`" v-for="b of result.birds" :key="b.id">
        <img
          class="aspect-square w-full"
          :src="`./birds/${b.name}.webp`"
          :alt="`Drawing of a ${b.name}`"
        />
        <h2 class="font-theme text-2xl font-light">{{ b.name }}</h2>
        <p class="text-sm">{{ b.category }}</p>
      </RouterLink>
    </div>
</route-holder>
</template>

<script lang="ts">
    import gql from 'graphql-tag'
    import { useQuery } from '@vue/apollo-composable'
import { Ref, ref } from 'vue'
    import RouteHolder from '../../components/holders/RouteHolder.vue'
    export default {
        components: {RouteHolder},
      setup() {
        const BIRDS = gql`
          query birds {
            birds {
              id
              name
              url
              description
              category
            }
          }
        `
        const { result, loading, error } = useQuery(BIRDS)

        const skeletons: Ref<number> = ref(10)

        return {
          result,
          loading,
          error,
          skeletons,
          RouteHolder
        }
      },
    }
    </script>