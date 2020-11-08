import { UsuarioService } from '../usuario/usuario.service';
import { Usuario } from '../usuario/entities/usuario.entity';
import { JwtStrategy } from './strategies/jwt.strategy';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigModule } from '@nestjs/config';
import { LocalStrategy } from './strategies/local.strategy';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('AuthService', () => {
  let authService: AuthService;
  let usuarioService: UsuarioService;
  let jwtService: JwtService;

  const usuario: Usuario = {
    id: 1,
    usuario: 'maikerodrigues',
    senha: 'maike123',
    createdAt: new Date('2020-07-11'),
    updatedAt: new Date('2020-07-11'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
          secret: process.env.APP_KEY,
          signOptions: { expiresIn: '2h' },
        }),
      ],
      providers: [
        AuthService,
        UsuarioService,
        LocalStrategy,
        JwtStrategy,
        {
          provide: getRepositoryToken(Usuario),
          useClass: Repository,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usuarioService = module.get<UsuarioService>(UsuarioService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('Deve ser definido', () => {
    expect(authService).toBeDefined();
    expect(usuarioService).toBeDefined();
    expect(jwtService).toBeDefined();
  });

  it('Deve validar usuario', async () => {
    const senha = await bcrypt.hash(usuario.senha, 10);
    jest
      .spyOn(usuarioService, 'findOneByNomeUsuario')
      .mockImplementation(
        async (): Promise<Usuario> => ({ ...usuario, senha }),
      );

    expect(
      await authService.validateUser('maikerodrigues', 'maike123'),
    ).toEqual({ id: 1, usuario: 'maikerodrigues', senha });
  });

  it('Deve validar usuario - retornando nulo ', async () => {
    jest
      .spyOn(usuarioService, 'findOneByNomeUsuario')
      .mockImplementation(async (): Promise<Usuario> => null);

    expect(
      await authService.validateUser('maikerodrigues', 'maike123'),
    ).toEqual(null);
  });

  it('Deve retorna uma exceção - credenciais fornecidas erradas', async () => {
    jest
      .spyOn(usuarioService, 'findOneByNomeUsuario')
      .mockImplementation(async (): Promise<Usuario> => ({ ...usuario }));

    try {
      await authService.validateUser('maikerodrigues', 'maike123');
    } catch (e) {
      expect(e).toBeInstanceOf(HttpException);
      expect(e.message).toBe('Credenciais fornecidas erradas!');
      expect(e.status).toBe(HttpStatus.BAD_REQUEST);
    }
  });

  it('Deve fazer login', async () => {
    jest
      .spyOn(usuarioService, 'findOne')
      .mockImplementation(async (): Promise<Usuario> => usuario);

    jest
      .spyOn(jwtService, 'sign')
      .mockImplementation((): string => 'tokenMock');

    expect(
      await authService.login({ id: 1, username: 'maikerodrigues' }),
    ).toEqual({ access_token: 'tokenMock' });
  });
});
