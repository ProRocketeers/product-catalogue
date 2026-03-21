import { DataSource } from 'typeorm'
import { Product } from '../entities/product.entity'
import { CreateProductsTable1742515200000 } from './migrations/1742515200000-CreateProductsTable'

const parsePort = (value: string | undefined, fallback: number): number => {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

const isSslEnabled = (value: string | undefined): boolean => {
  if (!value) {
    return false
  }

  return ['true', '1', 'yes', 'on', 'require'].includes(value.toLowerCase())
}

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: parsePort(process.env.DB_PORT, 5432),
  username: process.env.DB_USER ?? 'postgres',
  password: process.env.DB_PASSWORD ?? 'postgres',
  database: process.env.DB_NAME ?? 'product_catalogue',
  ssl: isSslEnabled(process.env.DB_SSL)
    ? { rejectUnauthorized: false }
    : false,
  entities: [Product],
  migrations: [CreateProductsTable1742515200000],
  synchronize: false,
  logging: process.env.NODE_ENV === 'development',
})

export default AppDataSource
