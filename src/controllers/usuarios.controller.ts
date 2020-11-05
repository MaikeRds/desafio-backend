import {
  Controller,
  Get,
  Body,
  Post,
  Param,
  Put,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UsuariosService } from 'src/services/usuarios.service';
import { Usuario } from 'src/model/usuario.entity';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('usuarios')
export class UsuariosController {
  constructor(private usuariosService: UsuariosService) {}

  @Post()
  async create(@Body() usuario: Usuario): Promise<Usuario> {
    return this.usuariosService.create(usuario);
  }

  @Get()
  async findAll(): Promise<Usuario[]> {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Usuario> {
    return this.usuariosService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUsuario: Usuario,
  ): Promise<Usuario> {
    return this.usuariosService.updateOne(id, updateUsuario);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Usuario> {
    return this.usuariosService.remove(id);
  }
}
