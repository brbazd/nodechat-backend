import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/entities/message.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessagesService {

    constructor(
        @InjectRepository(Message)
        private messagesRepository: Repository<Message>,
    ) {}


    async createMessage(author: any, content: string, date: Date): Promise<any> {

        const message = new Message();

        console.log(content, author, date)
    
    
        message.author = { id: author.id } as User
        message.content = content
        message.created_at = date
    
    
        return await this.messagesRepository.save(message);
        
      }

      async getMessageHistory(): Promise<any> {
        return await this.messagesRepository.find({
            order: {
                created_at: "DESC"
            },
            relations: {author: true},
            select: ['id', 'content', 'created_at', 'author'],
            take: 20
        })
      }



}
