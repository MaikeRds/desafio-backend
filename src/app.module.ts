import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { UsuarioModule } from './usuario/usuario.module';
import { Usuario } from './usuario/entities/usuario.entity';
import { EstabelecimentoModule } from './estabelecimento/estabelecimento.module';
import { Estabelecimento } from './estabelecimento/entities/estabelecimento.entity';

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
    /*
    JwtModule.register({
      secret: process.env.APP_KEY,
      signOptions: { expiresIn: '2h' },
    }),*/
    UsuarioModule,
    EstabelecimentoModule,
  ],
  controllers: [AppController /*AuthController, EstabelecimentosController*/],
  providers: [
    /*  AuthService  LocalStrategy, JwtStrategy, EstabelecimentoService*/
  ],
})
export class AppModule {}
