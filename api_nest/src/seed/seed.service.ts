import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { DatosIniciales }  from './datos/criptos';
import { InjectRepository } from '@nestjs/typeorm';
import { Cripto } from 'src/modulos/cripto/entities/cripto.entity';
import { Repository } from 'typeorm';
import { CriptoService } from 'src/modulos/cripto/cripto.service';


@Injectable()
export class SeedServicio {
  constructor(
    private readonly criptosService: CriptoService,

    @InjectRepository(Cripto)
    private readonly criptosRepository: Repository<Cripto>,
    ) {}

  async ejecutarSeed() {
    this.insertarNuevosProductos();
    return `seed ejecutada`;
  }
  
  private async insertarNuevosProductos(){
    const seedProductos = DatosIniciales.criptos;
    const insertarPromesas = [];

    seedProductos.forEach ( cripto => { 
      insertarPromesas.push(this.criptosService.crear( cripto ));
    });
    await Promise.all (insertarPromesas);
    return true
  }

  async borrarTodosElementos() {
    const query = this.criptosRepository.createQueryBuilder('cripto');
    try {
      return await query
              .delete()
              .where({})
              .execute()
    } catch (error) {
      this.manejarExcepcionesBD( error )
    }
  }

  private manejarExcepcionesBD( error: any) {
    if (error.code === '23505'){
      throw new BadRequestException(error.detail)
    }
    throw new InternalServerErrorException('Error inesperado, comrpueba los errores')
  }
}
