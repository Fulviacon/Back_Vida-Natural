import { IsInt, IsOptional, IsString } from 'class-validator';
import { Persona } from 'src/persona/entities/persona.entity';

export class MensajeDto {
 
  @IsString()
  mensaje:string;

persona:Persona;
}
