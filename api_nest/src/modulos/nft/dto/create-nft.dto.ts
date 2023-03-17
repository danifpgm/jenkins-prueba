import { IsISO8601, IsPositive, IsString, MinLength } from "class-validator";

export class CreateNftDto {
    @IsString()
    @MinLength(1)
    nombre: string;

    @IsString()
    @MinLength(1)
    img: string;

    @IsPositive()
    precio: number;

    @IsISO8601()
    fechaCreacion: string;

    @IsString()
    @MinLength(1)
    idUsuarioCreador: string;

    @IsString()
    @MinLength(1)
    idUsuarioDueno: string;
}
