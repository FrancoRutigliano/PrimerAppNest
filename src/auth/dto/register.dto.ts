import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength} from "class-validator";

export class RegisterDto {
    @MinLength(1)
    @IsString()
    name: string;

    @IsEmail() // decorador para decir que este campo es email
    email: string;


    @MinLength(1)
    @IsString()
    @Transform(({ value }) => value.trim()) // decorador, para aplicar transformaciones - metodo trim elimina espcios en blanco
    password: string;
}