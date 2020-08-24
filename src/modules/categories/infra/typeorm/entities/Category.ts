import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import Department from '@modules/deparments/infra/typeorm/entities/Department';

@Entity('categories')
export default class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  department_id: string;

  @OneToOne(() => Department)
  @JoinColumn({ name: 'department_id' })
  departments: Department;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
