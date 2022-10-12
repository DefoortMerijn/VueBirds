import gql from 'graphql-tag'

export const GET_USER_BY_UID = gql`
  query getUserByUid($uid: String!) {
    findByUid(uid: $uid) {
      id
      uid
      observations {
        id
        name
        description
        createdAt
        updatedAt
      }
      observationCount
      createdAt
      updatedAt
    }
  }
`
