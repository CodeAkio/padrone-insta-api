import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('profile/:username')
  async getProfileByUsername(
    @Param('username') username: string,
  ): Promise<any> {
    return await this.appService.getProfileByUsername(username);
  }

  @Get()
  hello(): string {
    return 'Padrone Insta API';
  }
}
