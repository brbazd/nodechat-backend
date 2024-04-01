import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    // private jwtService: JwtService
  ) {}

  

  async findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({where: {email: email}});
  }


  async createUser(dto: CreateUserDto): Promise<any> {

    const user = new User();

    const saltOrRounds = 10;
    const hash = await bcrypt.hash(dto.password, saltOrRounds);

    user.username = dto.username;
    user.email = dto.email;
    user.password = hash;

    return await this.usersRepository.save(user);
  }
  

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: number): Promise<User> {
    return this.usersRepository.findOne({where: {id: id}});
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
