import { JwtStrategy } from './strategies/jwt.strategy';
import { UsuarioModule } from './../usuario/usuario.module';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';

import { ConfigModule } from '@nestjs/config';

import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { LocalStrategy } from './strategies/local.strategy';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        JwtModule.register({
          secret: process.env.APP_KEY,
          signOptions: { expiresIn: '2h' },
        }),
        UsuarioModule,
        PassportModule,
      ],
      controllers: [AuthController],
      providers: [LocalStrategy, JwtStrategy],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
