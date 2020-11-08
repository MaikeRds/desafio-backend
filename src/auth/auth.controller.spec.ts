import { JwtStrategy } from './strategies/jwt.strategy';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';

import { ConfigModule } from '@nestjs/config';

import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { LocalStrategy } from './strategies/local.strategy';
import { AuthService } from './auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Usuario } from '../usuario/entities/usuario.entity';
import { Repository } from 'typeorm';
import { UsuarioService } from '../usuario/usuario.service';

describe('AuthController', () => {
  let authController: AuthController;
  let usuarioService: UsuarioService;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        JwtModule.register({
          secret: process.env.APP_KEY,
          signOptions: { expiresIn: '2h' },
        }),
        PassportModule,
      ],
      controllers: [AuthController],
      providers: [
        AuthService,
        LocalStrategy,
        UsuarioService,
        JwtStrategy,
        {
          provide: getRepositoryToken(Usuario),
          useClass: Repository,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    usuarioService = module.get<UsuarioService>(UsuarioService);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
    expect(usuarioService).toBeDefined();
    expect(authService).toBeDefined();
  });

  it('Deve autenticar usuário', async () => {
    jest.spyOn(authService, 'login').mockImplementation(
      async (): Promise<any> => ({
        username: 'maikerodrigues',
        password: 'maike123',
      }),
    );

    expect(await authController.login({ user: null })).toEqual({
      username: 'maikerodrigues',
      password: 'maike123',
    });
  });

  it('Deve retornar perfil do usuário.', async () => {
    expect(await authController.getProfile({ user: null })).toEqual(null);
  });
});
