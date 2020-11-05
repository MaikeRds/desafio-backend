import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { IUsuario } from 'src/shared/interfaces/IUsuario';

@Entity('usuarios')
export class Usuario implements IUsuario {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty({ message: 'O usuario não deve estar vazia.' })
  @Column()
  usuario: string;

  @IsNotEmpty({ message: 'A senha não deve estar vazia.' })
  @Column({ select: false })
  senha: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
