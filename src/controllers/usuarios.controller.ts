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
import { ApiTags, ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';

@ApiTags('[usuario]')
@Controller('usuarios')
export class UsuariosController {
  constructor(private usuariosService: UsuariosService) {}

  @ApiOperation({ summary: 'Criar usuário.' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        usuario: { type: 'string', description: 'Nome do usuário.' },
        senha: { type: 'string', description: 'Senha do usuário.' },
      },
    },
  })
  @Post()
  async create(@Body() usuario: Usuario): Promise<Usuario> {
    return this.usuariosService.create(usuario);
  }

  @ApiOperation({ summary: 'Listar usuários.' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<Usuario[]> {
    return this.usuariosService.findAll();
  }

  @ApiOperation({ summary: 'Buscar usuário por ID.' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Usuario> {
    return this.usuariosService.findOne(id);
  }

  @ApiOperation({ summary: 'Atualizar usuário.' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        usuario: { type: 'string', description: 'Nome do usuário.' },
      },
    },
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUsuario: Usuario,
  ): Promise<Usuario> {
    return this.usuariosService.updateOne(id, updateUsuario);
  }

  @ApiOperation({ summary: 'Deletar usuário.' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Usuario> {
    return this.usuariosService.remove(id);
  }
}
