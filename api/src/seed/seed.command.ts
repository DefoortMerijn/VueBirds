import { Command } from 'nestjs-command'
import { Injectable } from '@nestjs/common'
import { DatabaseSeedService } from './seed.service'

@Injectable()
export class DatabaseSeedCommand {
  constructor(private readonly seedService: DatabaseSeedService) {}

  @Command({
    command: 'seed:database',
    describe: 'seed the database',
  })
  async seed() {
    console.log('🌱 Start seeding')
    const r = await this.seedService.addAllBirds()
    console.log(r)
    console.log('🌱 Seeding done 🏁')
  }

  @Command({
    command: 'seed:reset',
    describe: 'delete all data from the database',
  })
  async delete() {
    console.log('🌱 Start deleting')
    await this.seedService.deleteAllBirds()
    console.log('🌱 Deleting done 🏁')
  }

  @Command({
    command: 'seed:database:locations',
    describe: 'seed the database with a couple of locations',
  })
  async seedLocations() {
    const l = await this.seedService.addAllLocations()
    console.log(`Added ${l.length} locations: `, l)
  }

  @Command({
    command: 'seed:database:observations',
    describe: 'seed the database with an observation',
  })
  async seedObservations() {
    const o = await this.seedService.addAllObservations()
    console.log(`Added ${o.length} observations: `, o)
  }
}
