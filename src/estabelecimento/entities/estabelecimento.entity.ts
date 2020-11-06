import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IEstabelecimento } from 'src/shared/interfaces/IEstabelecimento';

@Entity('estabelecimentos')
export class Estabelecimento implements IEstabelecimento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'razao_social' })
  razaoSocial: string;

  @Column({ name: 'num_crfpj', nullable: true })
  numCrfPj: string;

  @Column({ name: 'nome_fantasia' })
  nomeFantasia: string;

  @Column({ name: 'ramo_atividade' })
  ramoAtividade: string;

  @Column({ name: 'cnpj' })
  cnpj: string;

  @Column({ name: 'endereco' })
  endereco: string;

  @Column({ name: 'numero' })
  numero: string;

  @Column()
  complemento: string;

  @Column({ name: 'bairro' })
  bairro: string;

  @Column({ name: 'cidade' })
  cidade: string;

  @Column({ name: 'estado' })
  estado: string;

  @Column({ name: 'cep' })
  cep: string;

  @Column({ name: 'fone' })
  fone: string;

  @Column({ name: 'cel' })
  cel: string;

  @Column({ name: 'email' })
  email: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
