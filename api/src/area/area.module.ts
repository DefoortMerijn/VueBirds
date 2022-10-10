import { Module } from '@nestjs/common'
import { AreaService } from './area.service'
import { AreaResolver } from './area.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Area } from './entities/area.entity'
import { Observation } from 'src/observations/entities/observation.entity'
import { ObservationsService } from 'src/observations/observations.service'

@Module({
  imports: [TypeOrmModule.forFeature([Area, Observation])],
  providers: [AreaResolver, AreaService, ObservationsService],
})
export class AreaModule {}
