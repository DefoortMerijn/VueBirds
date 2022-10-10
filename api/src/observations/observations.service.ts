import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository } from 'typeorm'
import { CreateObservationInput } from './dto/create-observation.input'
import { UpdateObservationInput } from './dto/update-observation.input'
import { Observation } from './entities/observation.entity'

@Injectable()
export class ObservationsService {
  constructor(
    @InjectRepository(Observation)
    private readonly observationRepo: Repository<Observation>,
  ) {}

  create(createObservationInput: CreateObservationInput): Promise<Observation> {
    const o = new Observation()
    o.name = createObservationInput.name
    o.description = createObservationInput.description
    o.weather = createObservationInput.weather
    o.birdId = createObservationInput.birdId
    o.userId = createObservationInput.userId
    // TODO: the bird has been spotted!
    o.areaId = createObservationInput.areaId // TODO: something has been spotted on this area!
    o.active = createObservationInput.active
    return this.observationRepo.save(o)
  }

  findAll(): Promise<Observation[]> {
    return this.observationRepo.find()
  }

  findOne(id: string): Promise<Observation> {
    //@ts-ignore
    return this.observationRepo.findOneBy(new ObjectId(id))
  }

  update(updateObservationInput: UpdateObservationInput): Promise<Observation> {
    this.observationRepo.update(
      updateObservationInput.id,
      updateObservationInput,
    )
    return this.observationRepo.findOneBy({ id: updateObservationInput.id })
  }

  remove(id: string): Promise<DeleteResult> {
    return this.observationRepo.delete(id)
  }
}
