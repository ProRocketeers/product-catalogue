import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Product } from '../entities/product.entity'
import { CreateProductDto, UpdateProductDto } from './dto/product.dto'

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.find({
      order: {
        createdAt: 'DESC',
      },
    })
  }

  async findOne(id: string): Promise<Product | null> {
    return this.productRepository.findOne({
      where: { id },
    })
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto)
    return this.productRepository.save(product)
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product | null> {
    await this.productRepository.update(id, updateProductDto)
    return this.productRepository.findOne({ where: { id } })
  }

  async remove(id: string): Promise<void> {
    await this.productRepository.delete(id)
  }
}
