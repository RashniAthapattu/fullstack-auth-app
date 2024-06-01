import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';
import { IUser } from '../types/userType';

@Entity()
export class User extends BaseEntity implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  shipments: string;

  @Column()
  address: string;

  @Column({ type: 'simple-array', nullable: true })
  refreshTokens!: string[];
}
