import { IsArray, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateCriptoDto {
    @IsString()
    nombre: string;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    precio: number;

}
