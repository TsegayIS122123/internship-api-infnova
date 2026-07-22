import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { ApplicantsService } from './applicants.service';
import { CreateApplicantDto } from './dto/create-applicant.dto';
import { UpdateApplicantDto } from './dto/update-applicant.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { UpdateNotesDto } from './dto/update-notes.dto';
import { QueryApplicantsDto } from './dto/query-applicants.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { ApplicantEntity } from './entities/applicant.entity';

@ApiTags('Applicants')
@Controller('applicants')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class ApplicantsController {
  constructor(private readonly applicantsService: ApplicantsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new applicant' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Applicant created successfully',
    type: ApplicantEntity,
  })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Email already exists' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  create(@Body() createDto: CreateApplicantDto) {
    return this.applicantsService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all applicants with pagination, filtering, and sorting' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns paginated applicants',
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  findAll(@Query() query: QueryApplicantsDto) {
    return this.applicantsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single applicant by ID' })
  @ApiParam({ name: 'id', description: 'Applicant ID', example: 1 })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns applicant details',
    type: ApplicantEntity,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Applicant not found' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.applicantsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an applicant' })
  @ApiParam({ name: 'id', description: 'Applicant ID', example: 1 })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Applicant updated successfully',
    type: ApplicantEntity,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Applicant not found' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Email already exists' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateApplicantDto,
  ) {
    return this.applicantsService.update(id, updateDto);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update applicant status' })
  @ApiParam({ name: 'id', description: 'Applicant ID', example: 1 })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Status updated successfully',
    type: ApplicantEntity,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid status transition' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Applicant not found' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStatusDto: UpdateStatusDto,
  ) {
    return this.applicantsService.updateStatus(id, updateStatusDto.status);
  }

  // Update the updateNotes method
  @Patch(':id/notes')
  @ApiOperation({ summary: 'Update applicant notes' })
  @ApiParam({ name: 'id', description: 'Applicant ID', example: 1 })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Notes updated successfully',
    type: ApplicantEntity,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Notes exceeds 1000 characters' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Applicant not found' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  updateNotes(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNotesDto: UpdateNotesDto,
  ) {
    return this.applicantsService.updateNotes(id, updateNotesDto.notes);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete an applicant' })
  @ApiParam({ name: 'id', description: 'Applicant ID', example: 1 })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Applicant soft deleted successfully',
    type: ApplicantEntity,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Applicant not found' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.applicantsService.remove(id);
  }
}