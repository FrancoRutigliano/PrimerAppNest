import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import * as bcryptjs from "bcryptjs";
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async register({name, email, password}: CreateUserDto ) {
        const user = this.userService.findOneByEmail(email);

        if (!user) {
            throw new BadRequestException('Email already exist');
        }

        // hash pass

        const hashedPassword = await bcryptjs.hash(password, 10);


        await this.userService.create({
            name,
            email,
            password: hashedPassword
        })

        return {
            message: "user succesfully created",
        }
    }

    async login({email, password}: LoginDto) {
        const user = this.userService.findOneByEmail(email);

        if (!user) {
            throw new UnauthorizedException('Invalid email');
        }

        try {
            const comparePassword = await bcryptjs.compare(password, (await user).password);
            if (!comparePassword) {
                throw new UnauthorizedException('Invalid password');
            }
        } catch (error) {
            throw new InternalServerErrorException('Error comparing passwords');
        }

        const payload = { email: (await user).email };

        const token  = await this.jwtService.signAsync(payload);
        
        return {
            token: token,
            email: (await user).email,
            message: `Hey ${(await user).name} you´re welcome`
        }
    }


    async profileInfo(user: any) {
        
        const payload = this.userService.findOneByEmail(user.email)

        return {
            message:`Hey ${(await payload).name} this is your profile`,
            email: (await payload).email,
        }
    }
}
