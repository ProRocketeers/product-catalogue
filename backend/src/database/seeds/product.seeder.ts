import { DataSource } from 'typeorm'
import { Product } from '../../entities/product.entity'

export class ProductSeeder {
  public async run(dataSource: DataSource): Promise<void> {
    const productRepository = dataSource.getRepository(Product)

    const existingProducts = await productRepository.count()
    if (existingProducts > 0) {
      console.log('⏭️  Products already exist, skipping seed...')
      return
    }

    const products = [
      {
        name: 'PDF Generátor',
        id: 'pdf-generator',
        description:
          'Generátor PDF dle šablon a vyplněných hodnot proměnných',
        url: 'https://github.com/ProRocketeers/pdf-generator',
      },
      {
        name: 'URL Shortener',
        id: 'url-shortener',
        description:
          'Zkracovač URL se statistikami o kliknutích (clicks, statistics, etc.)',
        url: 'https://github.com/ProRocketeers/url-shortener',
      },
      {
        name: 'QR  Generator',
        id: 'qr-generator',
        description:
          'Generátor QR kódů',
        url: 'https://github.com/ProRocketeers/qr-generator',
      },
      {
        name: 'QA Workplayground',
        id: 'qa-workplayground',
        description:
          'Flexibilní základ pro automatizované testování, především s využitím Playwrightu (případně s jeho rozšířením) / Cypress (in-future)',
        url: 'https://github.com/ProRocketeers/qa-workplayground',
      }
    ]

    console.log('🌱 Seeding products...')
    const createdProducts = await productRepository.save(products)
    console.log(`✅ Successfully seeded ${createdProducts.length} products!`)
  }
}
