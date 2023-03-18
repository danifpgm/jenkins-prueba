import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import { LoginUsuarioDto } from './dto/login-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { ActualizarUsuarioDto } from './dto/actualizar-usuario.dto';
import { CriptoService } from '../cripto/cripto.service';


@Injectable()
export class AuthServicio {

  constructor (
    @InjectRepository(Usuario)
    private readonly usuarioRepositorio: Repository<Usuario>,
    private readonly jwtServicio: JwtService,
    private readonly criptoServicio: CriptoService
  ) {}

  async crear(crearUsuarioDto: CrearUsuarioDto) {
    try {
      console.log("Insertando usuario: ",crearUsuarioDto);
      const { passwd, idCripto, ...usuarioDatos } = crearUsuarioDto;
      const usuario = this.usuarioRepositorio.create({
        ...usuarioDatos,
        passwd: bcrypt.hashSync( passwd, 10 )
      });
      const cripto = await this.criptoServicio.findOne(idCripto);
      delete cripto.usuarios;
      usuario.criptos = [ cripto ];
      await this.usuarioRepositorio.save(usuario);
      //delete usuario.passwd;

      return {
        usuario: { ...usuario },
        token: this.getJwtToken({ correo: usuario.correo })
      }
      
    } catch (error) {
      this.manejarExcepcionesBD(error)
    }
  }
  
  async login( loginUserDto: LoginUsuarioDto ){
    try {
      const { correo, passwd } = loginUserDto;
      const usuario = await this.usuarioRepositorio
        .createQueryBuilder("usuarios")
        .select(["usuarios.id", "usuarios.nombreCompleto", "usuarios.rol"])
        .addSelect("usuarios.passwd")
        .where( "usuarios.correo = :correo", { correo: correo})
        .getOne();
       console.log(usuario);

      if ( !usuario ) 
        throw new UnauthorizedException ('Credenciales no válidas (email)');

      //Con esta comprobación tampoco funciona
      if (!bcrypt.compareSync( passwd, usuario.passwd ))
        throw new UnauthorizedException('Credenciales no válidas (email)')
      
      return {
        usuario,
        token: this.getJwtToken({ correo: usuario.correo })
      }
      
    } catch (error) {
      this.manejarExcepcionesBD(error)
    }
  }

  findOne(idUsuario: string) {
    return this.usuarioRepositorio.findOne({
      where: { 
        id: idUsuario
      },
      relations: {
        poseeNft: true,
        brokers: true,
        criptos: true
      }
    });
  }
  
  update(id: number, actualizarUsuarioDto: ActualizarUsuarioDto) {
    return `This action updates a #${id} broker`;
  }

  async findAll() {
    return this.usuarioRepositorio.find({
      relations: {
        poseeNft: true,
        brokers: true,
        criptos: true
      }
    });
  }

  async remove(id: string) {
    const usuario = await this.findOne(id);
    await this.usuarioRepositorio.remove(usuario);
    return `El usuario ${usuario.nombreCompleto} ha sido borrado`;
  }

  private manejarExcepcionesBD (error: any): never{
    if (error.code === '23505')
      throw new BadRequestException(error.detail)
    
    throw new InternalServerErrorException('Error')
  }

  private getJwtToken( payload: JwtPayload){
    const token = this.jwtServicio.sign(payload);
    return token;
  }
}
