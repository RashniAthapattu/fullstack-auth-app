import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  BaseEntity,
} from 'typeorm';
import { User } from './userModel';

@Entity()
export class RefreshToken extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  refreshToken: string;

  @ManyToOne((_type) => User, (user) => user.refreshTokens)
  user: User;
}
