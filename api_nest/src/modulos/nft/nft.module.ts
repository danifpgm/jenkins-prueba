import { Module } from '@nestjs/common';
import { NftService } from './nft.service';
import { NftController } from './nft.controller';
import { Nft } from './entities/nft.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [NftController],
  providers: [NftService],
  imports: 
    [ 
      TypeOrmModule.forFeature([Nft]),
      AuthModule
    ]
})
export class NftModule {}
