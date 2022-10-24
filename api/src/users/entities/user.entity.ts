import { ObjectType, Field, ID, Int } from '@nestjs/graphql'
import { ObjectId } from 'mongodb'
import { Observation } from 'src/observations/entities/observation.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Role } from './role.entity'

@Entity()
@ObjectType({ description: 'observations' })
export class User {
  @Field(() => ID)
  @ObjectIdColumn()
  id: ObjectId

  @Field()
  @Column({ unique: true })
  uid: string

  @Field(() => Role, { nullable: true })
  @Column({ default: { name: 'user' } })
  role?: Role

  @Field(() => [Observation], { nullable: 'itemsAndList' })
  @Column({ nullable: true })
  observations: Observation[]

  @Field(() => Int)
  @Column()
  observationCount: number

  @Field({ nullable: true })
  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date
}
