import { Test, TestingModule } from '@nestjs/testing';
import { EstabelecimentoController } from './estabelecimento.controller';
import { EstabelecimentoService } from './estabelecimento.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Estabelecimento } from './entities/estabelecimento.entity';
import { Repository } from 'typeorm';

describe('EstabelecimentoController', () => {
  let controller: EstabelecimentoController;

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

    controller = module.get<EstabelecimentoController>(
      EstabelecimentoController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
