import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcryptjs from "bcryptjs";
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService) {}

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
            message: "Usuario creado existosamente",
        }
    }

    async login() {

    }

}
