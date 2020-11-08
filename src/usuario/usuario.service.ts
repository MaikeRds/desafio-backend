import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
  ) {}
  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    createUsuarioDto.senha = await bcrypt.hash(createUsuarioDto.senha, 10);
    createUsuarioDto.usuario = createUsuarioDto.usuario.toLowerCase();

    const usuario: Usuario = await this.usuariosRepository.findOne({
      where: { usuario: createUsuarioDto.usuario },
    });

    if (usuario) {
      throw new HttpException(
        'Usuário já existe!',
        HttpStatus.METHOD_NOT_ALLOWED,
      );
    }

    return await this.usuariosRepository.save(createUsuarioDto);
  }

  findAll(): Promise<Usuario[]> {
    return this.usuariosRepository.find();
  }

  async findOne(id: number): Promise<Usuario> {
    return this.usuariosRepository.findOne(id);
  }

  async findOneByNomeUsuario(usuario: string): Promise<Usuario> {
    return await this.usuariosRepository.findOne({
      where: { usuario: usuario.toLowerCase() },
      select: ['id', 'senha', 'usuario'],
    });
  }

  async update(
    id: number,
    updateUsuarioDto: UpdateUsuarioDto,
  ): Promise<Usuario> {
    updateUsuarioDto.usuario = updateUsuarioDto.usuario.toLowerCase();

    const usuario: Usuario = await this.usuariosRepository.findOne(id);

    if (!usuario) {
      throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);
    }

    const existeUsuario: Usuario[] = await this.usuariosRepository.find({
      where: { usuario: updateUsuarioDto.usuario },
    });

    if (existeUsuario && existeUsuario.length > 0) {
      throw new HttpException(
        'Usuário já existe!',
        HttpStatus.METHOD_NOT_ALLOWED,
      );
    }

    return await this.usuariosRepository.save({
      usuario: updateUsuarioDto.usuario,
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
