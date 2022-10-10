<template>
    <div class="px-6 py-3">
        <main class="mx-auto max-w-6xl">
            <h1 class="font-theme text-5xl font-bold">
                {{title}}
            </h1>
            <slot></slot>
        </main>
    </div>
    
</template>

<script lang="ts">
export default {
        props: {
            title: {
                type: String as () => String,
                required: true,
            },
        },
        setup() {
            return {
               
            }
        },
    }
</script>