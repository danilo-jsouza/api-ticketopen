import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import Category from '@modules/categories/infra/typeorm/entities/Category';
import Person from '@modules/persons/infra/typeorm/entities/Person';

enum Status {
  Open = 1,
  Progress = 2,
  Closed = 0,
}

@Entity('tickets')
export default class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  category_id: string;

  @OneToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column()
  recipient_id: string;

  @ManyToOne(() => Person)
  @JoinColumn({ name: 'recipient_id' })
  recipient: Person;

  @Column()
  person_id: string;

  @ManyToOne(() => Person)
  @JoinColumn({ name: 'person_id' })
  person: Person;

  @Column()
  description: string;

  @Column('int')
  status: Status;

  @Column()
  closed_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
