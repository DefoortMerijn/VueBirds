import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { type } from 'os'
import { resolve } from 'path'
import { MessageTypes } from 'src/bootstrap/entities/ClientMessage'
import { Repository } from 'typeorm'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create(createUserInput: CreateUserInput): Promise<User> {
    return this.userRepository.save(createUserInput)
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find()
  }

  findOne(id: string): Promise<User> {
    //@ts-ignore
    return this.userRepository.findOne(new ObjectId(id))
  }

  update(updateUserInput: UpdateUserInput) {
    this.userRepository.update(updateUserInput.id, updateUserInput)
    return this.userRepository.findOneBy({
      id: updateUserInput.id,
    })
  }

  remove(id: string) {
    //@ts-ignore
    return this.userRepository.delete(new ObjectId(id))
  }
}
