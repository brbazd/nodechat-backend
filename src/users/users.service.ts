import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUsernameDto } from './dto/update-username.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';


@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    // private jwtService: JwtService
  ) {}

  

  async findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({where: {email: email}, select: {password: true, refresh_token: false, email: true, username: true, created_at: true, id: true}});
  }


  async createUser(dto: CreateUserDto): Promise<any> {

    const user = new User();

    const saltOrRounds = 10;
    const hash = await bcrypt.hash(dto.password, saltOrRounds);

    user.username = dto.username;
    user.email = dto.email;
    user.password = hash;
    user.created_at = new Date()

    return await this.usersRepository.save(user);
  }
  

  async findAll(): Promise<any> {
    return this.usersRepository.find({select: {
      id: true,
      username: true,
      email: false,
      password: false,
      created_at: true
    },
    order: {
      created_at: "DESC"
    },
    take:10});
  }

  async findOne(id: number): Promise<User> {
    return this.usersRepository.findOne({where: {id: id}, select: {password: true, refresh_token: false, email: true, username: true, created_at: true, id: true}});
  }

  async updateUsername(id: number, dto: UpdateUsernameDto):Promise<any> {
    const user = await this.findOne(id)
    
    const passwordMatch = await bcrypt.compare(dto.password, user.password);

    if(passwordMatch == false) {
      throw new UnauthorizedException('Invalid password');
    }

    user.username = dto.username

    return await this.usersRepository.save(user);
  }

  async updatePassword(id: number, dto: UpdatePasswordDto):Promise<any> {
    const user = await this.findOne(id)
    
    const passwordMatch = await bcrypt.compare(dto.old_password, user.password);

    if(passwordMatch == false) {
      throw new UnauthorizedException('Invalid password');
    }

    if (dto.new_password != dto.confirm_password) {
      throw new ConflictException('Failed to confirm password.');
    }

    const hash = await bcrypt.hash(dto.new_password, 10);

    user.password = hash

    this.usersRepository.save(user);

    return 'Password changed!'
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
