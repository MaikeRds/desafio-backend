import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Usuario } from './entities/usuario.entity';

@ApiTags('[usuario]')
@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @ApiOperation({ summary: 'Criar usuário.' })
  @Post()
  async create(@Body() createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    return this.usuarioService.create(createUsuarioDto);
  }

  @ApiOperation({ summary: 'Listar usuários.' })
  @ApiBearerAuth()
  //@UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<Usuario[]> {
    return this.usuarioService.findAll();
  }

  @ApiOperation({ summary: 'Buscar usuário por ID.' })
  @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Usuario> {
    return this.usuarioService.findOne(id);
  }

  @ApiOperation({ summary: 'Atualizar usuário.' })
  @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ): Promise<Usuario> {
    return this.usuarioService.update(id, updateUsuarioDto);
  }

  @ApiOperation({ summary: 'Deletar usuário.' })
  @ApiBearerAuth()
  //@UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Usuario> {
    return this.usuarioService.remove(id);
  }
}
