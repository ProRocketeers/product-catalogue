import { webcrypto } from 'crypto'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from '@backend/app.module'
import { configureSwagger } from '@backend/configs/swagger.config'

if (!globalThis.crypto) {
  globalThis.crypto = webcrypto as any
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }))

  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:4173'],
    credentials: true,
  })

  configureSwagger(app)

  await app.listen(process.env.PORT ?? 3002)
  console.log(`Application is running on: http://localhost:${process.env.PORT ?? 3002}`)
}
bootstrap()
