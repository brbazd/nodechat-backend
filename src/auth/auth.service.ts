import { ConflictException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { UsersService } from 'src/users/users.service';
import * as  bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService
    ) {}


    // Register
  async register(dto: CreateUserDto): Promise<any> {

    const existingUser = await this.usersService.findOneByEmail(dto.email);

    if (existingUser) {
      throw new ConflictException('User already exists with that email address.');
    }

    if (dto.password != dto.confirm_password) {
      throw new ConflictException('Failed to confirm password.');
    }

    const user = await this.usersService.createUser(dto);

    const {password, ...result} = user;

    return result;
  }

    // Login - check user
  async validate(dto: LoginUserDto): Promise<any> {

    const user = await this.usersService.findOneByEmail(dto.email);

    if (!user) {
      throw new UnauthorizedException('User does not exist');
    }

    const passwordMatch = await bcrypt.compare(dto.password, user.password);


    if(passwordMatch == false) {
      throw new UnauthorizedException('Invalid password');
    }

    const {password, refresh_token, ...result} = user

    console.log(result)

    return result;
    
  }

  async verify(id: number):Promise<any> {
    return this.usersService.findOne(id)
  }

}
