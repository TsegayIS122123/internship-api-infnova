import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateNotesDto {
  @ApiProperty({
    example: 'Strong technical background, good communication skills',
    description: 'Internal notes (max 1000 characters)',
    required: false,
    maxLength: 1000,
  })
  @IsString()
  @IsOptional()
  @MaxLength(1000)
  notes?: string;
}