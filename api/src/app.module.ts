import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { graphqlConfig } from './bootstrap/graphqlConfig'
import { typeORMConfig } from './bootstrap/typeORMConfig'
import { ApolloDriverConfig } from '@nestjs/apollo/dist/interfaces'
import { BirdsModule } from './birds/birds.module'

//TODO: create birds module

@Module({
  imports: [
    //Enchancment? move to async provider
    TypeOrmModule.forRoot(typeORMConfig),
    GraphQLModule.forRoot<ApolloDriverConfig>(graphqlConfig),
    BirdsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
