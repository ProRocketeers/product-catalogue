import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AdminProductController } from './admin-product.controller'
import { ProductController } from './product.controller'
import { ProductsService } from './products.service'
import { Product } from '../entities/product.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [AdminProductController, ProductController],
  providers: [ProductsService],
})
export class ProductsModule {}
