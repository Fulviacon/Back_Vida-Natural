import { Module } from '@nestjs/common';
import { PersonaService } from './persona.service';
import { PersonaController } from './persona.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Persona } from './entities/persona.entity';
import { Donaciones } from 'src/donaciones/entities/donacione.entity';
import { Mensaje } from 'src/mensaje/entities/mensaje.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Persona,Donaciones,Mensaje])],
  controllers: [PersonaController],
  providers: [PersonaService],
})
export class PersonaModule {}
