import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { Status } from '@prisma/client';

export class UpdateStatusDto {
  @ApiProperty({
    enum: Status,
    example: 'SHORTLISTED',
    description: 'New applicant status',
  })
  @IsEnum(Status)
  @IsNotEmpty()
  status: Status;
}