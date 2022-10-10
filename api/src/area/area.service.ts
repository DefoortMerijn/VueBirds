import { Injectable } from '@nestjs/common'
import { CreateAreaInput } from './dto/create-area.input'
import { UpdateAreaInput } from './dto/update-area.input'
import { Area } from './entities/area.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository } from 'typeorm'
import { ObjectId } from 'mongodb'

@Injectable()
export class AreaService {
  constructor(
    @InjectRepository(Area)
    private readonly areaRepository: Repository<Area>,
  ) {}

  create(createAreaInput: CreateAreaInput): Promise<Area> {
    const area = new Area()
    area.name = createAreaInput.name
    area.area = createAreaInput.area
    area.observationsId = createAreaInput.observationsId
    return this.areaRepository.save(area)
  }

  findAll(): Promise<Area[]> {
    return this.areaRepository.find()
  }

  findOne(id: string): Promise<Area> {
    //@ts-ignore
    return this.areaRepository.findOneBy(new ObjectId(id))
  }

  update(updateareaInput: UpdateAreaInput): Promise<Area> {
    this.areaRepository.update(updateareaInput.id, updateareaInput)
    return this.areaRepository.findOneBy({ id: updateareaInput.id })
  }

  async remove(id: string): Promise<DeleteResult> {
    return this.areaRepository.delete(id)
  }
}
