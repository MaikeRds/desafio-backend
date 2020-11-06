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
import { EstabelecimentoService } from './estabelecimento.service';
import { CreateEstabelecimentoDto } from './dto/create-estabelecimento.dto';
import { UpdateEstabelecimentoDto } from './dto/update-estabelecimento.dto';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { IEstabelecimento } from 'src/shared/interfaces/IEstabelecimento';

@ApiBearerAuth()
@ApiTags('[estabelecimento]')
//@UseGuards(JwtAuthGuard)
@Controller('estabelecimento')
export class EstabelecimentoController {
  constructor(
    private readonly estabelecimentoService: EstabelecimentoService,
  ) {}

  @ApiOperation({ summary: 'Criar estabelecimento.' })
  @Post()
  async create(
    @Body() createEstabelecimentoDto: CreateEstabelecimentoDto,
  ): Promise<IEstabelecimento> {
    return await this.estabelecimentoService.create(createEstabelecimentoDto);
  }

  @ApiOperation({ summary: 'Listar estabelecimentos.' })
  @Get()
  async findAll(): Promise<IEstabelecimento[]> {
    return await this.estabelecimentoService.findAll();
  }

  @ApiOperation({ summary: 'Buscar estabelecimento por ID.' })
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IEstabelecimento> {
    return await this.estabelecimentoService.findOne(id);
  }

  @ApiOperation({ summary: 'Atualizar estabelecimento.' })
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEstabelecimentoDto: UpdateEstabelecimentoDto,
  ): Promise<IEstabelecimento> {
    return await this.estabelecimentoService.update(
      id,
      updateEstabelecimentoDto,
    );
  }

  @ApiOperation({ summary: 'Deletar estabelecimento.' })
  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IEstabelecimento> {
    return await this.estabelecimentoService.remove(id);
  }
}
