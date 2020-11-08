import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';

describe('UsuarioController', () => {
  let controller: UsuarioController;
  let service: UsuarioService;

  const usuario: Usuario = {
    id: 1,
    usuario: 'maikerodrigues',
    senha: 'maike123',
    createdAt: new Date('2020-07-11'),
    updatedAt: new Date('2020-07-11'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuarioController],
      providers: [
        UsuarioService,
        {
          provide: getRepositoryToken(Usuario),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<UsuarioController>(UsuarioController);
    service = module.get<UsuarioService>(UsuarioService);
  });

  it('Deve ser definido', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('Deve criar usuario', async (): Promise<any> => {
    jest
      .spyOn(service, 'create')
      .mockImplementation(async (): Promise<Usuario> => usuario);

    expect(await controller.create(usuario)).toEqual(usuario);
  });

  it('Deve listar usuários', async (): Promise<any> => {
    jest
      .spyOn(service, 'findAll')
      .mockImplementation(async (): Promise<Usuario[]> => [usuario]);

    expect(await controller.findAll()).not.toBeNull();
  });

  it('Deve buscar usuário por ID', async (): Promise<any> => {
    jest
      .spyOn(service, 'findOne')
      .mockImplementation(async (): Promise<Usuario> => usuario);

    expect(await controller.findOne(1)).toEqual(usuario);
  });

  it('Deve atualizar usuário', async (): Promise<any> => {
    jest
      .spyOn(service, 'update')
      .mockImplementation(async (): Promise<Usuario> => usuario);

    expect(await controller.update(1, usuario)).toEqual(usuario);
  });

  it('Deve deletar usuário', async (): Promise<any> => {
    jest
      .spyOn(service, 'remove')
      .mockImplementation(async (): Promise<Usuario> => usuario);

    expect(await controller.remove(1)).toEqual(usuario);
  });
});
