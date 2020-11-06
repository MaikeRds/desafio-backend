import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { IUsuario } from 'src/shared/interfaces/IUsuario';
import { ApiProperty } from '@nestjs/swagger';

@Entity('usuarios')
export class Usuario implements IUsuario {
  @ApiProperty({
    description: 'Campo de identificacao do usuario.',
    required: false,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Campo usuario para realizar o login.',
    required: true,
  })
  @IsNotEmpty({ message: 'O usuario não deve estar vazia.' })
  @Column()
  usuario: string;

  @ApiProperty({ description: 'Campo senha.', required: true })
  @IsNotEmpty({ message: 'A senha não deve estar vazia.' })
  @Column({ select: false })
  senha: string;

  @ApiProperty({ description: 'Criado em.', required: false })
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
