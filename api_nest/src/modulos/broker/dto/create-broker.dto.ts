import { IsArray, IsNumber, IsPositive, IsString, MinLength } from "class-validator";
import { Usuario } from "src/modulos/auth/entities/usuario.entity";

export class CreateBrokerDto {

    @IsString()
    @MinLength(9)
    cif: string;
    
    @IsString()
    nombre: string;
    
    @IsString()
    url: string;

    @IsString()
    direccion: string;

    @IsString()
    correo_contacto: string;

    @IsNumber()
    @IsPositive()
    tlfn_contacto: number;

    @IsString()
    idUsuario: string
}
