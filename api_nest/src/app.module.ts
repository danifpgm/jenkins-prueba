import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ComunModule } from './modulos/comun/comun.module';
import { SeedModule } from './seed/seed.module';
import { AuthModule } from './modulos/auth/auth.module';
import { BrokerModule } from './modulos/broker/broker.module';
import { CriptoModule } from './modulos/cripto/cripto.module';
import { NftModule } from './modulos/nft/nft.module';
import { clear } from 'console';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PUERTO,
      database: process.env.DB_NOMBRE,
      username: process.env.DB_NOMBREUSU,
      password: process.env.DB_PASSWD,
      autoLoadEntities: true,
      synchronize: true
    }),
    ComunModule,
    SeedModule,
    AuthModule,
    BrokerModule,
    CriptoModule,
    NftModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
