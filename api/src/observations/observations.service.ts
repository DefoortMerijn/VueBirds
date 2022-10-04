import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository } from 'typeorm'
import { CreateObservationInput } from './dto/create-observation.input'
import { UpdateObservationInput } from './dto/update-observation.input'
import { Observation } from './entities/observation.entity'

@Injectable()
export class ObservationsService {
  constructor(
    @InjectRepository(Observation) private readonly areaRepo: Repository<Observation>,
  ) {}

  create(createObservationInput: CreateObservationInput): Promise<Observation> {
    return this.areaRepo.save(createObservationInput)
  }

  findAll(): Promise<Observation[]> {
    return this.areaRepo.find()
  }

  findOne(id: string): Promise<Observation> {
    return this.areaRepo.findOneBy({ id: id })
  }

  update(updateObservationInput: UpdateObservationInput): Promise<Observation> {
    this.areaRepo.update(updateObservationInput.id, updateObservationInput)
    return this.areaRepo.findOneBy({ id: updateObservationInput.id })
  }

  remove(id: string): Promise<DeleteResult> {
    return this.areaRepo.delete(id)
  }
}
