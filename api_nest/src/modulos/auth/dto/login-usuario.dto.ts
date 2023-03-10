import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class LoginUsuarioDto {
    
    @IsString()
    @IsEmail()
    correo: string;

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
    /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'La contrasena debe tener una letra grande, pequena y un numero'
    })
    passwd: string;
}