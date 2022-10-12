import { User } from '../interfaces/interface.user'
import { ref, Ref, watch } from 'vue'
import useGraphQL from './useGraphQL'
import { provideApolloClient, useLazyQuery } from '@vue/apollo-composable'
import { GET_USER_BY_UID } from '../graphql/query.user'

const user: Ref<User | null> = ref(null)

export default () => {
  const setCustomUser = (u: User) => (user.value = u)
  const { apolloClient } = useGraphQL()
  provideApolloClient(apolloClient)
  const { result, load, document } = useLazyQuery(GET_USER_BY_UID)

  const loadCustomUser = (uid: string) => {
    load(document.value, { uid })
    console.log(result)
  }

  watch(result, ({ findByUid }) => {
    if (findByUid) setCustomUser(findByUid)

    console.log(user.value)
  })

  return { customUser: user, loadCustomUser }
}
