import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateEstabelecimentoDto } from './dto/create-estabelecimento.dto';
import { UpdateEstabelecimentoDto } from './dto/update-estabelecimento.dto';
import { Estabelecimento } from './entities/estabelecimento.entity';

@Injectable()
export class EstabelecimentoService {
  constructor(
    @InjectRepository(Estabelecimento)
    private estabelecimentoRepository: Repository<Estabelecimento>,
  ) {}

  async create(
    createEstabelecimentoDto: CreateEstabelecimentoDto,
  ): Promise<Estabelecimento> {
    const estabelecimento: Estabelecimento = await this.estabelecimentoRepository.findOne(
      {
        where: { cnpj: createEstabelecimentoDto.cnpj },
      },
    );

    if (estabelecimento) {
      throw new HttpException(
        'Estabelecimento já existe!',
        HttpStatus.METHOD_NOT_ALLOWED,
      );
    }

    return await this.estabelecimentoRepository.save(createEstabelecimentoDto);
  }

  async findAll(): Promise<Estabelecimento[]> {
    return this.estabelecimentoRepository.find();
  }

  async findOne(id: number): Promise<Estabelecimento> {
    return this.estabelecimentoRepository.findOne(id);
  }

  async findEstabelecimentoById(id: number): Promise<Estabelecimento> {
    const estabelecimento: Estabelecimento = await this.estabelecimentoRepository.findOne(
      id,
    );

    if (!estabelecimento) {
      throw new HttpException(
        'Estabelecimento não encontrado!',
        HttpStatus.NOT_FOUND,
      );
    }

    return estabelecimento;
  }

  async update(
    id: number,
    updateEstabelecimentoDto: UpdateEstabelecimentoDto,
  ): Promise<Estabelecimento> {
    const estabelecimento: Estabelecimento = await this.estabelecimentoRepository.findOne(
      {
        where: { cnpj: updateEstabelecimentoDto.cnpj },
      },
    );

    if (estabelecimento && estabelecimento.id !== id) {
      throw new HttpException('CNPJ já existe!', HttpStatus.METHOD_NOT_ALLOWED);
    }

    return await this.estabelecimentoRepository.save({
      id,
      ...updateEstabelecimentoDto,
    });
  }

  async remove(estabelecimento: Estabelecimento): Promise<Estabelecimento> {
    return await this.estabelecimentoRepository.remove(estabelecimento);
  }
}
