import { Module } from '@nestjs/common';
import { MensajeService } from './mensaje.service';
import { MensajeController } from './mensaje.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mensaje } from './entities/mensaje.entity';
import { Persona } from 'src/persona/entities/persona.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([ Mensaje,Persona])
    
   ],
  controllers: [MensajeController],
  providers: [MensajeService],
})
export class MensajeModule {}
