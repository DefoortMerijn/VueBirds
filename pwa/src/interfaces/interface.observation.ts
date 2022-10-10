import Area from './interface.area'
import Bird from './interface.bird'

export default interface Observation {
  id?: string
  name: string
  userId: string
  weather?: string
  bird: Bird
  lcoation: Area
  description?: string
  active?: boolean
  createdAt?: Date
  updatedAt?: Date
}
