import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeedServicio } from './seed.service';
@Controller('seed')
export class SeedController {
  constructor(private readonly seedServicio: SeedServicio) {}

  @Post()
  ejecutarSeed() {
    return this.seedServicio.ejecutarSeed();
  }
  
  @Delete()
  borrar() {
    return this.seedServicio.borrarTodosElementos();
  }

}
