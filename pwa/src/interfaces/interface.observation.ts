import Location from './interface.location'
import Bird from './interface.bird'

export default interface Observation {
  id?: string
  name: string
  userId: string
  weather?: string
  bird: Bird
  location: Location
  description?: string
  active?: boolean
  createdAt?: Date
  updatedAt?: Date
}
