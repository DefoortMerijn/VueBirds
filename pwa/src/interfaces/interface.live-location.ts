import { Point } from 'geojson'

export default interface LiveLocation {
  idUser: string
  geoLocation: Point
}
