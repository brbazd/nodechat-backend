import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { UsersModule } from 'src/users/users.module';
import { SessionSerializer } from './session.serializer';

@Module({
  imports: [
    PassportModule.register({session: true}),
    UsersModule
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, SessionSerializer]
})
export class AuthModule {}
