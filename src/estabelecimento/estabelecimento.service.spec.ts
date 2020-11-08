import { Test, TestingModule } from '@nestjs/testing';
import { EstabelecimentoService } from './estabelecimento.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Estabelecimento } from './entities/estabelecimento.entity';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('EstabelecimentoService', () => {
  let estabelecimentoService: EstabelecimentoService;
  let estabelecimentoRepo: Repository<Estabelecimento>;
  const estabelecimento: Estabelecimento = {
    bairro: 'Parque Santos Dumont',
    cel: '(11) 98723-5389',
    cep: 'cep',
    cidade: 'Guarulhos',
    cnpj: '73.271.447/0001-79',
    complemento: 'casa',
    createdAt: new Date('2020-11-07'),
    email: 'ouvidoria@carolineecesarmarketingme.com.br',
    endereco: 'Rua Calábria',
    estado: 'SP',
    fone: '(11) 2730-0808',
    id: 1,
    nomeFantasia: 'Caroline e César Marketing ME',
    numCrfPj: '595.248.037.074',
    numero: '859',
    ramoAtividade: 'Lanches',
    razaoSocial: 'Caroline Lanches',
    updatedAt: new Date('2020-11-07'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EstabelecimentoService,
        {
          provide: getRepositoryToken(Estabelecimento),
          useClass: Repository,
        },
      ],
    }).compile();

    estabelecimentoService = module.get<EstabelecimentoService>(
      EstabelecimentoService,
    );
    estabelecimentoRepo = module.get<Repository<Estabelecimento>>(
      getRepositoryToken(Estabelecimento),
    );
  });

  it('Deve ser definido', () => {
    expect(estabelecimentoService).toBeDefined();
    expect(estabelecimentoRepo).toBeDefined();
  });

  it('Deve criar estabelecimento', async () => {
    jest
      .spyOn(estabelecimentoRepo, 'findOne')
      .mockImplementation(async (): Promise<Estabelecimento> => null);

    jest
      .spyOn(estabelecimentoRepo, 'save')
      .mockImplementation(
        async (): Promise<Estabelecimento> => estabelecimento,
      );

    expect(await estabelecimentoService.create(estabelecimento)).toEqual(
      estabelecimento,
    );
  });

  it('Deve criar estabelecimento - Estabelecimento já existe!', async () => {
    jest
      .spyOn(estabelecimentoRepo, 'findOne')
      .mockImplementation(
        async (): Promise<Estabelecimento> => estabelecimento,
      );

    jest
      .spyOn(estabelecimentoRepo, 'save')
      .mockImplementation(
        async (): Promise<Estabelecimento> => estabelecimento,
      );

    try {
      expect(await estabelecimentoService.create(estabelecimento)).toEqual(
        estabelecimento,
      );
    } catch (e) {
      expect(e).toBeInstanceOf(HttpException);
      expect(e.message).toBe('Estabelecimento já existe!');
      expect(e.status).toBe(HttpStatus.METHOD_NOT_ALLOWED);
    }
  });

  it('Deve retornar uma lista de estabelecimento', async () => {
    jest
      .spyOn(estabelecimentoRepo, 'find')
      .mockImplementation(
        async (): Promise<Estabelecimento[]> => [estabelecimento],
      );

    expect(await estabelecimentoService.findAll()).not.toBeNull();
  });

  it('Deve retornar um estabelecimento', async () => {
    jest
      .spyOn(estabelecimentoRepo, 'findOne')
      .mockImplementation(
        async (): Promise<Estabelecimento> => estabelecimento,
      );

    expect(await estabelecimentoService.findOne(1)).toEqual(estabelecimento);
  });

  it('Deve retornar estabelecimento atualizado', async () => {
    jest
      .spyOn(estabelecimentoRepo, 'findOne')
      .mockImplementation(
        async (): Promise<Estabelecimento> => estabelecimento,
      );

    jest
      .spyOn(estabelecimentoRepo, 'save')
      .mockImplementation(
        async (): Promise<Estabelecimento> => estabelecimento,
      );

    expect(await estabelecimentoService.update(1, estabelecimento)).toEqual(
      estabelecimento,
    );
  });

  it('Deve retornar Exception - CNPJ já existe', async () => {
    jest
      .spyOn(estabelecimentoRepo, 'findOne')
      .mockImplementation(
        async (): Promise<Estabelecimento> => ({ ...estabelecimento, id: 2 }),
      );

    try {
      await estabelecimentoService.update(1, estabelecimento);
    } catch (e) {
      expect(e).toBeInstanceOf(HttpException);
      expect(e.message).toBe('CNPJ já existe!');
      expect(e.status).toBe(HttpStatus.METHOD_NOT_ALLOWED);
    }
  });

  it('Deve deletar um estabelecimento', async () => {
    jest
      .spyOn(estabelecimentoRepo, 'remove')
      .mockImplementation(
        async (): Promise<Estabelecimento> => estabelecimento,
      );

    expect(await estabelecimentoService.remove(estabelecimento)).toEqual(
      estabelecimento,
    );
  });

  it('Deve buscar um estabelecimento por id', async () => {
    jest
      .spyOn(estabelecimentoRepo, 'findOne')
      .mockImplementation(
        async (): Promise<Estabelecimento> => estabelecimento,
      );

    expect(await estabelecimentoService.findEstabelecimentoById(1)).toEqual(
      estabelecimento,
    );
  });

  it('Deve retorna uma exceção, estabelecimento nao existe', async () => {
    jest
      .spyOn(estabelecimentoRepo, 'findOne')
      .mockImplementation(async (): Promise<Estabelecimento> => null);

    try {
      await estabelecimentoService.findEstabelecimentoById(1);
    } catch (e) {
      expect(e).toBeInstanceOf(HttpException);
      expect(e.message).toBe('Estabelecimento não encontrado!');
      expect(e.status).toBe(HttpStatus.NOT_FOUND);
    }
  });
});
