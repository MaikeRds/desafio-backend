import { Usuario } from '../usuario/entities/usuario.entity';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsuarioModule } from './../usuario/usuario.module';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { ConfigModule } from '@nestjs/config';
import { LocalStrategy } from './strategies/local.strategy';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          type: process.env.TYPEORM_CONNECTION,
          host: process.env.TYPEORM_HOST,
          port: parseInt(process.env.TYPEORM_PORT),
          schema: process.env.TYPEORM_SCHEMA,
          username: process.env.TYPEORM_USERNAME,
          password: process.env.TYPEORM_PASSWORD,
          database: process.env.TYPEORM_DATABASE,
          entities: [Usuario],
          synchronize: false,
          logging: true,
        }),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
          secret: process.env.APP_KEY,
          signOptions: { expiresIn: '2h' },
        }),
        UsuarioModule,
      ],
      providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
        {
          provide: getRepositoryToken(Usuario),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
