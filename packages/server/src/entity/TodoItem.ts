import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { User } from './User';

@Entity()
export class TodoItem {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  category: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.todoItems)
  createdBy: User;
}
