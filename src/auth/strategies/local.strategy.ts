import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { UsersService } from "../../users/users.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginUserDto } from "../../users/dto/login-user.dto";
import * as bcrypt from 'bcrypt';
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({ usernameField: 'email' });
    }

    async validate(email: string, password: string) {

        const user = await this.authService.validate({email, password});

        if (!user) throw new UnauthorizedException();

        return user;
    }
}