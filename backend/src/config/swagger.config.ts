import { ConfigService } from '@nestjs/config/dist/config.service'
import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { version } from '../../package.json'

export const configureSwagger = (app: NestExpressApplication): void => {
  const configService = app.get(ConfigService)
  const basePath = configService.get<string>('BASE_PATH') || ''
  
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Product Catalogue API')
    .setVersion(version)
    .addServer(basePath, 'Product Catalogue') 
    .build()

  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('swagger', app, document, {
    yamlDocumentUrl: 'swagger/yaml',
  })
}
