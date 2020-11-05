import { IUsuario } from 'src/shared/interfaces/IUsuario';
import {
  Controller,
  Get,
  Body,
  Post,
  Param,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { UsuariosService } from 'src/services/usuarios.service';

@Controller('usuarios')
export class UsuariosController {
  constructor(private usuariosService: UsuariosService) {}

  @Post()
  async create(@Body() usuario: IUsuario): Promise<IUsuario> {
    return this.usuariosService.create(usuario);
  }

  @Get()
  async findAll(): Promise<IUsuario[]> {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<IUsuario> {
    return this.usuariosService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUsuario: IUsuario,
  ): Promise<IUsuario> {
    return this.usuariosService.updateOne(id, updateUsuario);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<IUsuario> {
    return this.usuariosService.remove(id);
  }
}
