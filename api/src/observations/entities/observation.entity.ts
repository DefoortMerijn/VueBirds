import { Field, ID, ObjectType } from '@nestjs/graphql'
import { ObjectId } from 'mongodb'
import { Bird } from 'src/birds/entities/bird.entity'
import { Area } from 'src/area/entities/area.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
@ObjectType({ description: 'observations' })
export class Observation {
  @Field(() => ID)
  @ObjectIdColumn()
  id: ObjectId

  @Field()
  @Column()
  name: string

  @Field()
  @Column()
  userId: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  weather?: string

  @Field(() => Bird)
  bird: Bird

  @Column()
  birdId: string

  @Field(() => Area)
  area: Area

  @Column()
  areaId: string

  @Field({ nullable: true })
  @Column()
  description?: string

  @Field({ nullable: true })
  @Column()
  active?: boolean

  @Field({ nullable: true })
  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date
}
