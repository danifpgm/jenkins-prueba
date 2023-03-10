import { Module } from '@nestjs/common';
import { SeedServicio } from './seed.service';
import { SeedController } from './seed.controller';
import { CriptoModule } from 'src/modulos/cripto/cripto.module';

@Module({
  controllers: [SeedController],
  providers: [SeedServicio],
  imports: [CriptoModule]
})
export class SeedModule {}
