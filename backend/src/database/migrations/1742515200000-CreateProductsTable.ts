import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateProductsTable1742515200000 implements MigrationInterface {
  name = 'CreateProductsTable1742515200000'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "products" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying(255) NOT NULL,
        "description" text,
        "extendedDescription" text,
        "url" character varying(500),
        "icon" character varying(10),
        "category" character varying(100),
        "tags" text,
        "heroImage" character varying(500),
        "features" jsonb,
        "teamMembers" jsonb,
        "teamDescription" text,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_products_id" PRIMARY KEY ("id")
      )
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS "products"')
  }
}
