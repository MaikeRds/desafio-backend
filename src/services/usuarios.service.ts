import { Usuario } from './../model/usuario.entity';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
  ) {}

  async create(createUsuario: Usuario): Promise<Usuario> {
    createUsuario.senha = await bcrypt.hash(createUsuario.senha, 10);
    createUsuario.usuario = createUsuario.usuario.toLowerCase();

    const usuario: Usuario = await this.usuariosRepository.findOne({
      where: { usuario: createUsuario.usuario },
    });

    if (usuario) {
      throw new HttpException(
        'Usuário já existe!',
        HttpStatus.METHOD_NOT_ALLOWED,
      );
    }

    return await this.usuariosRepository.save(createUsuario);
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuariosRepository.find();
  }

  async findOne(id: number): Promise<Usuario> {
    return this.usuariosRepository.findOne(id);
  }

  async updateOne(id: number, updateUsuario: Usuario): Promise<Usuario> {
    updateUsuario.usuario = updateUsuario.usuario.toLowerCase();

    const usuario: Usuario = await this.usuariosRepository.findOne(id);

    if (!usuario) {
      throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);
    }

    const usuarioNome: Usuario = await this.usuariosRepository.findOne({
      where: { usuario: updateUsuario.usuario },
    });

    if (usuarioNome) {
      throw new HttpException(
        'Usuário já existe!',
        HttpStatus.METHOD_NOT_ALLOWED,
      );
    }

    return await this.usuariosRepository.save({
      usuario: updateUsuario.usuario,
      id,
    });
  }

  async remove(id: number): Promise<Usuario> {
    const usuario: Usuario = await this.usuariosRepository.findOne(id);

    if (!usuario) {
      throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);
    }

    return await this.usuariosRepository.remove(usuario);
  }
}
