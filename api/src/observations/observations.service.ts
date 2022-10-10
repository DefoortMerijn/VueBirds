import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ObjectId } from 'mongodb'
import { Repository } from 'typeorm'

import { CreateObservationInput } from './dto/create-observation.input'
import { UpdateObservationInput } from './dto/update-observation.input'
import { Observation } from './entities/observation.entity'

@Injectable()
export class ObservationsService {
  constructor(
    @InjectRepository(Observation)
    private readonly observationRepository: Repository<Observation>,
  ) {}

  create(createObservationInput: CreateObservationInput): Promise<Observation> {
    const o = new Observation()
    o.name = createObservationInput.name
    o.description = createObservationInput.description
    o.weather = createObservationInput.weather
    o.userId = createObservationInput.userId
    o.birdId = createObservationInput.birdId // TODO: the bird has been spotted!
    o.locationId = createObservationInput.locationId // TODO: something has been spotted on this location!
    o.active = createObservationInput.active
    return this.observationRepository.save(o)
  }

  findAll(): Promise<Observation[]> {
    return this.observationRepository.find()
  }

  findOne(id: string): Promise<Observation> {
    //@ts-ignore

    return this.observationRepository.findOne(new ObjectId(id))
  }

  update(updateObservationInput: UpdateObservationInput) {
    this.observationRepository.update(
      updateObservationInput.id,
      updateObservationInput,
    )
    return this.observationRepository.findOneBy({
      id: updateObservationInput.id,
    })
  }

  remove(id: string) {
    //@ts-ignore

    return this.observationRepository.delete(new ObjectId(id))
  }
}
