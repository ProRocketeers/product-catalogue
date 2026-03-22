import { ProductSeeder } from './product.seeder'
import AppDataSource from '../data-source'

const dataSource = AppDataSource

async function runSeeders() {

  try {
    await dataSource.initialize()

    // Run migrations to ensure schema is up to date
    await dataSource.runMigrations()

    // Run seeders
    const productSeeder = new ProductSeeder()
    await productSeeder.run(dataSource)

  } catch (error) {
    console.error('❌ Error during seeding:', error)
    process.exit(1)
  } finally {
    await dataSource.destroy()
  }
}

runSeeders()
