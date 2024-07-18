import { Persona } from 'src/persona/entities/persona.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';


@Entity('donaciones')
export class Donaciones {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    monto: number;

    @Column()
    fechaDonacion: Date;
    
  @ManyToOne(() => Persona, persona => persona.donaciones)
    @JoinColumn({ name: 'idPersona' })
    persona: Persona; 

    constructor(monto: number, fechaDonacion: Date,persona:Persona) {
        this.monto = monto;
        this.fechaDonacion = fechaDonacion;
        this.persona = persona 
    }
}
