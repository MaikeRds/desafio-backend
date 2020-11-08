import { Test, TestingModule } from '@nestjs/testing';
import { EstabelecimentoController } from './estabelecimento.controller';
import { EstabelecimentoService } from './estabelecimento.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Estabelecimento } from './entities/estabelecimento.entity';
import { Repository } from 'typeorm';

describe('EstabelecimentoController', () => {
  let estabelecimentoController: EstabelecimentoController;
  let estabelecimentoService: EstabelecimentoService;

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
      controllers: [EstabelecimentoController],
      providers: [
        EstabelecimentoService,
        {
          provide: getRepositoryToken(Estabelecimento),
          useClass: Repository,
        },
      ],
    }).compile();

    estabelecimentoController = module.get<EstabelecimentoController>(
      EstabelecimentoController,
    );
    estabelecimentoService = module.get<EstabelecimentoService>(
      EstabelecimentoService,
    );
  });

  it('Deve ser definido', () => {
    expect(estabelecimentoController).toBeDefined();
    expect(estabelecimentoService).toBeDefined();
  });

  it('Deve criar estabelecimento', async (): Promise<any> => {
    jest
      .spyOn(estabelecimentoService, 'create')
      .mockImplementation(
        async (): Promise<Estabelecimento> => estabelecimento,
      );

    expect(await estabelecimentoController.create(estabelecimento)).toEqual(
      estabelecimento,
    );
  });

  it('Deve listar estabelecimentos', async (): Promise<any> => {
    jest
      .spyOn(estabelecimentoService, 'findAll')
      .mockImplementation(
        async (): Promise<Estabelecimento[]> => [estabelecimento],
      );

    expect(await estabelecimentoController.findAll()).toEqual([
      estabelecimento,
    ]);
  });

  it('Deve buscar estabelecimento por ID', async (): Promise<any> => {
    jest
      .spyOn(estabelecimentoService, 'findOne')
      .mockImplementation(
        async (): Promise<Estabelecimento> => estabelecimento,
      );

    expect(await estabelecimentoController.findOne(1)).toEqual(estabelecimento);
  });

  it('Deve atualizar estabelecimento', async (): Promise<any> => {
    jest
      .spyOn(estabelecimentoService, 'findEstabelecimentoById')
      .mockImplementation(
        async (): Promise<Estabelecimento> => estabelecimento,
      );

    jest
      .spyOn(estabelecimentoService, 'update')
      .mockImplementation(
        async (): Promise<Estabelecimento> => estabelecimento,
      );

    expect(await estabelecimentoController.update(1, estabelecimento)).toEqual(
      estabelecimento,
    );
  });

  it('Deve deletar estabelecimento', async (): Promise<any> => {
    jest
      .spyOn(estabelecimentoService, 'findEstabelecimentoById')
      .mockImplementation(
        async (): Promise<Estabelecimento> => estabelecimento,
      );

    jest
      .spyOn(estabelecimentoService, 'remove')
      .mockImplementation(
        async (): Promise<Estabelecimento> => estabelecimento,
      );

    expect(await estabelecimentoController.remove(1)).toEqual(estabelecimento);
  });
});
