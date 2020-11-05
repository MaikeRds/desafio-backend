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
      entities: [Usuario],
      synchronize: false,
      logging: true,
    }),
    TypeOrmModule.forFeature([Usuario]),
    JwtModule.register({
      secret: process.env.APP_KEY,
      signOptions: { expiresIn: '2h' },
    }),
  ],
  controllers: [AppController, UsuariosController, AuthController],
  providers: [UsuariosService, AuthService, LocalStrategy, JwtStrategy],
})
export class AppModule {}
