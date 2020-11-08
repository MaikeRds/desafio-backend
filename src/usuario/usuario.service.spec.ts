import { Usuario } from './entities/usuario.entity';

import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioService } from './usuario.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';

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

  it('Deve ser definido', () => {
    expect(service).toBeDefined();
    expect(usuarioRepo).toBeDefined();
  });

  it('Deve criar usuário', async () => {
    const testUser: Usuario = {
      id: 1,
      usuario: 'maikerodrigues',
      senha: 'maike123',
      createdAt: new Date('2020-07-11'),
      updatedAt: new Date('2020-07-11'),
    };

    jest
      .spyOn(usuarioRepo, 'findOne')
      .mockImplementation(async (): Promise<Usuario> => null);

    jest
      .spyOn(usuarioRepo, 'save')
      .mockImplementation(async (): Promise<Usuario> => testUser);

    expect(await service.create(testUser)).toEqual(testUser);
  });

  it('Deve criar usuário', async () => {
    const testUser: Usuario = {
      id: 1,
      usuario: 'maikerodrigues',
      senha: 'maike123',
      createdAt: new Date('2020-07-11'),
      updatedAt: new Date('2020-07-11'),
    };

    jest
      .spyOn(usuarioRepo, 'findOne')
      .mockImplementation(async (): Promise<Usuario> => null);

    jest
      .spyOn(usuarioRepo, 'save')
      .mockImplementation(async (): Promise<Usuario> => testUser);

    expect(await service.create(testUser)).toEqual(testUser);
  });

  it('Deve retornar um erro se o usuário existir', async () => {
    const testUser: Usuario = {
      id: 1,
      usuario: 'maikerodrigues',
      senha: 'maike123',
      createdAt: new Date('2020-07-11'),
      updatedAt: new Date('2020-07-11'),
    };

    jest
      .spyOn(usuarioRepo, 'findOne')
      .mockImplementation(async (): Promise<Usuario> => testUser);

    jest
      .spyOn(usuarioRepo, 'save')
      .mockImplementation(async (): Promise<Usuario> => testUser);

    try {
      await service.create(testUser);
    } catch (e) {
      expect(e).toBeInstanceOf(HttpException);
      expect(e.message).toBe('Usuário já existe!');
      expect(e.status).toBe(HttpStatus.METHOD_NOT_ALLOWED);
    }
  });

  it('Deve retornar uma lista de usuário', async () => {
    const listaUsuario: Usuario[] = [
      {
        id: 1,
        usuario: 'maikerodrigues',
        senha: 'maike123',
        createdAt: new Date('2020-07-11'),
        updatedAt: new Date('2020-07-11'),
      },
    ];

    jest
      .spyOn(usuarioRepo, 'find')
      .mockImplementation(async (): Promise<Usuario[]> => listaUsuario);

    expect(await service.findAll()).not.toBeNull();
  });

  it('Deve retornar um usuário', async () => {
    const usuario: Usuario = {
      id: 1,
      usuario: 'maikerodrigues',
      senha: 'maike123',
      createdAt: new Date('2020-07-11'),
      updatedAt: new Date('2020-07-11'),
    };

    jest
      .spyOn(usuarioRepo, 'findOne')
      .mockImplementation(async (): Promise<Usuario> => usuario);

    expect(await service.findOne(1)).toEqual(usuario);
  });

  it('Deve retornar um usuário por nome', async () => {
    const usuario: Usuario = {
      id: 1,
      usuario: 'maikerodrigues',
      senha: 'maike123',
      createdAt: new Date('2020-07-11'),
      updatedAt: new Date('2020-07-11'),
    };

    jest
      .spyOn(usuarioRepo, 'findOne')
      .mockImplementation(async (): Promise<Usuario> => usuario);

    expect(await service.findOneByNomeUsuario('maikerodrigues')).toEqual(
      usuario,
    );
  });

  it('Deve retornar usuario atualizado', async () => {
    const usuario: Usuario = {
      id: 1,
      usuario: 'maikerodrigues',
      senha: 'maike123',
      createdAt: new Date('2020-07-11'),
      updatedAt: new Date('2020-07-11'),
    };

    jest
      .spyOn(usuarioRepo, 'findOne')
      .mockImplementation(async (): Promise<Usuario> => usuario);

    jest
      .spyOn(usuarioRepo, 'find')
      .mockImplementation(async (): Promise<Usuario[]> => null);

    jest
      .spyOn(usuarioRepo, 'save')
      .mockImplementation(async (): Promise<Usuario> => usuario);

    expect(await service.update(1, usuario)).toEqual(usuario);
  });

  it('Deve retornar usuário não encontrado', async () => {
    const usuario: Usuario = {
      id: 1,
      usuario: 'maikerodrigues',
      senha: 'maike123',
      createdAt: new Date('2020-07-11'),
      updatedAt: new Date('2020-07-11'),
    };

    jest
      .spyOn(usuarioRepo, 'findOne')
      .mockImplementation(async (): Promise<Usuario> => null);

    jest
      .spyOn(usuarioRepo, 'find')
      .mockImplementation(async (): Promise<Usuario[]> => [usuario]);

    jest
      .spyOn(usuarioRepo, 'save')
      .mockImplementation(async (): Promise<Usuario> => usuario);

    try {
      await service.update(1, usuario);
      await service.remove(1);
    } catch (e) {
      expect(e).toBeInstanceOf(HttpException);
      expect(e.message).toBe('Usuário não encontrado!');
      expect(e.status).toBe(HttpStatus.NOT_FOUND);
    }
  });

  it('Deve retornar usuário já existe', async () => {
    const usuario: Usuario = {
      id: 1,
      usuario: 'maikerodrigues',
      senha: 'maike123',
      createdAt: new Date('2020-07-11'),
      updatedAt: new Date('2020-07-11'),
    };

    jest
      .spyOn(usuarioRepo, 'findOne')
      .mockImplementation(async (): Promise<Usuario> => usuario);

    jest
      .spyOn(usuarioRepo, 'find')
      .mockImplementation(async (): Promise<Usuario[]> => [usuario]);

    jest
      .spyOn(usuarioRepo, 'save')
      .mockImplementation(async (): Promise<Usuario> => usuario);

    try {
      await service.update(1, usuario);
    } catch (e) {
      expect(e).toBeInstanceOf(HttpException);
      expect(e.message).toBe('Usuário já existe!');
      expect(e.status).toBe(HttpStatus.METHOD_NOT_ALLOWED);
    }
  });

  it('Deve remover usuario', async () => {
    const usuario: Usuario = {
      id: 1,
      usuario: 'maikerodrigues',
      senha: 'maike123',
      createdAt: new Date('2020-07-11'),
      updatedAt: new Date('2020-07-11'),
    };

    jest
      .spyOn(usuarioRepo, 'findOne')
      .mockImplementation(async (): Promise<Usuario> => usuario);

    jest
      .spyOn(usuarioRepo, 'remove')
      .mockImplementation(async (): Promise<Usuario> => usuario);

    expect(await service.remove(1)).toEqual(usuario);
  });

  it('Deve retornar usuário não encontrado', async () => {
    jest
      .spyOn(usuarioRepo, 'findOne')
      .mockImplementation(async (): Promise<Usuario> => null);

    try {
      await service.remove(1);
    } catch (e) {
      expect(e).toBeInstanceOf(HttpException);
      expect(e.message).toBe('Usuário não encontrado!');
      expect(e.status).toBe(HttpStatus.NOT_FOUND);
    }
  });
});
