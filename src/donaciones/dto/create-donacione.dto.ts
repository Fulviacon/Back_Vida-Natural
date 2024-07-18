import {  IsNumber, IsString } from 'class-validator';
import { Persona } from 'src/persona/entities/persona.entity';


export class DonacionesDto {
  @IsNumber()
  monto: number;

  @IsString()
  fechaDonacion: Date;

persona:Persona;
}
