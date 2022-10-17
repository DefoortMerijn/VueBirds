import { InputType, Int, Field } from '@nestjs/graphql'
import { Point } from 'geojson'
import { GeoPoint } from 'src/locations/entities/geopoint.entity'


@InputType()
export class CreateLivelocationInput {
  @Field(() => String, { description: 'User id' })
  idUser: string

  @Field(() => GeoPoint, { description: 'Geolocation' })
  geolocation: Point
}
