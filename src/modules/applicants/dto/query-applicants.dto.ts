import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsInt, IsOptional, IsString, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryApplicantsDto {
  @ApiPropertyOptional({
    example: 1,
    description: 'Page number (starts from 1)',
    minimum: 1,
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    example: 10,
    description: 'Number of items per page',
    minimum: 1,
    maximum: 100,
    default: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 10;

  @ApiPropertyOptional({
    example: 'Amanuel',
    description: 'Search by name or email',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    enum: ['PENDING', 'SHORTLISTED', 'ACCEPTED', 'REJECTED'],
    example: 'PENDING',
    description: 'Filter by status',
  })
  @IsOptional()
  @IsIn(['PENDING', 'SHORTLISTED', 'ACCEPTED', 'REJECTED'])
  status?: string;

  @ApiPropertyOptional({
    enum: ['FRONTEND_DEVELOPMENT', 'BACKEND_DEVELOPMENT', 'MOBILE_DEVELOPMENT', 'UIUX_DESIGN', 'DATA_ANALYTICS'],
    example: 'BACKEND_DEVELOPMENT',
    description: 'Filter by internship track',
  })
  @IsOptional()
  @IsIn(['FRONTEND_DEVELOPMENT', 'BACKEND_DEVELOPMENT', 'MOBILE_DEVELOPMENT', 'UIUX_DESIGN', 'DATA_ANALYTICS'])
  track?: string;

  @ApiPropertyOptional({
    example: 'createdAt',
    description: 'Sort by field',
    enum: ['firstName', 'lastName', 'email', 'status', 'track', 'createdAt', 'updatedAt'],
  })
  @IsOptional()
  @IsString()
  sortBy?: string = 'createdAt';

  @ApiPropertyOptional({
    example: 'desc',
    description: 'Sort order',
    enum: ['asc', 'desc'],
  })
  @IsOptional()
  @IsString()
  sortOrder?: 'asc' | 'desc' = 'desc';
}