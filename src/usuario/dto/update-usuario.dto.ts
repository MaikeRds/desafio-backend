import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
  @ApiProperty({
    description: 'Campo usuario/username.',
    required: true,
  })
  @IsNotEmpty({ message: 'O usuario não deve estar vazia.' })
  usuario: string;
}
