import { Module } from '@nestjs/common'
import { BirdsModule } from './birds/birds.module'
import { ObservationsModule } from './observations/observations.module'
import { AreaModule } from './area/area.module'
import { BootstrapModule } from './bootstrap/bootstrap.module'
import { DatabaseSeedModule } from './seed/seed.module'
//TODO: create birds module

@Module({
  imports: [
    BootstrapModule,
    BirdsModule,
    ObservationsModule,
    AreaModule,
    DatabaseSeedModule,
  ],
})
export class AppModule {}
