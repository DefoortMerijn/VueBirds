import Observation from './interface.observation'

export interface User {
  id?: string
  uid: string
  observations?: Observation[]
  observationCount: number
  createdAt?: Date
  updatedAt?: Date
}
