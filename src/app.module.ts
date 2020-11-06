import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { Usuario } from './model/usuario.entity';
import { UsuariosController } from './controllers/usuarios.controller';
import { UsuariosService } from './services/usuarios.service';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './shared/strategies/local.strategy';
import { JwtStrategy } from './shared/strategies/jwt.strategy';
import { Estabelecimento } from './model/estabelecimento.entity';
import { EstabelecimentosController } from './controllers/estabelecimento.controller';
import { EstabelecimentoService } from './services/estabelecimento.service';

@Module({
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
      entities: [Usuario, Estabelecimento],
      synchronize: false,
      logging: true,
    }),
    TypeOrmModule.forFeature([Usuario, Estabelecimento]),
    JwtModule.register({
      secret: process.env.APP_KEY,
      signOptions: { expiresIn: '2h' },
    }),
  ],
  controllers: [
    AppController,
    UsuariosController,
    AuthController,
    EstabelecimentosController,
  ],
  providers: [
    UsuariosService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    EstabelecimentoService,
  ],
})
export class AppModule {}
