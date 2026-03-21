import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { Product } from '../entities/product.entity'

const isSslEnabled = (value: string | undefined): boolean => {
  if (!value) {
    return false
  }

  return ['true', '1', 'yes', 'on', 'require'].includes(value.toLowerCase())
}

export const getDatabaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    host: configService.get<string>('DB_HOST', 'localhost'),
    port: configService.get<number>('DB_PORT', 5432),
    username: configService.get<string>('DB_USER', 'postgres'),
    password: configService.get<string>('DB_PASSWORD', 'postgres'),
    database: configService.get<string>('DB_NAME', 'product_catalogue'),
    ssl: isSslEnabled(configService.get<string>('DB_SSL'))
      ? { rejectUnauthorized: false }
      : false,
    entities: [Product],
    synchronize: configService.get<string>('NODE_ENV') !== 'production',
    logging: configService.get<string>('NODE_ENV') === 'development',
  }
}
