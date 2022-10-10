import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Bird } from '../birds/entities/bird.entity'
import * as jsonBirdsSeed from './data/scraped-birds.json' //tsconfig "resolveJsonModule": true,

@Injectable()
export class DatabaseSeedService {
  constructor(
    @InjectRepository(Bird)
    private birdsRepository: Repository<Bird>,
  ) {}

  async addAllBirds(): Promise<Bird[]> {
    const theBirds: Bird[] = []

    for (const jsonb of jsonBirdsSeed) {
      const b = new Bird()
      b.name = jsonb.name
      b.fullname = jsonb.fullname
      b.category = jsonb.category
      b.observations = 0
      b.url = jsonb.url
      b.description = jsonb.description

      theBirds.push(b)
    }

    return this.birdsRepository.save(theBirds)
  }

  async deleteAllBirds(): Promise<void> {
    await this.birdsRepository.delete({})
    return Promise.resolve()
  }
}
