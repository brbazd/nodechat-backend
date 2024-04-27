import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatGateway } from './chat/chat.gateway';
import { DataSource } from 'typeorm';
import { UsersModule } from './users/users.module';
import { User } from './entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MessagesModule } from './messages/messages.module';
import { Message } from './entities/message.entity';

let envFilePath = '.env';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      logging: true,
      entities: [User, Message],
      migrations: [/*...*/],
      synchronize: false,
      // migrationsTableName: 'typeorm_migrations',
      // migrationsRun: false,
    }),
    UsersModule,
    AuthModule,
    MessagesModule
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
