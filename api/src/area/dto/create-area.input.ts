import { InputType, Field } from '@nestjs/graphql'
import { Observation } from 'src/observations/entities/observation.entity'

@InputType()
export class CreateAreaInput {
  @Field()
  name: string

  @Field({ nullable: true })
  observationsId?: string

  @Field()
  area: string
}
