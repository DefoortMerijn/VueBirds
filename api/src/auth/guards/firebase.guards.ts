import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'
import { Injectable, ExecutionContext } from '@nestjs/common'

@Injectable()
export class FirebaseGuard extends AuthGuard('firebase-auth') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context) // Doorgeven van REST (post) naar GraphQL
    console.log(ctx)
    return ctx.getContext().req
  }
}
