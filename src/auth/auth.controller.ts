import { Body, Controller, Get, Post, Req, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LocalGuard } from './guards/local.guard';
import { AuthenticatedGuard } from './guards/authenticated.guard';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    register(@Body() dto: CreateUserDto) {
        return this.authService.register(dto);
    }

    @UseGuards(LocalGuard)
    @Post('login')
    login(@Request() req: any): any {
        return {
            User: req.user,
            msg: 'User logged in'
        };
    }

    @Get('logout')
        logout(@Request() req): any {
          req.session.destroy();
          return { msg: 'The user session has ended' }
    }

    @UseGuards(AuthenticatedGuard)
    @Get('verify_user')
    verifyUser(@Request() req: any) {
        return this.authService.verify(+req.user.id)
    }
}
