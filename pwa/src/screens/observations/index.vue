<template>
    <route-holder title="Observations">
        <ObservationsTable v-if="result" :observations="result.observations"/>
    </route-holder>
</template>

<script lang="ts">
    import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import RouteHolder from '../../components/holders/RouteHolder.vue'
    import ObservationsTable from '../../components/observations/ObservationsTable.vue';

    export default {
        components: {RouteHolder, ObservationsTable},
        setup() {
            const OBSERVATIONS = gql`
                query observations {
                    observations {
                        id
                        name
                        bird {
                            id
                            name
                        }
                        area {
                            id
                            name
                        }
                        name
                        userId
                        createdAt
                    }
                }
            `
            const {result, loading, error} = useQuery(OBSERVATIONS)
            return {
                result,
                loading,
                error
            }
        }
    }
</script>