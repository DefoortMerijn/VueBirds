import { Test, TestingModule } from '@nestjs/testing'
import { Server } from 'http'
import {
  ClientMessage,
  MessageTypes,
} from '../bootstrap/entities/ClientMessage'
import { BirdsResolver } from './birds.resolver'
import { BirdsService } from './birds.service'
import { CreateBirdInput } from './dto/create-bird.input'
import { Bird } from './entities/bird.entity'
import {
  createBird,
  createbirdInputStub,
  updatebirdInputStub,
} from './stubs/birds.stub'

describe('BirdsResolver', () => {
  let resolver: BirdsResolver
  let service: BirdsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BirdsResolver,
        {
          provide: BirdsService,
          useValue: {
            create: jest.fn().mockResolvedValue(createBird()),
            findAll: jest.fn().mockResolvedValue([createBird()]),
            findOne: jest.fn().mockResolvedValue(createBird()),
            update: jest.fn().mockResolvedValue(createBird()),
            remove: jest.fn().mockResolvedValue({ affected: 1 }),
          },
        }, //BirdsService
      ],
    }).compile()

    resolver = module.get<BirdsResolver>(BirdsResolver)
    service = module.get<BirdsService>(BirdsService)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  describe('createBird', () => {
    describe('when createBird is called', () => {
      let createBirdDTO: CreateBirdInput
      let resultBird: Bird

      beforeEach(async () => {
        createBirdDTO = createbirdInputStub()
        resultBird = await resolver.createBird(createBirdDTO)
      })
      it('should call the service create method', async () => {
        expect(service.create).toBeCalledTimes(1)
      })
      it('should return the created bird', async () => {
        expect(resultBird).toEqual(createBird())
      })
    })
  })

  describe('findAll', () => {
    let result: Bird[]
    beforeEach(async () => {
      result = await resolver.findAll()
    })
    describe('when findAll is called', () => {
      it('should call birdService.findAll', async () => {
        expect(service.findAll).toBeCalledTimes(1)
      })
      it('should return some (or one) bird(s)', async () => {
        //remark: both are valid
        // Bird[]
        // [Bird]

        expect(result).toEqual([createBird()])
      })
    })
  })
  describe('findOne', () => {
    let result: Bird
    beforeEach(async () => {
      result = await resolver.findOne(createBird().id.toString())
    })
    describe('check servic findOne implementation', () => {
      it('should call birdService correct', async () => {
        expect(service.findOne).toBeCalledTimes(1)
        expect(service.findOne).toBeCalledWith(createBird().id.toString())
      })
      it('should return the created bird', async () => {
        expect(result).toEqual(createBird())
      })
    })
  })
  describe('update', () => {
    let result: Bird
    beforeEach(async () => {
      result = await resolver.updateBird(updatebirdInputStub())
    })
    describe('check servic update implementation', () => {
      it('should call birdService correct', async () => {
        expect(service.update).toBeCalledTimes(1)
        expect(service.update).toBeCalledWith(updatebirdInputStub())
      })
      it('should return the updated bird', async () => {
        expect(result).toEqual(createBird())
      })
    })
  })
  describe('remove', () => {
    let res: ClientMessage
    beforeEach(async () => {
      res = await resolver.removeBird(createBird().id.toString())
    })
    describe('check service remove implementation', () => {
      it('should call birdService correct', async () => {
        expect(service.remove).toBeCalledTimes(1)
        expect(service.remove).toBeCalledWith(createBird().id.toString())
      })
    })
    describe('check the GraphQL return', () => {
      it('Is the message clear to the frontend', async () => {
        const expectResult: ClientMessage = {
          type: MessageTypes.success,
          message: 'Bird deleted',
          statusCode: 200,
        }
        expect(res).toEqual(expectResult)
      })
      it('Is the error message shown when something goes wrong?', async () => {
        jest
          .spyOn(service, 'remove')
          .mockRejectedValue({ affected: 1000, raw: '' })

        res = await resolver.removeBird(createBird().id.toString())

        const expectResult: ClientMessage = {
          type: MessageTypes.error,
          message: 'Delete action went very wrong.',
          statusCode: 400,
        }
        expect(res).toEqual(expectResult)
      })
    })
  })
})
