import { Entity, Index, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from "./user.entity"

@Entity('messages')
export class Message {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne((type) => User, (user) => user.sent_messages, {
        eager: true,
    })
    @JoinColumn({ name: 'author_id' })
    author: User;

    @Column()
    content: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column('bool')
    is_edited: boolean;
}
