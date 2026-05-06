import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

interface Feature {
  icon?: string
  title: string
  description: string
}

interface TeamMember {
  name: string
  role: string
  avatar: string
}

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar', length: 255 })
  name: string

  @Column({ type: 'text', nullable: true })
  description: string

  @Column({ type: 'text', nullable: true })
  extendedDescription: string

  @Column({ type: 'varchar', length: 500, nullable: true })
  url: string

  @Column({ type: 'varchar', length: 10, nullable: true })
  icon: string

  @Column({ type: 'varchar', length: 100, nullable: true })
  category: string

  @Column({ type: 'simple-array', nullable: true })
  tags: string[]

  @Column({ type: 'varchar', length: 500, nullable: true })
  heroImage: string

  @Column({ type: 'jsonb', nullable: true })
  features: Feature[]

  @Column({ type: 'jsonb', nullable: true })
  teamMembers: TeamMember[]

  @Column({ type: 'text', nullable: true })
  teamDescription: string

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date
}
