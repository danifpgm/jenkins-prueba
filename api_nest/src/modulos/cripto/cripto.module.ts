import { Module } from '@nestjs/common';
import { CriptoService } from './cripto.service';
import { CriptoController } from './cripto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cripto } from './entities/cripto.entity';

@Module({
  controllers: [CriptoController],
  providers: [CriptoService],
  imports: [ 
    TypeOrmModule.forFeature( [ Cripto ])
  ],
  exports: [CriptoService, TypeOrmModule]
})
export class CriptoModule {}
