import { DataSource } from 'typeorm'
import { config } from 'dotenv'
import { Product } from '../entities/product.entity'
import { CreateProductsTable1742515200000 } from './migrations/1742515200000-CreateProductsTable'

config()

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

const shouldUseSsl =
  parseSslFlag(process.env.DB_SSL) ?? process.env.NODE_ENV === 'production'

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: shouldUseSsl ? { rejectUnauthorized: false } : false,
  entities: [Product],
  migrations: [CreateProductsTable1742515200000],
  synchronize: false,
  logging: process.env.NODE_ENV === 'development',
})

export default AppDataSource
