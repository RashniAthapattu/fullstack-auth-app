import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './userModel';

@Entity()
export class Shipment extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    name!: string;

    @Column()
    address!: string;

    @Column()
    status!: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user!: User;
}