import { ObjectId } from 'mongodb'
import { CreateBirdInput } from '../dto/create-bird.input'
import { UpdateBirdInput } from '../dto/update-bird.input'
import { Bird } from '../entities/bird.entity'

export const createbirdInputStub = (): CreateBirdInput => {
  const bird = new CreateBirdInput()
  bird.name = 'bird'
  bird.fullname = 'bird'
  bird.category = 'bird'
  bird.url = 'bird'
  bird.observations = 2
  bird.description = 'bird'
  return bird
}

export const updatebirdInputStub = (): UpdateBirdInput => {
  const bird = new UpdateBirdInput()
  bird.id = 'c82fe7c1f4997e80daeca6f3'
  bird.name = 'bird'
  bird.fullname = 'bird'
  bird.category = 'bird'
  bird.url = 'bird'
  bird.observations = 2
  bird.description = 'bird'
  return bird
}

export const createBird = (): Bird => {
  const bird = new Bird()
  bird.id = new ObjectId('c82fe7c1f4997e80daeca6f3')
  bird.name = 'bird'
  bird.fullname = 'bird'
  bird.category = 'bird'
  bird.url = 'bird'
  bird.observations = 2
  bird.description = 'bird'
  return bird
}
