import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class ChangePasswordDto {
    @IsString()
    oldPassword: string;

    @IsString()
    @MinLength(6)
    @MaxLength(30)
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/, { message: 'Las contraseñas deben contener al menos una letra mayúscula, una letra minúscula y un número.' })
    newPassword: string;

    @IsString()
    @MinLength(6)
    @MaxLength(30)
    confirmPassword?: string;
}