import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';
import { ApplicantsService } from './applicants.service';
import { PrismaService } from '../prisma/prisma.service';
import { Status, Track } from '@prisma/client';

describe('ApplicantsService', () => {
  let service: ApplicantsService;
  let prisma: PrismaService;

  const mockPrismaService = {
    applicant: {
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      count: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApplicantsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<ApplicantsService>(ApplicantsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create an applicant successfully', async () => {
      const createDto = {
        firstName: 'Amanuel',
        lastName: 'Tesfaye',
        email: 'amanuel.tesfaye@example.com',
        track: Track.BACKEND_DEVELOPMENT,
      };

      const expected = {
        id: 1,
        ...createDto,
        status: Status.PENDING,
        phone: null,
        notes: null,
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.applicant.findUnique.mockResolvedValue(null);
      mockPrismaService.applicant.create.mockResolvedValue(expected);

      const result = await service.create(createDto);
      expect(result).toEqual(expected);
      expect(mockPrismaService.applicant.findUnique).toHaveBeenCalledWith({
        where: { email: createDto.email },
      });
    });

    it('should throw ConflictException if email already exists', async () => {
      const createDto = {
        firstName: 'Amanuel',
        lastName: 'Tesfaye',
        email: 'amanuel.tesfaye@example.com',
        track: Track.BACKEND_DEVELOPMENT,
      };

      mockPrismaService.applicant.findUnique.mockResolvedValue({ id: 1 });

      await expect(service.create(createDto)).rejects.toThrow(ConflictException);
    });
  });

  describe('findOne', () => {
    it('should return an applicant if found', async () => {
      const applicant = {
        id: 1,
        firstName: 'Amanuel',
        lastName: 'Tesfaye',
        email: 'amanuel.tesfaye@example.com',
        deletedAt: null,
      };

      mockPrismaService.applicant.findFirst.mockResolvedValue(applicant);

      const result = await service.findOne(1);
      expect(result).toEqual(applicant);
    });

    it('should throw NotFoundException if applicant not found', async () => {
      mockPrismaService.applicant.findFirst.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateStatus', () => {
    it('should update status successfully', async () => {
      const applicant = {
        id: 1,
        status: Status.PENDING,
      };

      const updated = {
        ...applicant,
        status: Status.SHORTLISTED,
      };

      mockPrismaService.applicant.findFirst.mockResolvedValue(applicant);
      mockPrismaService.applicant.update.mockResolvedValue(updated);

      const result = await service.updateStatus(1, Status.SHORTLISTED);
      expect(result.status).toBe(Status.SHORTLISTED);
    });

    it('should throw BadRequestException when moving from REJECTED to ACCEPTED', async () => {
      const applicant = {
        id: 1,
        status: Status.REJECTED,
      };

      mockPrismaService.applicant.findFirst.mockResolvedValue(applicant);

      await expect(service.updateStatus(1, Status.ACCEPTED)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});