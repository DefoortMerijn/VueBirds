import { Module } from '@nestjs/common'
import { AreaService } from './area.service'
import { AreaResolver } from './area.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Area } from './entities/area.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Area])],
  providers: [AreaResolver, AreaService],
})
export class AreaModule {}
