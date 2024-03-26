import { Entity, Index, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    username: string;

    @Index({ unique: true })
    @Column()
    email: string;

    @Column()
    password: string;

    // @Column({ default: true })
    // isActive: boolean;
}
