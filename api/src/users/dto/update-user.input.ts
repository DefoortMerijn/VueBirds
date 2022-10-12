import { InputType, Field, PartialType, ID, Int } from '@nestjs/graphql'
import { ObjectId } from 'mongodb'
import { CreateObservationInput } from 'src/observations/dto/create-observation.input'
import { Observation } from 'src/observations/entities/observation.entity'
import { CreateUserInput } from './create-user.input'

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field()
  id: string

  @Field(() => [CreateObservationInput], { nullable: 'itemsAndList' })
  observations: Observation[]

  @Field(() => Int)
  observationCount: number
}
