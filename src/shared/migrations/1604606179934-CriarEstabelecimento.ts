import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CriarEstabelecimento1604606179934 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'estabelecimentos',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'razao_social',
            type: 'varchar',
            length: '250',
          },
          {
            name: 'num_crfpj',
            type: 'varchar',
            length: '250',
          },
          {
            name: 'nome_fantasia',
            type: 'varchar',
            length: '250',
          },
          {
            name: 'ramo_atividade',
            type: 'varchar',
            length: '250',
          },
          {
            name: 'cnpj',
            type: 'varchar',
            isUnique: true,
            length: '250',
          },
          {
            name: 'endereco',
            type: 'varchar',
            length: '250',
          },
          {
            name: 'numero',
            type: 'varchar',
            length: '250',
          },
          {
            name: 'complemento',
            type: 'varchar',
            length: '250',
            isNullable: true,
          },
          {
            name: 'bairro',
            type: 'varchar',
            length: '250',
          },
          {
            name: 'cidade',
            type: 'varchar',
            length: '250',
          },
          {
            name: 'estado',
            type: 'varchar',
            length: '250',
          },
          {
            name: 'cep',
            type: 'varchar',
            length: '250',
          },
          {
            name: 'fone',
            type: 'varchar',
            length: '250',
          },
          {
            name: 'cel',
            type: 'varchar',
            length: '250',
          },
          {
            name: 'email',
            type: 'varchar',
            length: '250',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
        uniques: [{ name: 'estabelecimentos_cnpj', columnNames: ['cnpj'] }],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('estabelecimentos');
  }
}
