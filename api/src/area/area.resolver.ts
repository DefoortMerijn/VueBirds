import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { AreaService } from './area.service'
import { Area } from './entities/area.entity'
import { CreateAreaInput } from './dto/create-area.input'
import { UpdateAreaInput } from './dto/update-area.input'
import { ObservationsService } from '../observations/observations.service'
import { Observation } from '../observations/entities/observation.entity'
import {
  ClientMessage,
  MessageTypes,
} from '../bootstrap/entities/ClientMessage'

@Resolver(() => Area)
export class AreaResolver {
  constructor(
    private readonly AreaService: AreaService,
    private readonly observationsService: ObservationsService,
  ) {}
  @ResolveField()
  observations(@Parent() a: Area): Promise<Observation> {
    return this.observationsService.findOne(a.observationsId)
  }
  @Mutation(() => Area)
  createArea(
    @Args('createAreanInput') createAreaInput: CreateAreaInput,
  ): Promise<Area> {
    return this.AreaService.create(createAreaInput)
  }

  @Query(() => [Area], { name: 'areas' })
  findAll(): Promise<Area[]> {
    return this.AreaService.findAll()
  }

  @Query(() => Area, { name: 'Area' })
  findOne(@Args('id', { type: () => String }) id: string): Promise<Area> {
    return this.AreaService.findOne(id)
  }

  @Mutation(() => Area)
  updateArea(
    @Args('updateAreaInput') updateAreaInput: UpdateAreaInput,
  ): Promise<Area> {
    return this.AreaService.update(updateAreaInput)
  }

  @Mutation(() => Area)
  async removeArea(
    @Args('id', { type: () => String }) id: string,
  ): Promise<ClientMessage> {
    const deleted = await this.AreaService.remove(id)
    if (deleted.affected <= 1)
      return {
        type: MessageTypes.success,
        message: 'Area deleted',
        statusCode: 200,
      }

    return {
      type: MessageTypes.error,
      message: 'Delete action went very wrong.',
      statusCode: 400,
    }
  }
}
