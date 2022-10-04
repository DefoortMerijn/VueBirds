import { InputType, Field } from '@nestjs/graphql'
import { Observation } from 'src/observations/entities/observation.entity'

@InputType()
export class CreateAreaInput {
  @Field()
  name: string

  @Field()
  observationsId: string

  @Field()
  location: string
}
