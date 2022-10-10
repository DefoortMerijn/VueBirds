<template>
    <table class="w-full mt-5">
        <tr>
            <th>Image</th>
            <th>Bird</th>
            <th>Area</th>
            <th>Name</th>
            <th>User</th>
            <th>Spotted on</th>
        </tr>
        <tbody v-if="observations.length > 0">
        <tr class=" text-center"  v-for="o of observations" :key="o.id">
            
            <td><img :src="`./birds/${o.bird.name}.webp`" class="h-8 mx-auto"></td>
            <td>{{o.name}}</td>
            <td>{{o.area.name}}</td>
            <td>{{o.bird.name}}</td>
            <td>{{o.userId}}</td>

            <td>{{new Date(o.createdAt).toLocaleDateString()}}</td>
        </tr>
        </tbody>
    <tbody v-else>
        <p>No observations yet.</p>
    </tbody>
    </table>
</template>

<script lang="ts">
import {defineProps} from 'vue'
import Observation from '../../interfaces/interface.observation'
export default {
    props: {
        observations: {
            type: Array as () => Observation[],
            required: true
        }
    },
    //@ts-ignore
    setup(props) {

        return {
            observations: props.observations
        }
    },
}

</script>