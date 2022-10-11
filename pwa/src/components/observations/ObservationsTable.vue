<template>
    <table class="w-full mt-5">
        <tr>
            <th>Image</th>
            <th>Bird</th>
            <th>Location</th>
            <th>Name</th>
            <th>User</th>
            <th>Spotted on</th>
        </tr>
        <tbody v-if="observations.length > 0">
        <tr class=" text-center"  v-for="ob of observations" :key="ob.id">
            
            <td><img :src="`./birds/${ob.bird.name}.webp`" class="h-8 mx-auto"></td>
            <td>{{ob.name}}</td>
            <td>{{ob.location.name}}</td>
            <td>{{ob.bird.name}}</td>
            <td>{{ob.userId}}</td>
            <td>{{new Date(ob.createdAt!).toLocaleDateString()}}</td>
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