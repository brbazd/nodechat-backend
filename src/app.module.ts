import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatGateway } from './chat/chat.gateway';
import { DataSource } from 'typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'chatchat',
      logging: true,
      entities: [User],
      migrations: [/*...*/],
      synchronize: false,
      // migrationsTableName: 'typeorm_migrations',
      // migrationsRun: false,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
