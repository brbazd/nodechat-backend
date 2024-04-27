import { Entity, Index, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Message } from './message.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    username: string;

    @Index({ unique: true })
    @Column()
    email: string;

    @Column({select: false})
    password: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @OneToMany((type) => Message, (message) => message.author, { cascade: true })
    sent_messages: Message[]

    @Column({select: false})
    refresh_token: string;

    // @Column({ default: true })
    // isActive: boolean;
}
