import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { ObservationsService } from './observations.service'
import { Observation } from './entities/observation.entity'
import { CreateObservationInput } from './dto/create-observation.input'
import { UpdateObservationInput } from './dto/update-observation.input'
import { BirdsService } from 'src/birds/birds.service'
import { Area } from 'src/area/entities/area.entity'
import { AreaService } from 'src/area/area.service'

@Resolver(() => Observation)
export class ObservationsResolver {
  constructor(
    private readonly observationsService: ObservationsService,
    private readonly birdsService: BirdsService,
    private readonly areaService: AreaService,
  ) {}

  @ResolveField()
  bird(@Parent() o: Observation) {
    return this.birdsService.findOne(o.birdId)
  }

  @ResolveField()
  birds(@Parent() o: Observation) {
    return this.areaService.findOne(o.locationId)
  }

  @Mutation(() => Observation)
  createObservation(
    @Args('createObservationInput') createObservationInput: CreateObservationInput,
  ) {
    return this.observationsService.create(createObservationInput)
  }

  @Query(() => [Observation], { name: 'observations' })
  findAll() {
    return this.observationsService.findAll()
  }

  @Query(() => Observation, { name: 'observation' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.observationsService.findOne(id)
  }

  @Mutation(() => Observation)
  updateObservation(
    @Args('updateObservationInput') updateObservationInput: UpdateObservationInput,
  ) {
    return this.observationsService.update(updateObservationInput)
  }

  @Mutation(() => Observation)
  removeObservation(@Args('id', { type: () => String }) id: string) {
    return this.observationsService.remove(id)
  }
}
