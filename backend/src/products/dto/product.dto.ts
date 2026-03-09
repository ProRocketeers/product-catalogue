import { IsString, IsOptional, IsArray, ValidateNested, IsNotEmpty } from 'class-validator'
import { Type } from 'class-transformer'

export class FeatureDto {
  @IsString()
  @IsNotEmpty()
  icon: string

  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  description: string
}

export class TeamMemberDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  role: string

  @IsString()
  @IsOptional()
  avatar?: string
}

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsOptional()
  description?: string

  @IsString()
  @IsOptional()
  extendedDescription?: string

  @IsString()
  @IsOptional()
  url?: string

  @IsString()
  @IsOptional()
  icon?: string

  @IsString()
  @IsOptional()
  category?: string

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[]

  @IsString()
  @IsOptional()
  heroImage?: string

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FeatureDto)
  @IsOptional()
  features?: FeatureDto[]

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TeamMemberDto)
  @IsOptional()
  teamMembers?: TeamMemberDto[]

  @IsString()
  @IsOptional()
  teamDescription?: string
}

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  description?: string

  @IsString()
  @IsOptional()
  extendedDescription?: string

  @IsString()
  @IsOptional()
  url?: string

  @IsString()
  @IsOptional()
  icon?: string

  @IsString()
  @IsOptional()
  category?: string

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[]

  @IsString()
  @IsOptional()
  heroImage?: string

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FeatureDto)
  @IsOptional()
  features?: FeatureDto[]

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TeamMemberDto)
  @IsOptional()
  teamMembers?: TeamMemberDto[]

  @IsString()
  @IsOptional()
  teamDescription?: string
}
