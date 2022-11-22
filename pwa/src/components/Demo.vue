<template>
  <div>
    <h1>Demo Vue2 vs Vue3</h1>
    <div class="grid grid-cols-2">
      <section>
        <div v-for="i in items" :key="i">
          {{ i }}
        </div>
        <button @click="addItem">Add a number</button>
      </section>
      <section>
        <h2>Favorite Emoji({{ emoji }})</h2>
        <input type="text" v-model="emoji" />
        <button @click="saveEmoji">Save emoji</button>
      </section>
    </div>
  </div>
</template>
<script lang="ts">
import { readonly, ref } from 'vue'

export default {
  name: 'Demo',
  //Vue 3
  setup() {
    const items = ref<number[]>([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
    const emoji = ref<string>(localStorage.emoji ? localStorage.emoji : '🐉')
    const addItem = () => {
      items.value.push(items.value.length + 1)
    }
    const saveEmoji = () => {
      localStorage.setItem('emoji', emoji.value)
    }
    return {
      //items
      items: readonly(items),
      addItem,

      //emoji
      emoji,
      saveEmoji,
    }
  },

  // Vue 2
  //   data() {
  //     return {
  //       items: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  //       emoji: localStorage.emoji ? localStorage.emoji : '🐱',
  //     }
  //   },
  //   methods: {
  //     addItem() {
  //       this.items.push(this.items.length + 1)
  //     },
  //     saveEmoji() {
  //       localStorage.setItem('emoji', this.emoji)
  //     },
  //   },
}
</script>
