import { InputType, Field } from '@nestjs/graphql'

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
  locationId: string

  @Field({ nullable: true })
  description?: string

  @Field({ nullable: true })
  active?: boolean
}
