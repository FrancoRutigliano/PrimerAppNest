import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';
import { ChangePasswordDto} from './dto/changePassword.dto';
import { RequestWithUser } from './interface/requestUserInterface';
import { Role } from '../common/enums/role.enum';
import { Auth } from './decorators/auth.decorator';

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

    // @Get('profile')
    // @Roles(Role.USER)
    // @UseGuards(AuthGuard, RolesGuard)
    // profile(
    //     @Req() req: RequestWithUser
    // ) {
        
    //    return this.authService.profileInfo(req.user)
    // }

    @Get('profile')
    @Auth(Role.USER)
    profile(@Request() req: RequestWithUser){
        return  req.user 
    }

    @Post('change-password')
    @UseGuards(AuthGuard)
    changePassword(@Body() changePasswordDto: ChangePasswordDto, @Request() req) {
        const user = req.user.email

        return this.authService.changePassword(changePasswordDto, user)
    }

}
