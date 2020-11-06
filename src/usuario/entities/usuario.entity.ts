import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IUsuario } from 'src/shared/interfaces/IUsuario';

@Entity('usuarios')
export class Usuario implements IUsuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  usuario: string;

  @Column({ select: false })
  senha: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
