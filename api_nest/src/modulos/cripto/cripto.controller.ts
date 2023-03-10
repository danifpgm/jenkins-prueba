import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CriptoService } from './cripto.service';
import { CreateCriptoDto } from './dto/create-cripto.dto';
import { UpdateCriptoDto } from './dto/update-cripto.dto';

@Controller('cripto')
export class CriptoController {
  constructor(private readonly criptoService: CriptoService) {}

  @Post()
  create(@Body() createCriptoDto: CreateCriptoDto) {
    return this.criptoService.crear(createCriptoDto);
  }

  @Get()
  findAll() {
    return this.criptoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.criptoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCriptoDto: UpdateCriptoDto) {
    return this.criptoService.update(+id, updateCriptoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.criptoService.remove(id);
  }
}
