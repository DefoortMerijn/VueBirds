import { Module } from '@nestjs/common'
import { ObservationsService } from './observations.service'
import { ObservationsResolver } from './observations.resolver'
import { BirdsModule } from 'src/birds/birds.module'
import { Observation } from './entities/observation.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Bird } from 'src/birds/entities/bird.entity'
import { BirdsService } from 'src/birds/birds.service'
import { AreaService } from 'src/area/area.service'
import { AreaModule } from 'src/area/area.module'
import { Area } from 'src/area/entities/area.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Observation, Bird, Area])],
  providers: [
    ObservationsResolver,
    ObservationsService,
    BirdsService,
    AreaService,
  ],
})
export class ObservationsModule {}
