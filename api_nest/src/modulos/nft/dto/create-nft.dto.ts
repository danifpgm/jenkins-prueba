import { IsISO8601, IsString, MinLength } from "class-validator";

export class CreateNftDto {
    @IsString()
    @MinLength(1)
    nombre: string;

    @IsString()
    @MinLength(1)
    img: string;

    @IsISO8601()
    fechaCreacion: string;

    @IsString()
    @MinLength(1)
    idUsuarioCreador: string;

    @IsString()
    @MinLength(1)
    idUsuarioDueno: string;
}
