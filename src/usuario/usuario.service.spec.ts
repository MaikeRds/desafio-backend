import { Usuario } from './entities/usuario.entity';

import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioService } from './usuario.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('UsuarioService', () => {
  let service: UsuarioService;
  let usuarioRepo: Repository<Usuario>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuarioService,
        {
          provide: getRepositoryToken(Usuario),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsuarioService>(UsuarioService);
    usuarioRepo = module.get<Repository<Usuario>>(getRepositoryToken(Usuario));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(usuarioRepo).toBeDefined();
  });
});
