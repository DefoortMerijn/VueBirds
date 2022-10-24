import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { UsersService } from './users.service'
import { User } from './entities/user.entity'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { ObservationsService } from 'src/observations/observations.service'
import { Observation } from 'src/observations/entities/observation.entity'
import { MessageTypes } from 'src/bootstrap/entities/ClientMessage'
import { FirebaseGuard } from 'src/auth/guards/firebase.guard'
import { UseGuards } from '@nestjs/common'
import { RolesGuard } from 'src/auth/guards/role.guard'

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput)
  }

  @UseGuards(FirebaseGuard, RolesGuard(['admin']))
  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll()
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.usersService.findOne(id)
  }

  @Query(() => User)
  findByUid(@Args('uid', { type: () => String }) uid: string) {
    return this.usersService.findOneByUid(uid)
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput)
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => String }) id: string) {
    return new Promise((resolve) =>
      this.usersService
        .remove(id)
        .then(() => {
          resolve({
            code: 200,
            message: `User with id ${id} deleted successfully`,
            type: MessageTypes.success,
          })
        })
        .catch(() => {
          resolve({
            code: 500,
            message: `User with id ${id}could not be deleted.`,
            type: MessageTypes.error,
          })
        }),
    )
  }
}
