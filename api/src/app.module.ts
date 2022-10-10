import { Module } from '@nestjs/common'

import { BirdsModule } from './birds/birds.module'
import { ObservationsModule } from './observations/observations.module'
import { LocationsModule } from './locations/locations.module'
import { BootstrapModule } from './bootstrap/bootstrap.module'
import { DatabaseSeedModule } from './seed/seed.module'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [
    BootstrapModule,
    BirdsModule,
    ObservationsModule,
    LocationsModule,
    DatabaseSeedModule,
    AuthModule,
  ],

  exports: [],

  providers: [],
})
export class AppModule {}
