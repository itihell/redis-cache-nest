import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello() {
    const datos = await this.appService.getHello('hello');
    return datos;
  }

  @Get('cache')
  async setCache() {
    const datos = await this.appService.setCache('hello', 'world');
    return datos;
  }
}
