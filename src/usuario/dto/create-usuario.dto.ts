import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUsuarioDto {
  @ApiProperty({
    description: 'Campo usuario/username.',
    required: true,
  })
  @IsNotEmpty({ message: 'O usuario não deve estar vazia.' })
  usuario: string;

  @ApiProperty({
    description: 'Campo senha/password.',
    required: true,
  })
  @IsNotEmpty({ message: 'A senha não deve estar vazia.' })
  senha: string;
}
