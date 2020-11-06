import { Controller, Post, Get, Request, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('[auth]')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Autenticação usuário.' })
  @ApiQuery({ name: 'password' })
  @ApiQuery({ name: 'username' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: Request | any): Promise<any> {
    return this.authService.login(req.user);
  }

  @ApiOperation({ summary: 'Perfil do usuário.' })
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req: Request | any): Promise<any> {
    return req.user;
  }
}
