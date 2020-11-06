import { PartialType } from '@nestjs/mapped-types';
import { CreateEstabelecimentoDto } from './create-estabelecimento.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Allow } from 'class-validator';

export class UpdateEstabelecimentoDto extends PartialType(
  CreateEstabelecimentoDto,
) {
  @ApiProperty({
    description: 'Campo de identificacao do Estabelecimento.',
    required: false,
  })
  id: number;

  @ApiProperty({
    description:
      'Campo razão social do estabelecimento requerente, permitindo-se abreviações caso o espaço seja insuficiente.',
    required: true,
  })
  @IsNotEmpty({ message: 'O Razao Social não deve estar vazio.' })
  razaoSocial: string;

  @ApiProperty({
    description: 'Este é o número de inscrição do estabelecimento no CRF.',
    required: true,
  })
  @IsNotEmpty({ message: 'O crfpj não deve estar vazio.' })
  numCrfPj: string;

  @ApiProperty({
    description: 'É o nome de “fachada” ou comercial do estabelecimento.',
    required: true,
  })
  @IsNotEmpty({ message: 'O nome fantasia não deve estar vazio.' })
  nomeFantasia: string;

  @ApiProperty({
    description:
      'Neste campo deve constar o ramo de atividade do estabelecimento.',
    required: true,
  })
  @IsNotEmpty({ message: 'O ramo atividade não deve estar vazio.' })
  ramoAtividade: string;

  @ApiProperty({
    description: 'Campo CNPJ (Cadastro Nacional da Pessoa Jurídica).',
    required: true,
  })
  @IsNotEmpty({ message: 'O cnpj não deve estar vazio.' })
  cnpj: string;

  @ApiProperty({
    description: 'Campo deve estar preenchido o endereço (logradouro).',
    required: true,
  })
  @IsNotEmpty({ message: 'O endereco não deve estar vazio.' })
  endereco: string;

  @ApiProperty({
    description: 'É o número do endereço do estabelecimento requerente.',
    required: true,
  })
  @IsNotEmpty({ message: 'O numero não deve estar vazio.' })
  numero: string;

  @ApiProperty({
    description: 'É o complemento do endereço do estabelecimento.',
    required: false,
  })
  @Allow()
  complemento: string;

  @ApiProperty({
    description: 'É o bairro do endereço do estabelecimento.',
    required: true,
  })
  @IsNotEmpty({ message: 'O bairro não deve estar vazio.' })
  bairro: string;

  @ApiProperty({
    description: 'É a cidade do endereço do estabelecimento.',
    required: true,
  })
  @IsNotEmpty({ message: 'A cidade não deve estar vazia.' })
  cidade: string;

  @ApiProperty({
    description: 'É o Estado do endereço do estabelecimento.',
    required: true,
  })
  @IsNotEmpty({ message: 'O estado não deve estar vazio.' })
  estado: string;

  @ApiProperty({
    description: 'É o CEP do estabelecimento.',
    required: true,
  })
  @IsNotEmpty({ message: 'O cep não deve estar vazio.' })
  cep: string;

  @ApiProperty({
    description:
      'Neste campo, deve-se preencher o telefone fixo do estabelecimento.',
    required: true,
  })
  @IsNotEmpty({ message: 'O telefone não deve estar vazio.' })
  fone: string;

  @ApiProperty({
    description: 'Neste campo, deve-se preencher o celular do estabelecimento.',
    required: true,
  })
  @IsNotEmpty({ message: 'O celular não deve estar vazio.' })
  cel: string;

  @ApiProperty({
    description: 'Neste campo, deve-se preencher o e-mail do estabelecimento.',
    required: true,
  })
  @IsNotEmpty({ message: 'O email não deve estar vazio.' })
  email: string;
}
