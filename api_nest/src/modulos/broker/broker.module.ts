import { Module } from '@nestjs/common';
import { BrokerService } from './broker.service';
import { BrokerController } from './broker.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Broker } from './entities/broker.entity';
import { Usuario } from '../auth/entities/usuario.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [BrokerController],
  providers: [BrokerService],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature( [ Broker, Usuario ])
  ],
  exports: [BrokerService, TypeOrmModule]
})
export class BrokerModule {}
