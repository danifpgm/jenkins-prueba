import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Repository } from "typeorm";
import { Usuario } from "../entities/usuario.entity";
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy ) {

    constructor (
        @InjectRepository (Usuario)
        private readonly userRepository: Repository<Usuario>
    ) {
        super({
            secretOrKey: 'jwt',            
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        })
    }

    async validate ( payload: JwtPayload ): Promise<Usuario>{
        const { correo } = payload;
        const usuario = await this.userRepository.findOneBy({ correo });

        if (!usuario )
            throw new UnauthorizedException('Token no valido');
        
        if (!usuario.esActivo )
            throw new UnauthorizedException('usuario no activo');
            
        return usuario;
    }

}