import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ObservationsService } from './observations.service'
import { ObservationsResolver } from './observations.resolver'
import { Bird } from 'src/birds/entities/bird.entity'
import { BirdsService } from 'src/birds/birds.service'
import { Location } from 'src/locations/entities/location.entity'
import { Observation } from './entities/observation.entity'
import { LocationsService } from 'src/locations/locations.service'
import { NotificationsModule } from 'src/notifications/notifications.module'
import { User } from 'src/users/entities/user.entity'
import { UsersService } from 'src/users/users.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Bird, Location, Observation, User]),
    NotificationsModule,
  ],
  providers: [
    BirdsService,
    LocationsService,
    ObservationsResolver,
    ObservationsService,
    UsersService,
  ],
})
export class ObservationsModule {}
