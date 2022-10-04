import { Module } from '@nestjs/common'
import { BirdsService } from './birds.service'
import { BirdsResolver } from './birds.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Bird } from './entities/bird.entity'

//TODO: create birds module
//TODO: Module voor locations
//TODO: Module voor users
//TODO: Module voor sightings


@Module({
  imports: [TypeOrmModule.forFeature([Bird])],
  providers: [BirdsResolver, BirdsService],
})
export class BirdsModule {}
