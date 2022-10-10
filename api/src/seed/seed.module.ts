import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Bird } from '../birds/entities/bird.entity'
import { DatabaseSeedService } from './seed.service'
import { DatabaseSeedCommand } from './seed.command'
import { CommandModule } from 'nestjs-command'

@Module({
  imports: [TypeOrmModule.forFeature([Bird]), CommandModule],
  providers: [DatabaseSeedCommand, DatabaseSeedService],
})
export class DatabaseSeedModule {}
