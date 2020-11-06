import { Test, TestingModule } from '@nestjs/testing';
import { EstabelecimentoService } from './estabelecimento.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Estabelecimento } from './entities/estabelecimento.entity';
import { Repository } from 'typeorm';

describe('EstabelecimentoService', () => {
  let estabelecimentoService: EstabelecimentoService;
  let estabelecimentoRepo: Repository<Estabelecimento>;

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

  it('should be defined', () => {
    expect(estabelecimentoService).toBeDefined();
    expect(estabelecimentoRepo).toBeDefined();
  });
});
