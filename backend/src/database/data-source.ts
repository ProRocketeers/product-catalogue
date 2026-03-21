import { DataSource } from 'typeorm'
import { Product } from '../entities/product.entity'
import { CreateProductsTable1742515200000 } from './migrations/1742515200000-CreateProductsTable'

const parsePort = (value: string | undefined, fallback: number): number => {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

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
  host: process.env.DB_HOST ?? 'localhost',
  port: parsePort(process.env.DB_PORT, 5432),
  username: process.env.DB_USER ?? 'postgres',
  password: process.env.DB_PASSWORD ?? 'postgres',
  database: process.env.DB_NAME ?? 'product_catalogue',
  ssl: shouldUseSsl ? { rejectUnauthorized: false } : false,
  entities: [Product],
  migrations: [CreateProductsTable1742515200000],
  synchronize: false,
  logging: process.env.NODE_ENV === 'development',
})

export default AppDataSource
