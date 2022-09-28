import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ObjectID, Repository } from 'typeorm'
import { CreateBirdInput } from './dto/create-bird.input'
import { UpdateBirdInput } from './dto/update-bird.input'
import { Bird } from './entities/bird.entity'

@Injectable()
export class BirdsService {
  constructor(
    @InjectRepository(Bird) private readonly birdRepo: Repository<Bird>,
  ) {}
  create(createBirdInput: CreateBirdInput): Promise<Bird> {
    const bird = new Bird()
    bird.name = createBirdInput.name
    bird.fullname = createBirdInput.fullname
    bird.category = createBirdInput.category
    bird.url = createBirdInput.url
    bird.observations = createBirdInput.observations
    bird.description = createBirdInput.description
    return this.birdRepo.save(bird)
  }

  findAll(): Promise<Bird[]> {
    return this.birdRepo.find()
  }

  findOne(id: string): Promise<Bird> {
    // @ts-ignore
    return this.birdRepo.findOne(new ObjectID(id))
  }

  update(updateBirdInput: UpdateBirdInput) {
    const update = new Bird()
    update.id = new ObjectID(updateBirdInput.id)
    update.name = updateBirdInput.name
    update.fullname = updateBirdInput.fullname
    update.category = updateBirdInput.category
    update.url = updateBirdInput.url
    update.observations = updateBirdInput.observations
    update.description = updateBirdInput.description
    return this.birdRepo.save(update)
  }

  remove(id: string) {
    return this.birdRepo.delete(new ObjectID(id))
  }
}
