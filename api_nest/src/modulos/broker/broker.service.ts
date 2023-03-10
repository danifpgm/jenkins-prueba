import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateBrokerDto } from './dto/create-broker.dto';
import { UpdateBrokerDto } from './dto/update-broker.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Broker } from './entities/broker.entity';
import { Repository } from 'typeorm';
import { AuthServicio } from '../auth/auth.service';

@Injectable()
export class BrokerService {
  constructor (
    @InjectRepository(Broker)
    private readonly brokerRepositorio: Repository<Broker>,
    private readonly authServicio: AuthServicio
  ) {}

  async crear(CreateBrokerDto: CreateBrokerDto) {
    try {
      const { idUsuario, ...brokerDatos } = CreateBrokerDto;
      const usuario = await this.authServicio.findOne(idUsuario);
      const broker = this.brokerRepositorio.create({ ...brokerDatos })
      broker.usuarios = [ usuario ]
      await this.brokerRepositorio.save(broker);
      return broker
    } catch (error) {
      this.manejarExcepcionesBD(error)
    }
  }

  findAll() {
    return this.brokerRepositorio.find({});
  }

  findOne(cifBroker: string) {
    return this.brokerRepositorio.findOne({
      where: { 
        cif: cifBroker
      },
    });
  }

  update(id: number, updateBrokerDto: UpdateBrokerDto) {
    return `This action updates a #${id} broker`;
  }

  async remove(id: string) {
    const broker = await this.findOne(id);
    await this.brokerRepositorio.remove(broker);
    return `El nft ${broker.nombre} ha sido borrado`;
  }

  private manejarExcepcionesBD (error: any): never{
    if (error.code === '23505')
      throw new BadRequestException(error.detail)
    
    throw new InternalServerErrorException('Error')
  }
}
