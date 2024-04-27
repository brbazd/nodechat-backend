import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Session, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUsernameDto } from './dto/update-username.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { LocalGuard } from '../auth/guards/local.guard';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post('register')
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }

  // @Post('login')
  // @UseGuards(LocalGuard)
  // validate(@Body() loginUserDto: LoginUserDto) {
  //   return this.usersService.validate(loginUserDto);
  // }


  @UseGuards(AuthenticatedGuard)
  @Post('change_username')
  async changeUsername(@Request() req: any, @Body() updateUsernameDto: UpdateUsernameDto) {
    console.log(req.user)
    return await this.usersService.updateUsername(+req.user.id, updateUsernameDto)
    // return req.user
  }

  @UseGuards(AuthenticatedGuard)
  @Post('change_password')
  async changePassword(@Request() req: any, @Body() updatePasswordDto: UpdatePasswordDto) {
    console.log(req.user)
    return await this.usersService.updatePassword(+req.user.id, updatePasswordDto)
    // return req.user
  }


  @UseGuards(AuthenticatedGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Req() req: Request, @Param('id') id: string) {
    return this.usersService.findOne(+id);
  }



  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
