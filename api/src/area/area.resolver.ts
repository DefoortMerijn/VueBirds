import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { AreaService } from './area.service'
import { Area } from './entities/area.entity'
import { CreateAreaInput } from './dto/create-area.input'
import { UpdateAreaInput } from './dto/update-area.input'

@Resolver(() => Area)
export class AreaResolver {
  constructor(private readonly AreaService: AreaService) {}

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
  removeArea(@Args('id', { type: () => String }) id: string) {
    return this.AreaService.remove(id)
  }
}
