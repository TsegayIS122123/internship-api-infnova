import { ApiProperty } from '@nestjs/swagger';
import { Status, Track } from '@prisma/client';

export class ApplicantEntity {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Amanuel' })
  firstName: string;

  @ApiProperty({ example: 'Tesfaye' })
  lastName: string;

  @ApiProperty({ example: 'amanuel.tesfaye@example.com' })
  email: string;

  @ApiProperty({ example: '+251911234567', required: false })
  phone?: string;

  @ApiProperty({ enum: Status, example: 'PENDING' })
  status: Status;

  @ApiProperty({ enum: Track, example: 'BACKEND_DEVELOPMENT' })
  track: Track;

  @ApiProperty({ example: 'Strong Node.js skills', required: false })
  notes?: string;

  @ApiProperty({ example: null })
  deletedAt?: Date | null;

  @ApiProperty({ example: '2026-07-18T10:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2026-07-18T10:00:00.000Z' })
  updatedAt: Date;

  constructor(partial: Partial<ApplicantEntity>) {
    Object.assign(this, partial);
  }
}