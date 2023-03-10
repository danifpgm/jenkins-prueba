import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCriptoDto } from './dto/create-cripto.dto';
import { UpdateCriptoDto } from './dto/update-cripto.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cripto } from './entities/cripto.entity';

@Injectable()
export class CriptoService {

  constructor (
    @InjectRepository(Cripto)
    private readonly criptoRepositorio: Repository<Cripto>
  ) {}

  async crear(crearCriptoDto: CreateCriptoDto) {
    try {
      const cripto = crearCriptoDto;
      await this.criptoRepositorio.save(cripto);
      return cripto
    } catch (error) {
      this.manejarExcepcionesBD(error)
    }
  }

  findAll() {
    return this.criptoRepositorio.find({
      relations: {
        usuarios: true
      }
    });
  }

  findOne(idCripto: string) {
    return this.criptoRepositorio.findOne({
      where: { 
        id: idCripto
      },
      relations: {
        usuarios: true
      }
    });
  }

  update(id: number, updateCriptoDto: UpdateCriptoDto) {
    return `This action updates a #${id} cripto`;
  }

  async remove(id: string) {
    const cripto = await this.findOne(id);
    await this.criptoRepositorio.remove(cripto);
    return `El nft ${cripto.nombre} ha sido borrado`;
  }

  private manejarExcepcionesBD (error: any): never{
    if (error.code === '23505')
      throw new BadRequestException(error.detail)
    
    throw new InternalServerErrorException('Error')
  }
}
