import { Controller, Get } from '@nestjs/common';
import { Public } from './common/decorators/public.decorator';

@Controller()
export class AppController {
  @Public()
  @Get('api')
  getApiInfo() {
    return {
      name: 'Internship Applicant Management API',
      version: '1.0',
      documentation: '/api/docs',
      endpoints: {
        auth: '/api/auth/login',
        applicants: '/api/applicants',
        dashboard: '/api/dashboard/summary',
      },
    };
  }
}