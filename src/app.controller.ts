import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('[inicio]')
@ApiBearerAuth()
@Controller()
export class AppController {
  @ApiOperation({ summary: 'Inicio.' })
  @Get()
  getHello(): string {
    return 'Desafio';
  }
}
