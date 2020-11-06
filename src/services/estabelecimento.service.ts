import { Estabelecimento } from './../model/estabelecimento.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EstabelecimentoService {
  constructor(
    @InjectRepository(Estabelecimento)
    private estabelecimentoRepository: Repository<Estabelecimento>,
  ) {}

  async create(
    createEstabelecimento: Estabelecimento,
  ): Promise<Estabelecimento> {
    const esta: Estabelecimento = await this.estabelecimentoRepository.findOne({
      where: { cnpj: createEstabelecimento.cnpj },
    });

    if (esta) {
      throw new HttpException(
        'Estabelecimento já existe!',
        HttpStatus.METHOD_NOT_ALLOWED,
      );
    }

    return await this.estabelecimentoRepository.save(createEstabelecimento);
  }

  async findAll(): Promise<Estabelecimento[]> {
    return this.estabelecimentoRepository.find();
  }

  async findOne(id: number): Promise<Estabelecimento> {
    return this.estabelecimentoRepository.findOne(id);
  }

  async updateOne(
    id: number,
    updateEstabelecimento: Estabelecimento,
  ): Promise<Estabelecimento> {
    const esta: Estabelecimento = await this.estabelecimentoRepository.findOne(
      id,
    );

    if (!esta) {
      throw new HttpException(
        'Estabelecimento não encontrado!',
        HttpStatus.NOT_FOUND,
      );
    }

    const VerificarCnpj: Estabelecimento = await this.estabelecimentoRepository.findOne(
      {
        where: { cnpj: updateEstabelecimento.cnpj },
        select: ['cnpj'],
      },
    );

    if (VerificarCnpj && VerificarCnpj.cnpj !== esta.cnpj) {
      throw new HttpException('CNPJ já existe!', HttpStatus.METHOD_NOT_ALLOWED);
    }

    return await this.estabelecimentoRepository.save({
      id,
      ...updateEstabelecimento,
    });
  }

  async remove(id: number): Promise<Estabelecimento> {
    const estabele: Estabelecimento = await this.estabelecimentoRepository.findOne(
      id,
    );

    if (!estabele) {
      throw new HttpException(
        'Estabelecimento não encontrado!',
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.estabelecimentoRepository.remove(estabele);
  }
}
