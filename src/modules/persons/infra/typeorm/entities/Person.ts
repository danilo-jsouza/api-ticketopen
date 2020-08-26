import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import Department from '@modules/deparments/infra/typeorm/entities/Department';

@Entity('persons')
export default class Person {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  department_id: string;

  @OneToOne(() => Department)
  @JoinColumn({ name: 'department_id' })
  department: Department;

  @Column()
  rule: string;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}
