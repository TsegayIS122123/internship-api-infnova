import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty } from 'class-validator';

export class UpdateStatusDto {
  @ApiProperty({
    enum: ['PENDING', 'SHORTLISTED', 'ACCEPTED', 'REJECTED'],
    example: 'SHORTLISTED',
    description: 'New applicant status',
  })
  @IsIn(['PENDING', 'SHORTLISTED', 'ACCEPTED', 'REJECTED'])
  @IsNotEmpty()
  status: string;
}