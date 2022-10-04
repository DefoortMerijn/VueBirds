import { Field, ObjectType } from '@nestjs/graphql'

export enum MessageTypes {
  success = 'success',
  error = 'error',
  warning = 'warning',
}

@ObjectType()
export class ClientMessage {
  @Field()
  type: MessageTypes // Todo: make strict enum

  @Field()
  message: string

  @Field()
  statusCode: number
}
