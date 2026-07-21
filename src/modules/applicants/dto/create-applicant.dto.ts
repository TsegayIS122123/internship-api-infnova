import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  Matches,
} from 'class-validator';
import { Track } from '@prisma/client';

export class CreateApplicantDto {
  @ApiProperty({
    example: 'Amanuel',
    description: 'First name',
    minLength: 2,
    maxLength: 50
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  firstName: string;

  @ApiProperty({
    example: 'Tesfaye',
    description: 'Last name',
    minLength: 2,
    maxLength: 50
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  lastName: string;

  @ApiProperty({
    example: 'amanuel.tesfaye@example.com',
    description: 'Email address (must be unique)',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '+251911234567',
    description: 'Phone number (format: +251XXXXXXXXX)',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Matches(/^\+251[0-9]{9}$/, {
    message: 'Phone must be in format: +251XXXXXXXXX',
  })
  phone?: string;

  @ApiProperty({
    enum: Track,
    example: 'BACKEND_DEVELOPMENT',
    description: 'Internship track',
  })
  @IsEnum(Track)
  @IsNotEmpty()
  track: Track;

  @ApiProperty({
    example: 'Strong Node.js and TypeScript experience',
    description: 'Internal notes (max 1000 characters)',
    required: false,
    maxLength: 1000,
  })
  @IsString()
  @IsOptional()
  @MaxLength(1000)
  notes?: string;
}