<template>
  <div class="">
    <form @submit.prevent="submitForm">
      <header>
        <h2 class="mb-6 text-3xl font-bold text-neutral-600">Register</h2>
      </header>
      <div
        v-if="errorMessage"
        class="mb-3 flex items-center justify-between rounded-md bg-red-300 px-3 py-1"
      >
        <p class="text-sm text-red-600">{{ errorMessage }}</p>
        <button
          @click="errorMessage = ''"
          class="rounded-full p-3 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          <X class="h-4 w-4 text-red-600" />
        </button>
      </div>
      <div>
        <label
          class="mb-1 block text-neutral-500 focus-within:text-neutral-900"
          for="password"
        >
          <span class="mb-2 block">Name</span>
          <input
            type="text"
            id="name"
            name="name"
            v-model="userInput.name"
            data-cy="name"
            class="border-1 text w-full rounded-md border-neutral-200 px-3 py-1 text-neutral-800 outline-none ring-neutral-300 focus-visible:ring-2"
          />
        </label>
      </div>
      <div class="mt-3">
        <label
          class="mb-1 block text-neutral-500 focus-within:text-neutral-900"
          for="email"
        >
          <span class="mb-2 block">Email</span>
          <input
            type="email"
            id="email"
            name="email"
            autocomplete="email"
            data-cy="email"
            v-model="userInput.email"
            class="border-1 text w-full rounded-md border-neutral-200 px-3 py-1 text-neutral-800 outline-none ring-neutral-300 focus-visible:ring-2"
          />
        </label>
      </div>
      <div>
        <label
          class="mb-1 block text-neutral-500 focus-within:text-neutral-900"
          for="password"
        >
          <span class="mb-2 block">Password</span>
          <input
            type="password"
            id="password"
            name="password"
            autocomplete="current-password"
            data-cy="password"
            v-model="userInput.password"
            class="border-1 text w-full rounded-md border-neutral-200 px-3 py-1 text-neutral-800 outline-none ring-neutral-300 focus-visible:ring-2"
          />
        </label>
      </div>
      <button
        class="mt-6 flex w-full items-center justify-center rounded-md bg-neutral-700 py-2 px-3 text-white outline-none ring-neutral-300 hover:bg-neutral-900 focus-visible:ring-2"
        :disabled="loading"
        data-cy="register"
      >
        <span v-if="!loading">Create Account</span>
        <div v-else>
          <Loader2 class="animate-spin" />
        </div>
      </button>
      <p class="mt-3 text-center text-sm">
        <RouterLink
          to="/auth/login"
          class="rounded-sm outline-none ring-neutral-300 hover:underline focus-visible:ring"
        >
          Already have an account
        </RouterLink>
      </p>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, Ref } from 'vue'
import { X, Loader2 } from 'lucide-vue-next'
import useAuthentication from '../../composable/useAuthentication'
import { useRouter } from 'vue-router'
import useCustomUser from '../../composable/useCustomUser'

export default defineComponent({
  components: {
    X,
    Loader2,
  },
  setup() {
    const { register } = useAuthentication()
    const { createCustomUser } = useCustomUser()
    const { replace } = useRouter()
    const errorMessage: Ref<string> = ref('')
    const loading: Ref<boolean> = ref(false)
    const userInput = reactive({
      name: '',
      email: '',
      password: '',
    })

    const submitForm = () => {
      loading.value = true
      if (
        userInput.name === '' ||
        userInput.email === '' ||
        userInput.password === ''
      ) {
        loading.value = false
        errorMessage.value = 'please fill in all fields'
        return
      }

      console.log(userInput)

      register(userInput.name, userInput.email, userInput.password)
        .then((u) => {
          // TODO: make a custom user in our own backend
          // #1 Check graphql for needed values
          // #2 Create a user in our own backend in composable
          if (u.value) createCustomUser()

          console.log('User created: ', u)
          return replace('/')
        })
        .catch((error) => {
          errorMessage.value = error.message
        })
        .finally(() => {
          loading.value = false
        })
    }

    return {
      errorMessage,
      loading,
      userInput,
      submitForm,
    }
  },
})
</script>
