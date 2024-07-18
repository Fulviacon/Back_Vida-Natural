import { Module } from '@nestjs/common';
import { DonacionesService } from './donaciones.service';
import { DonacionesController } from './donaciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Donaciones } from './entities/donacione.entity';
import { Persona } from 'src/persona/entities/persona.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([ Donaciones, Persona ])
  ],
  controllers: [DonacionesController],
  providers: [DonacionesService],
})
export class DonacionesModule {}
