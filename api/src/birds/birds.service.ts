import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, ObjectID, Repository } from 'typeorm'
import { CreateBirdInput } from './dto/create-bird.input'
import { UpdateBirdInput } from './dto/update-bird.input'
import { Bird } from './entities/bird.entity'
import { ObjectId } from 'mongodb'

@Injectable()
export class BirdsService {
  constructor(
    @InjectRepository(Bird) private readonly birdRepo: Repository<Bird>,
  ) {}
  create(createBirdInput: CreateBirdInput): Promise<Bird> {
    return this.birdRepo.save(createBirdInput)
  }

  findAll(): Promise<Bird[]> {
    return this.birdRepo.find()
  }

  findOne(id: string): Promise<Bird> {
    // @ts-ignore
    return this.birdRepo.findOne(new ObjectId(id))
  }

  async update(updateBirdInput: UpdateBirdInput): Promise<Bird> {
    this.birdRepo.update(updateBirdInput.id, updateBirdInput)
    return this.birdRepo.findOneBy({ id: updateBirdInput.id })
  }

  remove(id: string): Promise<DeleteResult> {
    // @ts-ignore
    return this.birdRepo.delete(new ObjectId(id))
  }
}
