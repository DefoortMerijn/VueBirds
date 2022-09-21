
<template>
    <header class=" flex bg-neutral-100 items-center px-8 py-4">
    <div class="w-1/2 px-4">
        <Logo class=" h-24 w-24 justify-start "/>
    </div>
    <ul class="font-bold text-2xl flex justify-end gap-22 w-1/2  ">

        <li>
            <p>
                <RouterLink
            to="/"
            class="rounded-sm outline-none ring-neutral-300 hover:underline focus-visible:ring"
            >
            Home
                </RouterLink>
            </p>
        </li>
        <li>
            <p>
                <RouterLink
            to="/birds"
            class="rounded-sm outline-none ring-neutral-300 hover:underline focus-visible:ring"
            >
            Birds
                </RouterLink>
            </p>
        </li>
        <li>
            <p>
                <RouterLink
            to="/log"
            class="rounded-sm outline-none ring-neutral-300 hover:underline focus-visible:ring"
            >
            Log
                </RouterLink>
            </p>
        </li>
        <li>
            <p>
                <RouterLink
            to="/observations"
            class="rounded-sm outline-none ring-neutral-300 hover:underline focus-visible:ring"
            >
            Observations
                </RouterLink>
            </p>
        </li>
        <li>
            <p>
                <RouterLink
                
            to="/account"
            class="rounded-sm outline-none ring-neutral-300 hover:underline focus-visible:ring"
            >
            {{user? user?.displayName : "Login" }}
                </RouterLink>
            </p>
        </li>
    </ul>   

</header> 
</template>

<script lang="ts">
import useAuthentication from '../../composable/useAuthentication'
import Logo from './Logo.vue'
    
        
    export default {
    setup() {
        const { user } = useAuthentication();
  

        return {
            user,
        };
    },
    components: { Logo }
}
    </script>