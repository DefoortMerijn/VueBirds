import { NestFactory } from '@nestjs/core'
import { info } from 'console'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const port: number = +process.env.PORT || 3066
  await app.listen(port)
  console.info(`\n 🙋‍♂️ Welcome to the server. \n Visit http://localhost:${port}`)
}
bootstrap()
