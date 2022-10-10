import { InputType, Field } from '@nestjs/graphql'
import { Bird } from 'src/birds/entities/bird.entity'
import { Area } from 'src/area/entities/Area.entity'

@InputType()
export class CreateObservationInput {
  @Field()
  name: string

  @Field()
  userId: string

  @Field({ nullable: true })
  weather?: string

  @Field()
  birdId: string

  @Field()
  areaId: string

  @Field({ nullable: true })
  description?: string

  @Field({ nullable: true })
  active?: boolean
}
