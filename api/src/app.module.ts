import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { graphqlConfig } from './bootstrap/graphqlConfig'
import { typeORMConfig } from './bootstrap/typeORMConfig'
import { ApolloDriverConfig } from '@nestjs/apollo/dist/interfaces'

//TODO: create birds module

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    GraphQLModule.forRoot<ApolloDriverConfig>(graphqlConfig),
  ], //Enchancment? move to async provider
  controllers: [],
  providers: [],
})
export class AppModule {}
