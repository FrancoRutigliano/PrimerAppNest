import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';
import { ChangePasswordDto} from './dto/changePassword.dto';
import { RequestWithUser } from './interface/requestUserInterface';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guard/roles.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("register")
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @Post("login")
    @HttpCode(HttpStatus.OK) // 200
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Get('profile')
    @Roles('user')
    @UseGuards(AuthGuard, RolesGuard)
    profile(
        @Req() req: RequestWithUser
    ) {
        const user = req.user
       return this.authService.profileInfo(user)
    }

    @Post('change-password')
    @UseGuards(AuthGuard)
    changePassword(@Body() changePasswordDto: ChangePasswordDto, @Request() req) {
        const user = req.user.email

        return this.authService.changePassword(changePasswordDto, user)
    }

}
