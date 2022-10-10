import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ObservationsService } from './observations.service'
import { ObservationsResolver } from './observations.resolver'
import { Bird } from 'src/birds/entities/bird.entity'
import { BirdsService } from 'src/birds/birds.service'
import { Area } from 'src/area/entities/area.entity'
import { Observation } from './entities/observation.entity'
import { AreaService } from 'src/area/area.service'

@Module({
  imports: [TypeOrmModule.forFeature([Bird, Area, Observation])],
  providers: [
    BirdsService,
    AreaService,
    ObservationsResolver,
    ObservationsService,
  ],
})
export class ObservationsModule {}
