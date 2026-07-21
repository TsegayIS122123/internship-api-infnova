import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateApplicantDto } from './dto/create-applicant.dto';
import { UpdateApplicantDto } from './dto/update-applicant.dto';
import { QueryApplicantsDto } from './dto/query-applicants.dto';
import { Status } from '@prisma/client';
import { Prisma } from '@prisma/client';

@Injectable()
export class ApplicantsService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateApplicantDto) {
    const existing = await this.prisma.applicant.findUnique({
      where: { email: createDto.email },
    });

    if (existing) {
      throw new ConflictException(
        `Applicant with email ${createDto.email} already exists`,
      );
    }

    try {
      const applicant = await this.prisma.applicant.create({
        data: {
          ...createDto,
          status: Status.PENDING,
        },
      });
      return applicant;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Email already exists');
        }
      }
      throw error;
    }
  }

  async findAll(query: QueryApplicantsDto) {
    const { 
      page = 1, 
      limit = 10, 
      search, 
      status, 
      track, 
      sortBy = 'createdAt', 
      sortOrder = 'desc' 
    } = query;

    const where: Prisma.ApplicantWhereInput = {
      deletedAt: null,
    };

    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: Prisma.QueryMode.insensitive } },
        { lastName: { contains: search, mode: Prisma.QueryMode.insensitive } },
        { email: { contains: search, mode: Prisma.QueryMode.insensitive } },
      ];
    }

    if (status) {
      where.status = status;
    }

    if (track) {
      where.track = track;
    }

    const skip = (page - 1) * limit;
    const take = limit;

    const total = await this.prisma.applicant.count({ where });
    const items = await this.prisma.applicant.findMany({
      where,
      skip,
      take,
      orderBy: {
        [sortBy]: sortOrder,
      },
    });

    const totalPages = Math.ceil(total / limit);

    return {
      items,
      meta: {
        total,
        page,
        limit,
        totalPages,
        hasNext: page < totalPages,
        hasPrevious: page > 1,
      },
    };
  }

  async findOne(id: number) {
    const applicant = await this.prisma.applicant.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!applicant) {
      throw new NotFoundException(`Applicant with ID ${id} not found`);
    }

    return applicant;
  }

  async update(id: number, updateDto: UpdateApplicantDto) {
    await this.findOne(id);

    if (updateDto.email) {
      const existing = await this.prisma.applicant.findFirst({
        where: {
          email: updateDto.email,
          id: { not: id },
          deletedAt: null,
        },
      });

      if (existing) {
        throw new ConflictException(
          `Email ${updateDto.email} is already in use by another applicant`,
        );
      }
    }

    try {
      const applicant = await this.prisma.applicant.update({
        where: { id },
        data: updateDto,
      });
      return applicant;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Applicant with ID ${id} not found`);
        }
      }
      throw error;
    }
  }

  async updateStatus(id: number, newStatus: Status) {
    const applicant = await this.findOne(id);

    if (applicant.status === Status.REJECTED && newStatus === Status.ACCEPTED) {
      throw new BadRequestException(
        'Cannot move applicant from Rejected to Accepted status',
      );
    }

    return this.prisma.applicant.update({
      where: { id },
      data: { status: newStatus },
    });
  }

  async updateNotes(id: number, notes: string | null) {
    await this.findOne(id);

    if (notes && notes.length > 1000) {
      throw new BadRequestException('Notes cannot exceed 1000 characters');
    }

    return this.prisma.applicant.update({
      where: { id },
      data: { notes },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.applicant.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}