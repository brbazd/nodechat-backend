import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // Register
  async create(createUserDto: CreateUserDto): Promise<any> {

    const existingUser = await this.findByEmail(createUserDto.email);

    if (existingUser) {
      throw new ConflictException('User already exists with that email address.');
    }

    if (createUserDto.password != createUserDto.confirm_password) {
      throw new ConflictException('Failed to confirm password.');
    }

    const user = new User();

    const saltOrRounds = 10;
    const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);

    user.username = createUserDto.username;
    user.email = createUserDto.email;
    user.password = hash;

    this.usersRepository.save(user);

    const {password, ...result} = user;

    return result;
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({where: {email: email}});
  }

  // Login - check user
  async validate(loginUserDto: LoginUserDto): Promise<any> {

    const user = await this.findByEmail(loginUserDto.email);

    if (!user) {
      throw new UnauthorizedException('User does not exist');
    }

    const passwordMatch = await bcrypt.compare(loginUserDto.password, user.password);

    console.log(passwordMatch);

    if(passwordMatch == false) {
      throw new UnauthorizedException('Invalid password');
    }

    const {password, ...result} = user

    return result;
  }


  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
