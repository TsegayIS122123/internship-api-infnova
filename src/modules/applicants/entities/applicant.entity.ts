import { ApiProperty } from '@nestjs/swagger';

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

  @ApiProperty({ 
    example: 'PENDING',
    enum: ['PENDING', 'SHORTLISTED', 'ACCEPTED', 'REJECTED']
  })
  status: string;

  @ApiProperty({ 
    example: 'BACKEND_DEVELOPMENT',
    enum: ['FRONTEND_DEVELOPMENT', 'BACKEND_DEVELOPMENT', 'MOBILE_DEVELOPMENT', 'UIUX_DESIGN', 'DATA_ANALYTICS']
  })
  track: string;

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