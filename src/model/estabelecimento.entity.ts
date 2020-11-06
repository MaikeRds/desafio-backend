import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsNotEmpty, Allow } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IEstabelecimento } from 'src/shared/interfaces/IEstabelecimento';

@Entity('estabelecimentos')
export class Estabelecimento implements IEstabelecimento {
  @ApiProperty({
    description: 'Campo de identificacao do Estabelecimento.',
    required: false,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description:
      'Campo razão social do estabelecimento requerente, permitindo-se abreviações caso o espaço seja insuficiente.',
    required: true,
  })
  @IsNotEmpty({ message: 'O Razao Social não deve estar vazio.' })
  @Column({ name: 'razao_social' })
  razaoSocial: string;

  @ApiProperty({
    description: 'Este é o número de inscrição do estabelecimento no CRF.',
    required: true,
  })
  @IsNotEmpty({ message: 'O crfpj não deve estar vazio.' })
  @Column({ name: 'num_crfpj', nullable: true })
  numCrfPj: string;

  @ApiProperty({
    description: 'É o nome de “fachada” ou comercial do estabelecimento.',
    required: true,
  })
  @IsNotEmpty({ message: 'O nome fantasia não deve estar vazio.' })
  @Column({ name: 'nome_fantasia' })
  nomeFantasia: string;

  @ApiProperty({
    description:
      'Neste campo deve constar o ramo de atividade do estabelecimento.',
    required: true,
  })
  @IsNotEmpty({ message: 'O ramo atividade não deve estar vazio.' })
  @Column({ name: 'ramo_atividade' })
  ramoAtividade: string;

  @ApiProperty({
    description: 'Campo CNPJ (Cadastro Nacional da Pessoa Jurídica).',
    required: true,
  })
  @IsNotEmpty({ message: 'O cnpj não deve estar vazio.' })
  @Column({ name: 'cnpj' })
  cnpj: string;

  @ApiProperty({
    description: 'Campo deve estar preenchido o endereço (logradouro).',
    required: true,
  })
  @IsNotEmpty({ message: 'O endereco não deve estar vazio.' })
  @Column({ name: 'endereco' })
  endereco: string;

  @ApiProperty({
    description: 'É o número do endereço do estabelecimento requerente.',
    required: true,
  })
  @IsNotEmpty({ message: 'O numero não deve estar vazio.' })
  @Column({ name: 'numero' })
  numero: string;

  @ApiProperty({
    description: 'É o complemento do endereço do estabelecimento.',
    required: false,
  })
  @Allow()
  @Column()
  complemento: string;

  @ApiProperty({
    description: 'É o bairro do endereço do estabelecimento.',
    required: true,
  })
  @IsNotEmpty({ message: 'O bairro não deve estar vazio.' })
  @Column({ name: 'bairro' })
  bairro: string;

  @ApiProperty({
    description: 'É a cidade do endereço do estabelecimento.',
    required: true,
  })
  @IsNotEmpty({ message: 'A cidade não deve estar vazia.' })
  @Column({ name: 'cidade' })
  cidade: string;

  @ApiProperty({
    description: 'É o Estado do endereço do estabelecimento.',
    required: true,
  })
  @IsNotEmpty({ message: 'O estado não deve estar vazio.' })
  @Column({ name: 'estado' })
  estado: string;

  @ApiProperty({
    description: 'É o CEP do estabelecimento.',
    required: true,
  })
  @IsNotEmpty({ message: 'O cep não deve estar vazio.' })
  @Column({ name: 'cep' })
  cep: string;

  @ApiProperty({
    description:
      'Neste campo, deve-se preencher o telefone fixo do estabelecimento.',
    required: true,
  })
  @IsNotEmpty({ message: 'O telefone não deve estar vazio.' })
  @Column({ name: 'fone' })
  fone: string;

  @ApiProperty({
    description: 'Neste campo, deve-se preencher o celular do estabelecimento.',
    required: true,
  })
  @IsNotEmpty({ message: 'O celular não deve estar vazio.' })
  @Column({ name: 'cel' })
  cel: string;

  @ApiProperty({
    description: 'Neste campo, deve-se preencher o e-mail do estabelecimento.',
    required: true,
  })
  @IsNotEmpty({ message: 'O email não deve estar vazio.' })
  @Column({ name: 'email' })
  email: string;

  @ApiProperty({ description: 'Criado em.', required: false })
  @Allow()
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @ApiProperty({ description: 'Atualizado em.', required: false })
  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
