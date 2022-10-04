import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { create } from 'domain'
import { ObjectId } from 'mongodb'
import { Repository } from 'typeorm'
import { BirdsService } from './birds.service'
import { Bird } from './entities/bird.entity'
import {
  createbirdInputStub,
  createBird,
  updatebirdInputStub,
} from './stubs/birds.stub'

describe('BirdsService', () => {
  let service: BirdsService
  let mockBirdsRepository: Repository<Bird>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BirdsService,
        {
          provide: getRepositoryToken(Bird),
          useValue: {
            save: jest.fn().mockResolvedValue(createBird()),
            find: jest.fn().mockResolvedValue([createBird()]),
            findOneBy: jest.fn().mockResolvedValue(createBird()),
            update: jest.fn().mockResolvedValue(createBird()),
            delete: jest.fn(),
          },
        },
      ],
    }).compile()

    service = module.get<BirdsService>(BirdsService)
    mockBirdsRepository = module.get<Repository<Bird>>(getRepositoryToken(Bird))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create', () => {
    describe('when create is called', () => {
      it('should call the repository save method', async () => {
        const bird = new Bird()
        const saveSpy = jest.spyOn(mockBirdsRepository, 'save')

        await service.create(bird)
        expect(saveSpy).toBeCalledTimes(1)
      })
      it('should be called with the correct params', async () => {
        const saveSpy = jest.spyOn(mockBirdsRepository, 'save')
        // const bird = new Bird()
        const bird = createbirdInputStub()
        await service.create(bird)
        expect(saveSpy).toBeCalledWith(bird)
      })
      it('should return the created bird', async () => {
        const bird = createbirdInputStub()
        const toReturnedBird = createBird()
        const result = await service.create(bird)
        expect(result).toEqual(toReturnedBird)
      })
    })
  })
  describe('findAll', () => {
    describe('when findAll is called', () => {
      it('should call the repository find method', async () => {
        const findSpy = jest.spyOn(mockBirdsRepository, 'find')
        await service.findAll()
        expect(findSpy).toBeCalledTimes(1)
      })
      it('should return the list of birds', async () => {
        const toReturnedBird = createBird()
        const result = await service.findAll()
        expect(result).toEqual([toReturnedBird])
      })
    })
  })
  describe('findOneBy', () => {
    describe('when findOne is called', () => {
      it('should call the repository findOne method', async () => {
        const findSpy = jest.spyOn(mockBirdsRepository, 'findOneBy')
        await service.findOne('c82fe7c1f4997e80daeca6f3')
        expect(findSpy).toBeCalledTimes(1)
      })
      it('should be called with the correct params', async () => {
        const findSpy = jest.spyOn(mockBirdsRepository, 'findOneBy')
        await service.findOne('c82fe7c1f4997e80daeca6f3')
        expect(findSpy).toBeCalledWith({ id: 'c82fe7c1f4997e80daeca6f3' })
      })
      it('should return the bird', async () => {
        const toReturnedBird = createBird()
        const result = await service.findOne('c82fe7c1f4997e80daeca6f3')
        expect(result).toEqual(toReturnedBird)
      })
    })
  })
  describe('update', () => {
    describe('when update is called', () => {
      it('should call the repository save method', async () => {
        const newBird = updatebirdInputStub()
        const saveSpy = jest.spyOn(mockBirdsRepository, 'save')
        await service.update(newBird)
        expect(saveSpy).toBeCalledWith(newBird)
      })
      it('should be called with the correct params', async () => {
        const newBird = updatebirdInputStub()
        const saveSpy = jest.spyOn(mockBirdsRepository, 'save')
        await service.update(newBird)
        expect(saveSpy).toBeCalledWith(newBird)
      })
      it('should return the updated bird', async () => {
        const newBird = updatebirdInputStub()
        const result = await service.update(newBird)
        expect(result).toEqual(newBird)
      })
    })
  })
  // describe('remove', () => {
  //   describe('when remove is called', () => {
  //     it('should call the repository delete method', async () => {
  //       const deleteSpy = jest.spyOn(mockBirdsRepository, 'delete')
  //       const newBird = createbirdInputStub()
  //       await service.remove(newBird.id)
  //       expect(deleteSpy).toBeCalledTimes(1)
  //     })
  //   })
  // })
})
