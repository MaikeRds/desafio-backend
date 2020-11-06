import {
  Controller,
  Body,
  Post,
  UseGuards,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { EstabelecimentoService } from 'src/services/estabelecimento.service';
import { Estabelecimento } from 'src/model/estabelecimento.entity';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('[estabelecimento]')
@UseGuards(JwtAuthGuard)
@Controller('estabelecimento')
export class EstabelecimentosController {
  constructor(private estabelecimentoService: EstabelecimentoService) {}

  @ApiOperation({ summary: 'Criar estabelecimento.' })
  @Post()
  async create(
    @Body() estabelecimento: Estabelecimento,
  ): Promise<Estabelecimento> {
    console.log(estabelecimento);
    return this.estabelecimentoService.create(estabelecimento);
  }

  @ApiOperation({ summary: 'Listar estabelecimentos.' })
  @Get()
  async findAll(): Promise<Estabelecimento[]> {
    return this.estabelecimentoService.findAll();
  }

  @ApiOperation({ summary: 'Buscar estabelecimento por ID.' })
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Estabelecimento> {
    return this.estabelecimentoService.findOne(id);
  }

  @ApiOperation({ summary: 'Atualizar estabelecimento.' })
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEstabelecimento: Estabelecimento,
  ): Promise<Estabelecimento> {
    return this.estabelecimentoService.updateOne(id, updateEstabelecimento);
  }

  @ApiOperation({ summary: 'Deletar estabelecimento.' })
  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Estabelecimento> {
    return this.estabelecimentoService.remove(id);
  }
}
