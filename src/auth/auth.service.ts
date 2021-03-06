import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { IPayload } from 'src/shared/interfaces/IPayload';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usuarioService.findOneByNomeUsuario(username);
    if (user && (await this.verifyPassword(pass, user.senha))) {
      const { id, usuario, senha } = user;
      return { id, usuario, senha };
    }
    return null;
  }

  async login(user: IPayload): Promise<any> {
    const usuario = await this.usuarioService.findOne(user.id);
    const payload = {
      username: usuario.usuario,
      sub: usuario.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  /**
   * Método privado para verificar password
   * @param password
   * @param hashedPassword
   */
  private async verifyPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const isPasswordMatching = await bcrypt.compare(password, hashedPassword);
    if (!isPasswordMatching) {
      throw new HttpException(
        'Credenciais fornecidas erradas!',
        HttpStatus.BAD_REQUEST,
      );
    }
    return isPasswordMatching;
  }
}
