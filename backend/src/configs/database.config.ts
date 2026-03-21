import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { Product } from '../entities/product.entity'

const parseSslFlag = (value: string | undefined): boolean | undefined => {
  if (!value) {
    return undefined
  }

  const normalized = value.toLowerCase()
  if (['true', '1', 'yes', 'on', 'require'].includes(normalized)) {
    return true
  }

  if (['false', '0', 'no', 'off', 'disable'].includes(normalized)) {
    return false
  }

  return undefined
}

export const getDatabaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  const shouldUseSsl =
    parseSslFlag(configService.get<string>('DB_SSL'))
    ?? configService.get<string>('NODE_ENV') === 'production'

  return {
    type: 'postgres',
    host: configService.get<string>('DB_HOST', 'localhost'),
    port: configService.get<number>('DB_PORT', 5432),
    username: configService.get<string>('DB_USER', 'postgres'),
    password: configService.get<string>('DB_PASSWORD', 'postgres'),
    database: configService.get<string>('DB_NAME', 'product_catalogue'),
    ssl: shouldUseSsl ? { rejectUnauthorized: false } : false,
    entities: [Product],
    synchronize: configService.get<string>('NODE_ENV') !== 'production',
    logging: configService.get<string>('NODE_ENV') === 'development',
  }
}
