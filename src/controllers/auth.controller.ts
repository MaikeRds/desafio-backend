import { Controller, Post, Request, Get, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/shared/guards/local-auth.guard';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';

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
