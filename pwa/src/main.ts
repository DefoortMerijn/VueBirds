import { App as VueApp, createApp } from 'vue'

import '@unocss/reset/tailwind.css'
import 'uno.css'

import App from './App.vue'
import router from './bootstrap/router'
import useAuthentication from './composable/useAuthentication'
import usei18n from './composable/usei18n'

//COMPOSABLES
const { restoreUser } = useAuthentication()
const { i18n, loadLocale } = usei18n()

//APP INSTANCE
const app: VueApp = createApp(App)

//I18N
loadLocale('en')
app.use(i18n)

//RESTORE USER
;(async function () {
  await restoreUser()
  app.use(router)

  app.mount('#app')
})()
