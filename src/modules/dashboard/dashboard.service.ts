import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getSummary() {
    const totalApplicants = await this.prisma.applicant.count({
      where: { deletedAt: null },
    });

    const statusCounts = await this.prisma.applicant.groupBy({
      by: ['status'],
      where: { deletedAt: null },
      _count: {
        status: true,
      },
    });

    const trackCounts = await this.prisma.applicant.groupBy({
      by: ['track'],
      where: { deletedAt: null },
      _count: {
        track: true,
      },
    });

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentApplicants = await this.prisma.applicant.count({
      where: {
        deletedAt: null,
        createdAt: {
          gte: sevenDaysAgo,
        },
      },
    });

    const statusOptions = ['PENDING', 'SHORTLISTED', 'ACCEPTED', 'REJECTED'];
    const statusSummary = statusOptions.map((status) => {
      const found = statusCounts.find((item) => item.status === status);
      return {
        status,
        count: found?._count.status || 0,
      };
    });

    const trackOptions = [
      'FRONTEND_DEVELOPMENT',
      'BACKEND_DEVELOPMENT',
      'MOBILE_DEVELOPMENT',
      'UIUX_DESIGN',
      'DATA_ANALYTICS'
    ];
    const trackSummary = trackOptions.map((track) => {
      const found = trackCounts.find((item) => item.track === track);
      return {
        track,
        count: found?._count.track || 0,
      };
    });

    const ethiopianTime = new Date().toLocaleString('en-US', {
      timeZone: 'Africa/Addis_Ababa',
    });

    return {
      totalApplicants,
      statusSummary,
      trackSummary,
      recentApplicants,
      updatedAt: new Date().toISOString(),
      timezone: 'Africa/Addis_Ababa (EAT)',
      localTime: ethiopianTime,
    };
  }
}